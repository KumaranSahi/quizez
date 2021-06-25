import { State, QuizAction } from "../quiz.types";

export const quizReducer = (state: State, action: QuizAction) => {
  switch (action.type) {
    case "LOAD_QUIZ_LIST":
      return {
        ...state,
        quizes: action.payload,
      };
    case "LOAD_CURRENT_QUIZ":
      return {
        ...state,
        currentQuiz: action.payload,
      };
    case "LOAD_CREATING_QUIZ":
      return {
        ...state,
        creatingQuiz: action.payload,
      };
    case "LOAD_MY_QUIZES":
      return {
        ...state,
        myQuizes: action.payload,
      };
    case "LOAD_TOP_TEN":
      return {
        ...state,
        leaderBoard: action.payload,
      };
    case "LOAD_MY_TOP_TEN":
      return {
        ...state,
        myLeaderBoard: action.payload,
      };
    default:
      return state;
  }
};
