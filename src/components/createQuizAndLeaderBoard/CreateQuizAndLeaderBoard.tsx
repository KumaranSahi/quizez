import classes from "./CreateQuizAndLeaderBoard.module.css";
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
import { useQuiz, useAuth } from "../../store";

export const CreateQuizAndLeaderBoard = () => {
  const { leaderBoard } = useQuiz();
  const { push } = useHistory();
  const { isAdmin } = useAuth();
  return (
    <div className={classes["create-quiz-personal-scores"]}>
      {isAdmin && (
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          size="large"
          onClick={() => push("/create-quiz")}
        >
          Create Quiz
        </Button>
      )}
      <hr />
      {isAdmin && (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          onClick={() => push("/my-quizes")}
        >
          My Quizes
        </Button>
      )}
      <h1>Top 10 Leader Board</h1>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell className={classes["table-head-cell"]}>
                Player
              </TableCell>
              <TableCell className={classes["table-head-cell"]} align="right">
                Quiz
              </TableCell>
              <TableCell className={classes["table-head-cell"]} align="right">
                Score
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaderBoard.map(({ id, score, userName, quizName }) => (
              <TableRow key={id} className={classes["tablebody-row"]}>
                <TableCell>{userName}</TableCell>
                <TableCell align="right">{quizName}</TableCell>
                <TableCell align="right">{score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
