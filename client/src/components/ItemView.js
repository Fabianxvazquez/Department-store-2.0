import React, { Component } from "react";
import axios from "axios";
import { Button, Header, Segment} from "semantic-ui-react";
import UpdateForm from './UpdateForm'

export default class ItemView extends Component {
  state = { item: {}, id: null, editing: false};
  
  axiosCall(){
    axios.get(`/api/items/${this.props.match.params.id}`).then(res => {
      this.setState({
        item: res.data,
        id: res.data.id
       });
     });
  }
<<<<<<< HEAD
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

  updateForm = () => {
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
=======
    componentDidMount() {
    this.axiosCall()
>>>>>>> 2e4467aefc7e185b48a6f77ace3740181dba8819
  }

  toggleEdit =() => {
    this.setState({
      editing: !this.state.editing
    })
    this.axiosCall()
  }

  render() {
    const { name, description, price, department } = this.state.item;
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
        {/* {this.updateForm(this.state.item)} */}
        {this.state.editing ? (<UpdateForm id={this.props.match.params.id} toggleEdit={this.toggleEdit}/>) : null}
        <Button color="purple" onClick={this.toggleEdit}>
          {this.state.editing ? 'hide form':'edit'}
        </Button>
      </div>
    );
  }
}
