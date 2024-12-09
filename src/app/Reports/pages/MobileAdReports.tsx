import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import AppsOrSiteChart from "../components/mobile-ad/AppsOrSitesChart";
import DayAndHourChart from "../components/mobile-ad/DayAndHourChart";
import BrowserChart from "../components/mobile-ad/BrowserChart";
import OperatingSystemChart from "../components/mobile-ad/OperatingSystemChart";
import TelecomOperatorChart from "../components/mobile-ad/TelecomOperatorChart";
import CreativesChart from "../components/mobile-ad/CreativesChart";
import { useMediaQuery, useTheme } from "@mui/material";

const MobileAdReports = () => {
  const { selectedMenu } = useSelector((state: any) => state?.selectedMenu);
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Set up refs to scroll to specific sections
  const appOrWebsitesRef = useRef<HTMLDivElement>(null);
  const dayOrHourRef = useRef<HTMLDivElement>(null);
  const browserRef = useRef<HTMLDivElement>(null);
  const operatingSystemRef = useRef<HTMLDivElement>(null);
  const telecomOperatorRef = useRef<HTMLDivElement>(null);
  const creativesRef = useRef<HTMLDivElement>(null);

  // Scroll to the section based on menuSelected value
  useEffect(() => {
    if (selectedMenu) {
      if (
        selectedMenu === "mobileAdAppOrWebsites" &&
        appOrWebsitesRef.current
      ) {
        appOrWebsitesRef.current.scrollIntoView({ behavior: "smooth" });
      }
      if (selectedMenu === "mobileAdDayOrHour" && dayOrHourRef.current) {
        dayOrHourRef.current.scrollIntoView({ behavior: "smooth" });
      }
      if (selectedMenu === "mobileAdBrowser" && browserRef.current) {
        browserRef.current.scrollIntoView({ behavior: "smooth" });
      }
      if (
        selectedMenu === "mobileAdOperatingSystem" &&
        operatingSystemRef.current
      ) {
        operatingSystemRef.current.scrollIntoView({ behavior: "smooth" });
      }
      if (
        selectedMenu === "mobileAdTelecomOperator" &&
        telecomOperatorRef.current
      ) {
        telecomOperatorRef.current.scrollIntoView({ behavior: "smooth" });
      }
      if (selectedMenu === "mobileAdCreatives" && creativesRef.current) {
        creativesRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [selectedMenu]);

  return (
    <div>
      <div
        ref={appOrWebsitesRef}
        id="mobileAdAppOrWebsites"
        style={{ height: isMobile ? "auto" : "400px" }}
      >
        <AppsOrSiteChart />
      </div>
      <div
        ref={dayOrHourRef}
        id="mobileAdDayOrHour"
        style={{ height: isMobile ? "auto" : "495px" }}
      >
        <DayAndHourChart />
      </div>
      <div
        ref={browserRef}
        id="mobileAdBrowser"
        style={{ height: isMobile ? "auto" : "400px" }}
      >
        <BrowserChart />
      </div>
      <div
        ref={operatingSystemRef}
        id="mobileAdOperatingSystem"
        style={{ height: isMobile ? "auto" : "400px" }}
      >
        <OperatingSystemChart />
      </div>
      <div
        ref={telecomOperatorRef}
        id="mobileAdTelecomOperator"
        style={{ height: isMobile ? "auto" : "400px" }}
      >
        <TelecomOperatorChart />
      </div>
      <div
        ref={creativesRef}
        id="mobileAdCreatives"
        style={{ height: isMobile ? "auto" : "400px" }}
      >
        <CreativesChart />
      </div>
    </div>
  );
};

export default MobileAdReports;
