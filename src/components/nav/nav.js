import AddCar from '../navComponents/addCar';
import FilterCar from '../navComponents/filterCar';
import style from './nav.module.css';

export default function NavSidebar(){
    return(
        <div className={style.sidebarContainer}>
            <AddCar />
            <FilterCar />
        </div>
    )
}