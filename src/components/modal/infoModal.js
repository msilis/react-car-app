import React from "react";
import style from "./infoModal.module.css";

export default function InfoModal(props) {
  //Get state of info modal to conditionally set className
  const infoModalState = props.showInfoModal
    ? style.infoModalVisible
    : style.infoModalHidden;
  const setShowInfoModal = props.setShowInfoModal;
  //Get array of cars to use to pull info from
  const carArray = props.carArray;
  //Get ID of car for which info button was clicked
  const carId = props.carId;

  //Pull info from car array and assign to variables to use in display
  const carInfo =
    carId.length !== 0 ? carArray.find((car) => car.id === carId) : "";
  const modelYear = carInfo.modelYear;
  const carMake = carInfo.make;
  const carOwner = carInfo.currentOwner;
  const carRegistration = carInfo.registration;
  const carAddress = carInfo.address;

  function handleCloseClick() {
    setShowInfoModal(false);
  }

  return (
    <div className={infoModalState} onClick={handleCloseClick}>
      <div className={style.infoModalContainer}>
        <h4>{`Make: ${carMake}`}</h4>
        <ul>
          <li>{`Year: ${modelYear}`}</li>
          <li>{`Owner: ${carOwner}`}</li>
          <li>{`Registration: ${carRegistration}`}</li>
          <li>{`Address: ${carAddress}`}</li>
        </ul>
      </div>
      <h2 className={style.closeText}>Click anywhere to close</h2>
    </div>
  );
}
