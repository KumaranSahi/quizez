import classes from './Question.module.css'
import {useState,useEffect} from 'react'
import {Question as QuestionType} from '../../../Store/QuizContext/QuizContext.types'
import {FormGroup,FormControlLabel,Checkbox,RadioGroup,Radio,Button} from '@material-ui/core'
import {KeyboardArrowRight,SaveAlt} from '@material-ui/icons'
import {useQuiz} from '../../../Store/QuizContext/QuizContext'
import {usePlayQuiz} from '../../../Store/PlayQuizContext/PlayQuizContext'

interface QuestionProps extends QuestionType{
    totalQuestions:number;
    currentIndex:number
}

export const Question=({id,multipleCorrect,options,points,question,hint,negativePoints,totalQuestions,currentIndex}:QuestionProps)=>{
    const [timer,setTimer]=useState(30)
    const [checked,setChecked]=useState<string[]>([])
    const [showHint,setShowHint]=useState(false)

    const {currentQuiz}=useQuiz()
    const {dispatch,score:totalScore}=usePlayQuiz()

    useEffect(()=>{
        let time=setInterval(()=>setTimer(state=>state-1),1000);
        if(timer===0){
            clearInterval(time);
            setChecked([]);
            currentIndex===totalQuestions ? submitButtonClicked()
            :dispatch({
                type:"LOAD_QUESTION",
                payload:currentQuiz.questions![currentIndex]
            })
            setTimer(30)
        }
        return ()=>clearInterval(time)
    },[timer])

    const submitButtonClicked=()=>{
        
    }

    const optionClicked=(id:string)=>{
        if(multipleCorrect){
            if(checked.some(optionId=>id===optionId)){
                setChecked(options=>options.filter(optionId=>optionId!==id))
            }else{
                checked.length>0?setChecked(state=>[...state,id]):setChecked([id])
            }
        }else{
            setChecked([id])
        }
    }

    const nexButtonClicked=()=>{
        let score=0
        if(checked.length>0){
            if(multipleCorrect){
                let correctOptions=0;
                let selectedCorrectOptions=0
                options.forEach(({id,isCorrect})=>{
                    isCorrect && correctOptions++
                    checked.includes(id!) && isCorrect && selectedCorrectOptions++
                })
                if(correctOptions===selectedCorrectOptions){
                    if(showHint){
                        score=points/2
                    }else{
                        score=points;
                    }
                }else if(negativePoints&&negativePoints!==0){
                    score=-negativePoints;
                }
            }else{
                options.forEach(({id,isCorrect})=>{
                    if(id===checked[0] && isCorrect){
                        if(showHint){
                            score=points/2
                        }else{
                            score=points;
                        }
                    }else if(negativePoints&&negativePoints!==0){
                        score=-negativePoints;
                    }
                })
            }
        }
        dispatch({
            type:"SET_SCORE",
            payload:totalScore+score
        })
        dispatch({
            type:"LOAD_QUESTION",
            payload:currentQuiz.questions![currentIndex]
        })
        setChecked([])
        setTimer(30)
    }
    
    return(
        <div className={classes["question-container"]}>
            <div className={classes["index-points-timer"]}>
                <p>{currentIndex}/{totalQuestions}</p>
                <p>Timer: {timer}</p>
                <p>Points: {showHint? points/2 :points}</p>
            </div>
            <p className={classes["question"]}>
                {question}
            </p>
            {
                    multipleCorrect?(
                        <>
                            <FormGroup>
                                {options && options.map(({content,id})=>
                                    <FormControlLabel
                                        key={id}
                                        control={<Checkbox 
                                            name={content} 
                                            checked={checked.some(value=>id===value)} 
                                            onClick={()=>optionClicked(id!)}
                                        />}
                                        label={content}
                                    />
                                )}
                            </FormGroup>
                        </>
                    ):(
                        <>
                            <RadioGroup aria-label="option" name="option">
                                {
                                    options?.map(({id,content})=>(
                                        <FormControlLabel 
                                            key={id}
                                            control={<Radio
                                                color="primary"
                                                name={content} 
                                                checked={checked.some(value=>id===value)}
                                                onClick={()=>optionClicked(id!)}
                                            />} 
                                            label={content}
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </>
                    )
                }
                {hint&&
                <Button
                    color="primary"
                    variant="outlined"
                    disabled={showHint}
                    onClick={()=>setShowHint(true)}
                >
                    Show hint
                </Button>}
                {showHint&&
                    <p className={classes["hint"]}>
                        {hint}
                    </p>
                }
                <div style={{textAlign:"right",margin:"1rem"}}>
                    {currentIndex===totalQuestions?(<Button
                        variant="contained"
                        color="primary"
                        endIcon={<KeyboardArrowRight/>}
                        onClick={nexButtonClicked}
                    >
                        Next
                    </Button>):(<Button
                        variant="contained"
                        color="primary"
                        endIcon={<SaveAlt/>}
                        onClick={submitButtonClicked}
                    >
                        Submit
                    </Button>)}
                </div>
        </div>
    )
}