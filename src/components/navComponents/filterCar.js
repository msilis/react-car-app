import style from "./filterCar.module.css";

export default function FilterCar(props) {
  //pull in props from navbar
  const setFilteredCars = props.setFilteredCars;
  

  //Function to take care of filter button being clicked

  async function handleFilterClick() {
    try {
      const response = await fetch("/cars/filter");
      const result = await response.json();
      const filteredCarArray = result.map((car) => ({
        id: car._id,
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

  return (
    <div className={style.filterContainer}>
      <h3 className={style.filterText}>Show cars older than 5 years</h3>
      <button onClick={handleFilterClick}>Filter</button>
    </div>
  );
}
