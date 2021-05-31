import classes from "./Question.module.css";
import { useState, useEffect, SyntheticEvent } from "react";
import { Question as QuestionType } from "../../../Store/QuizContext/QuizContext.types";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  Button,
} from "@material-ui/core";
import { KeyboardArrowRight, SaveAlt } from "@material-ui/icons";
import { useQuiz } from "../../../Store/QuizContext/QuizContext";
import { useAuth } from "../../../Store/AuthContext/AuthContext";
import { usePlayQuiz } from "../../../Store/PlayQuizContext/PlayQuizContext";
import { useHistory } from "react-router-dom";

interface QuestionProps extends QuestionType {
  totalQuestions: number;
  currentIndex: number;
}

export const Question = ({
  id,
  multipleCorrect,
  options,
  points,
  question,
  hint,
  negativePoints,
  totalQuestions,
  currentIndex,
}: QuestionProps) => {
  const [timer, setTimer] = useState(30);
  const [checked, setChecked] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);

  const {
    currentQuiz,
    quizLoading,
    setQuizLoading,
    loadTopTen,
    loadMyTopTen,
    dispatch: quizDispatch,
  } = useQuiz();
  const { dispatch, score: totalScore, submitQuiz } = usePlayQuiz();
  const { token } = useAuth();

  const { push } = useHistory();

  const submitButtonClicked = async (totalScore = 0) => {
    setQuizLoading(true);
    const result = await submitQuiz(
      {
        quizId: currentQuiz.id,
        score: totalScore,
      },
      token,
      dispatch
    );
    if (result) {
      setQuizLoading(false);
      loadTopTen(quizDispatch, token, setQuizLoading);
      loadMyTopTen(quizDispatch, token, setQuizLoading);
      push("/quiz-result");
    } else {
      setQuizLoading(false);
    }
  };

  const optionClicked = (id: string) => {
    if (multipleCorrect) {
      if (checked.some((optionId) => id === optionId)) {
        setChecked((options) => options.filter((optionId) => optionId !== id));
      } else {
        checked.length > 0
          ? setChecked((state) => [...state, id])
          : setChecked([id]);
      }
    } else {
      setChecked([id]);
    }
  };

  const nexButtonClicked = (event: SyntheticEvent) => {
    let score = 0;
    if (checked.length > 0) {
      if (multipleCorrect) {
        let correctOptions = 0;
        let selectedCorrectOptions = 0;
        options.forEach(({ id, isCorrect }) => {
          isCorrect && correctOptions++;
          checked.includes(id!) && isCorrect && selectedCorrectOptions++;
        });
        if (correctOptions === selectedCorrectOptions) {
          if (showHint) {
            score = points / 2;
          } else {
            score = points;
          }
          dispatch({
            type: "STORE_RESPONSE",
            payload: {
              content: question,
              response: true,
              index: currentIndex,
            },
          });
        } else {
          if (negativePoints && negativePoints !== 0) {
            score = -negativePoints;
          }
          dispatch({
            type: "STORE_RESPONSE",
            payload: {
              content: question,
              response: false,
              index: currentIndex,
            },
          });
        }
      } else {
        let correctFlag = false;
        options.forEach(({ id, isCorrect }) => {
          if (id === checked[0] && isCorrect) {
            if (showHint) {
              score = points / 2;
            } else {
              score = points;
            }
            dispatch({
              type: "STORE_RESPONSE",
              payload: {
                content: question,
                response: true,
                index: currentIndex,
              },
            });
            correctFlag = true;
          }
        });
        if (!correctFlag) {
          if (negativePoints && negativePoints !== 0) {
            score = -negativePoints;
          }
          dispatch({
            type: "STORE_RESPONSE",
            payload: {
              content: question,
              response: false,
              index: currentIndex,
            },
          });
        }
      }
    }
    if ((event.target as HTMLElement).innerHTML.includes("Submit")) {
      submitButtonClicked(totalScore + score);
    }
    dispatch({
      type: "SET_SCORE",
      payload: totalScore + score,
    });
    dispatch({
      type: "LOAD_QUESTION",
      payload: currentQuiz.questions![currentIndex],
    });
    setChecked([]);
    setShowHint(false);
    setTimer(30);
  };

  useEffect(() => {
    let time = setInterval(() => setTimer((state) => state - 1), 1000);
    if (timer === 0) {
      clearInterval(time);
      setChecked([]);
      currentIndex === totalQuestions
        ? submitButtonClicked()
        : dispatch({
            type: "LOAD_QUESTION",
            payload: currentQuiz.questions![currentIndex],
          });
      setTimer(30);
    }
    return () => clearInterval(time);
  }, [timer]);

  return (
    <>
      <div className={classes["question-container"]}>
        <div className={classes["index-points-timer"]}>
          <p>
            {currentIndex}/{totalQuestions}
          </p>
          <p>Timer: {timer}</p>
          <p>Points: {showHint ? points / 2 : points}</p>
        </div>
        <p className={classes["question"]}>{question}</p>
        {multipleCorrect ? (
          <>
            <FormGroup>
              {options &&
                options.map(({ content, id }) => (
                  <FormControlLabel
                    key={id}
                    control={
                      <Checkbox
                        name={content}
                        checked={checked.some((value) => id === value)}
                        onClick={() => optionClicked(id!)}
                      />
                    }
                    label={content}
                  />
                ))}
            </FormGroup>
          </>
        ) : (
          <>
            <RadioGroup aria-label="option" name="option">
              {options?.map(({ id, content }) => (
                <FormControlLabel
                  key={id}
                  control={
                    <Radio
                      color="primary"
                      name={content}
                      checked={checked.some((value) => id === value)}
                      onClick={() => optionClicked(id!)}
                    />
                  }
                  label={content}
                />
              ))}
            </RadioGroup>
          </>
        )}
        {hint && (
          <Button
            color="primary"
            variant="outlined"
            disabled={showHint}
            onClick={() => setShowHint(true)}
          >
            Show hint
          </Button>
        )}
        {showHint && <p className={classes["hint"]}>{hint}</p>}
        <div className={classes["button-container"]}>
          {currentIndex === totalQuestions ? (
            <Button
              variant="contained"
              color="primary"
              endIcon={<SaveAlt />}
              disabled={quizLoading}
              onClick={nexButtonClicked}
            >
              Submit
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              endIcon={<KeyboardArrowRight />}
              onClick={nexButtonClicked}
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
