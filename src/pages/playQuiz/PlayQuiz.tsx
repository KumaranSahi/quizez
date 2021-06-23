import { useEffect } from "react";
import classes from "./PlayQuiz.module.css";
import { useQuiz, usePlayQuiz } from "../../store";
import { Prompt, useHistory } from "react-router-dom";
import { Question } from "./question/Question";

export const PlayQuiz = () => {
  const { playQuizMode, currentQuestion } = usePlayQuiz();
  const { currentQuiz } = useQuiz();
  const { push } = useHistory();

  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);
  const alertUser = (e: Event) => {
    e.preventDefault();
    e.returnValue = false;
  };

  useEffect(() => {
    if (!playQuizMode) {
      push("/");
    }
  }, [playQuizMode, push]);

  return (
    <>
      <Prompt
        when={playQuizMode}
        message="The game will be lost, Are you sure you want to navigate away?"
      />
      <div className={classes["play-quiz-page"]}>
        <div className={classes["play-quiz-container"]}>
          {currentQuestion && (
            <Question
              id={currentQuestion.id}
              multipleCorrect={currentQuestion.multipleCorrect}
              points={currentQuestion.points}
              options={currentQuestion.options}
              question={currentQuestion.question}
              hint={currentQuestion.hint}
              negativePoints={currentQuestion.negativePoints}
              totalQuestions={currentQuiz.questions!.length}
              currentIndex={
                currentQuiz
                  .questions!.map(({ id }) => id)
                  .indexOf(currentQuestion.id) + 1
              }
            />
          )}
        </div>
      </div>
    </>
  );
};
