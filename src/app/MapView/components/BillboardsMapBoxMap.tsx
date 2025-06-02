import { Box, CircularProgress, useTheme } from "@mui/material";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import storeLogo from "../../../assets/wallmart_logo.png";
import data from "../../../Data/mapData.USA.json";
import { constants } from "../../core/data/constants";
import MapStylePicker from "./MapStylePicker";
import wallMartData from "../../../Data/wallMartDataUSA.json";

interface MapboxMapProps {
  layerType: "heat" | "point" | "live";
}

const BillboardsMapboxMap = ({ layerType }: MapboxMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const brandMarkersRef = useRef<Record<string, mapboxgl.Marker[]>>({});

  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;
  const { selectedAdType } = useSelector((state: any) => state?.selectedAdType);

  const [loading, setLoading] = useState(true);
  const [mapStyle, setMapStyle] = useState("mapbox://styles/mapbox/dark-v10");

  mapboxgl.accessToken = constants.mapboxToken;
  // Combine location data and group by VIN
  const locationData: any = data ?? [];

  const createCustomClusteredSource = (brandsData: any): any => {
    brandsData.forEach((cluster: any) => {
      const clusterCoords = cluster.coordinates; // Use the first marker's coordinates as cluster center
      createClusteredMarker(clusterCoords, storeLogo);
    });
  };

  const createClusteredMarker = (
    clusterCoords: [number, number],
    iconUrl: string
  ) => {
    const el = document.createElement("div");
    el.style.width = "30px";
    el.style.height = "30px";
    el.style.backgroundImage = `url(${iconUrl})`;
    el.style.backgroundSize = "contain";
    el.style.backgroundRepeat = "no-repeat";
    el.style.cursor = "pointer";

    // Create a single clustered marker
    const marker = new mapboxgl.Marker(el)
      .setLngLat(clusterCoords)
      .addTo(mapRef.current!);

    if (!brandMarkersRef.current["store"]) {
      brandMarkersRef.current["store"] = [];
    }
    brandMarkersRef.current["store"].push(marker);

    return marker;
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
            "rgba(255, 255, 204, 0)", // very low density → transparent light yellow
            0.2,
            "rgb(255, 255, 178)", // low density → soft yellow
            0.4,
            "rgb(254, 217, 118)", // medium-low → light orange
            0.6,
            "rgb(254, 178, 76)", // medium → orange
            0.8,
            "rgb(253, 141, 60)", // medium-high → dark orange
            1,
            "rgb(240, 59, 32)", // high density → red
          ],
          "heatmap-radius": 70,
          "heatmap-opacity": 0.8,
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
        // const iconUrl = location.type === "store" ? store_marker : null;
        // if (iconUrl) {
        //   // Call createCustomMarker here for each location
        //   createCustomMarker("store", location, location.coordinates, iconUrl);
        // }
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

  const handlePointClick = (e: mapboxgl.MapMouseEvent, features: any = []) => {
    if (!features?.length) {
      features = mapRef.current?.queryRenderedFeatures(e.point, {
        layers: ["unclustered-point-layer"], // Your layer name
      });
    }

    if (features && features.length > 0) {
      const feature: any = features[0];
      const locationName = feature?.properties?.name || "Unknown Location";
      const locationCoordinates =
        typeof feature?.properties?.coordinates === "string"
          ? JSON.parse(feature?.properties?.coordinates)
          : feature?.properties?.coordinates;
      const uniqueId = `${"store"}-${locationCoordinates[0]}-${
        locationCoordinates[1]
      }`;

      // Check if there's an already open popup with the same ID
      if (
        popupRef.current &&
        popupRef?.current?.getElement()?.id === uniqueId
      ) {
        // Close the current popup before opening a new one
        popupRef.current.remove();
      }

      // Create the popup content using HTML, from Material UI components
      const htmlContent = `
          <div style="display: grid">
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

      const popupElement: any = popup.getElement();
      popupElement.id = uniqueId;

      // Store the current popup in popupRef
      popupRef.current = popup;

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

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: mapStyle,
      center: [-98.5795, 39.8283],
      zoom: 4,
    });

    mapRef.current = map;

    map.on("load", () => {
      if (!map.getSource("data-points")) {
        map.addSource("data-points", createClusteredSource(locationData));
        if (layerType === "live") {
          createCustomClusteredSource(wallMartData.Discount_Store);
        }
      }

      setLoading(false);

      if (layerType === "heat") {
        createHeatLayer(map);
      } else if (layerType === "point") {
        createClusterLayer(map);
      } else if (layerType === "live") {
        createClusterLayer(map);
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
  }, [layerType, mapStyle, selectedAdType]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    setLoading(true);

    if (map.getLayer("heatmap-layer")) map.removeLayer("heatmap-layer");
    if (map.getLayer("unclustered-point-layer"))
      map.removeLayer("unclustered-point-layer");
    if (map.getLayer("live-layer")) map.removeLayer("live-layer");

    setTimeout(() => {
      if (layerType === "heat") {
        createHeatLayer(map);
      } else if (layerType === "point") {
        createClusterLayer(map);
      } else if (layerType === "live") {
        createClusterLayer(map);
      }
      setLoading(false);
    }, 3000);
  }, [layerType]);

  return (
    <div style={{ position: "relative" }}>
      {loading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            zIndex: "1",
          }}
        >
          <CircularProgress color="primary" />
        </div>
      )}
      <Box sx={{ position: "absolute", zIndex: 1, bottom: "25px" }}>
        <MapStylePicker
          selectedMapStyle={mapStyle}
          onStyleChange={(value: string) => {
            setMapStyle(value);
          }}
        />
      </Box>
      <div
        ref={mapContainerRef}
        style={{
          width: "100%",
          height: "80vh",
          position: "relative",
        }}
      />
    </div>
  );
};

export default BillboardsMapboxMap;
