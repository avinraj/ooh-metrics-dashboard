import { duroflexEmail } from "../../../Data/users";
import StorageService from "../../core/services/storage.serive";
import DuroflexMap from "./DuroflexMap";
import Map from "./Map";

const MapView = () => {
  const storageService = new StorageService();
  const email = storageService.get("local", "email");
  return <>{email === duroflexEmail ? <DuroflexMap /> : <Map />}</>;
};

export default MapView;
