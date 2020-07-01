import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from "reactstrap";
import { registerUser } from "../redux-src/actions/AuthActions";
import { clearErrors } from "../redux-src/actions/ErrorActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class RegisterModal extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    err: PropTypes.object.isRequired,
  };

  state = {
    isOpen: false,
    name: "",
    email: "",
    password: "",
    errMsg: null,
  };

  componentDidUpdate(prevProps) {
    const { err } = this.props;
    const { isAuthenticated } = this.props.auth;
    if (prevProps.err !== err)
      if (err.id === "REGISTER_FAIL")
        this.setState({ errMsg: err.errmsg.errmsg });
      else this.setState({ errMsg: null });
    if (isAuthenticated && this.state.isOpen) this.toggle();
  }

  toggle = () => {
    this.props.clearErrors();
    this.setState({ isOpen: !this.state.isOpen });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.registerUser(
      this.state.name,
      this.state.email,
      this.state.password
    );
  };

  render() {
    const { isOpen } = this.state;
    return (
      <div>
        <Button onClick={this.toggle} className="mr-2" color="info">
          Register
        </Button>
        <Modal toggle={this.toggle} isOpen={isOpen}>
          <Form onSubmit={this.onSubmit}>
            <ModalHeader toggle={this.toggle}>Register</ModalHeader>
            <ModalBody>
              {this.state.errMsg ? (
                <Alert color="danger">{this.state.errMsg}</Alert>
              ) : null}
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  name="name"
                  id="name"
                  onChange={this.onChange}
                  placeholder="Enter your name..."
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  name="email"
                  id="email"
                  onChange={this.onChange}
                  placeholder="Enter your email..."
                  type="email"
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  name="password"
                  id="password"
                  onChange={this.onChange}
                  placeholder="Enter the Password..."
                  type="password"
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" block>
                Register
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  err: state.error,
});

export default connect(mapStateToProps, { registerUser, clearErrors })(
  RegisterModal
);
