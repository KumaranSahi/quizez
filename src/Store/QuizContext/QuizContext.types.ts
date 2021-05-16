import {Dispatch, ReactNode, SetStateAction} from 'react'

export type Props={
    children?:ReactNode;
}

export type State={
    quizes:Quiz[]|[];
    currentQuiz:Quiz|null;
}

export type QuizAction=
    |{type:"LOAD_QUIZ_LIST";payload:Quiz[]}

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
}