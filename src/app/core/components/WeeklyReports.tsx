import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Divider,
    Typography,
    useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface WeeklyReportsAccProps {
  icon?: JSX.Element;
  onOpenSwitchModal: (value: string) => void;
}

interface WeeklyReportConfig {
  title: string;
  value: string;
}

const WeeklyReportsAcc: React.FC<WeeklyReportsAccProps> = ({
  onOpenSwitchModal,
  icon,
}) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState<string | false>(false);
  const [selectedVal, setSelectedVal] = useState<string | null>(null);
  const { selectedMenu } = useSelector((state: any) => state?.selectedMenu);
  const [reportsConfig] = useState<WeeklyReportConfig[]>([
    {
      title: "Overall Summary",
      value: "weeklySummary",
    },
    {
      title: "Line Item-Wise Stats",
      value: "lineItemStats",
    },
    {
      title: "OS & Creative Breakdown",
      value: "breakdownStats",
    },
    {
      title: "Tentative Daily Footfall",
      value: "footfallStats",
    },
  ]);

  const handleAccordionChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  useEffect(() => {
    if (
      selectedMenu &&
      reportsConfig.some((config: any) => config.value === selectedMenu)
    ) {
      setSelectedVal(selectedMenu);
    } else {
      setSelectedVal(null);
    }
  }, [selectedMenu]);

  const onAccClick = (value: string) => {
    onOpenSwitchModal(value);
    setSelectedVal(value);
  };

  return (
    <div>
      <Accordion
        elevation={0}
        variant="outlined"
        sx={{
          background: "transparent",
          borderColor: theme.palette.text.disabled,
        }}
        expanded={expanded === "weeklyReports"}
        onChange={handleAccordionChange("weeklyReports")}
      >
        <AccordionSummary
          sx={{
            backgroundColor: selectedVal ? theme.palette.primary.main : "none",
          }}
          expandIcon={
            <ExpandMoreIcon
              sx={{ color: selectedVal ? "black" : theme.palette.text.primary }}
            />
          }
        >
          <Box display={"flex"} alignItems={"center"}>
            {icon}
            <Typography
              sx={{ color: selectedVal ? "black" : theme.palette.text.primary }}
            >
              Weekly Reports
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          {reportsConfig.map(({ title, value }, index) => (
            <Box
              key={value}
              onClick={() => {
                onAccClick(value);
              }}
              sx={{
                borderTopLeftRadius: index === 0 ? "5px" : 0,
                borderTopRightRadius: index === 0 ? "5px" : 0,
                borderBottomLeftRadius:
                  reportsConfig.length === index + 1 ? "5px" : 0,
                borderBottomRightRadius:
                  reportsConfig.length === index + 1 ? "5px" : 0,
                backgroundColor:
                  selectedVal === value
                    ? theme.palette.primary.main
                    : theme.palette.secondary.main,
                cursor: "pointer",
                // "&:hover": {
                //   backgroundColor: theme.palette.secondary.dark,
                // },
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color:
                    selectedVal === value
                      ? "black"
                      : theme.palette.text.primary,
                  fontSize: "15px",
                  paddingBlock: "10px",
                  paddingInline: "12px",
                }}
              >
                {title}
              </Typography>
              {reportsConfig.length === index + 1 ? null : (
                <Divider component="li" />
              )}
            </Box>
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default WeeklyReportsAcc;
