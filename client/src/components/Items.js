import React from "react";
import { Card, Header, Button } from "semantic-ui-react";
import axios from "axios";
import { Link } from "react-router-dom";

class Products extends React.Component {
  state = { products: [] };

  componentDidMount() {
    // TODO: Make GET request with axios
    axios
      .get("api/products")
      .then(res => {
        console.log(res);
        //product arrays
        this.setState({
          products: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
    // TODO: Update state
  }

  renderProducts = () => {
    const { products } = this.state;

    if (products.length <= 0) return <h2>No Products</h2>;
    return products.map(product => (
      <Card key={`product-${product.id}`}>
        <Card.Content>
          <Card.Header>{product.name}</Card.Header>
          <Card.Meta>{product.department}</Card.Meta>
          <Card.Description>{product.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button as={Link} to={`products/${product.id}`} color="blue">
            View
          </Button>
        </Card.Content>
      </Card>
    ));
  };

  render() {
    return (
      <div>
        <Header as="h1">Products</Header>
        <br />
        <Card.Group>{this.renderProducts()}</Card.Group>
      </div>
    );
  }
}

export default Products;
