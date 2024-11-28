import { useSelector } from "react-redux";
import MobileAdReports from "./MobileAdReports";
import Reports from "./Reports";

const ReportsMain = () => {
  const { selectedAdType } = useSelector((state: any) => state?.selectedAdType);

  return (
    <div>
      {selectedAdType?.value === "mobileAds" ? <MobileAdReports /> : <Reports />}
    </div>
  );
};

export default ReportsMain;
