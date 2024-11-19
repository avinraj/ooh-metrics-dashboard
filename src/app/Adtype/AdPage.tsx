import { Box, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import car from "../../assets/car copy.png";
import mobileAds from "../../assets/Screenshot 2024-11-19 091620.png";
import billBoard from "../../assets/billborad.png";
import bus from "../../assets/Screenshot 2024-11-19 091200.png";
import truck from "../../assets/Screenshot 2024-11-19 091230.png";
import robots from "../../assets/Screenshot 2024-11-19 091256.png";
import escooter from "../../assets/Screenshot 2024-11-19 091325.png";
import rickshaw from "../../assets/Screenshot 2024-11-19 091350.png";
import twowheeler from "../../assets/Screenshot 2024-11-19 091418.png";
import roof from "../../assets/carIcon.png";
import digittruck from "../../assets/Screenshot 2024-11-19 091528.png";
import backpack from "../../assets/Screenshot 2024-11-19 091554.png";

type ListItemProps = {
  icon: string; // Assuming the icons are file paths (strings)
  name: string;
};

const ListItem: React.FC<ListItemProps> = ({ icon, name }) => (
  <Box display="flex" alignItems="center" gap={1}>
    <img src={icon} alt={name} width={23} height={23} />
    <Typography>{name}</Typography>
  </Box>
);

const AdPage = () => {
  const [isVehicleAdsOpen, setVehicleAdsOpen] = useState(false);
  const [isDigitalScreensOpen, setDigitalScreensOpen] = useState(false);

  const vehicles = [
    { icon: car, name: "Cars" },
    { icon: bus, name: "Busses" },
    { icon: truck, name: "Trucks" },
    { icon: robots, name: "Robots" },
    { icon: escooter, name: "e-scooter" },
    { icon: rickshaw, name: "Rickshaws" },
    { icon: twowheeler, name: "2-wheelers" },
  ];

  const digitalScreens = [
    { icon: roof, name: "Car Rooftoppers" },
    { icon: digittruck, name: "Van Digital Billboards" },
    { icon: backpack, name: "Backpacks" },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box display="flex" alignItems="center" gap={2}>
          <img src={mobileAds} alt="Mobile Ads" width={20} height={20} />
          <Typography fontWeight={"bold"}>Mobile Ads</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={2}>
          <img src={billBoard} alt="Static Billboards" width={20} height={20} />
          <Typography fontWeight={"bold"}>Static Billboards</Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box display="flex" alignItems="center" gap={2} onClick={() => setVehicleAdsOpen(!isVehicleAdsOpen)}>
          <Typography fontWeight={"bold"}>Vehicle Ads</Typography>
          {isVehicleAdsOpen ? <IoIosArrowDropup /> : <IoIosArrowDropdown />}
        </Box>
        {isVehicleAdsOpen &&
          vehicles.map((vehicle) => <ListItem key={vehicle.name} icon={vehicle.icon} name={vehicle.name} />)}
      </Grid>
      <Grid item xs={12}>
        <Box display="flex" alignItems="center" gap={2} onClick={() => setDigitalScreensOpen(!isDigitalScreensOpen)}>
          <Typography fontWeight={"bold"}>Digital Screens</Typography>
          {isDigitalScreensOpen ? <IoIosArrowDropup /> : <IoIosArrowDropdown />}
        </Box>
        {isDigitalScreensOpen &&
          digitalScreens.map((screen) => <ListItem key={screen.name} icon={screen.icon} name={screen.name} />)}
      </Grid>
    </Grid>
  );
};

export default AdPage;
