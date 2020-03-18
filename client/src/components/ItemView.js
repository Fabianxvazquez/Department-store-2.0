import React, { Component } from "react";
import axios from "axios";
import { Button, Header, Segment, Form } from "semantic-ui-react";

export default class ItemView extends Component {
  state = { item: {}, id: null};

  componentDidMount() {
    axios.get(`/api/items/${this.props.match.params.id}`).then(res => {
      this.setState({
        item: res.data,
        id: res.data.id
      });
    });
  }
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

  handleSubmit = id => {
    const item = { ...this.state }
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

  updateForm = item => {
    return (
    <>
      <div>
        <Header as="h1">New Item</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              label="Name"
              name="name"
              placeholder="Name"
              value={this.state.item.name}
              onChange={this.handleChange}
              required
            />
            <Form.Input
              label="Description"
              name="description"
              placeholder="Description"
              value={this.state.item.description}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              label="Department"
              name="department"
              placeholder="Department"
              value={this.state.item.department}
              onChange={this.handleChange}
            />
            <Form.Input
              label="Price"
              name="price"
              placeholder="Price"
              type="number"
              value={this.state.item.price}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Button color="blue" onClick={() => this.handleSubmit(this.state.id)}>
            Submit
          </Form.Button>
        </Form>
      </div>
    </>
    )
  }

  



  render() {
    const { name, description, price, department } = this.state.item;
    console.log(this.state)
    return (
      <div>
        <Segment>
          <Header as="h1">{name}</Header>
          <Header as="h3">{department}</Header>
          <Header as="h5" color="grey">
            ${price}
          </Header>
          <p>{description}</p>
        </Segment>
        <br />
        <br />
        <Button color="black" onClick={this.props.history.goBack}>
          Back
        </Button>
        {/* <Button color="purple" onClick={() => this.updateItem(this.state.item)}>
          Edit
        </Button> */}
      </div>
    );
  }
}
