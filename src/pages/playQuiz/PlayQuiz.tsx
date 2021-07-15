import { useEffect } from "react";
import { useQuiz, usePlayQuiz } from "../../store";
import { Prompt, useHistory } from "react-router-dom";
import { Question } from "./question/Question";
import {
  HStack,
  useColorModeValue,
  useMediaQuery,
  Box,
} from "@chakra-ui/react";

export const PlayQuiz = () => {
  const { playQuizMode, currentQuestion } = usePlayQuiz();
  const { currentQuiz } = useQuiz();
  const { push } = useHistory();

  const [isLargerThan700] = useMediaQuery("(min-width: 700px)");

  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);
  const alertUser = (e: Event) => {
    e.preventDefault();
    e.returnValue = false;
  };

  useEffect(() => {
    if (!playQuizMode) {
      push("/");
    }
  }, [playQuizMode, push]);

  return (
    <>
      <Prompt
        when={playQuizMode}
        message="The game will be lost, Are you sure you want to navigate away?"
      />
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
          {currentQuestion && (
            <Question
              id={currentQuestion.id}
              multipleCorrect={currentQuestion.multipleCorrect}
              points={currentQuestion.points}
              options={currentQuestion.options}
              question={currentQuestion.question}
              hint={currentQuestion.hint}
              negativePoints={currentQuestion.negativePoints}
              totalQuestions={currentQuiz.questions!.length}
              currentIndex={
                currentQuiz
                  .questions!.map(({ id }) => id)
                  .indexOf(currentQuestion.id) + 1
              }
            />
          )}
        </Box>
      </HStack>
    </>
  );
};
