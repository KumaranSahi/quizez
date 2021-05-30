import { Dispatch, SetStateAction } from 'react';
import {State,QuizAction,QuizData,Quiz,NewQuestionData,Question,LeaderBoard} from './QuizContext.types'
import {warningToast,successToast} from '../../Components'
import {ResponseTemplate} from '../../Generics.types'
import axios from '../../useAxios'

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

export const createQuiz=async (quizData:QuizData, setLoading:Dispatch<SetStateAction<boolean>>, token:string,dispatch:Dispatch<QuizAction>)=>{
    setLoading(true);
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }
    try{
        const {data:{data,ok}}=await axios.post<ResponseTemplate<Quiz>>(`/api/quizes`,quizData,config)
        if(ok && data){
            dispatch({
                type:'CREATE_QUIZ',
                payload:data
            })
            successToast("Quiz Created")
            setLoading(false)
        }
        return data!.id
    }catch(error){
        warningToast("Unable to create quiz")
        console.log(error)
        setLoading(false)
        return ""
    }
}

export const getMyQuizes=async (token:string, dispatch:Dispatch<QuizAction>, setLoading:Dispatch<SetStateAction<boolean>>)=>{
    setLoading(true)
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }
    try{
        const {data:{data,ok}}=await axios.get<ResponseTemplate<Quiz[]>>(`/api/quizes`,config)
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

export const createQuestion=async (questionData:NewQuestionData,token:string,setLoading:Dispatch<SetStateAction<boolean>>,dispatch:Dispatch<QuizAction>,creatingQuiz:Quiz)=>{
    setLoading(true)
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }
    try{
        const {data:{data,ok}}=await axios.post<ResponseTemplate<Question>>(`/api/questions`,questionData,config)
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

export const loadQuizList=async (dispatch:Dispatch<QuizAction>,token:string,setLoading:Dispatch<SetStateAction<boolean>>)=>{
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }
    try{
        const {data:{data,ok}}=await axios.get<ResponseTemplate<Quiz[]>>('/api/quizes',config)
        if(ok&&data){
            dispatch({
                type:"LOAD_QUIZ_LIST",
                payload:data
            })
        }
    }catch(error){
        warningToast("Unable to load quizlist")
        console.log(error)
        setLoading(false)
    }
}

export const loadTopTen=async (dispatch:Dispatch<QuizAction>,token:string,setLoading:Dispatch<SetStateAction<boolean>>)=>{
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }
    try{
        const {data:{data,ok}}=await axios.get<ResponseTemplate<LeaderBoard[]>>('/api/scorecards',config)
        if(ok&&data){
            dispatch({
                type:"LOAD_TOP_TEN",
                payload:data
            })
        }
    }catch(error){
        warningToast("Unable to load top ten")
        console.log(error)
        setLoading(false)
    }
}

export const loadMyTopTen=async (dispatch:Dispatch<QuizAction>,token:string,setLoading:Dispatch<SetStateAction<boolean>>)=>{
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }
    try{
        const {data:{data,ok}}=await axios.get<ResponseTemplate<LeaderBoard[]>>(`/api/scorecards`,config)
        if(ok&&data){
            dispatch({
                type:"LOAD_MY_TOP_TEN",
                payload:data
            })
        }
    }catch(error){
        warningToast("Unable to load my top ten")
        console.log(error)
        setLoading(false)
    }
}