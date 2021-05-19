import {createContext, useContext, useState, useReducer, useEffect} from 'react'
import {Props, State, QuizContextTypes, Quiz,LeaderBoard} from './QuizContext.types'
import axios from 'axios'
import {useAuth} from '../AuthContext/AuthContext'
import {ResponseTemplate} from '../../Generics.types'
import {quizReducer,createQuiz,getMyQuizes,getQuiz,createQuestion,editQuestion,deleteQuestion,calculateTotalScore} from "./QuizReducer"

export const QuizContext=createContext({});

export const useQuiz=()=>useContext(QuizContext) as QuizContextTypes;

const initialState:State={
    quizes:[],
    currentQuiz:null,
    creatingQuiz:null,
    myQuizes:[],
    leaderBoard:[]
}

export const QuizContextProvider=({children}:Props)=>{
    const [loading,setLoading]=useState(false)
    const {token}=useAuth();
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }

    useEffect(()=>{
        (
            async ()=>{
                if(token){
                    const {data:{data,ok}}=await axios.get<ResponseTemplate<Quiz[]>>('/api/quizes',config)
                    if(ok&&data){
                        dispatch({
                            type:"LOAD_QUIZ_LIST",
                            payload:data
                        })
                    }
                }
            }
        )()
    },[token])

    useEffect(()=>{
        (
            async ()=>{
                if(token){
                    const {data:{data,ok}}=await axios.get<ResponseTemplate<LeaderBoard[]>>('/api/scorecards',config)
                    if(ok&&data){
                        dispatch({
                            type:"LOAD_TOP_TEN",
                            payload:data
                        })
                    }
                }
            }
        )()
    },[token])

    const [state,dispatch]=useReducer(quizReducer,initialState)

    return(
        <QuizContext.Provider value={{
            quizLoading:loading,
            setQuizLoading:setLoading,
            quizes:state.quizes,
            currentQuiz:state.currentQuiz,
            createQuiz:createQuiz,
            dispatch:dispatch,
            myQuizes:state.myQuizes,
            getMyQuizes:getMyQuizes,
            getQuiz:getQuiz,
            createQuestion:createQuestion,
            editQuestion:editQuestion,
            creatingQuiz:state.creatingQuiz,
            deleteQuestion:deleteQuestion,
            calculateTotalScore:calculateTotalScore,
            leaderBoard:state.leaderBoard
        }}>
            {children}
        </QuizContext.Provider>
    )
}