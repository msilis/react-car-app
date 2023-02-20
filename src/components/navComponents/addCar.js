import style from './addCar.module.css';

export default function AddCar(){
    return(
        <div className={style.addCarContainer}>
            <h3>Add a car</h3>
            <input className={style.addCarInput} placeholder="Model Year" />
            <input className={style.addCarInput} placeholder="Make" />
            <input className={style.addCarInput} placeholder="Current Owner" />
            <input className={style.addCarInput} placeholder="Address" />
            <button>Save Car</button>
        </div>
    )
}