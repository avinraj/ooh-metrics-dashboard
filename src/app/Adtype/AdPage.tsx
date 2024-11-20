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
import { useTranslation } from "react-i18next";

type ListItemProps = {
  icon: string;
  name: string;
};

const ListItem: React.FC<ListItemProps> = ({ icon, name }) => (
  <Box display="flex" alignItems="center" gap={1}>
    <img src={icon} alt={name} width={23} height={23} />
    <Typography>{name}</Typography>
  </Box>
);

const AdPage = () => {
  const [isVehicleAdsOpen, setVehicleAdsOpen] = useState(true);
  const [isDigitalScreensOpen, setDigitalScreensOpen] = useState(false);
  const { t } = useTranslation();

  const vehicles = [
    { icon: car, name: t("adtype.vehicles.Cars") },
    { icon: bus, name: t("adtype.vehicles.Buses") },
    { icon: truck, name: t("adtype.vehicles.Trucks") },
    { icon: robots, name: t("adtype.vehicles.Robots") },
    { icon: escooter, name: t("adtype.vehicles.e-scooter") },
    { icon: rickshaw, name: t("adtype.vehicles.Rickshaws") },
    { icon: twowheeler, name: t("adtype.vehicles.2-wheelers") },
  ];

  const digitalScreens = [
    { icon: roof, name: t("adtype.digitalScreens.Car Rooftoppers") },
    { icon: digittruck, name: t("adtype.digitalScreens.Van Digital Billboards") },
    { icon: backpack, name: t("adtype.digitalScreens.Backpacks") },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box display="flex" alignItems="center" gap={2}>
          <img src={mobileAds} alt="Mobile Ads" width={20} height={20} />
          <Typography fontWeight={"bold"}>{t("adtype.Mobile Ads")}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={2}>
          <img src={billBoard} alt="Static Billboards" width={20} height={20} />
          <Typography fontWeight={"bold"}>{t("adtype.Static Billboards")}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box display="flex" alignItems="center" gap={2} onClick={() => setVehicleAdsOpen(!isVehicleAdsOpen)}>
          <Typography fontWeight={"bold"}>{t("adtype.Vehicle Ads")}</Typography>
          {isVehicleAdsOpen ? <IoIosArrowDropup /> : <IoIosArrowDropdown />}
        </Box>
        <Box sx={{ alignItems: "center", justifyContent: "center" }}>
          {isVehicleAdsOpen &&
            vehicles.map((vehicle) => (
              <Box key={vehicle.name} mt={2} sx={{ cursor: "pointer" }}>
                <ListItem icon={vehicle.icon} name={vehicle.name} />
              </Box>
            ))}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box display="flex" alignItems="center" gap={2} onClick={() => setDigitalScreensOpen(!isDigitalScreensOpen)}>
          <Typography fontWeight={"bold"}>{t("adtype.Digital Screens")}</Typography>
          {isDigitalScreensOpen ? <IoIosArrowDropup /> : <IoIosArrowDropdown />}
        </Box>
        {isDigitalScreensOpen &&
          digitalScreens.map((screen) => (
            <Box key={screen.name} mt={2} sx={{ cursor: "pointer" }}>
              <ListItem icon={screen.icon} name={screen.name} />
            </Box>
          ))}
      </Grid>
    </Grid>
  );
};

export default AdPage;
