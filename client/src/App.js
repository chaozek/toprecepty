import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { GlobalStyles } from "./GlobalStyles";
import Form from "./pages/Form";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Recipe from "./pages/Recipe";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";

function App() {
  axios.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
      req.headers.authorization = `Bearer ${
        JSON.parse(localStorage.getItem("profile")).token
      }`;
    }
    return req;
  });
  return (
    <Router basename="/">
      <GlobalStyles />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/recipe/:id" component={Recipe} />
        <Route exact path="/add" component={Form} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route path="/password-reset" component={ResetPassword} />
        <Route
          exact
          path="/password-reset/:userId/:token"
          component={ResetPassword}
        />
      </Switch>
    </Router>
  );
}

export default App;
