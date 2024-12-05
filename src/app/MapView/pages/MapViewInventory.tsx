import { Box, Grid2 } from "@mui/material";
import { useState } from "react";

import Mapbox2 from "../components/MapBox2";

const MapViewInventory = () => {
  const [layerType] = useState<any>("point");

  return (
    <Box >
      <Grid2 container display="block">
        <Grid2 size={12}>
          <Mapbox2 layerType={layerType} />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default MapViewInventory;
