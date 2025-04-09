import { Box, FormControlLabel, Switch } from "@mui/material";
import { t } from "i18next";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import orangeMarker from "../../../../assets/orange_marker.png";
import { constants } from "../../../core/data/constants";
import MapStylePicker from "../../../MapView/components/MapStylePicker";
import analyticsService from "../../services/analytics.service";

interface DuroflexTrackingUrlMapProps {
  data: any[];
  refetchData: (val: any) => void;
}

const DuroflexTrackingUrlMap: React.FC<DuroflexTrackingUrlMapProps> = ({
  data,
  refetchData,
}) => {
  const mapContainer = useRef(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [dynamicData, setDynamicData] = useState<any[]>([]);
  const [isGeneratingMarkers, setIsGeneratingMarkers] = useState(true);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const sourceId = useRef("tracking-points");
  const [mapStyle, setMapStyle] = useState("mapbox://styles/mapbox/dark-v10");

  useEffect(() => {
    mapboxgl.accessToken = constants.mapboxToken;

    const map = new mapboxgl.Map({
      container: mapContainer.current!,
      style: mapStyle,
      center: [78.9629, 20.5937],
      zoom: 4,
    });

    mapRef.current = map;

    map.on("load", () => {
      setIsMapLoaded(true);
    });

    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      map.remove();
    };
  }, []);

  useEffect(() => {
    if (data?.length && isMapLoaded) {
      setDynamicData(data);
      if (mapRef.current) {
        markersRef.current.forEach((marker) => marker.remove());
        markersRef.current = [];
        updatePointsOnMap(data, mapRef.current);
      }
    }
  }, [data, isMapLoaded]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setStyle(mapStyle);
    }
  }, [mapStyle]);

  const updatePointsOnMap = (points: any[], map: mapboxgl.Map) => {
    const features = points.slice(0, -1).map((item) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [item.longitude || item.long, item.latitude || item.lat],
      },
      properties: {
        dataTime: item.createdAt,
        lat: item.latitude || item.lat,
        long: item.longitude || item.long,
      },
    }));

    const geojson: any = {
      type: "FeatureCollection",
      features,
    };

    if (map.getSource(sourceId.current)) {
      (map.getSource(sourceId.current) as mapboxgl.GeoJSONSource).setData(
        geojson
      );
    } else {
      map.addSource(sourceId.current, {
        type: "geojson",
        data: geojson,
      });

      map.addLayer({
        id: sourceId.current,
        type: "circle",
        source: sourceId.current,
        paint: {
          "circle-radius": 6,
          "circle-color": "#FFD700",
          "circle-stroke-width": 1,
          "circle-stroke-color": "#fff",
        },
      });

      // Add popup for each circle
      map.on("click", sourceId.current, (e: any) => {
        const coordinates = e.features?.[0]?.geometry?.coordinates as [
          number,
          number
        ];
        const props = e.features?.[0]?.properties;

        if (!coordinates || !props) return;

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(
            `
            <div>
              <strong>Date & Time:</strong> ${props.dataTime}<br/>
              <strong>Latitude:</strong> ${props.lat}<br/>
              <strong>Longitude:</strong> ${props.long}
            </div>
          `
          )
          .addTo(map);
      });

      // Change cursor to pointer on hover
      map.on("mouseenter", sourceId.current, () => {
        map.getCanvas().style.cursor = "pointer";
      });

      map.on("mouseleave", sourceId.current, () => {
        map.getCanvas().style.cursor = "";
      });
    }
  };

  const animateMarker = (marker: mapboxgl.Marker) => {
    const initialPosition = marker.getLngLat();
    const bounceHeight = 0.0008;
    let bounceDirection = 1;
    let animationActive = true;

    const stopAnimationTimeout = setTimeout(() => {
      animationActive = false;
    }, 10000);

    const bounce = () => {
      if (!animationActive || !mapRef.current) {
        mapRef.current?.off("render", bounce);
        clearTimeout(stopAnimationTimeout);
        return;
      }

      const currentPosition = marker.getLngLat();
      const newLat = currentPosition.lat + bounceDirection * bounceHeight;

      marker.setLngLat([currentPosition.lng, newLat]);

      if (
        newLat > initialPosition.lat + bounceHeight ||
        newLat < initialPosition.lat - bounceHeight
      ) {
        bounceDirection *= -1;
      }
    };

    if (mapRef.current) {
      mapRef.current.on("render", bounce);
    }
  };

  const toggleMarkerGeneration = (
    _event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setIsGeneratingMarkers(checked);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isGeneratingMarkers) {
        refetchAnalyticsData();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isGeneratingMarkers]);

  useEffect(() => {
    if (mapRef.current && dynamicData.length > data.length) {
      const newMarkerData = dynamicData[dynamicData.length - 1];

      // Remove old markers
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];

      updatePointsOnMap(dynamicData.slice(0, -1), mapRef.current);

      const el = document.createElement("div");
      el.style.width = "32px";
      el.style.height = "32px";
      el.style.backgroundImage = `url(${orangeMarker})`;
      el.style.backgroundSize = "contain";
      el.style.backgroundRepeat = "no-repeat";
      el.style.backgroundPosition = "center";
      el.style.cursor = "pointer";

      if (newMarkerData.long && newMarkerData.lat) {
        const newMarker = new mapboxgl.Marker(el)
          .setLngLat([newMarkerData.long, newMarkerData.lat])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              `<div><strong>Date & Time:</strong> ${newMarkerData.dataTime}<br>
               <strong>Latitude:</strong> ${newMarkerData.lat}<br>
               <strong>Longitude:</strong> ${newMarkerData.long}<br>
              </div>`
            )
          )
          .addTo(mapRef.current);

        markersRef.current.push(newMarker);
        animateMarker(newMarker);

        mapRef.current.flyTo({
          center: [newMarkerData.long, newMarkerData.lat],
          zoom: 10,
          speed: 1,
          curve: 1,
        });
      }
    }
  }, [dynamicData]);

  const fetchLocationFromIP = async (ip: string) => {
    try {
      const response = await fetch(
        `https://ipinfo.io/${ip}/json?token=b236fece072727`
      );
      const data = await response.json();

      if (data.loc) {
        const [latitude, longitude] = data.loc.split(",").map(Number);
        return { latitude, longitude, city: data.city, country: data.country };
      }

      return {
        latitude: null,
        longitude: null,
        city: "Unknown",
        country: "Unknown",
      };
    } catch (error) {
      console.error("Error fetching location:", error);
      return {
        latitude: null,
        longitude: null,
        city: "Unknown",
        country: "Unknown",
      };
    }
  };

  const refetchAnalyticsData = async () => {
    try {
      const response: any = await analyticsService.getAnalytics({
        pageSize: 1,
      });
      if (response?.analytics?.length) {
        let latestData = response.analytics[0];
        const findVal = dynamicData.find((obj) => obj._id === latestData._id);
        if (!findVal) {
          if (latestData.ip_address) {
            const locationData = await fetchLocationFromIP(
              latestData.ip_address
            );
            latestData = { ...latestData, ...locationData };
          }
          if (latestData?.latitude && latestData?.longitude) {
            const newMarker = {
              _id: latestData?._id,
              lat: latestData?.latitude,
              long: latestData?.longitude,
              dataTime: latestData?.createdAt,
            };

            setDynamicData((prevData: any) => [...prevData, newMarker]);
          }
          refetchData(latestData);
        }
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Box sx={{ position: "absolute", zIndex: 1, color: "White" }}>
          <FormControlLabel
            control={
              <Switch
                checked={isGeneratingMarkers}
                onChange={toggleMarkerGeneration}
                name="markerGeneration"
                color="primary"
              />
            }
            label={
              isGeneratingMarkers
                ? t("attribution.trackingurl.livetracking")
                : t("attribution.trackingurl.livetracking")
            }
          />
        </Box>
      </div>
      <Box sx={{ position: "absolute", zIndex: 1, bottom: "25px" }}>
        <MapStylePicker
          selectedMapStyle={mapStyle}
          onStyleChange={(value: string) => {
            setMapStyle(value);
          }}
        />
      </Box>
      <div ref={mapContainer} style={{ width: "100%", height: "50vh" }} />
    </div>
  );
};

export default DuroflexTrackingUrlMap;
