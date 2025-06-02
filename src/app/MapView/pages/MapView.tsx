import { useSelector } from "react-redux";
import { duroflexEmail } from "../../../Data/users";
import StorageService from "../../core/services/storage.serive";
import DuroflexMap from "./DuroflexMap";
import Map from "./Map";
import BillboardsMap from "./BillboardsMap";

const MapView = () => {
  const storageService = new StorageService();
  const email = storageService.get("local", "email");
  const { selectedAdType } = useSelector((state: any) => state?.selectedAdType);
  return (
    <>
      {email === duroflexEmail ? (
        <DuroflexMap />
      ) : selectedAdType?.value === "digitalBillboards" ||
        selectedAdType?.value === "staticBillboards" ? (
        <BillboardsMap />
      ) : (
        <Map />
      )}
    </>
  );
};

export default MapView;
