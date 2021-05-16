import classes from './Home.module.css';
import {QuizContainer} from './QuizContainer/QuizContainer'
import {useQuiz} from '../../Store/QuizContext/QuizContext'
import {Button} from '@material-ui/core'
import {useHistory} from 'react-router-dom'

export const Home=()=>{
    const {quizes}=useQuiz();
    const {push}=useHistory()

    return(
        <div className={classes["homepage-container"]}>
            <ul className={classes["active-quizes"]}>
                {
                    quizes.map(({id,name,image,description})=>(
                        <QuizContainer
                            key={id}
                            id={id}
                            name={name}
                            image={image}
                            description={description}
                        />
                    ))
                }
            </ul>
            <div className={classes["create-quiz-personal-scores"]}>
            <Button 
                variant="outlined"  
                color="primary"
                fullWidth
                size="large"
                onClick={()=>push("/create-quiz")}
            >
                Create Quiz
            </Button>
            </div>
        </div>
    )
}