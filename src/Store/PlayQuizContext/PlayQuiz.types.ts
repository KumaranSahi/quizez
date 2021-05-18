import { ReactNode,Dispatch } from "react";

export type Props={
    children?:ReactNode;
}

export type State={
    playQuizMode:boolean;
    currentQuestion:Question|null;
    score:number;
}

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

export type PlayQuizAction=
    |{type:"START_QUIZ"}
    |{type:"LOAD_QUESTION";payload:Question}
    |{type:"SET_SCORE";payload:number}

export type PlayQuizContextType={
    dispatch:Dispatch<PlayQuizAction>;
    playQuizMode:boolean;
    currentQuestion:Question;
    score:number;
}