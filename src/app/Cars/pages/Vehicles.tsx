import { useSelector } from "react-redux";
import Cars from "../components/Cars";
import Buses from "../components/Buses";
import Trucks from "../components/Trucks";
import Escooters from "../components/Escooters";
import TwoWheerlers from "../components/TwoWheelers";

const Vehicles = () => {
  const { selectedAdType } = useSelector((state: any) => state?.selectedAdType);

  return selectedAdType?.value === "cars" ? (
    <Cars />
  ) : selectedAdType?.value === "buses" ? (
    <Buses />
  ) : selectedAdType?.value === "trucks" ? (
    <Trucks />
  ): selectedAdType?.value === "escooters" ? (
    <Escooters />
  ): selectedAdType?.value === "twowheelers" ? (
    <TwoWheerlers />
  ) : null;
};

export default Vehicles;
