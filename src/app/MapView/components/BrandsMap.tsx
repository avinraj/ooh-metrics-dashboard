import { Box, CircularProgress, Grid, useTheme } from "@mui/material";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// import logo from "../../../assets/oohlogo.png";
import apartment from "../../../assets/apartments.png";
import burger_king from "../../../assets/burger_king_icon.png";
import fitness from "../../../assets/fitness.png";
import theatre from "../../../assets/theatre.png";
import workspace from "../../../assets/workspace.png";

import brands from "../../../Data/brandsData.json";
import data from "../../../Data/mapData.json";
import { constants } from "../../core/data/constants";
import { DrawerComponent } from "./InventoryDrawer";
import InventoryTotal from "./InventoryTotal";
import MapFilterOptions from "./MapFilterOptions";
import MapSearchBox from "./MapSearchBox";
import MapStylePicker from "./MapStylePicker";

// Your location data
const locationData: any = data;
const allBrands: any = brands;

interface MapboxMapProps {
  layerType: "heat" | "point";
}

export const inventoryTypes = {
  apartments: "apatrments",
  fitness: "fitness",
  cinema_theatres: "cinema_theatres",
  workspaces: "workspaces",
};

export const brandTypes = {
  burger_king: "burger_king",
};

// Helper function for circle GeoJSON
const createCircle = (center: { lng: number; lat: number }, radius: number) => {
  const points = 64;
  const coords = {
    latitude: center.lat,
    longitude: center.lng,
  };
  const km = radius / 1000;

  const ret = [];
  const distanceX = km / (111.32 * Math.cos((coords.latitude * Math.PI) / 180));
  const distanceY = km / 110.574;

  for (let i = 0; i < points; i++) {
    const theta = (i / points) * (2 * Math.PI);
    const x = distanceX * Math.cos(theta);
    const y = distanceY * Math.sin(theta);

    ret.push([coords.longitude + x, coords.latitude + y]);
  }
  ret.push(ret[0]);

  return {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [ret],
    },
  };
};

const BrandsMap = ({ layerType }: MapboxMapProps) => {
  const theme = useTheme();

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<Record<string, mapboxgl.Marker[]>>({});
  const [mapStyle, setMapStyle] = useState("mapbox://styles/mapbox/dark-v10");
  const [selectedLocation, setSelectedLocation] = useState<string[]>([
    inventoryTypes.apartments,
    inventoryTypes.workspaces,
    inventoryTypes.fitness,
    inventoryTypes.cinema_theatres,
  ]);

  const [selectedBrands, setSelectedBrands] = useState<string[]>([
    // "burger_king",
  ]);
  // const brands = ["burger_king"];
  const brands: any[] = [];
  const categories = [
    inventoryTypes.apartments,
    inventoryTypes.workspaces,
    inventoryTypes.fitness,
    inventoryTypes.cinema_theatres,
  ];
  const [loading, setLoading] = useState(true);
  const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const primaryColor = theme.palette.primary.main;

  mapboxgl.accessToken = constants.mapboxToken;

  const createCustomMarker = (
    name: string,
    coordinates: any,
    iconUrl: string,
    radii = [1000, 3000, 5000], // Radii in meters
    colors = ["#007BFF", "#28A745", "#FFC107"] // Border colors for each radius
  ) => {
    const uniqueId = `${name}-${coordinates[0]}-${coordinates[1]}`; // Unique ID for the marker

    // Create marker element
    const el = document.createElement("div");
    el.style.width = "30px";
    el.style.height = "30px";
    el.style.backgroundImage = `url(${iconUrl})`;
    el.style.backgroundSize = "contain";
    el.style.backgroundRepeat = "no-repeat";
    el.style.cursor = "pointer";

    // Add the marker to the map
    const marker = new mapboxgl.Marker(el)
      .setLngLat(coordinates)
      .addTo(mapRef.current!);

    // Track markers
    if (!markersRef.current[name]) {
      markersRef.current[name] = [];
    }
    markersRef.current[name].push(marker);

    // Add border-only circles and text for each radius
    radii.forEach((radius, index) => {
      const circleGeoJSON: any = createCircle(
        { lng: coordinates[0], lat: coordinates[1] },
        radius
      );

      const circleId = `${uniqueId}-circle-${radius}`;
      const labelId = `${uniqueId}-label-${radius}`;

      if (!mapRef.current?.getSource(circleId)) {
        mapRef.current?.addSource(circleId, {
          type: "geojson",
          data: circleGeoJSON,
        });

        mapRef.current?.addLayer({
          id: `${circleId}-layer`,
          type: "line", // Line type for borders
          source: circleId,
          paint: {
            "line-color": colors[index] || "#000000", // Circle border color
            "line-width": 2,
            "line-opacity": 0.5,
          },
          layout: {
            visibility: "none",
          },
        });
      }

      // Add the text label
      const labelGeoJSON: any = {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [coordinates[0], coordinates[1] + radius / 111000],
        },
        properties: {
          text: `${radius / 1000} km`,
        },
      };

      if (!mapRef.current?.getSource(labelId)) {
        mapRef.current?.addSource(labelId, {
          type: "geojson",
          data: labelGeoJSON,
        });

        mapRef.current?.addLayer({
          id: `${labelId}-layer`,
          type: "symbol",
          source: labelId,
          layout: {
            "text-field": ["get", "text"],
            "text-size": 14,
            "text-offset": [0, 0.5],
            "text-anchor": "top",
            visibility: "none",
          },
          paint: {
            "text-color": colors[index] || "#000000",
            // "text-opacity": 0.5,
          },
        });
      }
    });
  };

  const removeMarkersByName = (name: string) => {
    const markers = markersRef.current[name];
    if (markers) {
      markers.forEach((marker) => {
        marker.remove(); // Remove marker from the map
      });
      // Clear the stored markers for that name
      markersRef.current[name] = [];
    }
  };

  // Function to handle point click event and show popup
  const handlePointClick = (e: mapboxgl.MapMouseEvent) => {
    const features = mapRef.current?.queryRenderedFeatures(e.point, {
      layers: ["unclustered-point-layer"], // Your layer name
    });

    if (features && features.length > 0) {
      const feature: any = features[0];
      const locationName = feature?.properties?.name || "Unknown Location";
      const locationType = feature?.properties?.category;
      const locationCoordinates = JSON.parse(feature?.properties?.coordinates);
      const uniqueId = `${"store"}-${locationCoordinates[0]}-${
        locationCoordinates[1]
      }`;

      // Create the popup content using HTML
      const htmlContent = `
        <div style="display: grid">
          <div>${getLocationIcon(locationType)}</div>
          <strong>${locationName}</strong>
           ${
             feature?.properties?.type === "store"
               ? `<label>
              <input type="checkbox" id="toggle-${uniqueId}" />
              <span>Show/Hide Radius</span>
            </label>`
               : ""
           }
        </div>
      `;

      const popup: any = new mapboxgl.Popup({
        closeOnClick: true,
        focusAfterOpen: true,
      })
        .setLngLat(e.lngLat)
        .setHTML(htmlContent)
        .addTo(mapRef.current!);

      const toggle: any = document.getElementById(`toggle-${uniqueId}`);

      if (toggle) {
        // Check if circles are initially visible and set checkbox accordingly
        [1000, 3000, 5000].forEach((radius) => {
          const circleId = `${uniqueId}-circle-${radius}-layer`;
          const labelId = `${uniqueId}-label-${radius}-layer`;

          // Check if the circle layer is visible
          const isCircleVisible =
            mapRef.current?.getLayoutProperty(circleId, "visibility") !==
            "none";

          // Set the checkbox state based on visibility
          toggle.checked = isCircleVisible;

          // Event listener to toggle circle visibility
          toggle.addEventListener("change", () => {
            if (toggle.checked) {
              // Show circle and label
              mapRef.current?.setLayoutProperty(
                circleId,
                "visibility",
                "visible"
              );
              mapRef.current?.setPaintProperty(circleId, "line-opacity", 0.5);
              mapRef.current?.setLayoutProperty(
                labelId,
                "visibility",
                "visible"
              );
              mapRef.current?.setPaintProperty(labelId, "text-opacity", 0.5);
            } else {
              // Hide circle and label
              mapRef.current?.setLayoutProperty(circleId, "visibility", "none");
              mapRef.current?.setLayoutProperty(labelId, "visibility", "none");
            }
          });
        });
      }

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
      case inventoryTypes.apartments:
        return `<img src=${apartment} alt="Icon" style="width: 50px; height: 50px; margin-bottom: 8px;" />`;
      case inventoryTypes.workspaces:
        return `<img src=${workspace} alt="Icon" style="width: 50px; height: 50px; margin-bottom: 8px;" />`;
      case inventoryTypes.fitness:
        return `<img src=${fitness} alt="Icon" style="width: 50px; height: 50px; margin-bottom: 8px;" />`;
      case inventoryTypes.cinema_theatres:
        return `<img src=${theatre} alt="Icon" style="width: 50px; height: 50px; margin-bottom: 8px;" />`;
      case brandTypes.burger_king:
        return `<img src=${burger_king} alt="Icon" style="width: 50px; height: 50px; margin-bottom: 8px;" />`;
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
    const geojsonData = {
      type: "FeatureCollection",
      features: filteredData.map((location: any) => {
        const iconUrl =
          location.category === "burger_king" ? burger_king : null;
        if (iconUrl) {
          // Call createCustomMarker here for each location
          createCustomMarker("store", location.coordinates, iconUrl);
        }
        // You need to return the GeoJSON feature for the map layer
        return {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: location.coordinates,
          },
          properties: location,
        };
      }),
    };

    return {
      type: "geojson",
      data: geojsonData,
      cluster: true, // Enable clustering
      clusterMaxZoom: 14, // Max zoom level to disable clustering
      clusterRadius: 50, // Radius of each cluster
    };
  };

  const updateMapData = (
    map: any,
    selectedLocation: any,
    selectedBrands: any
  ) => {
    // Filter the data based on the selected locations and brands
    const filteredData = filterLocationData(selectedLocation, selectedBrands);
    removeMarkersByName("store");

    // Create GeoJSON data for the filtered locations
    const geojsonData = {
      type: "FeatureCollection",
      features: filteredData.map((location: any) => {
        const iconUrl =
          location.category === "burger_king" ? burger_king : null;

        if (iconUrl) {
          // You can update or create custom markers here
          createCustomMarker("store", location.coordinates, iconUrl);
        }

        return {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: location.coordinates,
          },
          properties: location,
        };
      }),
    };

    // Update the existing source with new data without reloading the map
    const source = map.getSource("data-points"); // Use the existing source ID
    if (source) {
      source.setData(geojsonData); // Update data without reloading the map
    }
  };

  // Ensure that the map doesn't reload, but updates the data when location or brand filters change
  useEffect(() => {
    if (mapRef.current) {
      updateMapData(mapRef.current, selectedLocation, selectedBrands);
    }
  }, [selectedLocation, selectedBrands]); // Only update map data when filters change

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: mapStyle,
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
  }, [layerType, mapStyle]);

  const filterLocationData = (
    categoriesData: string[],
    brandsData: string[]
  ) => {
    let filteredLocations: any[] = [];

    // Filter by category
    if (categoriesData.length > 0 && !categoriesData.includes("all")) {
      filteredLocations = categoriesData.flatMap((category) => {
        // Add the category as a field in each location
        return (locationData[category] || []).map((location: any) => ({
          ...location,
          category, // Adding the category field
        }));
      });
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
      brandsFiltered = brandsData.flatMap((brand: string) => {
        return (allBrands[brand] || []).map((brandLocation: any) => ({
          ...brandLocation,
          category: brand,
        }));
      });
    } else {
      //brandsFiltered = brands.flatMap((brand) => allBrands[brand])
      // brandsFiltered = [...allBrands.burger_king];
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

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div style={{ position: "relative", height: "100vh" }}>
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
          md={7}
          sx={{
            display: "flex",
            justifyContent: "start",
            height: "fit-content",
          }}
        >
          <Grid container spacing={1}>
            <Grid
              item
              xs={12}
              md={3}
              sx={{
                display: "flex",
                justifyContent: "start",
                height: "fit-content",
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
            </Grid>
            <Grid
              item
              xs={12}
              md
              sx={{
                display: "flex",
                justifyContent: "start",
                height: "fit-content",
              }}
            >
              <InventoryTotal
                data={categories.map((category) => {
                  return {
                    type: category,
                    count: locationData[category]?.length,
                  };
                })}
              />
            </Grid>
          </Grid>
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
      <Grid
        container
        spacing={1}
        style={{
          position: "absolute",
          zIndex: 2,
          padding: "10px",
          bottom: "10px",
          width: "fit-content",
        }}
      >
        <Grid item>
          <MapStylePicker
            selectedMapStyle={mapStyle}
            onStyleChange={(value: string) => {
              setMapStyle(value);
            }}
          />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={1}
        style={{
          position: "absolute",
          zIndex: 2,
          padding: "10px",
          bottom: "50%",
          paddingLeft: "0px",
          width: "fit-content",
        }}
      >
        <Grid item>
          <Box
            sx={{
              backgroundColor: "grey",
              borderRadius: "21px",
              display: "flex",
            }}
          >
            <ArrowForwardIosIcon
              onClick={handleDrawerToggle}
              style={{ cursor: "pointer", margin: "10px" }}
              color="primary"
            />
          </Box>

          <DrawerComponent
            isOpen={drawerOpen}
            toggleDrawer={handleDrawerToggle}
            onBrandSelect={(selected) => {
              setSelectedBrands(selected);
            }}
          />
        </Grid>
      </Grid>
      <div
        ref={mapContainerRef}
        style={{ height: "100%", width: "100%" }}
      ></div>
    </div>
  );
};

export default BrandsMap;
