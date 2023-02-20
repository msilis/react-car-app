import style from "./filterCar.module.css";

export default function FilterCar() {
  return (
    <div className={style.filterContainer}>
      <h3 className={style.filterText}>Filter by year</h3>
      <input placeholder="Enter year" className={style.filterInput} />
      <button>Filter</button>
    </div>
  );
}
