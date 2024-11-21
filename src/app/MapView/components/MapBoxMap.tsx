import { CircularProgress, useTheme } from "@mui/material";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import location1 from "../../../Data/location/location1.json";
import location2 from "../../../Data/location/location2.json";
import location3 from "../../../Data/location/location3.json";
import location4 from "../../../Data/location/location4.json";
import location5 from "../../../Data/location/location5.json";

interface MapboxMapProps {
  layerType: "heat" | "point" | "live";
}

const MapboxMap = ({ layerType }: MapboxMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;

  const [loading, setLoading] = useState(true); // State to manage loader visibility

  mapboxgl.accessToken =
    "pk.eyJ1Ijoib29obWV0cmljcyIsImEiOiJjbTNndWhvb3cwN3doMm9xejFnbnJhbmxjIn0.gUT_L2_wIqhQlfDMSXXrxA";

  const locationData = [
    ...location1,
    ...location2,
    ...location3,
    ...location4,
    ...location5,
  ];

  const geojsonData: any = {
    type: "FeatureCollection",
    features: locationData.map((location) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [location.longitude, location.latitude],
      },
      properties: {
        uuid: location.uuid,
        vin: location.vin,
        time: location.time,
        bearing: location.bearing,
        speed: location.speed,
      },
    })),
  };

  const createHeatLayer = (map: mapboxgl.Map) => {
    if (!map.getLayer("heatmap-layer")) {
      map.addLayer({
        id: "heatmap-layer",
        type: "heatmap",
        source: "data-points",
        paint: {
          "heatmap-weight": ["interpolate", ["linear"], ["get", "speed"], 0, 0, 10, 1],
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

  const createPointLayer = (map: mapboxgl.Map) => {
    if (!map.getLayer("point-layer")) {
      map.addLayer({
        id: "point-layer",
        type: "circle",
        source: "data-points",
        paint: {
          "circle-radius": 6,
          "circle-color": primaryColor,
          "circle-opacity": 0.8,
        },
      });
    }
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [121.34, 24.9587],
      zoom: 13,
    });

    mapRef.current = map;

    map.on("load", () => {
      if (!map.getSource("data-points")) {
        map.addSource("data-points", {
          type: "geojson",
          data: geojsonData,
        });
      }

      if (layerType === "heat") {
        createHeatLayer(map);
      } else {
        createPointLayer(map);
      }
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    setLoading(true); // Show loader

    // Remove previous layers when the layer type changes
    if (map.getLayer("heatmap-layer")) {
      map.removeLayer("heatmap-layer");
    }
    if (map.getLayer("point-layer")) {
      map.removeLayer("point-layer");
    }

    // Wait for 3 seconds, then switch the layer
    setTimeout(() => {
      if (layerType === "heat") {
        createHeatLayer(map);
      } else {
        createPointLayer(map);
      }

      setLoading(false); // Hide loader
    }, 3000); // 3 seconds delay
  }, [layerType]);

  return (
    <div style={{position: 'relative'}}>
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
            zIndex: '1'
          }}
        >
          <CircularProgress color="primary" />
        </div>
      )}
      <div
        ref={mapContainerRef}
        style={{
          width: "100%",
          height: "500px",
          position: "relative",
        }}
      />
    </div>
  );
};

export default MapboxMap;
