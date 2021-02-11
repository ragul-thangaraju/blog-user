import React, { Component } from "react";
import { connect } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Footer from "./Footer";
// import Header from "./Header";

export const Layout = (Content, ...propsMapping) => {
  class HOC extends Component {
    /**
     * Creates an instance of HOC.
     * @param {any} props
     * @memberof HOC
     */
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      console.log("this is layout");
      return (
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="lg">
            {/* <Header title="Blog" /> */}
            <Content {...this.props} />
          </Container>
          <Footer title="Blog" />
        </React.Fragment>
      );
    }
  }

  return connect(...propsMapping)(HOC);
};
