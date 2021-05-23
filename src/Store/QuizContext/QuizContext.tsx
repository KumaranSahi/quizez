import {createContext, useContext, useState, useReducer, useEffect} from 'react'
import {Props, State, QuizContextTypes} from './QuizContext.types'
import {useAuth} from '../AuthContext/AuthContext'
import {quizReducer,createQuiz,getMyQuizes,getQuiz,createQuestion
    ,editQuestion,deleteQuestion,calculateTotalScore,loadQuizList,loadTopTen,loadMyTopTen} from "./QuizReducer"

export const QuizContext=createContext({});

export const useQuiz=()=>useContext(QuizContext) as QuizContextTypes;

const initialState:State={
    quizes:[],
    currentQuiz:null,
    creatingQuiz:null,
    myQuizes:[],
    leaderBoard:[],
    myLeaderBoard:[]
}

export const QuizContextProvider=({children}:Props)=>{
    const [loading,setLoading]=useState(false)
    const {token,userId}=useAuth();
    
    useEffect(()=>{
        if(token)
        loadTopTen(dispatch,token,setLoading)  
    },[token])

    useEffect(()=>{
        if(token)
            loadMyTopTen(dispatch,token,setLoading,userId)   
    },[token,userId])

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
            leaderBoard:state.leaderBoard,
            myLeaderBoard:state.myLeaderBoard,
            loadQuizList:loadQuizList,
            loadMyTopTen:loadMyTopTen,
            loadTopTen:loadTopTen
        }}>
            {children}
        </QuizContext.Provider>
    )
}