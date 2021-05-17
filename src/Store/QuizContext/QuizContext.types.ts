import {Dispatch, ReactNode, SetStateAction} from 'react'

export type Props={
    children?:ReactNode;
}

export type State={
    quizes:Quiz[]|[];
    currentQuiz:Quiz|null;
    myQuizes:Quiz[]|[];
    creatingQuiz:Quiz|null;
}

export type QuizAction=
    |{type:"LOAD_QUIZ_LIST";payload:Quiz[]}
    |{type:"LOAD_MY_QUIZES";payload:Quiz[]}
    |{type:"CREATE_QUIZ";payload:Quiz}
    |{type:"LOAD_CREATING_QUIZ";payload:Quiz}
    |{type:"LOAD_CURRENT_QUIZ";payload:Quiz}
    |{type:"EDIT_QUESTION";payload:Quiz}

export type Option={
    content:string;
    isCorrect:boolean;
    id?:string;
}

export type Question={
    id:string;
    question:string;
    options:Option[];
    multipleCorrect:boolean;
    points:number;
    negativePoints?:number;
    hint?:string;
}

export type Quiz={
    name:string;
    id:string;
    description?:string;
    questions?:Question[];
    image?:string;
}

export type QuizContextTypes={
    setQuizLoading:Dispatch<SetStateAction<boolean>>;
    quizLoading:boolean;
    quizes:Quiz[];
    myQuizes:Quiz[];
    getMyQuizes:(userId:string, token:string, dispatch:Dispatch<QuizAction>, setLoading:Dispatch<SetStateAction<boolean>>)=>void;
    currentQuiz:Quiz;
    getQuiz:(quizId:string, token:string, dispatch:Dispatch<QuizAction>, setLoading:Dispatch<SetStateAction<boolean>>,currentQuiz:boolean)=>void;
    createQuiz:(quizData:QuizData, setLoading:Dispatch<SetStateAction<boolean>>, token:string,userId:string,dispatch:Dispatch<QuizAction>)=>void;
    dispatch:Dispatch<QuizAction>;
    editQuestion:(questionData:NewQuestionData,token:string,questionId:string,setLoading:Dispatch<SetStateAction<boolean>>,dispatch:Dispatch<QuizAction>,creatingQuiz:Quiz)=>void;
    createQuestion:(questionData:NewQuestionData,token:string,userId:string,setLoading:Dispatch<SetStateAction<boolean>>,dispatch:Dispatch<QuizAction>,creatingQuiz:Quiz)=>void;
    creatingQuiz:Quiz;
}

export type QuizData={
    name:string;
    image?:string;
    description:string;
}

export type NewQuestionData={
    question:string;
    options:Option[];
    multipleCorrect:boolean;
    points:number;
    negativePoints:number;
    quiz:string;
    hint:string;
}