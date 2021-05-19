import { Dispatch } from 'react'
import { warningToast } from '../../Components'
import {ResponseTemplate} from '../../Generics.types'
import {State, PlayQuizAction,SubmitQuizPayload} from './PlayQuiz.types'
import axios from 'axios';

export const playQuizReducer=(state:State,action:PlayQuizAction)=>{
    switch (action.type) {
        case "START_QUIZ":
            return({
                ...state,
                playQuizMode:true,
            })
        case "LOAD_QUESTION":
            return({
                ...state,
                currentQuestion:action.payload
            })
        case "SET_SCORE":
            return({
                ...state,
                score:action.payload
            })
        case "END_QUIZ":
            return({
                ...state,
                playQuizMode:false,
                score:0,
                currentQuestion:null
            })

        default:
            return state;
    }
}

export const submitQuiz=async (userId:string,quizData:SubmitQuizPayload,token:string,dispatch:Dispatch<PlayQuizAction>)=>{
    
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }
    try{
        const {data:{ok}}=await axios.post<ResponseTemplate>(`/api/scorecards/${userId}`,quizData,config)
        if(ok){
            dispatch({
                type:"END_QUIZ"
            })
        }
        return true;
    }catch(error){
        console.log(error);
        warningToast("Unable to submit quiz")
        return false;
    }
}