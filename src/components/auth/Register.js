import React from "react";
import { register } from "../../actions/loginInAction";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { isEmptyString } from "../../utils/validations";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { isLoggedIn } from "../../utils/utility";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: "#1976d2",
    backgroundColor: "#edf2ff",
    fontWeight: "500",
    borderRadius: "4px",
    letterSpacing: "0.02857em",
    lineHeight: "1.2",
    padding: ".6180469716em 1.41575em",
    textDecoration: "none",
    display: "inline-block",
    border: "0",
    fontSize: "inherit",
    textTransform: "initial",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

function Login(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    username: "",
    password: "",
    loginError: false,
    openSnackBar: false,
    hasError: false,
    backDrop: false,
  });

  const {
    username,
    password,
    loginError,
    openSnackBar,
    hasError,
    backDrop,
  } = state;

  const onClickLogin = () => {
    setState({ ...state, backDrop: true });
    const loginData = {
      username: username,
      password: password,
    };

    if (isEmptyString(username) || isEmptyString(password)) {
      setState({ ...state, hasError: true, backDrop: false });
    } else {
      props.register(loginData, (result) => {
        if (result) {
          setState({
            ...state,
            backDrop: false,
          });
          props.handleClose();
          props.handleOpen();
        } else {
          setState({
            ...state,
            hasError: true,
            openSnackBar: true,
            backDrop: false,
          });
        }
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onClickLogin();
    }
  };

  const handleClose = () => {
    setState({ ...state, openSnackBar: false, backDrop: false });
  };

  return (
    <Dialog
      open={props.openLogin && !isLoggedIn()}
      onClose={() => props.handleClose()}
      aria-labelledby="form-dialog-title"
    >
      <DialogContent className={classes.dialogContent}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Snackbar
              autoHideDuration={1000}
              open={openSnackBar}
              TransitionComponent={SlideTransition}
              message="username already exist"
              onClose={handleClose}
            />
            <Backdrop
              className={classes.backdrop}
              open={backDrop}
              onClick={handleClose}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                error={(hasError && isEmptyString(hasError)) || loginError}
                // variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                onKeyDown={handleKeyDown}
                onChange={(e) =>
                  setState({ ...state, username: e.target.value })
                }
              />
              <TextField
                error={(hasError && isEmptyString(password)) || loginError}
                // variant="outlined"
                margin="normal"
                required
                fullWidth
                name={password}
                label="password"
                type="password"
                id="password"
                autoComplete="current-password"
                onKeyDown={handleKeyDown}
                onChange={(e) =>
                  setState({ ...state, password: e.target.value })
                }
              />
              <Button
                fullWidth
                className={classes.submit}
                onClick={() => onClickLogin()}
              >
                Sign In
              </Button>
            </form>
          </div>
        </Container>
      </DialogContent>
    </Dialog>
  );
}

Login.propTypes = {
  register: PropTypes.func,
  history: PropTypes.object,
};

export default connect(null, { register })(Login);
