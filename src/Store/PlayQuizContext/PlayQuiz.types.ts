import { ReactNode,Dispatch,SetStateAction } from "react";

export type Props={
    children?:ReactNode;
}

export type State={
    playQuizMode:boolean;
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

export type PlayQuizContextType={
    dispatch:Dispatch<PlayQuizAction>;
    playQuizMode:boolean;
}