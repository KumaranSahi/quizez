import classes from './Avatar.module.css';
import {useState, SyntheticEvent} from 'react'
import profileImage from '../../../Assets/profileimage.jpg'
import {useAuth} from '../../../Store/AuthContext/AuthContext'
import {Menu,MenuItem} from '@material-ui/core'

export const Avatar=()=>{
    const {userName,image,signOutUser,dispatch}=useAuth()
    const [anchorEl, setAnchorEl] = useState<Element|null>(null);

    const handleClick = (event:SyntheticEvent) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const handleLogout=()=>{
        signOutUser(dispatch)
        handleClose()
    }

    return(
        <>
            <div className={classes["name-avatar-container"]} onClick={handleClick}>
                <p className={classes["name-container"]}>Hello, {userName}</p>
                <div className={classes["avatar-container"]}>
                    <img src={image?image:profileImage} className={classes["avatar"]}  alt="Active avatar"/>
                    <div className={`${classes["avatar-bubble"]} ${classes["bubble-active"]}`}></div>
                </div>
            </div>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </>
    )
}
