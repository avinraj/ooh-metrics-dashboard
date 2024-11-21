import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import FilterPanel from "../../MapView/components/FilterPanel";
import Affinities from "../components/Affinities";
import Demographics from "../components/Demographics";
import Impressions from "../components/Impressions";

const Reports = () => {
  const [selectedCampaign, setSelectedCampaign] =
    useState<string>("Campaign 1");
  const [selectedVehicle, setSelectedVehicle] = useState<string>("Car 1");
  const [dateRange, setDateRange] = useState<{
    startDate: Date;
    endDate: Date;
  }>({
    startDate: new Date(),
    endDate: new Date(),
  });
  const { selectedMenu } = useSelector((state: any) => state?.selectedMenu);

  const campaigns = ["Campaign 1", "Campaign 2", "Campaign 3"];
  const vehicles = ["Car 1", "Car 2", "Car 3"];

  // Set up refs to scroll to specific sections
  const impressionsRef = useRef<HTMLDivElement>(null);
  const demographicsRef = useRef<HTMLDivElement>(null);
  const affinitiesRef = useRef<HTMLDivElement>(null);

  // Scroll to the section based on menuSelected value
  useEffect(() => {
    if (selectedMenu) {
      if (selectedMenu === "impressions" && impressionsRef.current) {
        impressionsRef.current.scrollIntoView({ behavior: "smooth" });
      } else if (selectedMenu === "demographics" && demographicsRef.current) {
        demographicsRef.current.scrollIntoView({ behavior: "smooth" });
      } else if (selectedMenu === "affinities" && affinitiesRef.current) {
        affinitiesRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [selectedMenu]);

  return (
    <div>
      <FilterPanel
        campaigns={campaigns}
        vehicles={vehicles}
        selectedCampaign={selectedCampaign}
        selectedVehicle={selectedVehicle}
        dateRange={dateRange}
        onCampaignChange={setSelectedCampaign}
        onVehicleChange={setSelectedVehicle}
        onDateRangeSelect={setDateRange}
      />
      <div ref={impressionsRef} id="impressions">
        <Impressions />
      </div>
      <div ref={demographicsRef} id="demographics">
        <Demographics />
      </div>
      <div ref={affinitiesRef} id="affinities">
        <Affinities />
      </div>
    </div>
  );
};

export default Reports;
