import { useSelector } from "react-redux";
import Cars from "../components/Cars";
import Buses from "../components/Buses";
import Trucks from "../components/Trucks";
import Escooters from "../components/Escooters";
import TwoWheerlers from "../components/TwoWheelers";
import Rickshaws from "../components/Rickshaws";

const Vehicles = () => {
  const { selectedAdType } = useSelector((state: any) => state?.selectedAdType);

  return selectedAdType?.value === "cars" ? (
    <Cars />
  ) : selectedAdType?.value === "buses" ? (
    <Buses />
  ) : selectedAdType?.value === "trucks" ? (
    <Trucks />
  ) : selectedAdType?.value === "escooters" ? (
    <Escooters />
  ) : selectedAdType?.value === "twowheelers" ? (
    <TwoWheerlers />
  ) : selectedAdType?.value === "rickshaws" ? (
    <Rickshaws />
  ) : null;
};

export default Vehicles;
