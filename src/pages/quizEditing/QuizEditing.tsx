import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuiz } from "../../store";
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
import { QuizModal } from "./quizModal/QuizModal";
import { QuestionListItem } from "./questionListItem/QuestionListItem";

export const QuizEditing = () => {
  const { search } = useLocation();
  const { getQuiz, creatingQuiz, dispatch, setQuizLoading } = useQuiz();
  const [quizModalOpen, setQuizModalOpen] = useState(false);

  const [selected, setSelected] = useState("");

  const [isLargerThan700] = useMediaQuery("(min-width: 700px)");

  useEffect(() => {
    getQuiz(search.substring(1), dispatch, setQuizLoading, true);
  }, [search, dispatch, setQuizLoading, getQuiz]);

  const selectedQuestion = (id: string) => {
    setQuizModalOpen(true);
    setSelected(id);
  };

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
        <Heading color="teal">{creatingQuiz && creatingQuiz.name}</Heading>
        <UnorderedList listStyleType="none" padding="0">
          {creatingQuiz &&
            creatingQuiz.questions?.map(({ id, question, points }) => (
              <ListItem key={id} marginBottom="2">
                <QuestionListItem
                  id={id}
                  question={question}
                  points={points}
                  selectedQuestion={selectedQuestion}
                />
              </ListItem>
            ))}
        </UnorderedList>
        <Button
          variant="solid"
          width="100%"
          color="teal"
          marginTop="1rem"
          onClick={() => {
            setSelected("");
            setQuizModalOpen(true);
          }}
        >
          Add a question
        </Button>
        {!selected && (
          <QuizModal
            open={quizModalOpen}
            setOpen={setQuizModalOpen}
            type="NEW_QUESTION"
            quiz={creatingQuiz?.id}
          />
        )}
        {selected && (
          <QuizModal
            open={quizModalOpen}
            setOpen={setQuizModalOpen}
            type="EDIT_QUESTION"
            quiz={creatingQuiz?.id}
            payload={
              creatingQuiz.questions!.filter(({ id }) => id === selected)[0]
            }
          />
        )}
      </Box>
    </HStack>
  );
};
