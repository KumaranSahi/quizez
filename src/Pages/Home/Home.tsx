import classes from './Home.module.css';

export const Home=()=>{

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