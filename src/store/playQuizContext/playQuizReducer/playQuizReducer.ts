import { State, PlayQuizAction } from "../playQuiz.types";

export const playQuizReducer = (state: State, action: PlayQuizAction) => {
  switch (action.type) {
    case "START_QUIZ":
      return {
        ...state,
        playQuizMode: true,
      };
    case "LOAD_QUESTION":
      return {
        ...state,
        currentQuestion: action.payload,
      };
    case "SET_SCORE":
      return {
        ...state,
        score: action.payload,
      };
    case "END_QUIZ":
      return {
        ...state,
        playQuizMode: false,
        score: 0,
        currentQuestion: null,
        quizResponses: [],
      };
    case "STORE_RESPONSE":
      return {
        ...state,
        quizResponses: [...state.quizResponses, action.payload],
      };
    case "EXIT_PLAY_MODE":
      return {
        ...state,
        playQuizMode: false,
      };
    default:
      return state;
  }
};
