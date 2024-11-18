import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
import logo from "../../assets/oohlogo.png";
import React from "react";
import { useNavigate } from "react-router-dom";

const Signup2 = () => {
  const navigate = useNavigate();
  return (
    <Grid container sx={{ height: "100vh", width: "100vw" }}>
      <Grid item xs={12} md={6} sx={{ backgroundColor: "#606060" }}>
        <Box display="flex" justifyContent="center" alignItems="center" p={4} height="100vh">
          <Typography variant="h3" sx={{ color: "#eeff41", fontSize: 60 }}>
            <b>
              The marketing Co-pilot <br /> you always needed
            </b>
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            backgroundColor: "#eeff41",
            borderRadius: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            // justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="center" p={5}>
            <img src={logo} alt="OOHmetrics Logo" height={70} width={30} />
            <Typography variant="h4" sx={{ marginLeft: 1, textAlign: "center", fontSize: 50 }}>
              <b>OOHmetrics</b>
            </Typography>
          </Box>
          <Card
            sx={{
              maxWidth: 400,
              width: "100%",
              margin: "0 auto",
              padding: 3,
              // marginTop: 5,
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              borderRadius: 4,
            }}
          >
            <Typography variant="h5" sx={{ textAlign: "center", marginBottom: 2 }}>
              <b>Sign Up</b>
            </Typography>
            <form>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                // onChange={handleEmailChange}
                // value={email}
              />
              <TextField
                label="Enter OTP"
                variant="outlined"
                fullWidth
                margin="normal"
                // onChange={handleEmailChange}
                // value={email}
              />
            </form>
            <Button
              variant="contained"
              onClick={() => navigate("/signup2")}
              sx={{
                bgcolor: "black",
                color: "#eeff41",
                fontSize: "16px",
                width: "100%",
                marginTop: 20,
                "&:hover": {
                  bgcolor: "grey",
                },
              }}
            >
              Submit
            </Button>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Signup2;
