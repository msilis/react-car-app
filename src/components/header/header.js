import style from './header.module.css';
import carImage from '../../media/r-a-mukerjea-Hw1hxtjXEP0-unsplash.jpg'

export default function HeaderContainer(){
    return(
        <div className={style.headerContainer}>
            <h1 className={style.inventoryTitle}>Car Inventory</h1>
            <img src={carImage} alt="Car banner" className={style.carImage}/>
        </div>
    )
}