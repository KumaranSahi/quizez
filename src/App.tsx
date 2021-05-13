import './App.css';
import {Navbar} from './Components'
import {Route,Switch} from 'react-router-dom'
import {Singup} from './Pages'
import {AuthContextProvider} from './Store/AuthContext/AuthContext'

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <header>
          <Navbar/>
        </header>
        <main className="main-container">
          <Switch>
            <Route path="/" component={Singup}/>
          </Switch>
        </main>
      </AuthContextProvider>
    </div>
  );
}

export default App;
