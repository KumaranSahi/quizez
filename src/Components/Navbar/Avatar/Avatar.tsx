import classes from './Avatar.module.css';
import profileImage from '../../../Assets/profileimage.jpg'

export const Avatar=()=>{
    return(
        <div className={classes["name-avatar-container"]}>
            <p>Hello, Random guy</p>
            <div className={classes["avatar-container"]}>
                <img src={profileImage} className={classes["avatar"]}  alt="Active avatar"/>
                <div className={`${classes["avatar-bubble"]} ${classes["bubble-active"]}`}></div>
            </div>
        </div>
    )
}
