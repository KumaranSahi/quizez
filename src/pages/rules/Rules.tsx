import { useQuiz, usePlayQuiz } from "../../store";
import { useHistory } from "react-router-dom";
import {
  useMediaQuery,
  Button,
  HStack,
  useColorModeValue,
  Box,
  Heading,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

const rules = [
  "You get 30 seconds to answer each question.",
  "If the question times out no point is scored.",
  " Each question has its own points.",
  " Some questions may carry negative points.",
  " Some questions may have hints.",
  " Using hints for question will only give you half the points.",
  "Once the game has started you cannot navigate away or reload.",
  "If you are ready to start click on the play button and may the oddsbe forever in your favour!",
];

export const Rules = () => {
  const { currentQuiz, calculateTotalScore, quizLoading } = useQuiz();
  const { dispatch } = usePlayQuiz();
  const { push } = useHistory();

  const [isLargerThan700] = useMediaQuery("(min-width: 700px)");

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
        <Heading color="teal">Rules</Heading>
        {currentQuiz && (
          <HStack justifyContent="space-evenly">
            <Heading fontSize="2xl">{currentQuiz.name}</Heading>
            <Heading fontSize="2xl">
              Total Points : {calculateTotalScore(currentQuiz)}
            </Heading>
          </HStack>
        )}
        <UnorderedList textAlign="left">
          {rules.map((rule) => (
            <ListItem fontSize="2xl" fontWeight="400" key={rule}>
              {rule}
            </ListItem>
          ))}
        </UnorderedList>
        <Button
          isLoading={quizLoading}
          variant="solid"
          color="teal"
          onClick={() => {
            push("/play-quiz");
            dispatch({ type: "START_QUIZ" });
            currentQuiz &&
              currentQuiz.questions &&
              dispatch({
                type: "LOAD_QUESTION",
                payload: currentQuiz.questions[0],
              });
          }}
        >
          Play Game!
        </Button>
      </Box>
    </HStack>
  );
};
