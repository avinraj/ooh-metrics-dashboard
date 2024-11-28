import {
  Box,
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import gridIcon from "../../../assets/carsection1.jpg";
import wagonr from "../../../assets/wagonr.webp";
import ecosport from "../../../assets/ecosport.avif";
import { useState } from "react";
import FilterPanel from "../../MapView/components/FilterPanel";
import { CiGrid41 } from "react-icons/ci";
import { CiViewTable } from "react-icons/ci";
import { MdInsertPhoto } from "react-icons/md";
import { useTranslation } from "react-i18next";

const TwoWheerlers = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [selectedCampaign, setSelectedCampaign] = useState<string>("Campaign 1");
  const [selectedVehicle, setSelectedVehicle] = useState<string>("Car 1");
  const [layerType, setLayerType] = useState("GRID_VIEW");
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [dateRange, setDateRange] = useState<{
    startDate: Date;
    endDate: Date;
  }>({
    startDate: new Date(),
    endDate: new Date(),
  });

  const campaigns = ["Campaign 1", "Campaign 2", "Campaign 3"];
  const vehicles = ["Car 1", "Car 2", "Car 3"];

  const buttonData = [
    {
      label: t("cars.grid view"),
      value: "GRID_VIEW",
      icon: <CiGrid41 size={30} />,
    },
    {
      label: t("cars.table view"),
      value: "TABLE_VIEW",
      icon: <CiViewTable size={30} />,
    },
    {
      label: t("cars.photo list"),
      value: "PHOTO_LIST",
      icon: <MdInsertPhoto size={30} />,
    },
  ];

  const carsData = [
    {
      name: "Mercedes",
      year: 2012,
      driver: "John",
      impressions: "4.59",
      image: gridIcon,
    },
    {
      name: "Wagon R",
      year: 2020,
      driver: "Alice",
      impressions: "5.12",
      image: wagonr,
    },
    {
      name: "EcoSport",
      year: 2018,
      driver: "Robert",
      impressions: "4.85",
      image: ecosport,
    },
  ];

  const renderGridView = () => (
    <Grid container spacing={2} mt={2}>
      {carsData.map((car, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Box sx={{ border: "1px solid white", padding: 1 }}>
            <img src={car.image} alt={`${car.name}`} width="100%" height="190" style={{ objectFit: "cover" }} />
            <Box display="flex" justifyContent="space-between">
              <Typography color="black">
                {car.name} <br /> ({car.year}) | {car.driver}
              </Typography>
              <Typography color="black">
                {car.impressions} <br />
                Impressions <br />
                per mile
              </Typography>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );

  const renderTableView = () => (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Driver</TableCell>
            <TableCell>Impression</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {carsData.map((car, index) => (
            <TableRow key={index}>
              <TableCell>{car.name}</TableCell>
              <TableCell>{car.year}</TableCell>
              <TableCell>{car.driver}</TableCell>
              <TableCell>{car.impressions}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderPhotoListView = () => (
    <Grid container direction="column" spacing={2} mt={2}>
      {carsData.map((car, index) => (
        <Grid item key={index}>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <img src={car.image} alt={`${car.name}`} width="150" height="100" style={{ objectFit: "cover" }} />
            <Box>
              <Typography color="black">{car.name}</Typography>
              <Typography color="gray">
                {car.year} | {car.driver}
              </Typography>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );

  const renderContent = () => {
    switch (layerType) {
      case "GRID_VIEW":
        return renderGridView();
      case "TABLE_VIEW":
        return renderTableView();
      case "PHOTO_LIST":
        return renderPhotoListView();
      default:
        return null;
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} gap={3} display={"flex"} alignItems={"center"}>
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
      </Grid>
      <Grid item xs={12} display="flex" justifyContent="space-between" alignItems="center" padding={2}>
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            display: "inline-block",
            padding: "0 8px",
            marginTop: 3,
          }}
        >
          <Typography variant="h3">E-Scooter</Typography>
        </Box>

        <Box alignItems="center" display="flex">
          <Box
            display="flex"
            alignItems="center"
            gap={isSmallScreen ? 1 : 2}
            flexDirection={isSmallScreen ? "column" : "row"} // Stack vertically for small screens
          >
            {buttonData.map((obj) => (
              <Box
                key={obj.value}
                display="flex"
                alignItems="center"
                sx={{
                  backgroundColor: obj.value === layerType ? theme.palette.primary.main : "transparent",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  color: theme.palette.text.primary,
                  border: `1px solid ${theme.palette.text.primary}`,
                  cursor: "pointer",
                  width: isSmallScreen ? "100%" : "auto", // Full width on small screens
                }}
                onClick={() => setLayerType(obj.value)}
              >
                {obj.icon}
                <Button
                  variant="text"
                  sx={{
                    color: "inherit",
                    marginLeft: "5px",
                    padding: 0,
                  }}
                >
                  {obj.label}
                </Button>
              </Box>
            ))}
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} p={1} sx={{ backgroundColor: "#DEDEDE" }}>
        {renderContent()}
      </Grid>
    </Grid>
  );
};

export default TwoWheerlers;
