import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/oohlogo.png";
import { useAuth } from "../../hooks/useAuth";
import StorageService from "../core/services/storage.serive";
import usersData from "../../Data/users.json";
import authService from "./services/auth.service";
import { duroflexEmail } from "../../Data/users";

const Signup = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>(""); // State to hold error message
  const navigate = useNavigate();
  const storageService = new StorageService();
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const nextRoute = location?.state?.next || "/highlight";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(nextRoute);
    }
  }, [isAuthenticated]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const validateUser = async () => {
    try {
      if(email === duroflexEmail){
        const response: any = await authService.login(email, password);
        if (response?.auth_token) {
          storageService.set("local", "token", response.auth_token);
          storageService.set("local", "email", response.email);
          navigate(nextRoute);
        } else {
          setError("Your email or password was incorrect!");
        }
      }else {
        const user = usersData.find(
          (user) => user.email === email && user.password === password
        );
        if(user){
          storageService.set("local", "token", "234543");
          storageService.set("local", "email", user?.email);
          navigate(nextRoute);
        }
        else {
          setError("Your email or password was incorrect!");
        }
      }
    
    } catch (error) {
      setLoading(false);
      setError("Your email or password was incorrect!");
      console.error("Error :", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateUser();
  };

  const isFormValid = email && password; // Simple validation

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
        <form onSubmit={handleSubmit}>
          <TextField
            onClick={() => {
              setError("");
            }}
            label="Email"
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
            onClick={() => {
              setError("");
            }}
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handlePasswordChange}
            value={password}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
              },
            }}
          />
          {error && (
            <Typography
              color="error"
              sx={{ textAlign: "center", marginTop: 1 }}
            >
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={!isFormValid} // Disable button if form is invalid
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
            {loading ? <CircularProgress size={24} /> : `Let's Go >`}
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default Signup;
