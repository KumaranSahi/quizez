import {useEffect} from 'react'
import classes from './PlayQuiz.module.css'
import {useQuiz} from '../../Store/QuizContext/QuizContext'
import {usePlayQuiz} from '../../Store/PlayQuizContext/PlayQuizContext'
import {Prompt} from 'react-router-dom'


export const PlayQuiz=()=>{
    const {playQuizMode} =usePlayQuiz()
    useEffect(() => {
        window.addEventListener("beforeunload", alertUser);
        return () => {
          window.removeEventListener("beforeunload", alertUser);
        };
      }, []);
      const alertUser = (e:Event) => {
        e.preventDefault();
        e.returnValue = false;
      };

    return(
        <div>
            <Prompt
                when={playQuizMode}
                message="The game will be lost, Are you sure you want to navigate away?"
            />

        </div>
    )
}