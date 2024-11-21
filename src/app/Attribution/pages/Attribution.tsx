import LinkIcon from "@mui/icons-material/Link";
import PeopleIcon from "@mui/icons-material/People";
import QrCodeIcon from "@mui/icons-material/QrCode";
import { Box, Grid2, Typography, useTheme } from "@mui/material";
import FilterPanel from "../../MapView/components/FilterPanel";
import { useState } from "react";

const Attribution = () => {
  const theme = useTheme();
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

  const campaigns = ["Campaign 1", "Campaign 2", "Campaign 3"];
  const vehicles = ["Car 1", "Car 2", "Car 3"];
  return (
    <Grid2 container>
      <Grid2 size={12} gap={3} display={"flex"} alignItems={"center"}>
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
      <Grid2
        size={12}
        display="flex"
        alignItems="center"
        padding={2}
        justifyContent="space-between"
        sx={{ borderBottom: "1px solid #ccc" }}
        marginTop={3}
      >
        {/* Attribution Section */}
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            padding: "0 8px",
            marginRight: 2,
          }}
        >
          <Typography variant="h3">Attribution</Typography>
        </Box>

        {/* QR Code, Tracking URL, and Footfall Section with Icons */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexGrow={1}
        >
          <Box
            display="flex"
            alignItems="center"
            sx={{
              paddingX: 2,
              borderRight: "1px solid #ccc",
              flex: 1,
              justifyContent: "center",
            }}
          >
            <QrCodeIcon sx={{ marginRight: 1 }} />
            <Typography>QR CODE</Typography>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            sx={{
              paddingX: 2,
              borderRight: "1px solid #ccc",
              flex: 1,
              justifyContent: "center",
            }}
          >
            <LinkIcon sx={{ marginRight: 1 }} />
            <Typography>Tracking URL</Typography>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            sx={{ paddingX: 2, flex: 1, justifyContent: "center" }}
          >
            <PeopleIcon sx={{ marginRight: 1 }} />
            <Typography>Footfall</Typography>
          </Box>
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default Attribution;
