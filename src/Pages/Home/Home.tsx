import classes from "./Home.module.css";
import { QuizContainer } from "./QuizContainer/QuizContainer";
import { useQuiz } from "../../Store/QuizContext/QuizContext";
import { CreateQuizAndLeaderBoard } from "../../Components";
import { useEffect } from "react";
import { useAuth } from "../../Store/AuthContext/AuthContext";

export const Home = () => {
  const { quizes, loadQuizList, dispatch, setQuizLoading } = useQuiz();
  const { token } = useAuth();
  useEffect(() => {
    if (token) loadQuizList(dispatch, setQuizLoading);
  }, [dispatch, token, setQuizLoading, loadQuizList]);

  return (
    <div className={classes["homepage-container"]}>
      <ul className={classes["active-quizes"]}>
        {quizes.map(({ id, name, image, description }) => (
          <QuizContainer
            key={id}
            id={id}
            name={name}
            image={image}
            description={description}
          />
        ))}
      </ul>
      <div className={classes["create-quiz-personal-scores"]}>
        <CreateQuizAndLeaderBoard />
      </div>
    </div>
  );
};
