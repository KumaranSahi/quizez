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
import { PlayQuizContextProvider, useAuth, useQuiz } from "./Store";
import { useEffect } from "react";

const PrivateLink = ({ ...props }) => {
  const token = localStorage.getItem("token");
  const { push } = useHistory();
  useEffect(() => {
    if (!token) push("/sign-up");
  }, [token, push]);
  return <Route {...props} />;
};

const LockSignup = ({ ...props }) => {
  const token = localStorage.getItem("token");
  return token ? <Redirect to="/" /> : <Route {...props} />;
};

const AdminAuthGaurd = ({ ...props }) => {
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin");
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
            <PrivateLink path="/" component={Home} />
          </Switch>
        </PlayQuizContextProvider>
      </main>
      {token && !(pathname === "/play-quiz") && <MobileNavbar />}
      {(authLoading || quizLoading) && <Spinner />}
    </div>
  );
}

export default App;
