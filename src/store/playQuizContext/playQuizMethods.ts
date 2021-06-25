import { Dispatch } from "react";
import { warningToast } from "../../components";
import { ResponseTemplate } from "../../Generics.types";
import { PlayQuizAction, SubmitQuizPayload } from "./playQuiz.types";
import { APP_URL } from "../../axiosUtils";
import axios from "axios";

export const submitQuiz = async (
  quizData: SubmitQuizPayload,
  dispatch: Dispatch<PlayQuizAction>
) => {
  try {
    await axios.post<ResponseTemplate>(`${APP_URL}/api/scorecards`, quizData);
    dispatch({
      type: "EXIT_PLAY_MODE",
    });
    return true;
  } catch (error) {
    console.log(error);
    warningToast("Unable to submit quiz");
    return false;
  }
};
