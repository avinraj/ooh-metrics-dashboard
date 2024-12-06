import LayersIcon from "@mui/icons-material/Layers";
import {
  Box,
  Collapse,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { constants } from "../../core/data/constants";

interface MapStylePickerProps {
  onStyleChange: (style: string) => void;
  selectedMapStyle: string;
}

const MapStylePicker: React.FC<MapStylePickerProps> = ({
  onStyleChange,
  selectedMapStyle,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [isOpen, setIsOpen] = useState(false);
  const accessToken = constants.mapboxToken;
  // Predefined Mapbox styles with labels, URLs, and image thumbnails
  const mapStyles = [
    {
      label: "Streets",
      url: "mapbox://styles/mapbox/streets-v11",
      thumbnail: `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-100,40,3/200x100?access_token=${accessToken}`,
    },
    {
      label: "Outdoors",
      url: "mapbox://styles/mapbox/outdoors-v11",
      thumbnail: `https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/static/-100,40,3/200x100?access_token=${accessToken}`,
    },
    {
      label: "Light",
      url: "mapbox://styles/mapbox/light-v10",
      thumbnail: `https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-100,40,3/200x100?access_token=${accessToken}`,
    },
    {
      label: "Dark",
      url: "mapbox://styles/mapbox/dark-v10",
      thumbnail: `https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/-100,40,3/200x100?access_token=${accessToken}`,
    },
    {
      label: "Satellite",
      url: "mapbox://styles/mapbox/satellite-v9",
      thumbnail: `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/-100,40,3/200x100?access_token=${accessToken}`,
    },
    {
      label: "Satellite Streets",
      url: "mapbox://styles/mapbox/satellite-streets-v11",
      thumbnail: `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/static/-100,40,3/200x100?access_token=${accessToken}`,
    },
  ];

  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <Tooltip title="Change Map Style">
        <IconButton onClick={handleToggleOpen} color="primary">
          <LayersIcon />
        </IconButton>
      </Tooltip>
      <Collapse
        in={isOpen}
        orientation="horizontal"
        timeout="auto"
        unmountOnExit
      >
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            overflowX: "auto",
            width: isMobile ? "300px" : "auto",
          }}
        >
          {mapStyles.map((style) => (
            <Box
              key={style.url}
              onClick={() => onStyleChange(style.url)}
              sx={{
                padding: "5px",
                backgroundColor:
                  selectedMapStyle === style.url
                    ? theme.palette.primary.main
                    : "none",
                width: "fit-content",
                cursor: "pointer",
                borderRadius: "8px",
                "&:hover img": { transform: "scale(1.1)" },
                "& img": {
                  transition: "transform 0.3s ease",
                  width: "100%",
                  height: "auto",
                },
              }}
            >
              <img
                src={style.thumbnail}
                alt={style.label}
                style={{
                  borderRadius: "8px",
                  width: "100px",
                  height: "50px",
                }}
              />
              <div
                style={{ marginTop: "-5px", fontSize: "10px", color: "grey" }}
              >
                {style.label}
              </div>
            </Box>
          ))}
        </Box>
      </Collapse>
    </div>
  );
};

export default MapStylePicker;
