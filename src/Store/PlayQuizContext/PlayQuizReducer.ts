import {State, PlayQuizAction} from './PlayQuiz.types'

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

        default:
            return state;
    }

}