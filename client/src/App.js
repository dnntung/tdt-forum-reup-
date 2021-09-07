import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/" component={Home}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
