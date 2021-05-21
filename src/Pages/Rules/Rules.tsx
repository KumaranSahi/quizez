import classes from './Rules.module.css'
import {useQuiz} from '../../Store/QuizContext/QuizContext'
import {Button} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import {usePlayQuiz} from '../../Store/PlayQuizContext/PlayQuizContext'

export const Rules=()=>{
    const {currentQuiz,calculateTotalScore,quizLoading}=useQuiz()
    const {dispatch}=usePlayQuiz()
    const {push}=useHistory()
    return(
        <div className={classes["rules-page"]}>
            <div className={classes["rules-container"]}>
                <h1>Rules</h1>
                {currentQuiz&&(<div className={classes["quiz-info"]}>
                    <h2>{currentQuiz.name}</h2>
                    <h2>Total Points : {calculateTotalScore(currentQuiz)}</h2>
                </div>)}
                <ul className={classes["rules-list"]}>
                    <li>
                        You get 30 seconds to answer each question.
                    </li>
                    <li>
                        If the question times out no point is scored.
                    </li>
                    <li>
                        Each question has its own points.
                    </li>
                    <li>
                        Some questions may carry negative points.
                    </li>
                    <li>
                        Some questions may have hints.
                    </li>
                    <li>
                        Using hints for question will only give you half the points.
                    </li>
                    <li>
                        Once the game has started you cannot navigate away or reload
                    </li>
                    <li>
                        If you are ready to start click on the play button and may the odds be forever in your favour!
                    </li>
                </ul>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={quizLoading}
                    onClick={()=>{
                        push("/play-quiz")
                        dispatch({type:"START_QUIZ"})
                        currentQuiz && currentQuiz.questions && dispatch({type:"LOAD_QUESTION",payload:currentQuiz.questions[0]})
                    }}
                >
                    Play Game!
                </Button>
            </div>    
        </div>
    )
}