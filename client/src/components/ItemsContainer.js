import React, { Component } from "react";
import {
  Button,
  Container,
  ListGroup,
  ListGroupItem,
  Alert,
  Spinner,
} from "reactstrap";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import { deleteItem, getItems } from "../redux-src/actions/ItemsActions";
import PropTypes from "prop-types";
import ItemsModal from "./ItemsModal";

class ItemsContainer extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  };

  onDelete = (id) => {
    this.props.deleteItem(id);
  };

  render() {
    const { items, isLoading } = this.props.item;
    const { isAuthenticated } = this.props.auth;
    return (
      <Container>
        {isAuthenticated ? (
          <React.Fragment>
            <ItemsModal />
            {isLoading ? (
              <Spinner />
            ) : (
              <React.Fragment>
                <ListGroup>
                  <TransitionGroup className="List">
                    {items.map(({ _id, name }) => (
                      <CSSTransition key={_id} timeout={300} classNames="fade">
                        <ListGroupItem>
                          <Button
                            className="mr-3"
                            color="danger"
                            onClick={this.onDelete.bind(this, _id)}
                          >
                            &times;
                          </Button>
                          {name}
                        </ListGroupItem>
                      </CSSTransition>
                    ))}
                  </TransitionGroup>
                </ListGroup>
              </React.Fragment>
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Alert color="warning">Login to manage the list</Alert>
          </React.Fragment>
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  item: state.item,
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteItem })(ItemsContainer);
