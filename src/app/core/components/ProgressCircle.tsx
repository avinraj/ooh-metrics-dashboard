import React from "react";
import { CircularProgress, Box, Typography, useTheme } from "@mui/material";

// Reusable Circular Progress Component
interface ProgressCircleProps {
  label: string; // Label for the circular progress (e.g., "Female" or "Male")
  value: number; // The percentage value (0-100)
  size?: number; // Optional: size of the circular progress
  color?: "primary" | "secondary" | string; // Optional: color of the circular progress
  thickness?: number; // Optional: thickness of the circular progress
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  label,
  value,
  size = 100,
  color = "primary",
  thickness = 4,
}) => {
  const theme = useTheme();
  return (
    <Box sx={{ textAlign: "center", position: "relative" }}>
      <Typography
        variant="h6"
        sx={{ position: "absolute", top: "25px", left: "23px" }}
      >
        {label}
      </Typography>

      {/* Background CircularProgress (Grey) */}
      <CircularProgress
        variant="determinate"
        value={100} // This is for the grey background (remaining part)
        size={size}
        thickness={thickness}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
          color: theme.palette.secondary.main,
        }}
      />

      {/* Foreground CircularProgress (Colored Portion) */}
      <CircularProgress
        variant="determinate"
        value={value} // This is for the filled portion
        size={size}
        thickness={thickness}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 2,
          color: color,
          "& .MuiCircularProgress-circle": {
            strokeLinecap: "round",
          },
        }}
      />

      {/* Centered Value */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography variant="h6">{value}%</Typography>
      </Box>
    </Box>
  );
};

export default ProgressCircle;
