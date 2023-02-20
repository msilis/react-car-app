import { useEffect, useState } from "react";
import style from "./App.module.css";
import HeaderContainer from "./components/header/header";
import NavSidebar from "./components/nav/nav";

function App() {
  //App state
  const [currentCars, setCurrentCars] = useState([]);

  //Get list of cars from database on initial page load

  useEffect(() => {
    async function getCars() {
      try {
        const response = await fetch("/cars");
        console.log(response)
        const result = await response.json();
        const carArray = result.map((car)=>({
        modelYear: car.modelYear,
        make: car.make,
        currentOwner: car.currentOwner,
        registration: car.registration,
        address: car.address
      }));
      
      setCurrentCars(carArray);
        console.log(result);
      } catch (err) {
        console.log({ message: err.message });
      }
    }
    getCars();
  }, []);

  console.log(currentCars);

  return (
    <div className={style.App}>
      <div className={style.headerWrapper}>
        <HeaderContainer />
      </div>
      <div className={style.navWrapper}>
        <NavSidebar />
      </div>
    </div>
  );
}

export default App;
