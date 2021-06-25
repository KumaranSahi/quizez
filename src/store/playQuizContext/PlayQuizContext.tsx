import { useContext, createContext, useReducer } from "react";
import { Props, PlayQuizContextType, State } from "./playQuiz.types";
import { submitQuiz } from "./playQuizMethods";
import { playQuizReducer } from "./playQuizReducer/playQuizReducer";

export const PlayQuizContext = createContext({});

export const usePlayQuiz = () =>
  useContext(PlayQuizContext) as PlayQuizContextType;

export const playQuizInitialState: State = {
  playQuizMode: false,
  currentQuestion: null,
  score: 0,
  quizResponses: [],
};

export const PlayQuizContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(playQuizReducer, playQuizInitialState);

  return (
    <PlayQuizContext.Provider
      value={{
        dispatch: dispatch,
        playQuizMode: state.playQuizMode,
        currentQuestion: state.currentQuestion,
        submitQuiz: submitQuiz,
        score: state.score,
        quizResponses: state.quizResponses,
      }}
    >
      {children}
    </PlayQuizContext.Provider>
  );
};
