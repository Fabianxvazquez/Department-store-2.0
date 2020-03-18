import React, { Component } from "react";
import axios from "axios";
import { Button, Header, Segment } from "semantic-ui-react";
import ItemUpdate from "./ItemUpdate";

export default class ItemView extends Component {
  state = { item: {} };

  componentDidMount() {
    axios.get(`/api/items/${this.props.match.params.id}`).then(res => {
      this.setState({
        item: res.data
      });
    });
    
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
        <ItemUpdate item={this.state.item}/>
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
