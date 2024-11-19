import { Box, Grid2, Typography, useTheme } from "@mui/material";
import MapboxMap from "../components/MapBoxMap";

const MapView = () => {
  const theme = useTheme();
  return (
    <Grid2 container>
      <Grid2 size={12} gap={3} display={"flex"} alignItems={"center"}>
        <Box
          sx={{ border: "1px solid black", borderRadius: 2, backgroundColor: "#f6f3b5", width: "200px", paddingLeft: 1 }}
        >
          <Typography>CAMPAIGNS</Typography>
        </Box>
        <Box
          sx={{ border: "1px solid black", borderRadius: 2, backgroundColor: "#f6f3b5", width: "200px", paddingLeft: 1 }}
        >
          <Typography>DATE-RANGE</Typography>
        </Box>
        <Box
          sx={{ border: "1px solid black", borderRadius: 2, backgroundColor: "#f6f3b5", width: "200px", paddingLeft: 1 }}
        >
          <Typography>CARS</Typography>
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
          <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>SHOW</Typography>
        </Box>
      </Grid2>
      <Grid2 mt={3}>
        <Box display="flex" alignItems="center" gap={2}>
          <Typography
            fontSize="26px"
            fontWeight="bold"
            sx={{ backgroundColor: theme.palette.primary.main, padding: "8px" }}
          >
            Map
          </Typography>
          {["BASIC", "HEAT", "LIVE"].map((text) => (
            <Box key={text} sx={{ border: "1px solid black", padding: "4px 8px" }}>
              <Typography>{text}</Typography>
            </Box>
          ))}
        </Box>
      </Grid2>
      <Grid2 size={12} mt={2}>
        <MapboxMap />
      </Grid2>
    </Grid2>
  );
};

export default MapView;
