import React from 'react';
import { BrowserRouter ,Router, Switch, Route, Redirect } from "react-router-dom";
import history from "./utils/history.js";
import {Login} from "./pages/Login/Login";
import {SignUp} from "./pages/SignUp/SignUp";
import {ToDoPage} from "./pages/ToDoPage/ToDoPage";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Router history={history}>
        <div className="App">
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/sign_up" component={SignUp} />
            <Route exact path="/todo" component={ToDoPage} />
            <Redirect exact from="*" to="/todo" />
          </Switch>
        </div>
      </Router>
    </BrowserRouter>
  );
}

export default App;
