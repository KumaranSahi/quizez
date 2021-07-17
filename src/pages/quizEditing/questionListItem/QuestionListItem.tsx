import { Delete, Edit } from "@material-ui/icons";
import { useQuiz } from "../../../store";
import { Button, HStack, Text } from "@chakra-ui/react";

type QuestionListItemType = {
  id: string;
  question: string;
  selectedQuestion: (id: string) => void;
  points: number;
};

export const QuestionListItem = ({
  id,
  question,
  selectedQuestion,
  points,
}: QuestionListItemType) => {
  const { deleteQuestion, dispatch, setQuizLoading, creatingQuiz } = useQuiz();

  return (
    <HStack
      boxShadow="dark-lg"
      textAlign="left"
      padding="4"
      justifyContent="space-between"
    >
      <Text>
        {question} ( points: {points} )
      </Text>

      <HStack>
        <Button color="teal" onClick={() => selectedQuestion(id)}>
          <Edit />
        </Button>
        <Button
          color="red"
          onClick={() =>
            deleteQuestion(id, dispatch, setQuizLoading, creatingQuiz)
          }
        >
          <Delete />
        </Button>
      </HStack>
    </HStack>
  );
};
