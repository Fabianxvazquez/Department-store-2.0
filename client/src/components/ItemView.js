import React, { Component } from "react";
import axios from "axios";
import { Button, Header, Segment} from "semantic-ui-react";
import UpdateForm from './UpdateForm'

export default class ItemView extends Component {
  state = { item: {}, id: null};

  componentDidMount() {
    axios.get(`/api/items/${this.props.match.params.id}`).then(res => {
      this.setState({
        item: res.data,
        id: res.data.id,
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
        <Button color="black" onClick={this.props.history.goBack}>
          Back
        </Button>
        {/* {this.updateForm(this.state.item)} */}
        <UpdateForm item={this.state.item} id={this.props.match.params.id} />
        {/* <Button color="purple" onClick={() => this.updateItem(this.state.item)}>
          Edit
        </Button> */}
      </div>
    );
  }
}
