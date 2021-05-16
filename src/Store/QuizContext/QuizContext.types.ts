import {Dispatch, ReactNode, SetStateAction} from 'react'

export type Props={
    children?:ReactNode;
}

export type State={
    quizes:Quiz[]|[];
    currentQuiz:Quiz|null;
    creatingQuiz:CreateQuizResponse|null;
}

export type QuizAction=
    |{type:"LOAD_QUIZ_LIST";payload:Quiz[]}
    |{type:"CREATE_QUIZ";payload:CreateQuizResponse}

export type Option={
    content:string;
    isCorrect:boolean;
}

export type Question={
    question:string;
    options:Option[];
    multipleCorrect:boolean;
    points:number;
    negativePoints?:number;
    hint:string;
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
    currentQuiz:Quiz;
    createQuiz:(quizData:QuizData, setLoading:Dispatch<SetStateAction<boolean>>, token:string,userId:string,dispatch:Dispatch<QuizAction>)=>void;
    dispatch:Dispatch<QuizAction>;
}

export type QuizData={
    name:string;
    image?:string;
    description:string;
}

export type CreateQuizResponse={
    name: string;
    description: string;
    id:string;
    image?:string;
}