import LinkIcon from "@mui/icons-material/Link";
import PeopleIcon from "@mui/icons-material/People";
import QrCodeIcon from "@mui/icons-material/QrCode";
import { Box, Grid2, Typography, useTheme } from "@mui/material";

const Attribution = () => {
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
        <Box sx={{ backgroundColor: theme.palette.primary.main, padding: "0 8px", marginRight: 2 }}>
          <Typography variant="h3">Attribution</Typography>
        </Box>

        {/* QR Code, Tracking URL, and Footfall Section with Icons */}
        <Box display="flex" justifyContent="space-between" alignItems="center" flexGrow={1}>
          <Box
            display="flex"
            alignItems="center"
            sx={{ paddingX: 2, borderRight: "1px solid #ccc", flex: 1, justifyContent: "center" }}
          >
            <QrCodeIcon sx={{ marginRight: 1 }} />
            <Typography>QR CODE</Typography>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            sx={{ paddingX: 2, borderRight: "1px solid #ccc", flex: 1, justifyContent: "center" }}
          >
            <LinkIcon sx={{ marginRight: 1 }} />
            <Typography>Tracking URL</Typography>
          </Box>

          <Box display="flex" alignItems="center" sx={{ paddingX: 2, flex: 1, justifyContent: "center" }}>
            <PeopleIcon sx={{ marginRight: 1 }} />
            <Typography>Footfall</Typography>
          </Box>
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default Attribution;
