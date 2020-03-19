import React, { Component } from "react";
import { Select, Button } from "semantic-ui-react";
import axios from "axios";

class DepOptions extends Component {
  state = {
    DepOptions: [],
    items: this.props.items,
    value: ''
  };
  componentDidMount() {
    axios
      .get("api/items")
      .then(res => {
        let DepOptions = res.data.map((item) => {
          return ({
            value: item.department,
            key: item.index,
            text: item.department
          })
        })
        this.setState({
          DepOptions: DepOptions,
          items: this.props.items
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  updateItems = () => {
    const { value, DepOptions } = this.state;
    axios
      .get("api/items")
      .then(res => {
        if (value === '') {
          console.log("in the if")
          this.setState({
            items: res.data
          });
        } else {
          // const filteredArr = res.data.filter(item => item.department === 'Automotive')
          let findTerm = DepOptions.filter(dep => value === dep.value)
          const searchTerm = findTerm[0].value
          let currentItems = res.data.filter(item => (item.department === searchTerm));
          this.props.update(currentItems)
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = (e, {value}) => {this.setState({ value })};

  render() {
    const {DepOptions, value} = this.state
    return (
      <>
        <Select
          selection
          name="department"
          onChange={this.handleChange}
          placeholder="Select Deptartment"
          options={DepOptions}
          value={value}
        />
        <Button onClick={this.updateItems} color='blue'>Update Page</Button>
         <Button onClick={this.props.getItems} color='green'>All Items</Button>
      </>
    );
    
  }
}

export default DepOptions;
