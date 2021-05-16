import {State,QuizAction} from './QuizContext.types'

export const quizReducer=(state:State,action:QuizAction)=>{
    switch (action.type) {
        case "LOAD_QUIZ_LIST":
            return {
                ...state,
                quizes:action.payload
            }
        default:
            return state;
    }
}