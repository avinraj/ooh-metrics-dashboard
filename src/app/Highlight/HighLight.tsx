import { Box, Grid, Typography, useTheme } from "@mui/material";

const HighLight = () => {
  const theme = useTheme()
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h3">Welcome, Cocacola</Typography>
        <Box sx={{ backgroundColor: theme.palette.primary.main, marginTop: 3 }}>
          <Typography variant="h3">Highlight</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default HighLight;
