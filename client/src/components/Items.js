import React from "react";
import { Card, Header, Button } from "semantic-ui-react";
import axios from "axios";
import { Link } from "react-router-dom";

class Items extends React.Component {
  state = { items: [] };

  componentDidMount() {
    // TODO: Make GET request with axios
    axios
      .get("api/items")
      .then(res => {
        console.log(res);
        //product arrays
        this.setState({
          items: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
    // TODO: Update state
  }

  renderProducts = () => {
    const { items } = this.state;

    if (items.length <= 0) return <h2>Loading</h2>;
    return items.map(item => (
      <Card key={`product-${item.id}`}>
        <Card.Content>
          <Card.Header>{item.name}</Card.Header>
          <Card.Meta>{item.department}</Card.Meta>
          <Card.Description>{item.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button as={Link} to={`items/${item.id}`} color="blue">
            View
          </Button>
        </Card.Content>
      </Card>
    ));
  };

  render() {
    return (
      <div>
        <Header as="h1">items</Header>
        <br />
        <Card.Group>{this.renderProducts()}</Card.Group>
      </div>
    );
  }
}

export default Items;
