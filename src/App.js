import { useEffect, useState } from "react";
import style from "./App.module.css";
import CardContainer from "./components/cardContainer/cardContainer";
import HeaderContainer from "./components/header/header";
import EditCarModal from "./components/modal/editCarModal";
import InfoModal from "./components/modal/infoModal";
import NavSidebar from "./components/nav/nav";

function App() {
  //App state
  //State for array of cars stored in database
  const [currentCars, setCurrentCars] = useState([]);
  //State to keep track of car being added
  const [carAdded, setCarAdded] = useState(false);
  //State to keep track of car being updated
  const [carUpdated, setCarUpdated] = useState(false);
  //State to keep track of car being deleted
  const [carDeleted, setCarDeleted] = useState(false);
  //State for Edit Modal
  const [showEditModal, setShowEditModal] = useState(false);
  //State for Info Modal
  const [showInfoModal, setShowInfoModal] = useState(false);
  //State for car ID
  const [carId, setCarId] = useState("");
  //Array of filtered cars
  const [filteredCars, setFilteredCars] = useState([]);

  //Get list of cars from database on initial page load

  useEffect(() => {
    async function getCars() {
      try {
        const response = await fetch("/cars");
        const result = await response.json();
        //Map result of fetch call to an array I can use in the page
        const carArray = result.map((car) => ({
          id: car._id,
          modelYear: car.modelYear,
          make: car.make,
          currentOwner: car.currentOwner,
          registration: car.registration,
          address: car.address,
        }));
        //Set the array in state
        setCurrentCars(carArray);
      } catch (err) {
        console.log({ message: err.message });
      }
    }
    //Call the function to get the list of cars from the database
    getCars();
  }, [carAdded, carDeleted, carUpdated]);

  return (
    <div className={style.App}>
      <div className={style.headerWrapper}>
        <HeaderContainer />
      </div>
      <div className={style.navWrapper}>
        <NavSidebar
          carAdded={carAdded}
          setCarAdded={setCarAdded}
          carUpdated={carUpdated}
          setCarUpdated={setCarUpdated}
          filteredCars={filteredCars}
          setFilteredCars={setFilteredCars}
          
        />
      </div>
      <div className={style.mainWrapper}>
        <CardContainer
          carArray={currentCars}
          carUpdated={carUpdated}
          setCarUpdated={setCarUpdated}
          carDeleted={carDeleted}
          setCarDeleted={setCarDeleted}
          setShowEditModal={setShowEditModal}
          setCarId={setCarId}
          setShowInfoModal={setShowInfoModal}
          filteredCars={filteredCars}
          setFilteredCars={setFilteredCars}
          
        />
      </div>
      <EditCarModal
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        carId={carId}
        carArray={currentCars}
        setCarUpdated={setCarUpdated}
        carUpdated={carUpdated}
      />
      <InfoModal
        showInfoModal={showInfoModal}
        setShowInfoModal={setShowInfoModal}
        carId={carId}
        carArray={currentCars}
      />
    </div>
  );
}

export default App;
