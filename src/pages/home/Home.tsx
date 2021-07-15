import { QuizContainer } from "./quizContainer/QuizContainer";
import { CreateQuizAndLeaderBoard } from "../../components";
import { useEffect } from "react";
import { useAuth, useQuiz } from "../../store";
import { Flex, Box, useMediaQuery } from "@chakra-ui/react";

export const Home = () => {
  const { quizes, loadQuizList, dispatch, setQuizLoading } = useQuiz();
  const { token } = useAuth();
  useEffect(() => {
    if (token) loadQuizList(dispatch, setQuizLoading);
  }, [dispatch, token, setQuizLoading, loadQuizList]);

  const [isLargerThan700] = useMediaQuery("(min-width: 700px)");

  return (
    <Flex width="100%">
      <Flex
        flex="4"
        listStyleType="none"
        flexWrap="wrap"
        margin="0"
        paddingTop="1rem"
        paddingInlineStart="0"
      >
        {quizes.map(({ id, name, image, description }) => (
          <QuizContainer
            key={id}
            id={id}
            name={name}
            image={image}
            description={description}
          />
        ))}
      </Flex>
      <Box flex="2" padding="1rem" display={isLargerThan700 ? "block" : "none"}>
        <CreateQuizAndLeaderBoard />
      </Box>
    </Flex>
  );
};
