import React, { Component } from "react";
import { Select, Button } from "semantic-ui-react";
import axios from "axios";

class DepOptions extends Component {
  state = {
    DepOptions: [],
    items: this.props.items,
    value: ""
  };
  componentDidMount() {
    axios
      .get("api/items")
      .then(res => {
        const DepOptions = Array
        .from(new Set(res.data
          .map(i => i.department)))
          .map(
          (d, i) => {
            return { value: d, key: i+1, text: d };
          }
        );
        console.log(DepOptions);
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
        if (value === "") {
          console.log("in the if");
          this.setState({
            items: res.data
          });
        } else {
          // const filteredArr = res.data.filter(item => item.department === 'Automotive')
          let findTerm = DepOptions.filter(dep => value === dep.value);
          const searchTerm = findTerm[0].value;
          let currentItems = res.data.filter(
            item => item.department === searchTerm
          );
          this.props.update(currentItems);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = (e, { value }) => {
    this.setState({ value });
  };

  render() {
    const { DepOptions, value } = this.state;
    return (
      <>
        <Button onClick={this.updateItems} color="blue">
          Update Page
        </Button>
        <Button onClick={this.props.getItems} color="green">
          All Items
        </Button>
        <br />
        <br />
        <Select
          selection
          name="department"
          onChange={this.handleChange}
          placeholder="Select Deptartment"
          options={DepOptions}
          value={value}
        />
        <br />
      </>
    );
  }
}

export default DepOptions;
