import { useAuth, useQuiz } from "../../store";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  useMediaQuery,
  Button,
  HStack,
  useColorModeValue,
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

export const MyQuizes = () => {
  const { myQuizes, dispatch, quizLoading, setQuizLoading, getMyQuizes } =
    useQuiz();
  const { token } = useAuth();
  const { push } = useHistory();

  const [isLargerThan700] = useMediaQuery("(min-width: 700px)");

  useEffect(() => {
    if (token) getMyQuizes(dispatch, setQuizLoading);
  }, [dispatch, token, setQuizLoading, getMyQuizes]);

  return (
    <HStack
      width="100%"
      height="100%"
      justifyContent="center"
      bg={useColorModeValue("lightgray", "gray.800")}
    >
      <Box
        width={isLargerThan700 ? "40rem" : "100%"}
        minHeight="90vh"
        textAlign="center"
        padding="1rem"
        bg={useColorModeValue("white", "gray.900")}
      >
        <Heading>My Quizes</Heading>
        <Button
          color="teal"
          width="100%"
          marginBottom="1rem"
          onClick={() => push("/create-quiz")}
        >
          Create Quiz
        </Button>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>name</Th>
              <Th>Description</Th>
              <Th>Questions</Th>
              <Th>Edit</Th>
            </Tr>
          </Thead>
          <Tbody>
            {myQuizes.map(({ id, name, questions, description }) => (
              <Tr key={id}>
                <Td>{name}</Td>
                <Td>{description && description.slice(0, 25)}...</Td>
                <Td>{questions ? questions.length : 0}</Td>
                <Td>
                  <Button
                    variant="outlined"
                    isLoading={quizLoading}
                    color="teal"
                    onClick={() => push({ pathname: "/edit-quiz", search: id })}
                  >
                    Edit Quiz
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </HStack>
  );
};
