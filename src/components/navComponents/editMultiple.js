import { useRef } from "react";
import style from "./editMultiple.module.css";

export default function EditMultiple(props) {
    //Pull in props for carUpdated state
    const carUpdated = props.carUpdated;
    const setCarUpdated = props.setCarUpdated;
    //Refs to grab input from user
    const oldValue = useRef();
    const newValue = useRef();

  function handleEditSaveClick() {
    //Organise data to send to server
    const data = {
        oldValue: oldValue.current?.value,
        newValue: newValue.current?.value
    };
    try{
        fetch("/cars", {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        }).then((result)=> result.json).then((info)=> console.log(info));
        //Toggle state so carContainer re-renders
        setCarUpdated(!carUpdated)
        //Reset inputs to empty
        oldValue.current.value = "";
        newValue.current.value = "";
    }catch (err){
        console.json({ message: err.message })
    }
  }
  return (
    <div className={style.editMultipleContainer}>
      <h3>Change Owners</h3>
      <input placeholder="Old Owner" className={style.editCarInput} ref={oldValue}/>
      <input placeholder="New Owner" className={style.editCarInput} ref={newValue}/>
      <button type="submit" onClick={handleEditSaveClick}>
        Save
      </button>
    </div>
  );
}
