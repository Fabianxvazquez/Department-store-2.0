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
    componentDidMount() {
    this.axiosCall()
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
