import { authReducer, signUpUser } from "./AuthReducer";
import { AuthAction, UserData, State } from "./AuthContext.types";
import axios from "axios";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

const initialState: State = {
  userId: null,
  token: null,
  userName: null,
  expiresIn: null,
  image: null,
};

describe("Testing Auth Reducer", () => {
  test("Sign in user test", () => {
    const action: AuthAction = {
      type: "SIGNIN_USER",
      payload: {
        userId: "userId",
        token: "JWT token",
        userName: "userName",
        expiresIn: new Date("1998"),
        image: "image URL",
      },
    };
    const reducerOutput = authReducer(initialState, action);

    expect(reducerOutput).toEqual({
      userId: "userId",
      token: "JWT token",
      userName: "userName",
      expiresIn: new Date("1998"),
      image: "image URL",
    });
  });

  test("Should Sign out user", () => {
    const signinAction: AuthAction = {
      type: "SIGNIN_USER",
      payload: {
        userId: "userId",
        token: "JWT token",
        userName: "userName",
        expiresIn: new Date("1998"),
        image: "image URL",
      },
    };
    const signinActionOutput = authReducer(initialState, signinAction);
    const signoutAction: AuthAction = {
      type: "SIGNOUT_USER",
    };
    const signoutActionOutput = authReducer(signinActionOutput, signoutAction);
    expect(signoutActionOutput).toEqual(initialState);
  });
});

describe("Test Signup user", () => {
  test("should signup new user", async () => {
    const userData: UserData = {
      email: "kumaran@gmail.com",
      name: "Kumaran",
      password: "12345",
      image: "url",
      isAdmin: true,
    };

    mockedAxios.post.mockResolvedValue({
      data: {
        ok: true,
        message: "User Added Successfully",
      },
    });

    const setLoading = jest.fn();
    const setCurrentPage = jest.fn();

    await signUpUser(userData, setLoading, setCurrentPage);

    expect(mockedAxios.post).toHaveBeenCalledWith("/api/users/signup", {
      email: "kumaran@gmail.com",
      name: "Kumaran",
      password: "12345",
      image: "url",
      isAdmin: true,
    });

    expect(setLoading).toHaveBeenCalledTimes(2);
    expect(setCurrentPage).toHaveBeenCalledWith("SIGNIN_PAGE");
  });
});
