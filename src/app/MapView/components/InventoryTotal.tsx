import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import {
  Box,
  Collapse,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import apartmentsLogo from "../../../assets/apartments_icon.png";
import theatreIcon from "../../../assets/cinema_icon.png";
import fitnessLogo from "../../../assets/gym_icon.png";
import workspaceLogo from "../../../assets/office-building_icon.png";
import { inventoryTypes } from "./BrandsMap";


export const capitalizeAndFormat = (text: string) => {
  return text
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
};

interface InventoryTotalProps {
  data: any[];
}

const InventoryTotal: React.FC<InventoryTotalProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <Collapse
        in={isOpen}
        orientation="horizontal"
        timeout="auto"
        unmountOnExit
      >
        <Grid
          container
          sx={{
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          {data?.length &&
            data.map((obj, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={
                      obj?.type === inventoryTypes.apartments
                        ? apartmentsLogo
                        : obj?.type === inventoryTypes.workspaces
                        ? workspaceLogo
                        : obj?.type === inventoryTypes.fitness
                        ? fitnessLogo
                        : obj?.type === inventoryTypes.cinema_theatres
                        ? theatreIcon
                        : ""
                    }
                    alt="apartments Logo"
                    style={{ marginRight: 5, height: "30px" }}
                  />
                  <Box>
                    <Typography
                      variant="h6"
                      fontWeight={"bold"}
                      style={{ margin: "0px" }}
                      gutterBottom
                    >
                      {obj?.count}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography
                    variant="subtitle2"
                    style={{ margin: "0px", fontSize: "10px" }}
                    gutterBottom
                  >
                    {capitalizeAndFormat(obj?.type === "cinema_theatres" ? "theatres" : obj.type)}
                  </Typography>
                </Box>
              </Grid>
            ))}
        </Grid>
      </Collapse>
      <Tooltip title="Overview">
        <IconButton onClick={handleToggleOpen} color="primary">
          <RemoveRedEyeOutlinedIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default InventoryTotal;
