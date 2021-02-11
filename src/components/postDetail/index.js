import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Layout } from "../common/Layout";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { getPostDetails, addPostComments } from "../../actions/postAction";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import { isLoggedIn } from "../../utils/utility";
import Moment from "moment";
import LoginForm from "../auth/Login";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import Header from "../common/Header";

const styles = (theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  commentInput: {
    border: "none",
    outline: 0,
    fontSize: 15,
    width: "-webkit-fill-available",
    height: 60,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 16,
    borderBottom: "1px solid lightgrey",
  },
});

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

class BlogDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      postDetails: {},
      commentDetails: [],
      comment: "",
      openLogin: false,
      openSnackBar: false,
    };
  }

  componentDidMount() {
    const postId = this.props.match.params.postId;
    this.setState({ loading: true });
    this.props.getPostDetails({ postId }, (data, result) => {
      this.setState({ loading: false });
      if (result) {
        this.setState({
          postDetails: data.data,
          commentDetails: data.data.commentDetails,
        });
      } else {
        console.log("");
      }
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  addComments = () => {
    this.setState({ loading: true });
    this.props.addPostComments(
      { postId: this.props.match.params.postId, comment: this.state.comment },
      (data, result) => {
        this.setState({ loading: false });
        if (result) {
          this.setState({
            msg: "submitted for review..",
            openSnackBar: true,
            comment: "",
          });
        } else {
          console.log("");
        }
      }
    );
  };

  handleClose = () => {
    this.setState({ openLogin: false, openSnackBar: false });
  };

  handleOpen = () => {
    this.setState({ msg: "Logged in successfully", openSnackBar: true });
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Header title="Blog" />
        <CssBaseline />
        <main>
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                {this.state.postDetails.title}
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
              >
                {this.state.postDetails.description}
              </Typography>
            </Container>
          </div>
          <Container className={classes.cardGrid} maxWidth="md">
            <Grid container>
              <Grid item xs={12} sm={12} md={12}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={this.state.postDetails.image}
                    title={this.state.postDetails.title}
                  />
                </Card>
              </Grid>
              <List>
                {this.state.commentDetails &&
                  this.state.commentDetails.map((comment) => (
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={comment.name}
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              color="textPrimary"
                            >
                              {Moment(comment.createdAt).fromNow()}
                            </Typography>
                            {` — ${comment.comment}`}
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  ))}
              </List>

              {!isLoggedIn() ? (
                <Grid
                  style={{ marginTop: "30px" }}
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  align="center"
                >
                  you must{" "}
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => this.setState({ openLogin: true })}
                  >
                    Sign in
                  </Button>{" "}
                  to post your comments
                </Grid>
              ) : (
                <Grid item xs={12} sm={12} md={12} align="center">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      this.addComments();
                    }}
                  >
                    <input
                      type="text"
                      className={classes.commentInput}
                      placeholder="Add a comment..."
                      name="comment"
                      value={this.state.comment}
                      onChange={(e) => this.handleChange(e)}
                    />
                  </form>
                </Grid>
              )}
            </Grid>
          </Container>

          <Snackbar
            autoHideDuration={1000}
            open={this.state.openSnackBar}
            TransitionComponent={SlideTransition}
            message={this.state.msg}
            onClose={this.handleClose}
          />
          <LoginForm
            openLogin={this.state.openLogin}
            handleClose={this.handleClose}
            handleOpen={this.handleOpen}
            onClickDeleteConfirm={this.onClickDeleteConfirm}
          />
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

BlogDetail.propTypes = {
  getPostDetails: PropTypes.func,
  isLoggedIn: PropTypes.func,
  addPostComments: PropTypes.func,
};

export default Layout(withStyles(styles)(BlogDetail), mapStateToProps, {
  getPostDetails,
  isLoggedIn,
  addPostComments,
});
