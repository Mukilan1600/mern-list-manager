import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppNavbar from "./components/AppNavbar";
import Main from "./components/Main";
import { connect } from "react-redux";
import Spinner from "./components/spinner";
import { loadUser } from "./redux-src/actions/AuthActions";
import PropTypes from "prop-types";

class App extends Component {
  componentDidMount() {
    this.props.loadUser();
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  render() {
    const { isLoading } = this.props.auth;
    return (
      <div className="App">
        {isLoading ? (
          <Spinner />
        ) : (
          <div>
            <AppNavbar />
            <Main />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser })(App);
