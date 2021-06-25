import { quizReducer } from "./quizReducer";
import { QuizAction } from "../quiz.types";
import { quizInitialState } from "../QuizContext";

describe("Tests for quiz reducer", () => {
  it("Should return an object with quizlist loaded", () => {
    const action: QuizAction = {
      type: "LOAD_QUIZ_LIST",
      payload: [
        {
          id: "id1",
          name: "quiz1",
          description: "description1",
          image: "imag1",
          questions: [
            {
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
          ],
        },
      ],
    };
    const reducerOutput = quizReducer(quizInitialState, action);
    expect(reducerOutput).toEqual({
      ...quizInitialState,
      quizes: [
        {
          id: "id1",
          name: "quiz1",
          description: "description1",
          image: "imag1",
          questions: [
            {
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
          ],
        },
      ],
    });
  });

  it("Should return an object with currentQuiz loaded", () => {
    const action: QuizAction = {
      type: "LOAD_CURRENT_QUIZ",
      payload: {
        id: "id1",
        name: "quiz1",
        description: "description1",
        image: "imag1",
        questions: [
          {
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
        ],
      },
    };
    const reducerOutput = quizReducer(quizInitialState, action);
    expect(reducerOutput).toEqual({
      ...quizInitialState,
      currentQuiz: {
        id: "id1",
        name: "quiz1",
        description: "description1",
        image: "imag1",
        questions: [
          {
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
        ],
      },
    });
  });

  it("Should return an object with creatingQuiz loaded", () => {
    const action: QuizAction = {
      type: "LOAD_CREATING_QUIZ",
      payload: {
        id: "id1",
        name: "quiz1",
        description: "description1",
        image: "imag1",
        questions: [
          {
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
        ],
      },
    };
    const reducerOutput = quizReducer(quizInitialState, action);
    expect(reducerOutput).toEqual({
      ...quizInitialState,
      creatingQuiz: {
        id: "id1",
        name: "quiz1",
        description: "description1",
        image: "imag1",
        questions: [
          {
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
        ],
      },
    });
  });

  it("Should return an object with myQuizes loaded", () => {
    const action: QuizAction = {
      type: "LOAD_MY_QUIZES",
      payload: [
        {
          id: "id1",
          name: "quiz1",
          description: "description1",
          image: "imag1",
          questions: [
            {
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
          ],
        },
      ],
    };
    const reducerOutput = quizReducer(quizInitialState, action);
    expect(reducerOutput).toEqual({
      ...quizInitialState,
      myQuizes: [
        {
          id: "id1",
          name: "quiz1",
          description: "description1",
          image: "imag1",
          questions: [
            {
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
          ],
        },
      ],
    });
  });

  it("Should return an object with leaderBoard loaded", () => {
    const action: QuizAction = {
      type: "LOAD_TOP_TEN",
      payload: [
        {
          id: "id1",
          quizName: "quiz name 1",
          score: 50,
          quizId: "quiz id",
          userName: "user name",
        },
      ],
    };
    const reducerOutput = quizReducer(quizInitialState, action);
    expect(reducerOutput).toEqual({
      ...quizInitialState,
      leaderBoard: [
        {
          id: "id1",
          quizName: "quiz name 1",
          score: 50,
          quizId: "quiz id",
          userName: "user name",
        },
      ],
    });
  });

  it("Should return an object with myLeaderBoard loaded", () => {
    const action: QuizAction = {
      type: "LOAD_MY_TOP_TEN",
      payload: [
        {
          id: "id1",
          quizName: "quiz name 1",
          score: 50,
          quizId: "quiz id",
          userName: "user name",
        },
      ],
    };
    const reducerOutput = quizReducer(quizInitialState, action);
    expect(reducerOutput).toEqual({
      ...quizInitialState,
      myLeaderBoard: [
        {
          id: "id1",
          quizName: "quiz name 1",
          score: 50,
          quizId: "quiz id",
          userName: "user name",
        },
      ],
    });
  });
});
