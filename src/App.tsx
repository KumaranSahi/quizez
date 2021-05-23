import "./App.css";
import { Navbar, Spinner, MobileNavbar } from "./Components";
import {
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import {
  Signup,
  Home,
  CreateQuiz,
  QuizEditing,
  MyQuizes,
  Rules,
  PlayQuiz,
  QuizResult,
  MyScores,
  CreateQuizAndLeaderBoardPage,
} from "./Pages";
import { PlayQuizContextProvider } from "./Store/PlayQuizContext/PlayQuizContext";
import { useAuth } from "./Store/AuthContext/AuthContext";
import { useQuiz } from "./Store/QuizContext/QuizContext";
import { useEffect } from "react";

const PrivateLink = ({ ...props }) => {
  const { token } = useAuth();
  const { push } = useHistory();
  useEffect(() => {
    if (!token) push("/sign-up");
  }, [token]);
  return <Route {...props} />;
};

const LockSignup = ({ ...props }) => {
  const { token } = useAuth();
  return token ? <Redirect to="/" /> : <Route {...props} />;
};

const AdminAuthGaurd = ({ ...props }) => {
  const { token, isAdmin } = useAuth();
  return token && isAdmin ? <Route {...props} /> : <Redirect to="/" />;
};

function App() {
  const { token, authLoading } = useAuth();
  const { quizLoading } = useQuiz();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <main className="main-container">
        <PlayQuizContextProvider>
          <Switch>
            <LockSignup path="/sign-up" component={Signup} />
            <AdminAuthGaurd path="/edit-quiz" component={QuizEditing} />
            <AdminAuthGaurd path="/create-quiz" component={CreateQuiz} />
            <AdminAuthGaurd path="/my-quizes" component={MyQuizes} />
            <PrivateLink path="/rules" component={Rules} />
            <PrivateLink path="/play-quiz" component={PlayQuiz} />
            <PrivateLink path="/quiz-result" component={QuizResult} />
            <PrivateLink path="/my-scores" component={MyScores} />
            <PrivateLink
              path="/mobile-leaderboard"
              component={CreateQuizAndLeaderBoardPage}
            />
            {token ? (
              <PrivateLink path="/" component={Home} />
            ) : (
              <Route path="/" component={Signup} />
            )}
          </Switch>
        </PlayQuizContextProvider>
      </main>
      {token && !(pathname === "/play-quiz") && <MobileNavbar />}
      {(authLoading || quizLoading) && <Spinner />}
    </div>
  );
}

export default App;
