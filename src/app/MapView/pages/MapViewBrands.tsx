import { Box, Grid2 } from "@mui/material";
import { useState } from "react";

import BrandsMap from "../components/BrandsMap";

const MapViewBrands = () => {
  const [layerType] = useState<any>("point");

  return (
    <Box >
      <Grid2 container display="block">
        <Grid2 size={12}>
          <BrandsMap layerType={layerType} />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default MapViewBrands;
