import classes from './QuizEditing.module.css'
import {useLocation} from 'react-router-dom'
import {useEffect,useState } from 'react'
import {useQuiz} from '../../Store/QuizContext/QuizContext'
import {useAuth} from '../../Store/AuthContext/AuthContext'
import {Button} from '@material-ui/core'
import {QuizModal} from './QuizModal/QuizModal'

export const QuizEditing=()=>{
    const {search}=useLocation()
    const {getQuiz,creatingQuiz,dispatch,setQuizLoading}=useQuiz()
    const {token}=useAuth()
    const [quizModalOpen,setQuizModalOpen]=useState(false)

    useEffect(()=>{
        getQuiz(search.substring(1),token,dispatch,setQuizLoading,true)
    },[search])

    return(
        <div className={classes["edit-quiz-page"]}>
            <div className={classes["edit-quiz-container"]}>
                <h1>
                    {creatingQuiz && creatingQuiz.name}
                </h1>
                <Button
                    variant="contained"
                    fullWidth
                    color="primary"
                    onClick={()=>setQuizModalOpen(true)}
                >
                    Add a question
                </Button>
                <QuizModal
                    open={quizModalOpen}
                    setOpen={setQuizModalOpen}
                    type="NEW_QUESTION"
                    quiz={creatingQuiz?.id}
                />
            </div>
        </div>
    )
}