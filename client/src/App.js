import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Booked from "./containers/Booked";
import Home from "./containers/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/mybookings" component={Booked} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
