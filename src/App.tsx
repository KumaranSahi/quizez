import './App.css';
import {Navbar,Spinner} from './Components'
import {Route,Switch,Redirect, useHistory} from 'react-router-dom'
import {Signup,Home,CreateQuiz,QuizEditing,MyQuizes,Rules,PlayQuiz,QuizResult} from './Pages'
import {PlayQuizContextProvider} from './Store/PlayQuizContext/PlayQuizContext'
import {useAuth} from './Store/AuthContext/AuthContext'
import { useQuiz } from './Store/QuizContext/QuizContext';
import { useEffect } from 'react';

const PrivateLink=({...props})=>{
  const {token}=useAuth()
  const {push}=useHistory()
  useEffect(()=>{
    if(!token) 
      push("/sign-up")
  },[token])
  return(
    <Route {...props}/>
  )
}

const LockSignup=({...props})=>{
  const {token}=useAuth()
  return(
      token?<Redirect to="/"/>:<Route {...props}/>
  )
}

function App() {
  const {token,authLoading}=useAuth()
  const {quizLoading}=useQuiz()
  return (
    <div className="App">
        <header>
          <Navbar/>
        </header>
        <main className="main-container">
          <PlayQuizContextProvider>
            <Switch>
              <LockSignup path="/sign-up" component={Signup}/>
              <PrivateLink path="/edit-quiz" component={QuizEditing}/>
              <PrivateLink path="/create-quiz" component={CreateQuiz}/>
              <PrivateLink path="/my-quizes" component={MyQuizes}/>
              <PrivateLink path="/rules" component={Rules}/>
              <PrivateLink path="/play-quiz" component={PlayQuiz}/>
              <PrivateLink path="/quiz-result" component={QuizResult}/>
              {token?<PrivateLink path="/" component={Home}/>:<Route path="/" component={Signup}/>}
            </Switch>
          </PlayQuizContextProvider>
        </main>
        {(authLoading||quizLoading)&&<Spinner/>}
    </div>
  );
}

export default App;
