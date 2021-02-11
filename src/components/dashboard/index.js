import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import MainFeaturedPost from "./MainFeaturedPost";
import { getPost } from "../../actions/postAction";
import { Layout } from "../common/Layout";
import Header from "../common/Header";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.props.getPost({}, (result) => {
      this.setState({ loading: false });
      if (result) {
        console.log("");
      } else {
        console.log("");
      }
    });
  }

  render() {
    return (
      <main>
        <Header title="Blog" />
        <Grid container spacing={4}>
          {this.props.postList.length ? (
            this.props.postList.map((post) => <MainFeaturedPost post={post} />)
          ) : this.state.loading ? (
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <CircularProgress />
            </Grid>
          ) : (
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                No blogs..stay tuned
              </Typography>
            </Grid>
          )}
        </Grid>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    postList: state.post.postList,
  };
};

Blog.propTypes = {
  getPost: PropTypes.func,
};

export default Layout(Blog, mapStateToProps, {
  getPost,
});
