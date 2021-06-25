import { playQuizReducer } from "./playQuizReducer";
import { playQuizInitialState } from "../PlayQuizContext";
import { PlayQuizAction } from "../playQuiz.types";

describe("Tests for play quiz reducer", () => {
  it("Should return an object where playQuizMode is set to true", () => {
    const action: PlayQuizAction = {
      type: "START_QUIZ",
    };
    const reducerOutput = playQuizReducer(playQuizInitialState, action);
    expect(reducerOutput).toEqual({
      ...playQuizInitialState,
      playQuizMode: true,
    });
  });

  it("Should return an object with currentQuestion set with a question", () => {
    const action: PlayQuizAction = {
      type: "LOAD_QUESTION",
      payload: {
        id: "id",
        multipleCorrect: true,
        options: [
          { content: "content1", isCorrect: true, id: "id1" },
          { content: "content2", isCorrect: true, id: "id2" },
        ],
        points: 10,
        question: "question",
        hint: "Hint",
        negativePoints: 5,
      },
    };
    const reducerOutput = playQuizReducer(playQuizInitialState, action);
    expect(reducerOutput).toEqual({
      ...playQuizInitialState,
      currentQuestion: {
        id: "id",
        multipleCorrect: true,
        options: [
          { content: "content1", isCorrect: true, id: "id1" },
          { content: "content2", isCorrect: true, id: "id2" },
        ],
        points: 10,
        question: "question",
        hint: "Hint",
        negativePoints: 5,
      },
    });
  });

  it("Should return an object with score updated", () => {
    const action: PlayQuizAction = {
      type: "SET_SCORE",
      payload: 100,
    };
    const reducerOutput = playQuizReducer(playQuizInitialState, action);
    expect(reducerOutput).toEqual({
      ...playQuizInitialState,
      score: 100,
    });
  });

  it("Should return an object where quiz data is reset", () => {
    const action: PlayQuizAction = {
      type: "END_QUIZ",
    };
    const reducerOutput = playQuizReducer(playQuizInitialState, action);
    expect(reducerOutput).toEqual(playQuizInitialState);
  });

  it("Should return an object where quiz responses", () => {
    const action: PlayQuizAction = {
      type: "STORE_RESPONSE",
      payload: { content: "content", index: 1, response: true },
    };
    const reducerOutput = playQuizReducer(playQuizInitialState, action);
    expect(reducerOutput).toEqual({
      ...playQuizInitialState,
      quizResponses: [{ content: "content", index: 1, response: true }],
    });
  });

  it("Should return an object where playQuizMode is set to false", () => {
    const action: PlayQuizAction = {
      type: "EXIT_PLAY_MODE",
    };
    const reducerOutput = playQuizReducer(playQuizInitialState, action);
    expect(reducerOutput).toEqual(playQuizInitialState);
  });
});
