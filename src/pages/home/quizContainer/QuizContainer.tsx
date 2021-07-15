import { Quiz } from "../../../store/quizContext/quiz.types";
import uniqolor from "uniqolor";
import { useQuiz } from "../../../store";
import { useHistory } from "react-router-dom";
import { VStack, Button, Heading, Text } from "@chakra-ui/react";

export const QuizContainer = ({ id, name, image, description }: Quiz) => {
  const color = uniqolor.random({
    saturation: 80,
    lightness: [30, 50],
  });

  const { getQuiz, setQuizLoading, dispatch: quizDispatch } = useQuiz();
  const { push } = useHistory();

  const playQuiz = () => {
    getQuiz(id, quizDispatch, setQuizLoading, false);
    push("/rules");
  };

  return (
    <VStack
      justifyContent="space-between"
      margin="2"
      borderRadius="2xl"
      width="22rem"
      minHeight="25rem"
      padding="1rem"
      backgroundPosition="center"
      style={
        image
          ? {
              backgroundImage: ` linear-gradient(
                                rgba(0, 0, 0, 0.5),
                                rgba(0, 0, 0.5, 1)
                              ),url(${image})`,
            }
          : { backgroundColor: `${color.color}` }
      }
    >
      <Heading color="white" fontWeight="400">
        {name}
      </Heading>
      <Text color="white" fontSize="x-large">
        {description}
      </Text>
      <Button
        padding="2rem"
        margin="1rem"
        variant="outline"
        color="teal"
        borderRadius="0"
        fontSize="larger"
        onClick={playQuiz}
      >
        Play Quiz!
      </Button>
    </VStack>
  );
};
