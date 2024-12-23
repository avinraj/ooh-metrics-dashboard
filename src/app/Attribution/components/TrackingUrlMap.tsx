import { Box, FormControlLabel, Switch } from "@mui/material";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import orangeMarker from "../../../assets/orange_marker.png";
import yellowMarker from "../../../assets/yellow_marker.png";
import trackingData from "../../../Data/trackingUrl.json"; // Import JSON data
import { constants } from "../../core/data/constants";
import MapStylePicker from "../../MapView/components/MapStylePicker";

const TrackingUrlMap: React.FC = () => {
  const mapContainer = useRef(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]); // Track markers
  const [dynamicData, setDynamicData] = useState(trackingData);
  const [isGeneratingMarkers, setIsGeneratingMarkers] = useState(true); // State for marker generation
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

    // Initial marker placement from tracking data
    addMarkers(trackingData, map);

    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      map.remove();
    };
  }, [mapStyle]);

  // Function to add markers
  const addMarkers = (data: any[], map: mapboxgl.Map) => {
    const bounds = new mapboxgl.LngLatBounds();

    data.forEach((markerData, index) => {
      const markerImage = yellowMarker; // Default marker image

      const el = document.createElement("div");
      el.style.width = "32px";
      el.style.height = "32px";
      el.style.backgroundImage = `url(${markerImage})`;
      el.style.backgroundSize = "contain";
      el.style.backgroundRepeat = "no-repeat";
      el.style.backgroundPosition = "center";

      const marker = new mapboxgl.Marker(el)
        .setLngLat([markerData.long, markerData.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<div><strong>Date & Time:</strong> ${markerData.dataTime}<br>
            <strong>Latitude:</strong> ${markerData.lat}<br>
             <strong>Longitude:</strong> ${markerData.long}<br>
           <div>`
          )
        )
        .addTo(map);

      markersRef.current.push(marker);
      bounds.extend([markerData.long, markerData.lat]);

      if (index === data.length - 1) {
        map.flyTo({
          center: [markerData.long, markerData.lat],
          zoom: 10,
          speed: 1,
          curve: 1,
        });
      }
    });

    map.fitBounds(bounds, { padding: 20 });
  };

  const animateMarker = (marker: mapboxgl.Marker) => {
    const initialPosition = marker.getLngLat();
    const bounceHeight = 0.0008; // Adjust this for bounce height
    let bounceDirection = 1;
    let animationActive = true;

    // Stop animation after 10 seconds
    const stopAnimationTimeout = setTimeout(() => {
      animationActive = false; // Stop bouncing
    }, 10000); // 10 seconds

    // Function to animate the marker in a bouncing effect
    const bounce = () => {
      if (!animationActive || !mapRef.current) {
        mapRef.current?.off("render", bounce); // Remove listener when animation stops
        clearTimeout(stopAnimationTimeout); // Clear timeout just in case
        return;
      }

      const currentPosition = marker.getLngLat();
      const newLng = currentPosition.lng;
      const newLat = currentPosition.lat + bounceDirection * bounceHeight;

      marker.setLngLat([newLng, newLat]);

      if (
        newLat > initialPosition.lat + bounceHeight ||
        newLat < initialPosition.lat - bounceHeight
      ) {
        bounceDirection *= -1; // Reverse direction
      }
    };
    if (mapRef.current) {
      // Attach the bounce function to the "render" event
      mapRef.current.on("render", bounce);
    }
  };

  // Toggle marker generation
  const toggleMarkerGeneration = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    console.log(event)
    setIsGeneratingMarkers(checked);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isGeneratingMarkers) {
        const newMarker = {
          lat: 20.5937 + Math.random() * 5 - 2.5,
          long: 78.9629 + Math.random() * 5 - 2.5,
          dataTime: new Date().toISOString(),
        };

        setDynamicData((prevData: any) => [...prevData, newMarker]);
      }
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval
  }, [isGeneratingMarkers]);

  // Update markers when new data arrives
  useEffect(() => {
    if (mapRef.current && dynamicData.length > trackingData.length) {
      const newMarkerData = dynamicData[dynamicData.length - 1];

      // Update all existing markers to yellow
      markersRef.current.forEach((marker) => {
        marker.getElement().style.backgroundImage = `url(${yellowMarker})`;
      });

      // Add the new marker as orange with a jumping effect
      const el = document.createElement("div");
      el.style.width = "32px";
      el.style.height = "32px";
      el.style.backgroundImage = `url(${orangeMarker})`;
      el.style.backgroundSize = "contain";
      el.style.backgroundRepeat = "no-repeat";
      el.style.backgroundPosition = "center";
      el.style.cursor = "pointer";

      // Create the new marker and add it to the map
      const newMarker = new mapboxgl.Marker(el)
        .setLngLat([newMarkerData.long, newMarkerData.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<div><strong>Date & Time:</strong> ${newMarkerData.dataTime}<br>
             <strong>Latitude:</strong> ${newMarkerData.lat}<br>
              <strong>Longitude:</strong> ${newMarkerData.long}<br>
            <div>`
          )
        )
        .addTo(mapRef.current);

      markersRef.current.push(newMarker);

      animateMarker(newMarker);

      // Fly to the new marker
      mapRef.current.flyTo({
        center: [newMarkerData.long, newMarkerData.lat],
        zoom: 10,
        speed: 1,
        curve: 1,
      });
    }
  }, [dynamicData]);

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
            label={isGeneratingMarkers ? "Live Tracking" : "Live Tracking"}
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

export default TrackingUrlMap;
