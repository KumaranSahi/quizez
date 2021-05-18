import { IconButton } from '@material-ui/core'
import {Delete,Edit} from '@material-ui/icons'
import classes from './QuestionListItem.module.css'

type QuestionListItemType={
    id:string;
    question:string;
    selectedQuestion:(id:string)=>void;
    points:number;
}

export const QuestionListItem=({id,question,selectedQuestion,points}: QuestionListItemType )=>{
    
    return(
        <div className={classes["quesiton-container"]}>
            <p className={classes["question"]}>{question} ( points: {points} )</p>

            <div className={classes["action-buttons"]}>
                <IconButton
                    color="primary"
                    onClick={()=>selectedQuestion(id)}
                >
                    <Edit/>
                </IconButton>       
                <IconButton
                    color="secondary"
                >
                    <Delete/>
                </IconButton>
            </div>
        </div>
    )
}