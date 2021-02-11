import React, { Component } from "react";
import PropTypes from "prop-types";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { isLoggedIn, logout } from "../../utils/utility";
import { withStyles } from "@material-ui/core/styles";
import LoginForm from "../auth/Login";
import Register from "../auth/Register";
import store from "store";
import { Link } from "react-router-dom";
import { PATH } from "../../config/routes";

const styles = (theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto",
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
});

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openLogin: false,
      openRegister: false,
      openSnackBar: false,
      msg: "",
    };
  }

  handleClose = () => {
    this.setState({
      openLogin: false,
      openSnackBar: false,
      openRegister: false,
    });
  };

  handleOpenLogin = () => {
    this.setState({ msg: "Logged in successfully", openSnackBar: true });
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Toolbar className={classes.toolbar}>
          {!isLoggedIn() ? (
            <Button
              variant="outlined"
              size="small"
              onClick={() => this.setState({ openLogin: true })}
            >
              Sign in
            </Button>
          ) : (
            <Typography
              style={{ maxWidth: "100px" }}
              color="inherit"
              className={classes.toolbarTitle}
            >
              {store.get("userSession").userData.username}
            </Typography>
          )}
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            className={classes.toolbarTitle}
          >
            <Link to={PATH.ADMINLOGIN}>Blog</Link>
          </Typography>
          {!isLoggedIn() ? (
            <Button
              variant="outlined"
              size="small"
              onClick={() => this.setState({ openRegister: true })}
            >
              Sign up
            </Button>
          ) : (
            <Button variant="outlined" size="small" onClick={() => logout()}>
              Logout
            </Button>
          )}
        </Toolbar>
        <Toolbar
          component="nav"
          variant="dense"
          className={classes.toolbarSecondary}
        ></Toolbar>
        <LoginForm
          openLogin={this.state.openLogin}
          handleClose={this.handleClose}
          handleOpen={this.handleOpen}
        />
        <Register
          openLogin={this.state.openRegister}
          handleClose={this.handleClose}
          handleOpen={this.handleOpen}
        />
      </React.Fragment>
    );
  }
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};

export default withStyles(styles)(Header);
