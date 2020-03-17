import React, { Component } from "react";
import axios from "axios";
import { Button, Header, Segment } from "semantic-ui-react";

export default class ProductView extends Component {
  state = { product: {} };

  componentDidMount() {
    console.log(this.props.match.params);
    axios.get(`/api/products/${this.props.match.params.id}`).then(res => {
      console.log(res);
      this.setState({
        product: res.data
      });
    });
    //upate UI
  }
  render() {
    const { name, description, price, department } = this.state.product;
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
      </div>
    );
  }
}
