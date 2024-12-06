import { CircularProgress, useTheme } from "@mui/material";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import carIcon from "../../../assets/car-icon-map.png";
import location1 from "../../../Data/location/location1.json";
import location2 from "../../../Data/location/location2.json";
import location3 from "../../../Data/location/location3.json";
import location4 from "../../../Data/location/location4.json";
import location5 from "../../../Data/location/location5.json";
import { constants } from "../../core/data/constants";

interface MapboxMapProps {
  layerType: "heat" | "point" | "live";
}

const MapboxMap = ({ layerType }: MapboxMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;

  const [loading, setLoading] = useState(true);
  let arrIndex = 0;

  mapboxgl.accessToken = constants.mapboxToken;
  // Combine location data and group by VIN
  const locationData = [
    ...location1,
    ...location2,
    ...location3,
    ...location4,
    ...location5,
  ];

  // Group data by VIN and ensure no more than one entry per VIN
  const groupByVin = (data: any) => {
    const grouped: any = {};

    data.forEach((location: any) => {
      if (!grouped[location.vin]) {
        grouped[location.vin] = {
          vin: location.vin,
          coordinates2: [],
        };
      }

      grouped[location.vin].coordinates2.push({
        lat: location.latitude,
        lon: location.longitude,
        bearing: Number(location.bearing),
        speed: location.speed,
        time: location.time,
      });
    });

    return grouped;
  };

  const liveCarData = groupByVin(locationData);

  const generateCarData = (arrIndex = 0): any => {
    const seenVins = new Set();

    const features = Object.values(liveCarData)
      .flat()
      .filter((car: any) => {
        if (seenVins.has(car.vin)) return false;
        seenVins.add(car.vin);
        return true;
      })
      .map((car: any) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            car.coordinates2[arrIndex].lon,
            car.coordinates2[arrIndex].lat,
          ],
        },
        properties: {
          id: car.vin,
          vin: car.vin,
          bearing: car.coordinates2[arrIndex].bearing,
          speed: car.coordinates2[arrIndex].speed,
          time: car.coordinates2[arrIndex].time,
        },
      }));
    return { type: "FeatureCollection", features };
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

  const createLiveLayer = (map: mapboxgl.Map) => {
    if (!map.hasImage("car-icon")) {
      const image = new Image();
      image.src = carIcon;
      image.onload = () => {
        map.addImage("car-icon", image);
        setupLiveLayer(map); // Proceed after image is loaded
      };
    } else {
      setupLiveLayer(map); // Image already exists, proceed with setting up live layer
    }
  };

  const setupLiveLayer = (map: mapboxgl.Map) => {
    if (!map.getSource("live-cars")) {
      map.addSource("live-cars", {
        type: "geojson",
        data: generateCarData(0),
      });
    }

    if (!map.getLayer("live-layer")) {
      map.addLayer({
        id: "live-layer",
        type: "symbol",
        source: "live-cars",
        layout: {
          "icon-image": "car-icon",
          "icon-size": 0.1,
          "icon-rotate": ["get", "bearing"],
        },
      });
    }

    // Add click event listener to show VIN and speed in a popup
    map.on("click", "live-layer", (e) => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: ["live-layer"],
      });
      if (features.length > 0) {
        const feature: any = features[0];
        const vin = feature.properties.vin;
        const speed = feature.properties.speed;

        // Create and display the popup with VIN and speed
        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(
            `
           <div style="text-align: center; color: yellow; font-weight: bolder; font-size: large;">
          ${vin}
          </div>
          <strong>Speed:</strong> ${speed} mph
        `
          )
          .addTo(map);
      }
    });

    const updateCarCoordinates = () => {
      arrIndex = arrIndex + 3;

      const source = map.getSource("live-cars") as mapboxgl.GeoJSONSource;
      source.setData(generateCarData(arrIndex));
    };

    const intervalId = setInterval(updateCarCoordinates, 2000);

    return () => clearInterval(intervalId); // Cleanup on unmount
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
          data: {
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
          },
        });
      }

      setLoading(false);

      if (layerType === "heat") {
        createHeatLayer(map);
      } else if (layerType === "point") {
        createPointLayer(map);
      } else if (layerType === "live") {
        createLiveLayer(map);
      }
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [layerType]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    setLoading(true);

    if (map.getLayer("heatmap-layer")) map.removeLayer("heatmap-layer");
    if (map.getLayer("point-layer")) map.removeLayer("point-layer");
    if (map.getLayer("live-layer")) map.removeLayer("live-layer");

    setTimeout(() => {
      if (layerType === "heat") {
        createHeatLayer(map);
      } else if (layerType === "point") {
        createPointLayer(map);
      } else if (layerType === "live") {
        createLiveLayer(map);
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
