import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapboxMap = () => {
  const mapContainerRef: any = useRef(null);

  // Set your Mapbox access token
  mapboxgl.accessToken = "pk.eyJ1Ijoib29obWV0cmljcyIsImEiOiJjbTNndWhvb3cwN3doMm9xejFnbnJhbmxjIn0.gUT_L2_wIqhQlfDMSXXrxA";

  useEffect(() => {
    // Initialize the map
    const map = new mapboxgl.Map({
      container: mapContainerRef.current, // Container reference
      style: "mapbox://styles/mapbox/dark-v10", // Start with Mapbox's dark base map
      center: [121.5, 25.03], // Centered on Taipei (example)
      zoom: 12, // Initial zoom level
    });

    map.on("load", () => {
      // Add a GeoJSON source for custom lines
      map.addSource("custom-lines", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates: [
                  [121.5, 25.03],
                  [121.55, 25.05],
                  [121.6, 25.07],
                ],
              },
              properties: {}, // Required by GeoJSON spec
            },
          ],
        },
      });

      // Add a custom line layer
      map.addLayer({
        id: "custom-line-layer",
        type: "line",
        source: "custom-lines",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#00ff00", // Green line color
          "line-width": 4,
        },
      });

      // Optional: Modify an existing layer (e.g., water color)
      map.setPaintProperty("water", "fill-color", "#1e1e2d");
    });

    // Cleanup on component unmount
    return () => map.remove();
  }, []);

  return (
    <div
      ref={mapContainerRef}
      style={{
        width: "100%",
        height: "500px", // Set your desired map height
      }}
    />
  );
};

export default MapboxMap;
