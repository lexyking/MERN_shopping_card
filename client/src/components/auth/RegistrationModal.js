import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class RegistrationModal extends Component {
  state = {
    modal: false,
    name: '',
    email: '',
    password: '',
    msg: null
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      name: this.state.name
    }

    // Add item via addItem action
    this.props.addItem(newItem);

    //Close the modal
    this.toggle();
  }

  render() {
    return (
      <section>
        <Button
          color="dark"
          style={{ marginBottom: '2rem' }}
          onClick={this.toggle}
        >Add Item</Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader
            toggle={this.toggle}
          >
            Add To Shopping List
          </ModalHeader>

          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Item</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Add shopping Item"
                  onChange={this.onChange}
                // value={this.state.name}
                >
                </Input>
                <Button
                  color="dark"
                  style={{ marginTop: "2rem" }}
                  block
                >Submit</Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { addItem })(RegisterModal);