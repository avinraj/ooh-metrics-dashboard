import { Box, Button, Grid2, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import BillboardsMapboxMap from "../components/BillboardsMapBoxMap";

const BillboardsMap = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [layerType, setLayerType] = useState<any>("point");

  return (
    <Grid2 container display="block">
      <Grid2 mt={3}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
          sx={{ width: "100%" }}
        >
          <Typography
            variant="h3"
            sx={{ backgroundColor: theme.palette.primary.main, padding: "8px" }}
          >
            {t("map.map")}
          </Typography>
          <div>
            {[
              { label: t("map.basic"), value: "point" },
              { label: t("map.heat"), value: "heat" },
              { label: t("map.live"), value: "live" },
            ].map((obj) => (
              <Button
                key={obj.value}
                variant="outlined"
                disableElevation
                onClick={() => setLayerType(obj.value)}
                sx={{
                  marginLeft: "10px",
                  borderColor: theme.palette.text.primary,
                  backgroundColor:
                    obj.value === layerType
                      ? theme.palette.primary.main
                      : "transparent",
                  color: theme.palette.text.primary,
                }}
              >
                {obj.label}
              </Button>
            ))}
          </div>
        </Box>
      </Grid2>
      <Grid2 size={12} mt={2}>
        <BillboardsMapboxMap layerType={layerType} />
      </Grid2>
    </Grid2>
  );
};

export default BillboardsMap;
