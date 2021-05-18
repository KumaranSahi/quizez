import classes from './MyQuizes.module.css'
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Button} from '@material-ui/core';
import {useQuiz} from '../../Store/QuizContext/QuizContext'
import {useAuth} from '../../Store/AuthContext/AuthContext'
import { useEffect } from 'react';
import {useHistory} from 'react-router-dom'

export const MyQuizes=()=>{
    const {myQuizes,dispatch,quizLoading,setQuizLoading,getMyQuizes}=useQuiz()
    const {token,userId}=useAuth()
    const {push}=useHistory()
    
    useEffect(()=>{
        getMyQuizes(userId,token,dispatch,setQuizLoading)
    },[])

    return(
    <div className={classes["my-quizes-page"]}>
        <div className={classes["my-quizes-container"]}>
            <h1>
                My Quizes
            </h1>
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes["table-head-cell"]}>name</TableCell>
                        <TableCell className={classes["table-head-cell"]} align="right">Questions</TableCell>
                        <TableCell className={classes["table-head-cell"]} align="right">Total Score</TableCell>
                        <TableCell className={classes["table-head-cell"]} align="right">Edit</TableCell>
                    </TableRow>
                </TableHead>
            <TableBody>
            {myQuizes.map(({id,name,questions})=>(
                <TableRow key={id} className={classes["tablebody-row"]}>
                    <TableCell>{name}</TableCell>
                    <TableCell align="right">{questions?questions.length:0}</TableCell>
                    <TableCell align="right">Total Score</TableCell>
                    <TableCell align="right">
                        <Button variant="outlined" disabled={quizLoading} color="primary" onClick={()=>push({pathname:"/edit-quiz",search:id})}>
                            Edit Quiz
                        </Button>
                    </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        </div>
    </div>
    )
}