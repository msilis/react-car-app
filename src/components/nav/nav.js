import React from "react";
import AddCar from "../navComponents/addCar";
import EditMultiple from "../navComponents/editMultiple";
import FilterCar from "../navComponents/filterCar";
import style from "./nav.module.css";

export default function NavSidebar(props) {
  //Pull in props to send to components in navbar
  const carAdded = props.carAdded;
  const setCarAdded = props.setCarAdded;
  const carUpdated = props.carUpdated;
  const setCarUpdated = props.setCarUpdated;
  const filteredCars = props.filteredCars;
  const setFilteredCars = props.setFilteredCars

  return (
    <div className={style.sidebarContainer}>
      <AddCar carAdded={carAdded} setCarAdded={setCarAdded} />
      <EditMultiple carUpdated={carUpdated} setCarUpdated={setCarUpdated} />
      <FilterCar filteredCars={filteredCars} setFilteredCars={setFilteredCars}/>
    </div>
  );
}
