import {
  Button,
  VStack,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useQuiz, useAuth } from "../../store";

export const CreateQuizAndLeaderBoard = () => {
  const { leaderBoard } = useQuiz();
  const { push } = useHistory();
  const { isAdmin } = useAuth();

  return (
    <VStack width="100%" height="100%">
      {isAdmin && (
        <Button
          variant="ghost"
          color="teal"
          width="100%"
          size="lg"
          onClick={() => push("/create-quiz")}
        >
          Create Quiz
        </Button>
      )}
      <hr />
      {isAdmin && (
        <Button
          variant="solid"
          color="teal"
          width="100%"
          size="lg"
          onClick={() => push("/my-quizes")}
        >
          My Quizes
        </Button>
      )}
      <Heading>Top 10 Leader Board</Heading>
      <Table aria-label="customized table">
        <Thead>
          <Tr>
            <Th>Player</Th>
            <Th>Quiz</Th>
            <Th>Score</Th>
          </Tr>
        </Thead>
        <Tbody>
          {leaderBoard.map(({ id, score, userName, quizName }) => (
            <Tr key={id}>
              <Td>{userName}</Td>
              <Td>{quizName}</Td>
              <Td>{score}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </VStack>
  );
};
