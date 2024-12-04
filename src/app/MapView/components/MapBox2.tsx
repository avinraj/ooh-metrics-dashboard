import { Box, CircularProgress, Grid, useTheme } from "@mui/material";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";

// import logo from "../../../assets/oohlogo.png";
import apartment from "../../../assets/apartments.png";
import fitness from "../../../assets/fitness.png";
import theatre from "../../../assets/theatre.png";
import workspace from "../../../assets/workspace.png";
import store from "../../../assets/store.png"

import data from "../../../Data/mapData.json";
import MapFilterOptions from "./MapFilterOptions";
import MapSearchBox from "./MapSearchBox";

// Your location data
const locationData: any = data;

interface MapboxMapProps {
  layerType: "heat" | "point";
}

const Mapbox2 = ({ layerType }: MapboxMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string[]>([
    "apartments",
    "workspaces",
    "fitness",
    "cinema_theatres",
  ]);

  const [selectedBrands, setSelectedBrands] = useState<string[]>([
    "burger_king",
  ]);
  const brands = ["burger_king"];
  const categories = ["apartments", "workspaces", "fitness", "cinema_theatres"];
  const [loading, setLoading] = useState(true);
  const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;

  mapboxgl.accessToken =
    "pk.eyJ1Ijoib29obWV0cmljcyIsImEiOiJjbTNndWhvb3cwN3doMm9xejFnbnJhbmxjIn0.gUT_L2_wIqhQlfDMSXXrxA"; // Replace with your Mapbox access token

  // Function to handle point click event and show popup
  const handlePointClick = (e: mapboxgl.MapMouseEvent) => {
    const features = mapRef.current?.queryRenderedFeatures(e.point, {
      layers: ["unclustered-point-layer"], // Your layer name
    });

    if (features && features.length > 0) {
      const feature: any = features[0];
      const locationName = feature?.properties?.name || "Unknown Location";
      const locationType = feature?.properties?.type;

      //   const icon = getLocationIcon(locationType);

      // Create the popup content using HTML, from Material UI components
      const htmlContent = `
          <div style="display: grid">
          <div> ${getLocationIcon(locationType)}</div>
            <strong>${locationName}</strong>
          </div>
        `;

      const popup: any = new mapboxgl.Popup({
        closeOnClick: true,
        focusAfterOpen: true,
      })
        .setLngLat(e.lngLat)
        .setHTML(htmlContent)
        .addTo(mapRef.current!);

      // Ensure popup close button doesn't inherit aria-hidden
      const closeButton = popup
        .getElement()
        .querySelector(".mapboxgl-popup-close-button");
      if (closeButton) {
        closeButton.removeAttribute("aria-hidden");
      }
    }
  };

  const getLocationIcon = (type: string) => {
    switch (type) {
      case "apartment":
        return `<img src=${apartment} alt="Icon" style="width: 50px; height: 50px; margin-bottom: 8px;" />`;
      case "workspace":
        return `<img src=${workspace} alt="Icon" style="width: 50px; height: 50px; margin-bottom: 8px;" />`;
      case "fitness":
        return `<img src=${fitness} alt="Icon" style="width: 50px; height: 50px; margin-bottom: 8px;" />`;
      case "cinema_theatre":
        return `<img src=${theatre} alt="Icon" style="width: 50px; height: 50px; margin-bottom: 8px;" />`;
        case "store":
        return `<img src=${store} alt="Icon" style="width: 50px; height: 50px; margin-bottom: 8px;" />`;
      default:
        return null;
    }
  };

  const createHeatLayer = (map: mapboxgl.Map) => {
    if (!map.getLayer("heatmap-layer")) {
      map.addLayer({
        id: "heatmap-layer",
        type: "heatmap",
        source: "data-points",
        paint: {
          "heatmap-weight": [
            "interpolate",
            ["linear"],
            ["get", "speed"],
            0,
            0,
            10,
            1,
          ],
          "heatmap-intensity": 1,
          "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0,
            "rgba(255, 255, 204, 0)",
            0.2,
            "rgb(255, 255, 102)",
            0.4,
            "rgb(255, 255, 102)",
            0.6,
            "rgb(255, 255, 102)",
            0.8,
            "rgb(255, 255, 102)",
            1,
            "rgb(255, 255, 102)",
          ],
          "heatmap-radius": 30,
          "heatmap-opacity": 0.7,
        },
      });
    }
  };

  const createClusterLayer = (map: mapboxgl.Map) => {
    if (!map.getLayer("cluster-circle-layer")) {
      map.addLayer({
        id: "cluster-circle-layer",
        type: "circle",
        source: "data-points",
        filter: ["has", "point_count"], // Only display clusters
        paint: {
          "circle-radius": [
            "interpolate",
            ["linear"],
            ["get", "point_count"],
            0,
            20,
            100,
            40,
          ],
          "circle-color": [
            "interpolate",
            ["linear"],
            ["get", "point_count"],
            0,
            primaryColor,
            100,
            "rgba(255, 99, 71, 1)", // Red as clusters grow
          ],
          "circle-opacity": 0.6,
        },
      });

      map.addLayer({
        id: "cluster-count-layer",
        type: "symbol",
        source: "data-points",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 12,
        },
        paint: {
          "text-color": "#ffffff",
        },
      });
    }

    if (!map.getLayer("unclustered-point-layer")) {
      map.addLayer({
        id: "unclustered-point-layer",
        type: "circle",
        source: "data-points",
        filter: ["!has", "point_count"], // Display unclustered points
        paint: {
          "circle-radius": 6,
          "circle-color": primaryColor,
          "circle-opacity": 0.8,
        },
      });
    }
  };

  const createClusteredSource = (filteredData: any): any => {
    return {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: filteredData.map((location: any) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: location.coordinates,
          },
          properties: {
            type: location.type,
            name: location.name,
          },
        })),
      },
      cluster: true, // Enable clustering
      clusterMaxZoom: 14, // Max zoom level to disable clustering
      clusterRadius: 50, // Radius of each cluster
    };
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [78.9629, 20.5937], // Center of India
      zoom: 4,
    });

    mapRef.current = map;

    map.on("load", () => {
      const filteredData = filterLocationData(selectedLocation, selectedBrands);

      if (!map.getSource("data-points")) {
        map.addSource("data-points", createClusteredSource(filteredData));
      }

      setLoading(false);

      if (layerType === "heat") {
        createHeatLayer(map);
      } else if (layerType === "point") {
        createClusterLayer(map); // Add the cluster layer when showing points
      }

      // Zoom to cluster on click
      map.on("click", "cluster-circle-layer", (e: any) => {
        const features: any = map.queryRenderedFeatures(e.point, {
          layers: ["cluster-circle-layer"],
        });

        if (features && features.length > 0) {
          const clusterId = features[0].properties.cluster_id;
          const clusterSource = map.getSource(
            "data-points"
          ) as mapboxgl.GeoJSONSource;

          clusterSource.getClusterExpansionZoom(clusterId, (err, zoom: any) => {
            if (err) {
              console.error("Error getting cluster expansion zoom:", err);
              return;
            }

            map.easeTo({
              center: features[0].geometry.coordinates as mapboxgl.LngLatLike,
              zoom: zoom,
              duration: 1000,
            });
          });
        }
      });

      map.on("click", handlePointClick);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [layerType, selectedLocation, selectedBrands]);

  const filterLocationData = (
    categoriesData: string[],
    brandsData: string[]
  ) => {
    let filteredLocations: any[] = [];

    // Filter by category
    if (categoriesData.length > 0 && !categoriesData.includes("all")) {
      filteredLocations = categoriesData.flatMap(
        (category) => locationData[category] || []
      );
    } else {
      //filteredLocations = categories.flatMap((category) => locationData[category])
      // filteredLocations = [
      //   ...locationData.apartments,
      //   ...locationData.workspaces,
      //   ...locationData.fitness,
      //   ...locationData.cinema_theatres,
      // ];
    }

    let brandsFiltered: any[] = [];

    if (brandsData.length > 0 && !brandsData.includes("allBrands")) {
      brandsFiltered = brandsData.flatMap((brand) => locationData[brand] || []);
    } else {
      //brandsFiltered = brands.flatMap((brand) => locationData[brand])
      // brandsFiltered = [...locationData.burger_king];
    }

    const combinedFilteredData = [...filteredLocations, ...brandsFiltered];

    return combinedFilteredData;
  };

  const handleLocationSelect = ({
    longitude,
    latitude,
  }: {
    longitude: number;
    latitude: number;
  }) => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [longitude, latitude],
        zoom: 12,
      });

      const marker = new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .addTo(mapRef.current);

      // Track the new marker in state
      setMarkers((prevMarkers) => [...prevMarkers, marker]);
    }
  };

  const clearMarkers = () => {
    // Remove all markers by iterating over them and calling remove()
    markers.forEach((marker) => marker.remove());

    // Clear the state as well
    setMarkers([]);
  };

  const handleCategoryChange = (selected: string[]) => {
    setSelectedLocation(selected);
  };

  const handleBrandChange = (selected: string[]) => {
    setSelectedBrands(selected);
  };

  return (
    <div style={{ position: "relative", margin: "10px" }}>
      {loading && (
        <CircularProgress
          sx={{ position: "absolute", zIndex: 2, top: "50%", right: "50%" }}
        />
      )}
      <Grid
        container
        spacing={1}
        style={{
          position: "absolute",
          zIndex: 2,
          padding: "10px",
        }}
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "start",
            height: "fit-content",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingLeft: "10px",
            }}
          >
            {/* <img
                src={logo}
                alt="OOH Logo"
                style={{ marginRight: 10, height: "40px" }}
              /> */}
            <h2
              style={{
                color: "white",
                margin: "4px",
              }}
            >
              OOHmetrics
            </h2>
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          md
          sx={{
            display: "flex",
            justifyContent: "end",
            height: "fit-content",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <MapSearchBox
              onLocationSelect={handleLocationSelect}
              onClear={clearMarkers}
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md="auto"
          sx={{
            display: "flex",
            justifyContent: "end",
            height: "fit-content",
          }}
        >
          <MapFilterOptions
            categories={categories}
            brands={brands}
            selectedCategories={selectedLocation}
            selectedBrands={selectedBrands}
            onCategoryChange={handleCategoryChange}
            onBrandsChange={handleBrandChange}
          />
        </Grid>
      </Grid>

      <div
        ref={mapContainerRef}
        style={{ height: "550px", width: "100%" }}
      ></div>
    </div>
  );
};

export default Mapbox2;
