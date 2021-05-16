import { Dispatch, SetStateAction } from 'react';
import {State,QuizAction,QuizData,CreateQuizResponse} from './QuizContext.types'
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
        const {data:{data,ok}}=await axios.post<ResponseTemplate<CreateQuizResponse>>(`/api/quizes/${userId}/create`,quizData,config)
        if(ok && data){
            dispatch({
                type:'CREATE_QUIZ',
                payload:data
            })
            successToast("Quiz Created")
            setLoading(false)
        }
    }catch(error){
        warningToast("Invalid username or password")
        console.log(error)
        setLoading(false)
    }
}