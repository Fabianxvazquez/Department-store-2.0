import React, { Component } from 'react'
import axios from 'axios'
import {Header, Form} from 'semantic-ui-react'


export default class UpdateForm extends Component {
  state = {
      name: {},
      description: {},
      department: {},
      price: {}
  }

  componentDidMount() {
    console.log(this.props.id)
    axios.get(`/api/items/${this.props.id}`).then(res => {
      this.setState({
        name: res.data.name,
        description: res.data.description,
        department: res.data.department,
        price: res.data.price
      });
    });
  }

   handleChange = e => {
    const {target: { name, value }} = e;
    this.setState({
      [name]: value
    });
  };

  updateItem = (data) => {
    const id = this.props.id
    axios
      .patch(`/api/items/${id}`, data)
      .then(res => {
        console.log('hit then')
        this.props.toggleEdit()
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleSubmit = () =>{
    this.updateItem(this.state)
  }
  render() {
    const {name, description, department, price } = this.state
    return (
      <>
        <div>
          <Header as="h1">Update</Header>
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
            <Form.Button
              color="blue"
            >
              Submit
            </Form.Button>
          </Form>
        </div>
      </>
    );
  }
}