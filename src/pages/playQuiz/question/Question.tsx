import { useState, useEffect, SyntheticEvent } from "react";
import { Question as QuestionType } from "../../../store/quizContext/quiz.types";
import { faSave, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuiz, usePlayQuiz } from "../../../store";
import { useHistory } from "react-router-dom";
import {
  Box,
  HStack,
  Text,
  Button,
  Radio,
  VStack,
  Checkbox,
  RadioGroup,
  CheckboxGroup,
} from "@chakra-ui/react";

interface QuestionProps extends QuestionType {
  totalQuestions: number;
  currentIndex: number;
}

export const Question = ({
  id,
  multipleCorrect,
  options,
  points,
  question,
  hint,
  negativePoints,
  totalQuestions,
  currentIndex,
}: QuestionProps) => {
  const [timer, setTimer] = useState(30);
  const [checked, setChecked] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);

  const {
    currentQuiz,
    quizLoading,
    setQuizLoading,
    loadTopTen,
    loadMyTopTen,
    dispatch: quizDispatch,
  } = useQuiz();
  const { dispatch, score: totalScore, submitQuiz } = usePlayQuiz();
  const { push } = useHistory();

  const submitButtonClicked = async (totalScore = 0) => {
    setQuizLoading(true);
    const result = await submitQuiz(
      {
        quizId: currentQuiz.id,
        score: totalScore,
      },
      dispatch
    );
    if (result) {
      setQuizLoading(false);
      loadTopTen(quizDispatch, setQuizLoading);
      loadMyTopTen(quizDispatch, setQuizLoading);
      push("/quiz-result");
    } else {
      setQuizLoading(false);
    }
  };

  const nexButtonClicked = (event: SyntheticEvent) => {
    let score = 0;
    if (checked.length > 0) {
      if (multipleCorrect) {
        let correctOptions = 0;
        let selectedCorrectOptions = 0;
        options.forEach(({ id, isCorrect }) => {
          isCorrect && correctOptions++;
          checked.includes(id!) && isCorrect && selectedCorrectOptions++;
        });
        if (correctOptions === selectedCorrectOptions) {
          if (showHint) {
            score = points / 2;
          } else {
            score = points;
          }
          dispatch({
            type: "STORE_RESPONSE",
            payload: {
              content: question,
              response: true,
              index: currentIndex,
            },
          });
        } else {
          if (negativePoints && negativePoints !== 0) {
            score = -negativePoints;
          }
          dispatch({
            type: "STORE_RESPONSE",
            payload: {
              content: question,
              response: false,
              index: currentIndex,
            },
          });
        }
      } else {
        let correctFlag = false;
        options.forEach(({ id, isCorrect }) => {
          if (id === checked[0] && isCorrect) {
            if (showHint) {
              score = points / 2;
            } else {
              score = points;
            }
            dispatch({
              type: "STORE_RESPONSE",
              payload: {
                content: question,
                response: true,
                index: currentIndex,
              },
            });
            correctFlag = true;
          }
        });
        if (!correctFlag) {
          if (negativePoints && negativePoints !== 0) {
            score = -negativePoints;
          }
          dispatch({
            type: "STORE_RESPONSE",
            payload: {
              content: question,
              response: false,
              index: currentIndex,
            },
          });
        }
      }
    }
    if ((event.target as HTMLElement).innerHTML.includes("Submit")) {
      submitButtonClicked(totalScore + score);
    }
    dispatch({
      type: "SET_SCORE",
      payload: totalScore + score,
    });
    dispatch({
      type: "LOAD_QUESTION",
      payload: currentQuiz.questions![currentIndex],
    });
    setChecked([]);
    setShowHint(false);
    setTimer(30);
  };
  /*eslint-disable*/
  useEffect(() => {
    let time = setInterval(() => setTimer((state) => state - 1), 1000);
    if (timer === 0) {
      clearInterval(time);
      setChecked([]);
      currentIndex === totalQuestions
        ? submitButtonClicked()
        : dispatch({
            type: "LOAD_QUESTION",
            payload: currentQuiz.questions![currentIndex],
          });
      setTimer(30);
    }
    return () => clearInterval(time);
  }, [timer]);

  return (
    <Box width="100%" height="100%" padding="1rem" textAlign="left">
      <HStack
        justifyContent="space-between"
        padding="1rem"
        boxShadow="dark-lg"
        color="teal"
        fontSize="2xl"
      >
        <Text fontWeight="700">
          {currentIndex}/{totalQuestions}
        </Text>
        <Text fontWeight="700">Timer: {timer}</Text>
        <Text fontWeight="700">Points: {showHint ? points / 2 : points}</Text>
      </HStack>
      <Text fontSize="2xl" fontWeight="600" marginBottom="1rem">
        {question}
      </Text>

      {multipleCorrect ? (
        <CheckboxGroup onChange={(id) => setChecked(id as string[])}>
          <VStack alignItems="flex-start">
            {options &&
              options.map(({ content, id }) => (
                <Checkbox
                  name={content}
                  checked={checked.some((value) => id === value)}
                  key={id!}
                  value={id!}
                >
                  {content}
                </Checkbox>
              ))}
          </VStack>
        </CheckboxGroup>
      ) : (
        <RadioGroup onChange={(id) => setChecked([id])}>
          <VStack alignItems="flex-start">
            {options?.map(({ id, content }) => (
              <Radio
                color="teal"
                key={id}
                name={content}
                checked={checked.some((value) => id === value)}
                value={id}
              >
                {content}
              </Radio>
            ))}
          </VStack>
        </RadioGroup>
      )}
      {hint && (
        <Button
          color="teal"
          variant="outlined"
          disabled={showHint}
          onClick={() => setShowHint(true)}
        >
          Show hint
        </Button>
      )}
      {showHint && (
        <Text width="100%" padding="1rem" fontSize="1xl" boxShadow="dark-lg">
          {hint}
        </Text>
      )}
      <Box margin="1rem" textAlign="right">
        {currentIndex === totalQuestions ? (
          <Button
            variant="outline"
            color="teal"
            rightIcon={<FontAwesomeIcon icon={faSave} />}
            disabled={quizLoading}
            onClick={nexButtonClicked}
            marginTop="1rem"
          >
            Submit
          </Button>
        ) : (
          <Button
            variant="outline"
            color="teal"
            leftIcon={<FontAwesomeIcon icon={faArrowRight} />}
            onClick={nexButtonClicked}
            marginTop="1rem"
          >
            Next
          </Button>
        )}
      </Box>
    </Box>
  );
};
