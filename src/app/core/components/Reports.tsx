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
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

interface ReportsAccProps {
  onOpenSwitchModal: (value: string) => void;
}

const ReportsAcc: React.FC<ReportsAccProps> = ({ onOpenSwitchModal }) => {
  const theme = useTheme();
  const { t} = useTranslation();
  const [expanded, setExpanded] = useState<string | false>(false);
  const [selectedVal, setSelectedVal] = useState<string | null>(null);
  const { selectedMenu } = useSelector((state: any) => state?.selectedMenu);

  const handleAccordionChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const reportsConfig = [
    {
      title: t("reports.impressions.impressions"),
      value: "impressions",
    },
    {
      title: t("reports.demographics.demographics"),
      value: "demographics",
    },
    {
      title: t("reports.affinities.affinities"),
      value: "affinities",
    },
  ];

  useEffect(() => {
    if (selectedMenu) {
      if (
        selectedMenu === "impressions" ||
        selectedMenu === "demographics" ||
        selectedMenu === "affinities"
      ) {
        setSelectedVal(selectedMenu);
      }
      else setSelectedVal(null)
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
        sx={{ background: "transparent" }}
        expanded={expanded === "reports"}
        onChange={handleAccordionChange("reports")}
      >
        <AccordionSummary
          sx={{
            backgroundColor: selectedVal ? theme.palette.primary.main : "none",
          }}
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography sx={{ color: "black" }}>{t("sideBar.reports")}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {reportsConfig.map(({ title, value }) => (
            <Box
              onClick={() => {
                onAccClick(value);
              }}
              sx={{
                backgroundColor:
                  selectedVal === value
                    ? theme.palette.primary.main
                    : "#f5f5f5",
                cursor: "pointer",
                // "&:hover": {
                //   backgroundColor: theme.palette.secondary.dark,
                // },
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: "black",
                  fontSize: "15px",
                  paddingBlock: "10px",
                  paddingInline: "12px",
                }}
              >
                {title}
              </Typography>
              <Divider component="li" />
            </Box>
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ReportsAcc;
