import classes from './Home.module.css';
import {useEffect} from 'react'
import {useAuth} from '../../Store/AuthContext/AuthContext'
import {useHistory} from 'react-router-dom'

export const Home=()=>{
    const {push}=useHistory()
    const {token}=useAuth()
    
    useEffect(()=>{
        if(!token){
            push({pathname:"/sign-up"})
            console.log("YOYO")
        }
    },[token])

    return(
        <div className={classes["homepage-container"]}>
            <div className={classes["active-quizes"]}>
                Quizes
            </div>
            <div className={classes["create-quiz-personal-scores"]}>
                Create Quiz and personal scores
            </div>
        </div>
    )
}