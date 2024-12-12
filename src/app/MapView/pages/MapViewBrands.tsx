import { Box, Grid2 } from "@mui/material";
import { useEffect, useState } from "react";

import BrandsMap from "../components/BrandsMap";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const MapViewBrands = () => {
  const navigate = useNavigate();

  const [layerType] = useState<any>("point");
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/", { state: { next: "/brands" } });
    }
  }, [isAuthenticated]);

  return (
    <Box>
      <Grid2 container display="block">
        <Grid2 size={12}>
          <BrandsMap layerType={layerType} />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default MapViewBrands;
