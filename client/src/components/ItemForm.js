import React from "react";
import { Form } from "semantic-ui-react";
import axios from "axios";
import HeaderText from "./HeaderText"
import styled from 'styled-components'

export default class ItemForm extends React.Component {
  state = { name: "", description: "", department: "", price: "", editing: false };

  handleSubmit = e => {
    const item = { ...this.state }
    axios
      .post("/api/items", {
        item
      })
      .then(res => {
        this.setState({ name: "", description: "", department: "", price: "" });
        //go back to products page
        this.props.history.push("/items");
      })
      .catch(err => {
        console.log(err);
      });
  };
  handleChange = e => {
    const {
      target: { name, value }
    } = e;
    //these do the same
    // const name = e.target.name
    // const value = e.target.value
    this.setState({
      [name]: value
    });
  };

  render() {
    const { name, department, description, price } = this.state;
    return (
      <div>
        <HeaderText fSize="large">New Item</HeaderText>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              label="Name"
              name="name"
              placeholder="Name"
              value={name}
              onChange={this.handleChange}
              required
            />
            <Form.Input
              label="Description"
              name="description"
              placeholder="Description"
              value={description}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              label="Department"
              name="department"
              placeholder="Department"
              value={department}
              onChange={this.handleChange}
            />
            <Form.Input
              label="Price"
              name="price"
              placeholder="Price"
              type="number"
              value={price}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Button color="blue">Submit</Form.Button>
        </Form>
      </div>
    );
  }
}
 
const StyledForm = styled.div`
  color: white
`