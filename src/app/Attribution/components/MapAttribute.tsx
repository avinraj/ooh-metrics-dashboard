import { Grid, useTheme } from "@mui/material";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useEffect, useRef, useState } from "react";
import { constants } from "../../core/data/constants";
import MapStylePicker from "../../MapView/components/MapStylePicker";

// Array of cities with coordinates
const cities = [
  { name: "Delhi", coordinates: [77.1025, 28.7041] },
  { name: "Mumbai", coordinates: [72.8777, 19.076] },
  { name: "Chennai", coordinates: [80.2785, 13.0827] },
  { name: "Bengaluru", coordinates: [77.5946, 12.9716] },
  { name: "Kolkata", coordinates: [88.3639, 22.5726] },
  { name: "Hyderabad", coordinates: [78.4744, 17.385] },
  { name: "Bhubaneswar", coordinates: [85.8245, 20.2961] },
  { name: "Pune", coordinates: [73.8567, 18.5204] },
  { name: "Ahmedabad", coordinates: [72.5714, 23.0225] },
  { name: "Jaipur", coordinates: [75.7873, 26.9124] },
];

// Generate GeoJSON data from the cities array
const geoJsonData: any = {
  type: "FeatureCollection",
  features: cities.map((city) => ({
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: city.coordinates,
    },
    properties: { name: city.name },
  })),
};

const MapAttribute: React.FC = () => {
  const mapContainer = useRef(null);
  const theme = useTheme();

  const [mapStyle, setMapStyle] = useState("mapbox://styles/mapbox/dark-v10");

  // Initialize the map
  useEffect(() => {
    mapboxgl.accessToken = constants.mapboxToken;

    const newMap = new mapboxgl.Map({
      container: mapContainer.current!,
      style: mapStyle,
      center: [78.9629, 20.5937], // Center of India
      zoom: 4,
    });

    newMap.on("load", () => {
      // Add GeoJSON source with clustering
      newMap.addSource("earthquakes", {
        type: "geojson",
        data: geoJsonData,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
      });

      // Add a cluster layer
      newMap.addLayer({
        id: "clusters",
        type: "circle",
        source: "earthquakes",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": [
            "step",
            ["get", "point_count"],
            theme.palette.primary.main,
            10,
            "#f28cb1",
            30,
            "#f1f075",
          ],
          "circle-radius": ["step", ["get", "point_count"], 15, 10, 20, 30, 25],
        },
      });

      // Add cluster count labels
      newMap.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "earthquakes",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 12,
        },
      });

      // Add unclustered points layer
      newMap.addLayer({
        id: "unclustered-point",
        type: "circle",
        source: "earthquakes",
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-color": theme.palette.primary.main,
          "circle-radius": 8,
          "circle-stroke-width": 1,
          "circle-stroke-color": "#fff",
        },
      });

      // Zoom in on cluster click
      newMap.on("click", "clusters", (e: any) => {
        const features: any = newMap.queryRenderedFeatures(e.point, {
          layers: ["clusters"],
        });

        if (!features.length) return;

        const clusterId = features[0]?.properties?.cluster_id;

        const clusterSource = newMap.getSource(
          "earthquakes"
        ) as mapboxgl.GeoJSONSource;

        clusterSource.getClusterExpansionZoom(clusterId, (err, zoom: any) => {
          if (err) return;

          newMap.easeTo({
            center: features[0]?.geometry?.coordinates,
            zoom: zoom,
          });
        });
      });

      // Change the cursor to a pointer when hovering over a cluster
      newMap.on("mouseenter", "clusters", () => {
        newMap.getCanvas().style.cursor = "pointer";
      });

      // Reset the cursor when leaving a cluster
      newMap.on("mouseleave", "clusters", () => {
        newMap.getCanvas().style.cursor = "";
      });
    });

    // Cleanup map on component unmount
    return () => newMap.remove();
  }, [mapStyle]);

  return (
    <div style={{ position: "relative"}}>
       <Grid
        container
        spacing={1}
        style={{
          position: "absolute",
          zIndex: 2,
          padding: "10px",
          bottom: "40px"
        }}
      >
        <Grid item>
          <MapStylePicker selectedMapStyle={mapStyle} onStyleChange={(value: string) => {setMapStyle(value)}} />
        </Grid>
      </Grid>
      <div ref={mapContainer} style={{ width: "100%", height: "50vh" }} />;
    </div>
  );
};

export default MapAttribute;
