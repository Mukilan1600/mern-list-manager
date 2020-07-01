import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container, Jumbotron } from "reactstrap";
import { Redirect } from "react-router-dom";

export class Profile extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  render() {
    const { user, isAuthenticated } = this.props.auth;
    return (
      <div>
        {isAuthenticated ? (
          <Jumbotron>
            <h1 className="display-3 text-center">Welcome {user.name}!</h1>
          </Jumbotron>
        ) : (
          <Redirect to="/" />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Profile);
