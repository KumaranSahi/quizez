import classes from './Home.module.css';
import {QuizContainer} from './QuizContainer/QuizContainer'
import {useQuiz} from '../../Store/QuizContext/QuizContext'
import {Button} from '@material-ui/core'
import {useHistory} from 'react-router-dom'
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper} from '@material-ui/core';

export const Home=()=>{
    const {quizes,leaderBoard}=useQuiz();
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
                <hr/>
                <Button 
                    variant="contained"  
                    color="primary"
                    fullWidth
                    size="large"
                    onClick={()=>push("/my-quizes")}
                >
                    My Quizes
                </Button>    
                <h1>
                    Top 10 Leader Board
                </h1>
                <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes["table-head-cell"]}>Player</TableCell>
                            <TableCell className={classes["table-head-cell"]} align="right">Quiz</TableCell>
                            <TableCell className={classes["table-head-cell"]} align="right">Score</TableCell>
                        </TableRow>
                    </TableHead>
                <TableBody>
                {leaderBoard.map(({id,score,userName,quizName})=>(
                    <TableRow key={id} className={classes["tablebody-row"]}>
                        <TableCell>{userName}</TableCell>
                        <TableCell align="right">{quizName}</TableCell>
                        <TableCell align="right">{score}</TableCell>
                        
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
            </div>
        </div>
    )
}