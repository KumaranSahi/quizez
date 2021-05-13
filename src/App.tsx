import './App.css';
import {Navbar,Spinner} from './Components'
import {Route,Switch,Redirect} from 'react-router-dom'
import {Signup,Home} from './Pages'
import {useAuth} from './Store/AuthContext/AuthContext'

const PrivateLink=({...props})=>{
  const {token}=useAuth()
  return(
      token?<Route {...props}/>:<Redirect to="/"/>
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
          <Switch>
          {token?<Route path="/" component={Home}/>:<Route path="/" component={Signup}/>}
          </Switch>
        </main>
        {authLoading &&<Spinner/>}
    </div>
  );
}

export default App;
