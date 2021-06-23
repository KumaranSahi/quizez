import classes from "./CreateQuizAndLeaderBoard.module.css";
import { CreateQuizAndLeaderBoard } from "../../components";

export const CreateQuizAndLeaderBoardPage = () => {
  return (
    <div className={classes["create-quiz-leaderboard-page"]}>
      <div className={classes["create-quiz-leaderboard-container"]}>
        <CreateQuizAndLeaderBoard />
      </div>
    </div>
  );
};
