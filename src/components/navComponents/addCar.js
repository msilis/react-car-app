import React from "react";
import { useRef } from "react";
import style from "./addCar.module.css";

export default function AddCar(props) {
  //refs to get user inputs

  const newModelYear = useRef();
  const newMake = useRef();
  const newCurrentOwner = useRef();
  const newRegistration = useRef();
  const newAddress = useRef();

  //State to keep track of car being added
  const setCarAdded = props.setCarAdded;

  function submitCarHandler() {
    //Variable which will hold the data passed to the fetch statement
    const carData = {
      modelYear: newModelYear.current?.value,
      make: newMake.current?.value,
      currentOwner: newCurrentOwner.current?.value,
      registration: newRegistration.current?.value,
      address: newAddress.current?.value,
    };
    try {
      fetch("/cars", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(carData),
      })
        .then((result) => result.json)
        .then((info) => console.log(info));
      //Toggle state to trigger re-render of cardContainer component
      setCarAdded(true);
      //Clear inputs after car has been added
      newModelYear.current.value = "";
      newMake.current.value = "";
      newCurrentOwner.current.value = "";
      newRegistration.current.value = "";
      newAddress.current.value = "";
    } catch (err) {
      console.json({ message: err.message });
    }
  }

  return (
    <div className={style.addCarContainer}>
      <h3>Add a car</h3>
      <input
        className={style.addCarInput}
        ref={newModelYear}
        id="newModelYear"
        placeholder="Model Year"
      />
      <input className={style.addCarInput} ref={newMake} placeholder="Make" />
      <input
        className={style.addCarInput}
        ref={newCurrentOwner}
        placeholder="Current Owner"
      />
      <input
        className={style.addCarInput}
        ref={newRegistration}
        placeholder="Registration"
      />
      <input
        className={style.addCarInput}
        ref={newAddress}
        placeholder="Address"
      />
      <button onClick={submitCarHandler}>Save Car</button>
    </div>
  );
}
