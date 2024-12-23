import { Box, Button, Grid, TextField, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/oohlogo.png";
import { useAuth } from "../../hooks/useAuth";
import StorageService from "../core/services/storage.serive";

const Signup = () => {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const storageService = new StorageService();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/highlight");
    }
  }, [isAuthenticated]);

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  return (
    <Grid
      container
      sx={{
        minHeight: "100vh",
        backgroundColor: theme.palette.primary.main, // Light background
        justifyContent: "center",
        alignItems: "center", // Center vertically and horizontally
      }}
    >
      <Grid
        item
        xs={11}
        sm={8}
        md={5}
        lg={4}
        xl={3}
        sx={{
          bgcolor: "#fff",
          borderRadius: 2,
          boxShadow: 3,
          padding: 4,
        }}
      >
        <Box textAlign="center" mb={4}>
          <img src={logo} alt="OOHmetrics Logo" height={70} width={30} />
          <Typography
            variant="h4"
            sx={{
              fontSize: 32,
              fontWeight: 700,
              color: theme.palette.primary.contrastText,
              marginTop: 1,
            }}
          >
            OOHmetrics
          </Typography>
        </Box>
        <form>
          <TextField
            label="demo@yourcompany.com"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleEmailChange}
            value={email}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
              },
            }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            onClick={() => {
              storageService.set("local", "token", "234543");
              navigate("/highlight");
            }}
            sx={{
              bgcolor: "rgba(254, 158, 18, 1)",
              color: "#000",
              fontSize: "16px",
              fontWeight: 600,
              marginTop: 2,
              textTransform: "none",
              borderRadius: "30px",
              "&:hover": {
                bgcolor: "#e5e600",
              },
            }}
          >
            Let's Go &gt;
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default Signup;
