import React, { Component } from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isLoggedIn } from "../utils/utility";
import { PATH } from "./../config/routes";
import Login from "./auth/Login";
import Dashboard from "./dashboard";
import PostDetail from "./postDetail";
import { ThemeProvider } from "@material-ui/core";
import "../assets/css/dev.css";
import theme from "../theme";

/**
 * Authenticated routes middleware
 * @param {*} Component
 */
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isLoggedIn() ? <Component {...props} /> : <Redirect to={PATH.DASHBOARD} />
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.object,
};

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <React.StrictMode>
          <BrowserRouter>
            <React.Fragment>
              <ThemeProvider theme={theme}>
                <Switch>
                  <Route path={PATH.ADMINLOGIN} exact component={Dashboard} />
                  <Route path={PATH.DASHBOARD} exact component={Login} />
                  <Route path={PATH.POSTDETAIL} exact component={PostDetail} />
                </Switch>
              </ThemeProvider>
            </React.Fragment>
          </BrowserRouter>
        </React.StrictMode>
      </React.Fragment>
    );
  }
}

export default App;
