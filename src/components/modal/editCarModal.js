import React from "react";
import { useRef } from "react";
import style from "./editCarModal.module.css";

export default function EditCarModal(props) {
  //pull in modal state to decide whether to show modal
  const modalState = props.showEditModal
    ? style.modalVisible
    : style.modalHidden;
  const setShowEditModal = props.setShowEditModal;
  //Get array of cars
  const carArray = props.carArray;
  //Get ID of car which had edit button clicked
  const carId = props.carId;
  //Props for letting react know car was updated
  const setCarUpdated = props.setCarUpdated;

  //Handle cancel button being clicked, will set modal state to false
  function handleCancelClick() {
    setShowEditModal(false);
  }
  //Get values from car in array which is going to be edited
  const carToEdit =
    carId.length !== 0 ? carArray.find((car) => car.id === carId) : "";
  const editCarYear = carToEdit.modelYear;
  const editCarMake = carToEdit.make;
  const editCarOwner = carToEdit.currentOwner;
  const editCarRegistration = carToEdit.registration;
  const editCarAddress = carToEdit.address;

  //Refs to get values from input
  const inputCarYear = useRef();
  const inputCarMake = useRef();
  const inputCarOwner = useRef();
  const inputCarRegistration = useRef();
  const inputCarAddress = useRef();

  function handleSaveClick() {
    const carData = {
      modelYear:
        inputCarYear.current?.value !== ""
          ? inputCarYear.current?.value
          : editCarYear,
      make:
        inputCarMake.current?.value !== ""
          ? inputCarMake.current?.value
          : editCarMake,
      currentOwner:
        inputCarOwner.current?.value !== ""
          ? inputCarOwner.current?.value
          : editCarOwner,
      registration:
        inputCarRegistration.current?.value !== ""
          ? inputCarRegistration.current?.value
          : editCarRegistration,
      address:
        inputCarAddress.current?.value !== ""
          ? inputCarAddress.current?.value
          : editCarAddress,
    };
    try {
      fetch("/cars/" + carId, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(carData),
      })
        .then((result) => result.json)
        .then((info) => console.log(info));
      //set state so list re-renders
      setCarUpdated(true);
      //call cancel function so modal closes
      handleCancelClick();
    } catch (err) {
      console.json({ message: err.message });
    }
  }

  return (
    <div className={modalState}>
      <div className={style.modalContainer}>
        <div className={style.editInput}>
          <input placeholder={editCarYear} ref={inputCarYear} />
          <input placeholder={editCarMake} ref={inputCarMake} />
          <input placeholder={editCarOwner} ref={inputCarOwner} />
          <input placeholder={editCarRegistration} ref={inputCarRegistration} />
          <input placeholder={editCarAddress} ref={inputCarAddress} />
        </div>
        <div className={style.editButtonContainer}>
          <button type="submit" onClick={handleSaveClick}>
            Save
          </button>
          <button type="submit" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
