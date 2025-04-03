import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import BreakdownStats from "../components/weeklyReports/BreakdownStats";
import FootfallStats from "../components/weeklyReports/FootfallStats";
import LineItemStats from "../components/weeklyReports/LineItemStats";
import WeeklySummary from "../components/weeklyReports/WeeklySummary";

const WeeklyReports = () => {
  const { selectedMenu } = useSelector((state: any) => state?.selectedMenu);

  // Set up refs to scroll to specific sections
  const weeklySummaryRef = useRef<HTMLDivElement>(null);
  const lineItemStatsRef = useRef<HTMLDivElement>(null);
  const breakdownStatsRef = useRef<HTMLDivElement>(null);
  const footfallStatsRef = useRef<HTMLDivElement>(null);

  // Scroll to the section based on menuSelected value
  useEffect(() => {
    if (selectedMenu) {
      if (selectedMenu === "weeklySummary" && weeklySummaryRef.current) {
        weeklySummaryRef.current.scrollIntoView({ behavior: "smooth" });
      } else if (selectedMenu === "lineItemStats" && lineItemStatsRef.current) {
        lineItemStatsRef.current.scrollIntoView({ behavior: "smooth" });
      } else if (
        selectedMenu === "breakdownStats" &&
        breakdownStatsRef.current
      ) {
        breakdownStatsRef.current.scrollIntoView({ behavior: "smooth" });
      } else if (selectedMenu === "footfallStats" && footfallStatsRef.current) {
        footfallStatsRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [selectedMenu]);

  return (
    <div>
      <div ref={weeklySummaryRef} id="weeklySummary">
        <WeeklySummary />
      </div>
      <div ref={lineItemStatsRef} id="lineItemStats">
        <LineItemStats />
      </div>
      <div ref={breakdownStatsRef} id="breakdownStats">
        <BreakdownStats />
      </div>
      <div ref={footfallStatsRef} id="footfallStats">
        <FootfallStats />
      </div>
    </div>
  );
};

export default WeeklyReports;
