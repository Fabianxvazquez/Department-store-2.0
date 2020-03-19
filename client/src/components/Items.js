import React from "react";
import { Card, Header, Button } from "semantic-ui-react";
import axios from "axios";
import { Link } from "react-router-dom";
import DepOptions from "./DepSelector";
import styled from 'styled-components'

class Items extends React.Component {
  state = { items: [] };

  componentDidMount() {
    this.getItems()
  }

  deleteItem = id => {
    axios.delete(`/api/items/${id}`).then(res => {
      const { items } = this.state;
      this.setState({ items: items.filter(stuff => stuff.id !== id) });
    });
  };

  searchUpdate = (response) => {
    this.setState({
      items: response
    })
  }

  getItems = () => {
        axios
      .get("api/items")
      .then(res => {
        this.setState({
          items: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  renderItems = () => {
    const { items } = this.state;

    if (items.length <= 0) return <h2>Loading</h2>;
    return items.map(item => (
      <StyledCard key={`product-${item.id}`}>
        <Card.Content>
          <Card.Header>{item.name}</Card.Header>
          <Card.Meta>{item.department}</Card.Meta>
          <Card.Description>{item.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button as={Link} to={`items/${item.id}`} color="blue">
            View
          </Button>
          <Button onClick={() => this.deleteItem(item.id)} color="red">
            Delete
          </Button>
        </Card.Content>
      </StyledCard>
    ));
  };

  render() {
    return (
      <div>
        <Header as="h1">items</Header>
        <DepOptions items={this.state.items} getItems={this.getItems} update={this.searchUpdate}/>
        <br />
        <Card.Group>{this.renderItems()}</Card.Group>
      </div>
    );
  }
}

const StyledCard = styled(Card)`
  height: 150px;
`

export default Items;
