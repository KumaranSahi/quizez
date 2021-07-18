import { Question, Option } from "../../../store/quizContext/quiz.types";
import { SetStateAction, useState, Dispatch, SyntheticEvent } from "react";
import {
  Modal,
  VStack,
  Heading,
  Input,
  Checkbox,
  Radio,
  HStack,
  Button,
  Text,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useQuiz } from "../../../store";

type PropTypes =
  | {
      type: "NEW_QUESTION";
      open: boolean;
      setOpen: Dispatch<SetStateAction<boolean>>;
      quiz: string;
    }
  | {
      type: "EDIT_QUESTION";
      payload: Question;
      open: boolean;
      setOpen: Dispatch<SetStateAction<boolean>>;
      quiz: string;
    };

export const QuizModal = (props: PropTypes) => {
  const [question, setQuestion] = useState(
    props.type === "EDIT_QUESTION" ? props.payload.question : ""
  );
  const [options, setOptions] = useState<Option[] | null>(
    props.type === "EDIT_QUESTION" ? props.payload.options : null
  );
  const [points, setPoints] = useState(
    props.type === "EDIT_QUESTION" ? props.payload.points : 0
  );
  const [negativePoints, setNegativePoints] = useState(
    props.type === "EDIT_QUESTION" && props.payload.negativePoints
      ? props.payload.negativePoints
      : 0
  );
  const [multipleCorrect, setMultipleCorrect] = useState(
    props.type === "EDIT_QUESTION" ? props.payload.multipleCorrect : false
  );
  const [hint, setHint] = useState(
    props.type === "EDIT_QUESTION" && props.payload.hint
      ? props.payload.hint
      : ""
  );

  const [addOption, setAddOption] = useState("");
  const [addOptionError, setAddOptionError] = useState(false);

  const {
    createQuestion,
    editQuestion,
    dispatch,
    setQuizLoading,
    quizLoading,
    creatingQuiz,
  } = useQuiz();

  const handleClose = () => {
    setQuestion("");
    setOptions(null);
    setPoints(0);
    setNegativePoints(0);
    setMultipleCorrect(false);
    setHint("");
    setAddOption("");
    props.setOpen(false);
  };

  const addOptionButtonClicked = () => {
    if (
      addOption &&
      !(
        options &&
        options.some(
          ({ content }) => content.toLowerCase() === addOption.toLowerCase()
        )
      )
    ) {
      setOptions((state) =>
        state
          ? [...state, { content: addOption, isCorrect: false }]
          : [{ content: addOption, isCorrect: false }]
      );
      setAddOptionError(false);
      setAddOption("");
    } else {
      setAddOptionError(true);
      setAddOption("");
    }
  };

  const optionClicked = (id = "", content: string, radio = false) => {
    if (id) {
      setOptions(
        (state) =>
          state &&
          state.map((option) =>
            option.id === id
              ? { ...option, isCorrect: !option.isCorrect }
              : { ...option, isCorrect: radio ? false : option.isCorrect }
          )
      );
    } else {
      setOptions(
        (state) =>
          state &&
          state.map((option) =>
            option.content === content
              ? { ...option, isCorrect: !option.isCorrect }
              : { ...option, isCorrect: radio ? false : option.isCorrect }
          )
      );
    }
  };

  const optionDeleteClicked = (id = "", content: string) => {
    if (id) {
      setOptions(
        (state) => state && state.filter((option) => option.id !== id)
      );
    } else {
      setOptions(
        (state) => state && state.filter((option) => option.content !== content)
      );
    }
  };

  const questionSubmitted = (event: SyntheticEvent) => {
    event.preventDefault();
    if (
      question &&
      options &&
      options.length > 1 &&
      options.some(({ isCorrect }) => isCorrect) &&
      points > 0
    ) {
      if (props.type === "NEW_QUESTION") {
        createQuestion(
          {
            hint: hint,
            multipleCorrect: multipleCorrect,
            negativePoints: negativePoints,
            options: options,
            points: points,
            question: question,
            quiz: props.quiz,
          },
          setQuizLoading,
          dispatch,
          creatingQuiz
        );
        handleClose();
      } else {
        editQuestion(
          {
            hint: hint,
            multipleCorrect: multipleCorrect,
            negativePoints: negativePoints,
            options: options,
            points: points,
            question: question,
            quiz: props.quiz,
          },
          props.payload.id,
          setQuizLoading,
          dispatch,
          creatingQuiz
        );
        handleClose();
      }
    }
  };

  return (
    <Modal isOpen={props.open} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <Heading color="teal">Add a question</Heading>
        <form onSubmit={questionSubmitted}>
          <VStack padding="1rem" alignItems="flex-start">
            <Input
              placeholder="Question"
              width="100%"
              required
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
            />
            <Checkbox
              isChecked={multipleCorrect}
              onChange={() => {
                setMultipleCorrect((state) => !state);
                setOptions(
                  (state) =>
                    state &&
                    state.map((option) => ({ ...option, isCorrect: false }))
                );
              }}
              color="teal"
            >
              Has multiple correct answers
            </Checkbox>
            <HStack>
              <Input
                placeholder="Points"
                type="number"
                required
                value={points}
                onChange={(event) => setPoints(+event.target.value)}
              />
              <Input
                placeholder="Negative Points"
                type="number"
                value={negativePoints}
                onChange={(event) => setNegativePoints(+event.target.value)}
              />
            </HStack>
            <Text>Options(atleast 2 options)</Text>
            {multipleCorrect ? (
              <>
                {options &&
                  options.map(({ content, isCorrect, id }) => (
                    <HStack key={id ? id : content}>
                      <Checkbox
                        key={id ? id : content}
                        name={content}
                        isChecked={isCorrect}
                        onChange={() => optionClicked(id, content)}
                      >
                        {content}
                      </Checkbox>
                      <Button
                        color="red"
                        onClick={() => optionDeleteClicked(id, content)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </HStack>
                  ))}
              </>
            ) : (
              <>
                {options?.map(({ id, content, isCorrect }) => (
                  <HStack key={id ? id : content}>
                    <Radio
                      color="primary"
                      name={content}
                      isChecked={isCorrect}
                      onClick={() => optionClicked(id, content, true)}
                    >
                      {content}
                    </Radio>
                    <Button
                      color="red"
                      onClick={() => optionDeleteClicked(id, content)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </HStack>
                ))}
              </>
            )}
            <HStack marginBottom="1rem">
              <Input
                label="option"
                value={addOption}
                onChange={(event) => setAddOption(event.target.value)}
              />
              <Button color="teal" onClick={addOptionButtonClicked}>
                <FontAwesomeIcon icon={faPlusCircle} />
              </Button>
            </HStack>
            {addOptionError && (
              <Text color="red" fontStyle="italic">
                Options have to be unique
              </Text>
            )}
            <Input
              placeholder="Hint"
              width="100%"
              value={hint}
              onChange={(event) => setHint(event.target.value)}
            />
            <Button
              color="teal"
              type="submit"
              variant="solid"
              width="100%"
              marginTop="1rem"
              isLoading={quizLoading}
              loadingText={
                props.type === "NEW_QUESTION"
                  ? "Adding Question"
                  : "Modifying Question"
              }
            >
              {props.type === "NEW_QUESTION"
                ? "Add Question"
                : "Modify Question"}
            </Button>
          </VStack>
        </form>
      </ModalContent>
    </Modal>
  );
};
