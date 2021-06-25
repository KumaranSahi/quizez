import { Dispatch, SetStateAction } from "react";
import {
  QuizAction,
  QuizData,
  Quiz,
  NewQuestionData,
  Question,
  LeaderBoard,
} from "./quiz.types";
import { warningToast, successToast } from "../../components";
import { ResponseTemplate } from "../../Generics.types";
import { APP_URL } from "../../axiosUtils";
import axios from "axios";

export const createQuiz = async (
  quizData: QuizData,
  setLoading: Dispatch<SetStateAction<boolean>>,
  dispatch: Dispatch<QuizAction>
) => {
  setLoading(true);
  try {
    const {
      data: { data, ok },
    } = await axios.post<ResponseTemplate<Quiz>>(
      `${APP_URL}/api/quizes`,
      quizData
    );
    if (ok && data) {
      dispatch({
        type: "LOAD_CREATING_QUIZ",
        payload: data,
      });
      successToast("Quiz Created");
      setLoading(false);
    }
    return data!.id;
  } catch (error) {
    warningToast("Unable to create quiz");
    console.log(error);
    setLoading(false);
    return "";
  }
};

export const getMyQuizes = async (
  dispatch: Dispatch<QuizAction>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  setLoading(true);
  try {
    const {
      data: { data, ok },
    } = await axios.get<ResponseTemplate<Quiz[]>>(`${APP_URL}/api/my-quizes`);
    if (data && ok) {
      dispatch({
        type: "LOAD_MY_QUIZES",
        payload: data,
      });
      setLoading(false);
    }
  } catch (error) {
    warningToast("Unable to load my quizes");
    console.log(error);
    setLoading(false);
  }
};

export const getQuiz = async (
  quizId: string,
  dispatch: Dispatch<QuizAction>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  creatingQuiz = false
) => {
  setLoading(true);
  try {
    const {
      data: { data, ok },
    } = await axios.get<ResponseTemplate<Quiz>>(
      `${APP_URL}/api/quizes/${quizId}`
    );
    if (data && ok) {
      if (creatingQuiz) {
        dispatch({
          type: "LOAD_CREATING_QUIZ",
          payload: data,
        });
      } else {
        dispatch({
          type: "LOAD_CURRENT_QUIZ",
          payload: data,
        });
      }
      setLoading(false);
    }
  } catch (error) {
    warningToast("Unable to load the quiz");
    console.log(error);
    setLoading(false);
  }
};

export const createQuestion = async (
  questionData: NewQuestionData,
  setLoading: Dispatch<SetStateAction<boolean>>,
  dispatch: Dispatch<QuizAction>,
  creatingQuiz: Quiz
) => {
  setLoading(true);
  try {
    const {
      data: { data, ok },
    } = await axios.post<ResponseTemplate<Question>>(
      `${APP_URL}/api/questions`,
      questionData
    );
    if (ok && data) {
      const newQuiz: Quiz = {
        ...creatingQuiz,
        questions: creatingQuiz.questions
          ? [...creatingQuiz.questions, data]
          : [data],
      };
      dispatch({
        type: "LOAD_CREATING_QUIZ",
        payload: newQuiz,
      });
      setLoading(false);
    }
  } catch (error) {
    warningToast("Unable to create question");
    console.log(error);
    setLoading(false);
  }
};

export const editQuestion = async (
  questionData: NewQuestionData,
  questionId: string,
  setLoading: Dispatch<SetStateAction<boolean>>,
  dispatch: Dispatch<QuizAction>,
  creatingQuiz: Quiz
) => {
  setLoading(true);
  try {
    const {
      data: { data, ok },
    } = await axios.post<ResponseTemplate<Question>>(
      `${APP_URL}/api/questions/${questionId}/edit`,
      questionData
    );
    if (ok && data) {
      const newQuiz: Quiz = {
        ...creatingQuiz,
        questions: creatingQuiz.questions!.map((question) =>
          question.id === questionId ? data : question
        ),
      };
      dispatch({
        type: "LOAD_CREATING_QUIZ",
        payload: newQuiz,
      });
      setLoading(false);
    }
  } catch (error) {
    warningToast("Unable to edit question");
    console.log(error);
    setLoading(false);
  }
};

export const deleteQuestion = async (
  questionId: string,
  dispatch: Dispatch<QuizAction>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  creatingQuiz: Quiz
) => {
  setLoading(true);
  try {
    const {
      data: { ok },
    } = await axios.delete<ResponseTemplate>(
      `${APP_URL}/api/questions/${questionId}`
    );
    if (ok) {
      const newQuiz: Quiz = {
        ...creatingQuiz,
        questions: creatingQuiz.questions!.filter(
          (question) => question.id !== questionId
        ),
      };
      dispatch({
        type: "LOAD_CREATING_QUIZ",
        payload: newQuiz,
      });
      setLoading(false);
      successToast("Question Deleted Successfully");
    }
  } catch (error) {
    warningToast("Unable to delete question");
    console.log(error);
    setLoading(false);
  }
};

export const calculateTotalScore = (currentQuiz: Quiz) =>
  currentQuiz.questions!.reduce(
    (accumulator: number, currentValue: Question) =>
      accumulator + currentValue.points,
    0
  );

export const loadQuizList = async (
  dispatch: Dispatch<QuizAction>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  try {
    const {
      data: { data, ok },
    } = await axios.get<ResponseTemplate<Quiz[]>>(`${APP_URL}/api/quizes`);
    if (ok && data) {
      dispatch({
        type: "LOAD_QUIZ_LIST",
        payload: data,
      });
    }
  } catch (error) {
    warningToast("Unable to load quizlist");
    console.log(error);
    setLoading(false);
  }
};

export const loadTopTen = async (
  dispatch: Dispatch<QuizAction>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  try {
    const {
      data: { data, ok },
    } = await axios.get<ResponseTemplate<LeaderBoard[]>>(
      `${APP_URL}/api/scorecards`
    );
    if (ok && data) {
      dispatch({
        type: "LOAD_TOP_TEN",
        payload: data,
      });
    }
  } catch (error) {
    warningToast("Unable to load top ten");
    console.log(error);
    setLoading(false);
  }
};

export const loadMyTopTen = async (
  dispatch: Dispatch<QuizAction>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  try {
    const {
      data: { data, ok },
    } = await axios.get<ResponseTemplate<LeaderBoard[]>>(
      `${APP_URL}/api/my-scorecards`
    );
    if (ok && data) {
      dispatch({
        type: "LOAD_MY_TOP_TEN",
        payload: data,
      });
    }
  } catch (error) {
    warningToast("Unable to load my top ten");
    console.log(error);
    setLoading(false);
  }
};
