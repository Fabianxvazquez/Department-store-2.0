import React, { Component } from 'react'
import { Form, Header} from 'semantic-ui-react'
import axios from "axios"


export default class ItemUpdate extends Component {
  state = { 
    name:this.props.name, 
    description: this.props.description, 
    department: this.props.department,
    price: this.props.price,
    id: this.props.id
  }

   handleSubmit = id => {
    const item = { ...this.state }
    console.log(item)
    axios
      .put(`/api/items/${id}`, item)
      .then(res => {
        console.log(res);
        //go back to products page
        this.props.history.push(`/items/${id}`);
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

  render(){
    const { name, department, description, price, id } = this.state
    return (
      <div>
        <Header as="h1">New Item</Header>
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
          <Form.Button color="blue" onClick={() => this.handleSubmit(id)}>Submit</Form.Button>
        </Form>
      </div>
    );
  }

}