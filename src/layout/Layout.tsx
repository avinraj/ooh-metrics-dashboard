import { Box } from "@mui/material";
import Sidebar from "../app/core/components/Sidebar";

const Layout: React.FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ margin: '10px' ,width: "100%" }}>{children}</Box>
    </Box>
  );
};

export default Layout;
