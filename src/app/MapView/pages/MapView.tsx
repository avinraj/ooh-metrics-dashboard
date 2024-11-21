import { Box, Button, Grid2, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import FilterPanel from "../components/FilterPanel";
import MapboxMap from "../components/MapBoxMap";

const MapView = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [layerType, setLayerType] = useState<any>("point");
  const [selectedCampaign, setSelectedCampaign] =
    useState<string>("Campaign 1");
  const [selectedVehicle, setSelectedVehicle] = useState<string>("Car 1");
  const [dateRange, setDateRange] = useState<{
    startDate: Date;
    endDate: Date;
  }>({
    startDate: new Date(),
    endDate: new Date(),
  });

  // Example campaigns and vehicles (you can replace this with actual data from API or props)
  const campaigns = ["Campaign 1", "Campaign 2", "Campaign 3"];
  const vehicles = ["Car 1", "Car 2", "Car 3"];

  return (
    <Grid2 container display="block">
      <Grid2>
        <FilterPanel
          campaigns={campaigns}
          vehicles={vehicles}
          selectedCampaign={selectedCampaign}
          selectedVehicle={selectedVehicle}
          dateRange={dateRange}
          onCampaignChange={setSelectedCampaign}
          onVehicleChange={setSelectedVehicle}
          onDateRangeSelect={setDateRange}
        />
      </Grid2>
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
        <MapboxMap layerType={layerType} />
      </Grid2>
    </Grid2>
  );
};

export default MapView;
