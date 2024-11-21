import { Box, Popover, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main style file
import "react-date-range/dist/theme/default.css"; // Default theme
import { useTranslation } from "react-i18next";

interface PopupDateRangePickerProps {
  defaultDateRange?: { startDate: Date; endDate: Date };
  onDateRangeChange?: (range: { startDate: Date; endDate: Date }) => void;
}

const PopupDateRangePicker: React.FC<PopupDateRangePickerProps> = ({
  defaultDateRange = { startDate: new Date(), endDate: new Date() },
  onDateRangeChange,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [dateRange, setDateRange] = useState(defaultDateRange);

  // Format the selected dates for the text field
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (ranges: any) => {
    const selectedRange = {
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate,
    };
    setDateRange(selectedRange);

    if (onDateRangeChange) {
      onDateRangeChange(selectedRange);
    }
  };

  const open = Boolean(anchorEl);

  return (
    <Box sx={{ position: "relative" }}>
      <Typography
        variant="caption"
        sx={{
          position: "absolute",
          top: "-8px",
          left: "12px",
          backgroundColor: theme.palette.background.default,
          padding: "0 4px",
          color: theme.palette.text.primary,
          fontSize: "12px",
        }}
      >
        {t("filterPanel.selectDateRange")}
      </Typography>
      <Box
        onClick={handleOpen}
        sx={{
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: "5px",
          paddingBlock: "8px",
          paddingInline: "5px",
          cursor: "pointer",
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        }}
      >
        {`${formatDate(dateRange.startDate)} - ${formatDate(
          dateRange.endDate
        )}`}
      </Box>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box>
          <DateRange
            ranges={[{ ...dateRange, key: "selection" }]}
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            editableDateInputs={true}
            months={2}
            direction="horizontal"
            rangeColors={[theme.palette.primary.main]}
          />
        </Box>
      </Popover>
    </Box>
  );
};

export default PopupDateRangePicker;
