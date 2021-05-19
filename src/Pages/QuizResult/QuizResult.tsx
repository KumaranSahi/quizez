import classes from './QuizResult.module.css'
import {usePlayQuiz} from '../../Store/PlayQuizContext/PlayQuizContext'
import {useQuiz} from '../../Store/QuizContext/QuizContext'
import {useHistory} from 'react-router-dom'
import {Button} from "@material-ui/core"

export const QuizResult=()=>{
    const {calculateTotalScore,currentQuiz}=useQuiz()
    const {score,quizResponses,dispatch}=usePlayQuiz();
    const {push}=useHistory()

    return currentQuiz?(
        <div className={classes["quiz-result-page"]}>
            <div className={classes["quiz-result-container"]}>
                <h1 className={classes["congrats"]}>Congrats!</h1>
                <h2>Your score is <span className={classes["score-display"]}>{score}</span></h2>
                {
                    calculateTotalScore(currentQuiz)===score?
                        <h1 className={classes["all-correct-text"]}>Looks like you got all of it right!</h1>:
                        <>
                            <h3>Here are your results</h3>
                            <ul className={classes["response-list"]}>
                                {quizResponses.map(({content,response})=>(
                                <li className={response?classes["right-response"]:classes["wrong-response"]}>
                                    {content}
                                </li>))}
                            </ul>
                        </>
                }
                <Button
                    variant="contained"
                    color="primary"
                    onClick={()=>{
                        dispatch({type:"END_QUIZ"})
                        push("/")
                    }}
                >
                    Play more!
                </Button>
            </div>
        </div>
    ):null;
}