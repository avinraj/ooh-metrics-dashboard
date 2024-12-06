import React, { useState } from "react";
import Map, { Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const geoJsonData = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [77.1025, 28.7041], // Delhi, India
      },
      properties: { name: "Delhi" },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [72.8777, 19.076], // Mumbai, India
      },
      properties: { name: "Mumbai" },
    },
    // Add more points here
  ],
};

const clusterLayer: mapboxgl.CircleLayer = {
  id: "clusters",
  type: "circle",
  source: "earthquakes",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": ["step", ["get", "point_count"], "#51bbd6", 10, "#f28cb1", 30, "#f1f075"],
    "circle-radius": ["step", ["get", "point_count"], 15, 10, 20, 30, 25],
  },
};

const clusterCountLayer: mapboxgl.SymbolLayer = {
  id: "cluster-count",
  type: "symbol",
  source: "earthquakes",
  filter: ["has", "point_count"],
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
    "text-size": 12,
  },
};

const unclusteredPointLayer: mapboxgl.CircleLayer = {
  id: "unclustered-point",
  type: "circle",
  source: "earthquakes",
  filter: ["!", ["has", "point_count"]],
  paint: {
    "circle-color": "#11b4da",
    "circle-radius": 8,
    "circle-stroke-width": 1,
    "circle-stroke-color": "#fff",
  },
};

const MapAttribute: React.FC = () => {
  const [viewport, setViewport] = useState({
    longitude: 78.9629, // Center of India
    latitude: 20.5937,
    zoom: 4,
  });

  return (
    <Map
      initialViewState={viewport}
      style={{ width: "100%", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/light-v10"
      mapboxAccessToken="pk.eyJ1Ijoib29obWV0cmljcyIsImEiOiJjbTNndWhvb3cwN3doMm9xejFnbnJhbmxjIn0.gUT_L2_wIqhQlfDMSXXrxA"
    >
      <Source id="earthquakes" type="geojson" data={geoJsonData} cluster={true} clusterMaxZoom={14} clusterRadius={50}>
        <Layer {...clusterLayer} />
        <Layer {...clusterCountLayer} />
        <Layer {...unclusteredPointLayer} />
      </Source>
    </Map>
  );
};

export default MapAttribute;
