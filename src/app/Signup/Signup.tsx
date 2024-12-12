import { Box, Button, Grid, TextField, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/oohlogo.png";
import { useAuth } from "../../hooks/useAuth";
import StorageService from "../core/services/storage.serive";

const Signup = () => {
  const theme = useTheme();
  const [email, setEmail] = useState("");
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
              navigate(nextRoute);
            }}
            sx={{
              bgcolor: "#f7ff3c",
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
// <Grid container sx={{ height: "100vh", width: "100vw" }}>
//   {/* Left Section */}
//   <Grid
//     item
//     xs={6}
//     sx={{
//       backgroundColor: "#606060",
//       //height: "100%", width: "100%"
//     }}
//   >
//     <Box
//       display="flex"
//       justifyContent="center"
//       alignItems="center"
//       height="100%"
//     >
//       <Typography
//         variant="h3"
//         sx={{ color: theme.palette.primary.main, fontSize: 60 }}
//       >
//         <b>
//           The marketing Co-pilot <br /> you always needed
//         </b>
//       </Typography>
//     </Box>
//   </Grid>

//   {/* Right Section */}
//   <Grid
//     item
//     xs={6}
//     sx={{
//       // height: "100%",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//     }}
//   >
//     <Box
//       sx={{
//         backgroundColor: theme.palette.primary.main,
//         borderRadius: 0,
//         height: "100%",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         width: "100%",
//       }}
//     >
//       <Box
//         display="flex"
//         alignItems="center"
//         justifyContent="center"
//         p={5}
//         sx={{ width: "100%" }}
//       >
//         <img src={logo} alt="OOHmetrics Logo" height={70} width={30} />
//         <Typography
//           variant="h4"
//           sx={{
//             marginLeft: 1,
//             textAlign: "center",
//             fontSize: 50,
//             color: theme.palette.primary.contrastText,
//           }}
//         >
//           <b>OOHmetrics</b>
//         </Typography>
//       </Box>
//       <Card
//         sx={{
//           maxWidth: 400,
//           width: "100%",
//           margin: "0 auto",
//           padding: 3,
//           marginTop: 5,
//           boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
//           borderRadius: 4,
//         }}
//       >
//         <Typography
//           variant="h5"
//           sx={{ textAlign: "center", marginBottom: 2 }}
//         >
//           <b>Sign Up</b>
//         </Typography>
//         <form>
//           <TextField
//             label="Email"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             onChange={handleEmailChange}
//             value={email}
//           />
//           <Button
//             type="submit"
//             variant="contained"
//             onClick={() => {
//               storageService.set("local", "token", "234543");
//               navigate("/home");
//               // navigate("/signup");
//             }}
//             sx={{
//               bgcolor: theme.palette.secondary.contrastText,
//               color: theme.palette.primary.main,
//               fontSize: "16px",
//               width: "100%",
//               "&:hover": {
//                 bgcolor: "grey",
//               },
//             }}
//           >
//             Continue
//           </Button>
//         </form>
//         <Box>
//           <h4 style={{ textAlign: "center" }}>or</h4>
//           <Button
//             variant="outlined"
//             sx={{
//               textTransform: "none",
//               color: theme.palette.secondary.contrastText,
//               backgroundColor: theme.palette.background.default,
//               border: "1px solid #ddd",
//               padding: "10px 24px",
//               borderRadius: "4px",
//               fontSize: "16px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               width: "100%",
//               "&:hover": {
//                 backgroundColor: theme.palette.secondary.main,
//                 borderColor: "#ddd",
//               },
//             }}
//           >
//             <Box
//               component="img"
//               src={googleImg}
//               alt="Google logo"
//               sx={{ width: 24, height: 24, marginRight: 1 }}
//             />
//             <Typography sx={{ fontSize: "20px" }}>
//               <b>Continue with Google</b>
//             </Typography>
//           </Button>
//         </Box>
//       </Card>
//     </Box>
//   </Grid>
// </Grid>
