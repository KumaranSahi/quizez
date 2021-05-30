import classes from './QuizModal.module.css'
import {Question,Option} from '../../../Store/QuizContext/QuizContext.types'
import {SetStateAction, useState,Dispatch, SyntheticEvent} from 'react'
import {Modal,Backdrop,Fade,TextField,FormControlLabel
    ,Checkbox,RadioGroup,Radio,FormGroup, IconButton,FormHelperText,Button} from '@material-ui/core';
import {Add,Delete} from '@material-ui/icons'
import {useQuiz} from '../../../Store/QuizContext/QuizContext'
import {useAuth} from '../../../Store/AuthContext/AuthContext'

type PropTypes=
    |{type:"NEW_QUESTION";open:boolean;setOpen:Dispatch<SetStateAction<boolean>>;quiz:string}
    |{type:"EDIT_QUESTION";payload:Question;open:boolean;setOpen:Dispatch<SetStateAction<boolean>>;quiz:string}

export const QuizModal=(props:PropTypes)=>{
    const [question,setQuestion]=useState(props.type==="EDIT_QUESTION"?props.payload.question:"")
    const [options,setOptions]=useState<Option[]|null>(props.type==="EDIT_QUESTION"?props.payload.options:null)
    const [points,setPoints]=useState(props.type==="EDIT_QUESTION"?props.payload.points:0)
    const [negativePoints,setNegativePoints]=useState(props.type==="EDIT_QUESTION"&&props.payload.negativePoints?props.payload.negativePoints:0)
    const [multipleCorrect,setMultipleCorrect]=useState(props.type==="EDIT_QUESTION"?props.payload.multipleCorrect:false)
    const [hint,setHint]=useState(props.type==="EDIT_QUESTION"&&props.payload.hint?props.payload.hint:"")

    const [addOption,setAddOption]=useState("")
    const [addOptionError,setAddOptionError]=useState(false)

    const {createQuestion,editQuestion,dispatch,setQuizLoading,quizLoading,creatingQuiz}=useQuiz()
    const {token}=useAuth()

    const handleClose = () => {
        setQuestion("")
        setOptions(null)
        setPoints(0)
        setNegativePoints(0)
        setMultipleCorrect(false)
        setHint("")
        setAddOption("")
        props.setOpen(false);
    };

    const addOptionButtonClicked=()=>{
        if(addOption && !(options && options.some(({content})=>(content.toLowerCase()===addOption.toLowerCase())))){
            setOptions(state=>state?[...state,{content:addOption,isCorrect:false}]:[{content:addOption,isCorrect:false}])
            setAddOptionError(false)
            setAddOption("")
        }else{
            setAddOptionError(true)
            setAddOption("")
        }
    }

    const optionClicked=(id="",content:string,radio=false)=>{
        if(id){
            setOptions(state=>state && state.map(option=>option.id===id?{...option,isCorrect:!option.isCorrect}:{...option,isCorrect:radio?false:option.isCorrect}))
        }else{
            setOptions(state=>state && state.map(option=>option.content===content?{...option,isCorrect:!option.isCorrect}:{...option,isCorrect:radio?false:option.isCorrect}))
        }
    }

    const optionDeleteClicked=(id="",content:string)=>{
        if(id){
            setOptions(state=>state && state.filter(option=>option.id!==id))
        }else{
            setOptions(state=>state && state.filter(option=>option.content!==content))
        }
    }

    const questionSubmitted=(event:SyntheticEvent)=>{
        event.preventDefault();
        if(question && options && options.length>1 && options.some(({isCorrect})=>isCorrect) && points>0){
            if(props.type==="NEW_QUESTION"){
                createQuestion({
                    hint:hint,
                    multipleCorrect:multipleCorrect,
                    negativePoints:negativePoints,
                    options:options,
                    points:points,
                    question:question,
                    quiz:props.quiz,
                },token,setQuizLoading,dispatch,creatingQuiz)
                handleClose()
            }else{
                editQuestion({
                    hint:hint,
                    multipleCorrect:multipleCorrect,
                    negativePoints:negativePoints,
                    options:options,
                    points:points,
                    question:question,
                    quiz:props.quiz,
                },token,props.payload.id,setQuizLoading,dispatch,creatingQuiz)
                handleClose()
            }
        }
    }

    return(
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes["quiz-modal"]}
        open={props.open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <div className={classes["quiz-modal-paper"]}>
            <h2
                className={classes["quiz-modal-headings"]}
            >Add a question</h2>
            <form 
                className={classes["question-form"]}
                onSubmit={questionSubmitted}
            >
                <TextField 
                    label="Question"
                    fullWidth
                    multiline
                    required
                    value={question}
                    onChange={event=>setQuestion(event.target.value)} 
                    variant="outlined" 
                />
                <FormControlLabel
                    control={
                    <Checkbox
                        checked={multipleCorrect}
                        onChange={()=>{
                            setMultipleCorrect(state=>!state)
                            setOptions(state=>state && state.map(option=>({...option,isCorrect:false})))
                        }}
                        color="primary"
                    />
                    }
                    label="Has multiple correct answers"
                />
                <div className={classes["adjacent-textfield"]}>
                    <TextField 
                        label="Points"
                        type="number"
                        required
                        value={points}
                        onChange={event=>setPoints(+event.target.value)} 
                        variant="outlined" 
                    />
                    <TextField 
                        label="Negative Points"
                        type="number"
                        value={negativePoints}
                        onChange={event=>setNegativePoints(+event.target.value)} 
                        variant="outlined" 
                    />
                </div>
                <h3
                    className={classes["quiz-modal-headings"]}
                >
                    Options(atleast 2 options)
                </h3>
                {
                    multipleCorrect?(
                        <>
                            <FormGroup>
                                {options && options.map(({content,isCorrect,id})=>
                                (<div key={content} className={classes["option"]}>
                                    <FormControlLabel
                                        key={id?id:content}
                                        control={<Checkbox 
                                            name={content} 
                                            checked={isCorrect} 
                                            onClick={()=>optionClicked(id,content)}
                                        />}
                                        label={content}
                                    />
                                    <IconButton
                                        color="secondary"
                                        onClick={()=>optionDeleteClicked(id,content)}
                                    >
                                        <Delete/>
                                    </IconButton>
                                </div>
                                ))}
                            </FormGroup>
                        </>
                    ):(
                        <>
                            <RadioGroup aria-label="option" name="option">
                                {
                                    options?.map(({id,content,isCorrect})=>(
                                        <div key={content} className={classes["option"]}>
                                        <FormControlLabel 
                                            key={id}
                                            control={<Radio
                                                color="primary"
                                                name={content} 
                                                checked={isCorrect}
                                                onClick={()=>optionClicked(id,content,true)}
                                            />} 
                                            label={content}
                                        />
                                        <IconButton
                                            color="secondary"
                                            onClick={()=>optionDeleteClicked(id,content)}
                                        >
                                            <Delete/>
                                        </IconButton>
                                    </div>
                                    ))
                                    
                                }
                            </RadioGroup>
                        </>
                    )
                }
                <div style={{"marginBottom":"1rem"}}>
                    <TextField
                        label="option"
                        value={addOption}
                        onChange={event=>setAddOption(event.target.value)}
                    />
                    <IconButton
                        color="primary"
                        onClick={addOptionButtonClicked}
                    >
                        <Add/>
                    </IconButton>
                </div>
                {addOptionError && <FormHelperText>Options have to be unique</FormHelperText>}
                <TextField 
                    label="Hint"
                    fullWidth
                    multiline
                    value={hint}
                    onChange={event=>setHint(event.target.value)} 
                    variant="outlined" 
                />
                <Button
                    color="primary"
                    type="submit"
                    variant="contained"
                    fullWidth
                    style={{"marginTop":"1rem"}}
                    disabled={quizLoading}
                >
                    {props.type==="NEW_QUESTION"?"Add Question":"Modify Question"}
                </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    )


}