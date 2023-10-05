import './App.css';
import { Route} from "react-router-dom"
import Landing from './views/Landing/Landing';
import Home from './views/Home/Home';
import Detail from './views/Detail/Detail';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Form from './views/Form/Form'

function App() {
  const location = useLocation()
  return (
    <div className="App">
          {location.pathname !== "/" && <Navbar/> }
      <Route exact path= "/" component={Landing}/>
      <Route exact path='/detail/:id' component={Detail}/>
      <Route exact path='/create' component={Form}/>
      <Route path='/home' render={() => <Home/>}/>
    </div>
  );
}

export default App;
