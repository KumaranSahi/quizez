import classes from "./QuizEditing.module.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuiz } from "../../store";
import { Button } from "@material-ui/core";
import { QuizModal } from "./quizModal/QuizModal";
import { QuestionListItem } from "./questionListItem/QuestionListItem";

export const QuizEditing = () => {
  const { search } = useLocation();
  const { getQuiz, creatingQuiz, dispatch, setQuizLoading } = useQuiz();
  const [quizModalOpen, setQuizModalOpen] = useState(false);

  const [selected, setSelected] = useState("");

  useEffect(() => {
    getQuiz(search.substring(1), dispatch, setQuizLoading, true);
  }, [search, dispatch, setQuizLoading, getQuiz]);

  const selectedQuestion = (id: string) => {
    setQuizModalOpen(true);
    setSelected(id);
  };

  return (
    <div className={classes["edit-quiz-page"]}>
      <div className={classes["edit-quiz-container"]}>
        <h1>{creatingQuiz && creatingQuiz.name}</h1>
        <ul className={classes["question-list"]}>
          {creatingQuiz &&
            creatingQuiz.questions?.map(({ id, question, points }) => (
              <li key={id} style={{ marginBottom: "1rem" }}>
                <QuestionListItem
                  id={id}
                  question={question}
                  points={points}
                  selectedQuestion={selectedQuestion}
                />
              </li>
            ))}
        </ul>
        <Button
          variant="contained"
          fullWidth
          color="primary"
          onClick={() => setQuizModalOpen(true)}
        >
          Add a question
        </Button>
        {!selected && (
          <QuizModal
            open={quizModalOpen}
            setOpen={setQuizModalOpen}
            type="NEW_QUESTION"
            quiz={creatingQuiz?.id}
          />
        )}
        {selected && (
          <QuizModal
            open={quizModalOpen}
            setOpen={setQuizModalOpen}
            type="EDIT_QUESTION"
            quiz={creatingQuiz?.id}
            payload={
              creatingQuiz.questions!.filter(({ id }) => id === selected)[0]
            }
          />
        )}
      </div>
    </div>
  );
};
