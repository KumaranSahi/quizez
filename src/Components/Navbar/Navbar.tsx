import classes from "./Navbar.module.css"
import {Avatar} from './Avatar/Avatar'
import {useAuth} from '../../Store/AuthContext/AuthContext'

export const Navbar=()=>{
    const {token}=useAuth()
    return (
    <div className={classes["navbar-container"]}>
        <h1 className={classes["navbar-logo"]}>QuizEz</h1>
        {token?<Avatar/>:<div></div>}
    </div>)
}