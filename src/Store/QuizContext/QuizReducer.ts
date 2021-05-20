import { Dispatch, SetStateAction } from 'react';
import {State,QuizAction,QuizData,Quiz,NewQuestionData,Question} from './QuizContext.types'
import {warningToast,successToast} from '../../Components'
import {ResponseTemplate} from '../../Generics.types'
import axios from 'axios'

export const quizReducer=(state:State,action:QuizAction)=>{
    switch (action.type) {
        case "LOAD_QUIZ_LIST":
            return {
                ...state,
                quizes:action.payload
            }
        case "CREATE_QUIZ":
            return {
                ...state,
                creatingQuiz:action.payload
            }
        case "LOAD_CURRENT_QUIZ":
            return {
                ...state,
                currentQuiz:action.payload
            }
        case "LOAD_CREATING_QUIZ":
            return {
                ...state,
                creatingQuiz:action.payload
            }
        case "LOAD_MY_QUIZES":
            return {
                ...state,
                myQuizes:action.payload
            }
        case "EDIT_QUESTION":
            return{
                ...state,
                creatingQuiz:action.payload
            }
        case "LOAD_TOP_TEN":
            return{
                ...state,
                leaderBoard:action.payload
            }
        case "LOAD_MY_TOP_TEN":
            return{
                ...state,
                myLeaderBoard:action.payload
            }
        default:
            return state;
    }
}

export const createQuiz=async (quizData:QuizData, setLoading:Dispatch<SetStateAction<boolean>>, token:string,userId:string,dispatch:Dispatch<QuizAction>)=>{
    setLoading(true);
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }
    try{
        const {data:{data,ok}}=await axios.post<ResponseTemplate<Quiz>>(`/api/quizes/${userId}/create`,quizData,config)
        if(ok && data){
            dispatch({
                type:'CREATE_QUIZ',
                payload:data
            })
            successToast("Quiz Created")
            setLoading(false)
        }
    }catch(error){
        warningToast("Unable to create quiz")
        console.log(error)
        setLoading(false)
    }
}

export const getMyQuizes=async (userId:string, token:string, dispatch:Dispatch<QuizAction>, setLoading:Dispatch<SetStateAction<boolean>>)=>{
    setLoading(true)
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }
    try{
        const {data:{data,ok}}=await axios.get<ResponseTemplate<Quiz[]>>(`/api/quizes/${userId}/user`,config)
        if(data&&ok){
            dispatch({
                type:"LOAD_MY_QUIZES",
                payload:data
            })
            setLoading(false)
        }
    }catch(error){
        warningToast("Unable to load my quizes")
        console.log(error)
        setLoading(false)
    }
}

export const getQuiz=async (quizId:string, token:string, dispatch:Dispatch<QuizAction>, setLoading:Dispatch<SetStateAction<boolean>>,creatingQuiz=false)=>{
    setLoading(true)
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }
    try{
        const {data:{data,ok}}=await axios.get<ResponseTemplate<Quiz>>(`/api/quizes/${quizId}`,config)
        if(data&&ok){
            if(creatingQuiz){
                dispatch({
                    type:"LOAD_CREATING_QUIZ",
                    payload:data
                })
            }else{
                dispatch({
                    type:"LOAD_CURRENT_QUIZ",
                    payload:data
                })
            }
            setLoading(false)
        }
    }catch(error){
        warningToast("Unable to load the quiz")
        console.log(error)
        setLoading(false)
    }
}

export const createQuestion=async (questionData:NewQuestionData,token:string,userId:string,setLoading:Dispatch<SetStateAction<boolean>>,dispatch:Dispatch<QuizAction>,creatingQuiz:Quiz)=>{
    setLoading(true)
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }
    try{
        const {data:{data,ok}}=await axios.post<ResponseTemplate<Question>>(`/api/questions/${userId}`,questionData,config)
        if(ok && data){
            const newQuiz:Quiz={
                ...creatingQuiz,
                questions:creatingQuiz.questions?[...creatingQuiz.questions,data]:[data]
            }
            dispatch({
                type:"EDIT_QUESTION",
                payload:newQuiz
            })
            setLoading(false)
        }
    }catch(error){
        warningToast("Unable to create question")
        console.log(error)
        setLoading(false)
    }
}

export const editQuestion=async (questionData:NewQuestionData,token:string,questionId:string,setLoading:Dispatch<SetStateAction<boolean>>,dispatch:Dispatch<QuizAction>,creatingQuiz:Quiz)=>{
    setLoading(true)
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }
    try{
        const {data:{data,ok}}=await axios.post<ResponseTemplate<Question>>(`/api/questions/${questionId}/edit`,questionData,config)
        if(ok && data){
            const newQuiz:Quiz={
                ...creatingQuiz,
                questions:creatingQuiz.questions!.map(question=>question.id===questionId?data:question)
            }
            dispatch({
                type:"EDIT_QUESTION",
                payload:newQuiz
            })
            setLoading(false)
        }
    }catch(error){
        warningToast("Unable to edit question")
        console.log(error)
        setLoading(false)
    }
}

export const deleteQuestion=async (questionId:string,token:string,dispatch:Dispatch<QuizAction>,setLoading:Dispatch<SetStateAction<boolean>>,creatingQuiz:Quiz)=>{
    setLoading(true)
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }
    try{
        const {data:{ok}}=await axios.delete<ResponseTemplate>(`api/questions/${questionId}`,config)
        if(ok){
            const newQuiz:Quiz={
                ...creatingQuiz,
                questions:creatingQuiz.questions!.filter(question=>question.id!==questionId)
            }
            dispatch({
                type:"EDIT_QUESTION",
                payload:newQuiz
            })
            setLoading(false)
            successToast("Question Deleted Successfully")
        }
    }catch(error){
        warningToast("Unable to delete question")
        console.log(error)
        setLoading(false)
    }
}

export const calculateTotalScore=(currentQuiz:Quiz)=>currentQuiz.questions!.reduce((accumulator:number,currentValue:Question)=>accumulator+currentValue.points,0)