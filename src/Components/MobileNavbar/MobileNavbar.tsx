import classes from './MobileNavbar.module.css'
import {faHome,faHistory,faBookOpen,faBook} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {NavLink} from 'react-router-dom';
import { useAuth } from '../../Store/AuthContext/AuthContext';

export const MobileNavbar=()=>{
    const {isAdmin}=useAuth()
    return(
        <div className={classes["mobile-nav-bar"]}>
            <p className={classes["nav-button"]}>
                <NavLink to="/" exact activeClassName={classes["active-mobile"]}>
                    <FontAwesomeIcon icon={faHome}/>
                </NavLink>
            </p>
            <p className={classes["nav-button"]}>
                <NavLink to="/mobile-leaderboard" activeClassName={classes["active-mobile"]}>
                    <FontAwesomeIcon icon={faBookOpen}/>
                </NavLink>
            </p>
            {isAdmin&&<p className={classes["nav-button"]}>
                <NavLink to="/my-quizes" activeClassName={classes["active-mobile"]}>
                    <FontAwesomeIcon icon={faBook}/>
                </NavLink>
            </p>}
            <p className={classes["nav-button"]}>
                <NavLink to="/my-scores" activeClassName={classes["active-mobile"]}>
                    <FontAwesomeIcon icon={faHistory}/>
                </NavLink>
            </p>
        </div>
    )
}