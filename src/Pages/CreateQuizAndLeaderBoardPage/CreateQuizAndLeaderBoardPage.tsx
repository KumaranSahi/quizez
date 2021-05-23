import classes from './CreateQuizAndLeaderBoard.module.css'
import {CreateQuizAndLeaderBoard} from '../../Components'

export const CreateQuizAndLeaderBoardPage=()=>{
    return(
        <div className={classes["create-quiz-leaderboard-page"]}>
            <div className={classes["create-quiz-leaderboard-container"]}>
                <CreateQuizAndLeaderBoard/>
            </div>
        </div>
    )
}