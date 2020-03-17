import { Menu } from "semantic-ui-react";
import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => (
  <Menu>
    <Link to="/">
      <Menu.Item>Home</Menu.Item>
    </Link>
    <Link to="/about">
      <Menu.Item>About</Menu.Item>
    </Link>
    <Link to="/items">
      <Menu.Item>Items</Menu.Item>
    </Link>
    <Link to="/item/new">
      <Menu.Item>New Item</Menu.Item>
    </Link>
  </Menu>
);

export default NavBar;
