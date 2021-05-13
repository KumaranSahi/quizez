import classes from "./Navbar.module.css"
import {Avatar} from './Avatar/Avatar'

export const Navbar=()=>{
    return (
    <div className={classes["navbar-container"]}>
        <h1 className={classes["navbar-logo"]}>QuizEz</h1>
        <Avatar/>
    </div>)
}