import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  ModalFooter,
  Label,
  Input,
} from "reactstrap";
import { connect } from "react-redux";
import { addItem, getItems } from "../redux-src/actions/ItemsActions";

class ItemsModal extends Component {
  componentDidMount() {
    this.props.getItems();
  }

  state = {
    isOpen: false,
    name: "",
  };

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    this.props.addItem(this.state.name);
    this.toggle();
  };

  render() {
    const { isOpen } = this.state;
    return (
      <div>
        <Button onClick={this.toggle} className="mb-3">
          Add Item
        </Button>
        <Modal isOpen={isOpen} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add item to the list</ModalHeader>
          <Form onSubmit={this.onSubmit}>
            <ModalBody>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  name="name"
                  id="name"
                  onChange={this.onChange}
                  placeholder="Enter the name..."
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" block>
                Add Item
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default connect(null, { addItem, getItems })(ItemsModal);
