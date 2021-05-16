import './App.css';
import {Navbar,Spinner} from './Components'
import {Route,Switch,Redirect} from 'react-router-dom'
import {Signup,Home} from './Pages'
import {useAuth} from './Store/AuthContext/AuthContext'
import {QuizContextProvider} from './Store/QuizContext/QuizContext'

const PrivateLink=({...props})=>{
  const {token}=useAuth()
  return(
      token?<Route {...props}/>:<Redirect to="/sign-up"/>
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
  return (
    <div className="App">
        <header>
          <Navbar/>
        </header>
        <main className="main-container">
          <QuizContextProvider>
            <Switch>
              <LockSignup path="/sign-up" component={Signup}/>
              {token?<PrivateLink path="/" component={Home}/>:<Route path="/" component={Signup}/>}
            </Switch>
          </QuizContextProvider>
        </main>
        {authLoading &&<Spinner/>}
    </div>
  );
}

export default App;
