import { usePlayQuiz, useQuiz } from "../../store";
import { useHistory } from "react-router-dom";
import {
  Button,
  useMediaQuery,
  useColorModeValue,
  HStack,
  Box,
  Text,
  Heading,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { useEffect } from "react";

export const QuizResult = () => {
  const { calculateTotalScore, currentQuiz } = useQuiz();
  const { score, quizResponses, dispatch } = usePlayQuiz();
  const { push } = useHistory();

  const [isLargerThan700] = useMediaQuery("(min-width: 700px)");

  useEffect(() => {
    !currentQuiz && push("/");
  }, [currentQuiz, push]);

  return (
    <HStack
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="flex-start"
      bg={useColorModeValue("lightgray", "gray.800")}
    >
      <Box
        width={isLargerThan700 ? "40rem" : "100%"}
        minHeight="85vh"
        textAlign="center"
        padding="1rem"
        bg={useColorModeValue("white", "gray.900")}
      >
        <Heading color="teal">Congrats!</Heading>
        <Heading fontSize="2xl">
          Your score is <Text color="teal">{score}</Text>
        </Heading>
        {currentQuiz && calculateTotalScore(currentQuiz) === score ? (
          <Heading color="teal" fontWeight="400">
            Looks like you got all of it right!
          </Heading>
        ) : (
          <>
            <h3>Here are your results</h3>
            <UnorderedList listStyleType="none" padding="0" margin="1rem">
              {quizResponses.map(({ content, response }) => (
                <ListItem
                  key={content}
                  width="100%"
                  margin="1rem"
                  padding="1rem"
                  boxShadow="dark-lg"
                  color={response ? "green" : "red"}
                >
                  {content}
                </ListItem>
              ))}
            </UnorderedList>
          </>
        )}
        <Button
          variant="solid"
          color="teal"
          marginTop="2rem"
          onClick={() => {
            dispatch({ type: "END_QUIZ" });
            push("/");
          }}
        >
          Play more!
        </Button>
      </Box>
    </HStack>
  );
};
