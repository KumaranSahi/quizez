import {State, PlayQuizAction} from './PlayQuiz.types'

export const playQuizReducer=(state:State,action:PlayQuizAction)=>{
    switch (action.type) {
        case "START_QUIZ":
            return({
                ...state,
                playQuizMode:true,
            })
    
        default:
            return state;
    }

}