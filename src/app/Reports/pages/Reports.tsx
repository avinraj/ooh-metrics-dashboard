import { useState } from "react";
import Affinities from "../components/Affinities";
import Demographics from "../components/Demographics";
import Impressions from "../components/Impressions";
import FilterPanel from "../../MapView/components/FilterPanel";

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

  // Example campaigns and vehicles (you can replace this with actual data from API or props)
  const campaigns = ["Campaign 1", "Campaign 2", "Campaign 3"];
  const vehicles = ["Car 1", "Car 2", "Car 3"];
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
      <Impressions />
      <Demographics />
      <Affinities />
    </div>
  );
};

export default Reports;
