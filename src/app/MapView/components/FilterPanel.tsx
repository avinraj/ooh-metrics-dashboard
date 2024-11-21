import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import DateRangePicker from "./DateRangePicker";
import { useTranslation } from "react-i18next";

interface FilterPanelProps {
  campaigns: string[];
  vehicles: string[];
  selectedCampaign: string;
  selectedVehicle: string;
  dateRange: { startDate: Date; endDate: Date };
  onCampaignChange: (value: string) => void;
  onVehicleChange: (value: string) => void;
  onDateRangeSelect: (range: { startDate: Date; endDate: Date }) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  campaigns,
  vehicles,
  selectedCampaign,
  selectedVehicle,
  dateRange,
  onCampaignChange,
  onVehicleChange,
  onDateRangeSelect,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Grid container spacing={3} alignItems="center">
      {/* Campaign Select */}
      <Grid item xs={12} sm={6} md={2} order={1}>
        <FormControl fullWidth>
          <InputLabel sx={{ color: theme.palette.text.primary }}>
            {t("filterPanel.campaign")}
          </InputLabel>
          <Select
            size="small"
            value={selectedCampaign}
            onChange={(event) => onCampaignChange(event.target.value)}
            label={t("filterPanel.campaign")}
          >
            {campaigns.map((campaign, index) => (
              <MenuItem key={index} value={campaign}>
                {campaign}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* Date Range Picker */}
      <Grid
        item
        xs={12}
        sm={6}
        md={3}
        order={{ xs: 3, md: 2 }} // Date picker comes after vehicle select on mobile (xs), before on desktop (md)
      >
        <DateRangePicker
          defaultDateRange={dateRange}
          onDateRangeChange={onDateRangeSelect}
        />
      </Grid>

      {/* Vehicle Select */}
      <Grid item xs={12} sm={6} md={2} order={{ xs: 2, md: 3 }}>
        <FormControl fullWidth>
          <InputLabel sx={{ color: theme.palette.text.primary }}>
            {t("filterPanel.vehicle")}
          </InputLabel>
          <Select
            size="small"
            value={selectedVehicle}
            onChange={(event) => onVehicleChange(event.target.value)}
            label={t("filterPanel.vehicle")}
          >
            {vehicles.map((vehicle, index) => (
              <MenuItem key={index} value={vehicle}>
                {vehicle}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* Show Button */}
      <Grid item xs={12} sm={6} md={2} order={4}>
        <Box
          sx={{
            border: "1px solid black",
            color: theme.palette.primary.main,
            borderRadius: "5px",
            backgroundColor: theme.palette.primary.contrastText,
            textAlign: "center",
            paddingLeft: 2,
            paddingRight: 2,
            paddingBlock: "4px",
            cursor: "pointer",
            maxWidth: "fit-content",
          }}
        >
          <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
            {t("filterPanel.show")}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default FilterPanel;
