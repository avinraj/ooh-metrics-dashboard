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
  icon?: JSX.Element;
  onOpenSwitchModal: (value: string) => void;
}

interface ReportConfig {
  title: string;
  value: string;
}

const ReportsAcc: React.FC<ReportsAccProps> = ({ onOpenSwitchModal, icon }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<string | false>(false);
  const [selectedVal, setSelectedVal] = useState<string | null>(null);
  const { selectedMenu } = useSelector((state: any) => state?.selectedMenu);
  const { selectedAdType } = useSelector((state: any) => state?.selectedAdType);
  const [reportsConfig, setReportsConfig] = useState<ReportConfig[]>([]);

  const handleAccordionChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  useEffect(() => {
    if (selectedAdType?.value === "mobileAds") {
      setReportsConfig([
        {
          title: t("reports.appsOrWebsites.appsOrWebsites"),
          value: "mobileAdAppOrWebsites",
        },
        {
          title: t("reports.dayAndHour.dayAndHour"),
          value: "mobileAdDayOrHour",
        },
        {
          title: t("reports.browser.browser"),
          value: "mobileAdBrowser",
        },
        {
          title: t("reports.operatingSystem.OS"),
          value: "mobileAdOperatingSystem",
        },
        {
          title: t("reports.telecomOperator.telecomOperator"),
          value: "mobileAdTelecomOperator",
        },
        {
          title: t("reports.creatives.creatives"),
          value: "mobileAdCreatives",
        },
      ]);
    } else {
      setReportsConfig([
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
      ]);
    }
  }, [selectedAdType]);

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
        expanded={expanded === "reports"}
        onChange={handleAccordionChange("reports")}
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
              {t("sideBar.reports")}
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

export default ReportsAcc;
