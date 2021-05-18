import {useContext,createContext, useReducer} from 'react'
import {Props, PlayQuizContextType, State} from './PlayQuiz.types'
import {playQuizReducer} from './PlayQuizReducer'

export const PlayQuizContext=createContext({})

export const usePlayQuiz=()=>useContext(PlayQuizContext) as PlayQuizContextType

const initialState:State={
    playQuizMode:false
}

export const PlayQuizContextProvider=({children}:Props)=>{

    const [state,dispatch]=useReducer(playQuizReducer,initialState)

    return(
        <PlayQuizContext.Provider
            value={{
                dispatch:dispatch,
                playQuizMode:state.playQuizMode
            }}
        >
            {children}
        </PlayQuizContext.Provider>
    )
}