import { Box, useMediaQuery } from "@mui/material";
import Sidebar from "../app/core/components/Sidebar";
import { useTheme } from "@mui/material";

const Layout: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box sx={{ display: "flex" }}>
      {/* <div style={{width: isMobile ? "0" : "18%"}}> */}
      <Sidebar />
      {/* </div> */}
      <Box
        sx={{
          padding: "10px",
          paddingTop: isMobile ? "60px" : "10px",
          width: isMobile ? "100%" : "82%",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
