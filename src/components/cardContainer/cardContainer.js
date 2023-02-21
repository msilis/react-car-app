import style from "./cardContainer.module.css";
import editIcon from "../../media/icons8-pencil-30.png";
import deleteIcon from "../../media/icons8-remove-30.png";
import infoIcon from "../../media/icons8-info-squared-24.png";

export default function CardContainer(props) {
  //Pull in car array through props
  const carArray = props.carArray;
  //Pull in the various states through props

  //Let React know car was deleted
  const setCarDeleted = props.setCarDeleted;
  const carDeleted = props.carDeleted;
  //Let React know edit button was clicked triggering modal
  const setShowEditModal = props.setShowEditModal;
  //Get ID of car to be edited so it can be sent to modal
  const setCarId = props.setCarId;
  //Tell React to trigger info modal
  const setShowInfoModal = props.setShowInfoModal;
  //Props filtered cars
  const filteredCars = props.filteredCars;
  const setFilteredCars = props.setFilteredCars;

  function handleButtonClick(event) {
    //grab target of click event
    const buttonClick = event.target.id;
    //get the id of the parent that was clicked, this should be the car id created by MongoDB
    const carId = event.target.parentNode.parentNode.id;

    if (buttonClick === "delete") {
      //toggle delete state so component re-renders
      setCarDeleted(!carDeleted);
      try {
        //Send car id to api with delete message
        fetch(`/cars/${carId}`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        }).then((response) => {
          console.log(response);
        });
      } catch (err) {
        console.json({ message: err.message });
      }
    } else if (buttonClick === "edit") {
      //set state for carId and edit modal
      setCarId(carId);
      setShowEditModal(true);
    } else if (buttonClick === "info") {
      //set state for carId and info modal
      setCarId(carId);
      setShowInfoModal(true);
    }
  }

  //function to render filtered cars

  const filteredCarsInfo = Object.values(filteredCars).map((car, index) => {
    return (
      <div id={car.id} key={index} className={style.carInfoCard}>
        <div className={style.infoCardText}>
          <h3>{car.make}</h3>
          <h4>{car.modelYear}</h4>
          <h4>{car.currentOwner}</h4>
        </div>
        <div className={style.infoCardButtons} onClick={handleButtonClick}>
          <img
            src={editIcon}
            alt="Edit Icon"
            id="edit"
            className={style.cardButton}
          />
          <img
            src={deleteIcon}
            alt="Delete Icon"
            id="delete"
            className={style.cardButton}
          />
          <img
            src={infoIcon}
            alt="Info Icon"
            id="info"
            className={style.cardButton}
          />
        </div>
      </div>
    );
  });

  const carInfoCard = Object.values(carArray).map((car, index) => {
    return (
      <div id={car.id} key={index} className={style.carInfoCard}>
        <div className={style.infoCardText}>
          <h3>{car.make}</h3>
          <h4>{car.modelYear}</h4>
          <h4>{car.currentOwner}</h4>
        </div>
        <div className={style.infoCardButtons} onClick={handleButtonClick}>
          <img
            src={editIcon}
            alt="Edit Icon"
            id="edit"
            className={style.cardButton}
          />
          <img
            src={deleteIcon}
            alt="Delete Icon"
            id="delete"
            className={style.cardButton}
          />
          <img
            src={infoIcon}
            alt="Info Icon"
            id="info"
            className={style.cardButton}
          />
        </div>
      </div>
    );
  });

  return (
    <div className={style.cardContainer}>
      {filteredCars.length === 0 ? carInfoCard : filteredCarsInfo}
    </div>
  );
}
