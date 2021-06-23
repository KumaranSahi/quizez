import classes from "./MyScores.module.css";
import { useQuiz } from "../../Store/QuizContext/QuizContext";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

export const MyScores = () => {
  const { myLeaderBoard } = useQuiz();
  const { push } = useHistory();
  const { getQuiz, setQuizLoading, dispatch: quizDispatch } = useQuiz();

  const playQuiz = (quizId: string) => {
    getQuiz(quizId, quizDispatch, setQuizLoading, false);
    push("/rules");
  };

  return (
    <div className={classes["my-scores-page"]}>
      <div className={classes["my-scores-container"]}>
        <h1>My Top 10</h1>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell className={classes["table-head-cell"]}>
                  Quiz
                </TableCell>
                <TableCell className={classes["table-head-cell"]} align="right">
                  Score
                </TableCell>
                <TableCell className={classes["table-head-cell"]} align="right">
                  Play Again
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {myLeaderBoard.map(
                ({ id, score, quizName, quizId }) => (
                  <TableRow key={id} className={classes["tablebody-row"]}>
                    <TableCell>{quizName}</TableCell>
                    <TableCell align="right">{score}</TableCell>
                    <TableCell align="right">
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() => playQuiz(quizId!)}
                      >
                        Play Again
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
