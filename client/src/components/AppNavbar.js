import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
} from "reactstrap";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import { connect } from "react-redux";
import { logout } from "../redux-src/actions/AuthActions";
import PropTypes from "prop-types";
import { Link, Switch, Route } from "react-router-dom";

class AppNavbar extends Component {
  state = {
    isOpen: false,
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  onLogout = () => this.props.logout();

  render() {
    const { isOpen } = this.state;
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
        <Navbar color="light" light expand="md" className="mb-5">
          <NavbarBrand href="/">ListManager 2.0</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {isAuthenticated ? (
                <React.Fragment>
                  <Switch>
                    <Route path="/profile">
                      <NavItem>
                        <Link to="/">
                          <NavLink>Home</NavLink>
                        </Link>
                      </NavItem>
                    </Route>
                    <Route path="/">
                      <NavItem>
                        <Link to="/profile">
                          <NavLink>Profile</NavLink>
                        </Link>
                      </NavItem>
                    </Route>
                  </Switch>
                  <NavItem>
                    <Button
                      color="danger"
                      onClick={this.onLogout}
                      className="mr-2"
                    >
                      Logout
                    </Button>
                  </NavItem>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <NavItem>
                    <RegisterModal></RegisterModal>
                  </NavItem>
                  <NavItem>
                    <LoginModal></LoginModal>
                  </NavItem>
                </React.Fragment>
              )}
              <NavItem>
                <NavLink href="https://github.com/mukilan1600">GitHub</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(AppNavbar);
