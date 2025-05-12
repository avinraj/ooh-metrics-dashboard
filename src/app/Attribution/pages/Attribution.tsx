import LinkIcon from "@mui/icons-material/Link";
import PeopleIcon from "@mui/icons-material/People";
import {
  Box,
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { duroflexEmail } from "../../../Data/users";
import { AnalyticsModel } from "../../../models/analytics";
import { TrackingLinksModel } from "../../../models/trackingLinks";
import StorageService from "../../core/services/storage.serive";
import { buttonStyles } from "../../Reports/components/ImpressionsChart";
import DuroflexTrackingUrl from "../components/Duroflex/DuroflexTrackingUrl";
import FootfallReport from "../components/FootfallReport";
import TrackingUrl from "../components/TrackingUrl";
import analyticsService from "../services/analytics.service";
import campaignService from "../services/campaign.service";
import trackingLinksService from "../services/trackingLinks.service";

const Attribution = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [selectedOption, setSelectedOption] = useState<string>("trackingUrl");
  const [analyticsData, setAnalyticsData] = useState<AnalyticsModel[]>([]);
  const [trackingLinksData, setTrackingLinksData] = useState<
    TrackingLinksModel[]
  >([]);
  const storageService = new StorageService();
  const email = storageService.get("local", "email");

  useEffect(() => {
    console.log(email);
    if (email === duroflexEmail) {
      getTrackingLinksData();
      getAllAnalyticsData();
    }
  }, []);

  const getCampaigns = async () => {
    try {
      const response = await campaignService.getCampaigns({
        pageSize: 50,
      });
      if (response?.campaigns?.length) {
        return response.campaigns;
      }
      return [];
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      return [];
    }
  };

  const fetchLocationFromIP = async (ip: string) => {
    try {
      const response = await fetch(
        `https://ipinfo.io/${ip}/json?token=b236fece072727`
      );
      const data = await response.json();

      if (data.loc) {
        const [latitude, longitude] = data.loc.split(",").map(Number);
        return { latitude, longitude, city: data.city, country: data.country };
      }

      return {
        latitude: null,
        longitude: null,
        city: "Unknown",
        country: "Unknown",
      };
    } catch (error) {
      console.error("Error fetching location:", error);
      return {
        latitude: null,
        longitude: null,
        city: "Unknown",
        country: "Unknown",
      };
    }
  };

  const getAllAnalyticsData = async () => {
    try {
      const campaigns = await getCampaigns();

      if (!campaigns.length) {
        console.warn("No campaigns found.");
        return;
      }

      let allAnalyticsData: any[] = [];

      for (const campaign of campaigns) {
        const response: any = await analyticsService.getAnalytics({
          campaignId: campaign?._id,
          startDate: moment(campaign?.start_date).format("YYYY-MM-DD"),
          endDate: moment(campaign?.end_date).format("YYYY-MM-DD"),
          pageSize: 100000,
        });

        if (response?.analytics?.length) {
          const analyticsWithLocation = await Promise.all(
            response.analytics.map(async (item: any) => {
              if (item.ip_address && !item.is_loc_updated) {
                const locationData = await fetchLocationFromIP(item.ip_address);
                return { ...item, ...locationData };
              }
              return item;
            })
          );

          allAnalyticsData = [...allAnalyticsData, ...analyticsWithLocation];
        }
      }
      setAnalyticsData((prevData) => {
        const uniqueData = [
          ...new Map(
            [...allAnalyticsData, ...prevData].map((item) => [item._id, item])
          ).values(),
        ];
        return uniqueData;
      });
    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
  };

  const getTrackingLinksData = async () => {
    try {
      const response: any = await trackingLinksService.getTrackingLinks({
        pageSize: 100,
      });
      if (response?.data?.data?.length) {
        setTrackingLinksData(response.data.data);
      }
    } catch (error) {
      console.error("Error :", error);
    }
  };

  const getButtonStyle = (isActive: boolean) => ({
    ...buttonStyles,
    backgroundColor: isActive
      ? theme.palette.primary.main
      : theme.palette.secondary.main,
    fontWeight: isActive ? "bold" : "normal",
    color: theme.palette.text.primary,
    maxHeight: "fit-content",
    fontSize: isMobile ? "10px" : "15px",
  });

  const handleClick = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <Grid container>
      <div
        style={{
          display: isMobile ? "grid" : "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            padding: "5px",
            width: "fit-content",
            marginBlock: "25px",
          }}
        >
          <Typography variant="h3">{t("attribution.attribution")}</Typography>
        </Box>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "fit-contents",
          }}
        >
          {[
            // {
            //   label: t("attribution.qrcode"),
            //   value: "qrCode",
            //   icon: <QrCodeIcon sx={{ marginRight: 1 }} />,
            // },
            {
              label: t("attribution.trackingurl.trackingurl"),
              value: "trackingUrl",
              icon: <LinkIcon sx={{ marginRight: 1 }} />,
            },
            ...(email === duroflexEmail
              ? [
                  {
                    label: t("attribution.footfall"),
                    value: "footfall",
                    icon: <PeopleIcon sx={{ marginRight: 1 }} />,
                  },
                ]
              : []),
          ].map((button) => (
            <Button
              key={button.value}
              variant="contained"
              color="primary"
              disableElevation
              style={getButtonStyle(selectedOption === button.value)}
              onClick={() => handleClick(button.value)}
            >
              {!isMobile ? button.icon : null}
              {button.label}
            </Button>
          ))}
        </div>
      </div>

      {selectedOption === "trackingUrl" ? (
        email === duroflexEmail ? (
          <DuroflexTrackingUrl
            analyticsData={analyticsData}
            trackingLinksData={trackingLinksData}
          />
        ) : (
          <TrackingUrl />
        )
      ) : selectedOption === "footfall" ? (
        <FootfallReport />
      ) : null}
    </Grid>
  );
};

export default Attribution;
