import React from "react";
import { Card, Header, Button, Icon } from "semantic-ui-react";
import axios from "axios";
import { Link } from "react-router-dom";
import DepOptions from "./DepSelector";
import styled from "styled-components";
import HeaderText from "./HeaderText"


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
      <StyledCard key={`product-${item.id}`} className="ui card inverted">
        <Card.Content>
          <Card.Header>{item.name}</Card.Header>
          <Card.Meta>{item.department}</Card.Meta>
          <Card.Description>{item.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button as={Link} to={`items/${item.id}`} color="blue">
            View
          </Button>
          <ButtonNew>
            <DeleteButton onClick={() => this.deleteItem(item.id)}>
              <Icon className="trash alternate outline"></Icon>
            </DeleteButton>
          </ButtonNew>
        </Card.Content>
      </StyledCard>
    ));
  };

  render() {
    return (
      <div>
        <HeaderText fSize='large'>Items</HeaderText>
        <DepOptions items={this.state.items} getItems={this.getItems} update={this.searchUpdate}/>
        <br />
        <Card.Group>{this.renderItems()}</Card.Group>
      </div>
    );
  }
}
export default Items

const DeleteButton = styled.div`
display: flex;
background: red;
color: white;
padding: 5px;
justify-content:center;
cursor: pointer
transition: background .5 ease;
border-radius: 10px;

&:hover{
  background:#606060;
  transision: background .3s ease;
}
`

const ButtonNew = styled.a`
float: right;
border-radius: 10px;
color: ${props => props.theme.fg} !important;
background-color: ${ props => props.theme.bg}
`
const StyledCard = styled(Card)`
  height: 150px;
  widith: 100px;
`


