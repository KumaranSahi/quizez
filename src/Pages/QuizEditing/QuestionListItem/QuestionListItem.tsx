import { IconButton } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import classes from "./QuestionListItem.module.css";
import { useQuiz } from "../../../Store/QuizContext/QuizContext";

type QuestionListItemType = {
  id: string;
  question: string;
  selectedQuestion: (id: string) => void;
  points: number;
};

export const QuestionListItem = ({
  id,
  question,
  selectedQuestion,
  points,
}: QuestionListItemType) => {
  const { deleteQuestion, dispatch, setQuizLoading, creatingQuiz } = useQuiz();

  return (
    <div className={classes["quesiton-container"]}>
      <p className={classes["question"]}>
        {question} ( points: {points} )
      </p>

      <div className={classes["action-buttons"]}>
        <IconButton color="primary" onClick={() => selectedQuestion(id)}>
          <Edit />
        </IconButton>
        <IconButton
          color="secondary"
          onClick={() =>
            deleteQuestion(id, dispatch, setQuizLoading, creatingQuiz)
          }
        >
          <Delete />
        </IconButton>
      </div>
    </div>
  );
};
