import React from "react";
import style from "./filterCar.module.css";

export default function FilterCar(props) {
  //pull in props from navbar
  const setFilteredCars = props.setFilteredCars;
  const filteredCars = props.filteredCars;

  //Function to take care of filter button being clicked

  async function handleFilterClick() {
    try {
      const response = await fetch("/cars/filter");
      const result = await response.json();
      console.log(result);
      const filteredCarArray = result.map((car) => ({
        modelYear: car.modelYear,
        make: car.make,
        currentOwner: car.currentOwner,
        registration: car.registration,
        address: car.address,
      }));
      setFilteredCars(filteredCarArray);
    } catch (err) {
      console.log({ message: err.message });
    }
  }

  //Function to reset filter view
  function handleClearFilter() {
    setFilteredCars([]);
  }

  const clearButton = <button onClick={handleClearFilter}>Clear Filter</button>;
  const filterButton = <button onClick={handleFilterClick}>Filter</button>;

  return (
    <div className={style.filterContainer}>
      <h3 className={style.filterText}>Show cars older than 5 years</h3>
      {filteredCars.length === 0 ? filterButton : clearButton}
    </div>
  );
}
