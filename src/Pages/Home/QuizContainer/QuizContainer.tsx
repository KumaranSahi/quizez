import classes from "./QuizContainer.module.css";
import { Quiz } from "../../../Store/QuizContext/QuizContext.types";
import uniqolor from "uniqolor";
import { useQuiz } from "../../../Store/QuizContext/QuizContext";
import { useAuth } from "../../../Store/AuthContext/AuthContext";
import { useHistory } from "react-router-dom";

export const QuizContainer = ({ id, name, image, description }: Quiz) => {
  const color = uniqolor.random({
    saturation: 80,
    lightness: [30, 50],
  });

  const { token } = useAuth();
  const { getQuiz, setQuizLoading, dispatch: quizDispatch } = useQuiz();
  const { push } = useHistory();

  const playQuiz = () => {
    getQuiz(id, token, quizDispatch, setQuizLoading, false);
    push("/rules");
  };

  return (
    <li
      className={classes["quiz-container"]}
      style={
        image
          ? { backgroundImage: `url(${image})` }
          : { backgroundColor: `${color.color}` }
      }
    >
      <h1 className={classes["quiz-name"]}>{name}</h1>
      {description ? (
        <p className={classes["quiz-description"]}>{description}</p>
      ) : (
        <p className={classes["quiz-description"]}>
          Hey this is a test string for now
        </p>
      )}
      <button className={classes["quiz-button"]} onClick={playQuiz}>
        <span>Play Quiz!</span>
      </button>
    </li>
  );
};
