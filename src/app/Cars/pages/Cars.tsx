import { Box, Button, Grid2, Typography, useTheme } from "@mui/material";
import gridIcon from "../../../assets/carsection1.jpg";
import { useState } from "react";
import FilterPanel from "../../MapView/components/FilterPanel";

const Cars = () => {
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
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        padding={2}
      >
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            display: "inline-block",
            padding: "0 8px",
            marginTop: 3,
          }}
        >
          <Typography variant="h3">Cars</Typography>
        </Box>
        <Box
          sx={{
            border: "1px solid black",
            color: "#eeff41",
            borderRadius: 2,
            backgroundColor: "black",
            textAlign: "center",
            paddingLeft: 2,
            paddingRight: 2,
          }}
        >
          <Button>+ Add Car</Button>
        </Box>
      </Grid2>
      <Grid2 size={12} p={1} sx={{ backgroundColor: "black" }}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box
            sx={{
              border: "1px solid transparent",
              borderRadius: 5,
              backgroundColor: "rgb(78, 214, 78)",
              display: "inline-block",
              paddingRight: 1,
              paddingLeft: 1,
            }}
          >
            <Typography>VEHICLES</Typography>
          </Box>
          <Box sx={{ color: "white" }} display={"flex"} gap={4}>
            <Typography>GRID VIEW</Typography>
            <Typography>TABLE VIEW</Typography>
            <Typography>PHOTO LIST</Typography>
            {/* <img src={gridIcon} alt="" width={20} height={20} /> */}
          </Box>
        </Box>
        <Grid2 size={12} display={"flex"} gap={2} mt={2}>
          <Grid2 size={4}>
            <Box sx={{ border: "1px solid white" }} padding={1}>
              <img src={gridIcon} alt="" width={280} height={190} />
              <Box
                sx={{ color: "white" }}
                display={"flex"}
                justifyContent={"space-between"}
              >
                <Typography>
                  FORD FLEX <br /> (2012) | Driver2
                </Typography>
                <Typography>
                  4.59 <br />
                  Impressions <br />
                  per mile
                </Typography>
              </Box>
            </Box>
          </Grid2>{" "}
          <Grid2 size={4}>
            <Box sx={{ border: "1px solid white" }} padding={1}>
              <img src={gridIcon} alt="" width={280} height={190} />
              <Box
                sx={{ color: "white" }}
                display={"flex"}
                justifyContent={"space-between"}
              >
                <Typography>
                  FORD FLEX <br /> (2012) | Driver2
                </Typography>
                <Typography>
                  4.59 <br />
                  Impressions <br />
                  per mile
                </Typography>
              </Box>
            </Box>
          </Grid2>{" "}
          <Grid2 size={4}>
            <Box sx={{ border: "1px solid white" }} padding={1}>
              <img src={gridIcon} alt="" width={280} height={190} />

              <Box
                sx={{ color: "white" }}
                display={"flex"}
                justifyContent={"space-between"}
              >
                <Typography>
                  FORD FLEX <br /> (2012) | Driver2
                </Typography>
                <Typography>
                  4.59 <br />
                  Impressions <br />
                  per mile
                </Typography>
              </Box>
            </Box>
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default Cars;
