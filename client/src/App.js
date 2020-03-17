import React, { Fragment } from 'react';
import './App.css';
import { Container } from "semantic-ui-react";
import { Route, Switch } from 'react-router-dom'
import Home from "./components/Home";
import About from "./components/About";
import NoMatch from "./components/NoMatch";
import NavBar from "./components/NavBar";
import Items from "./components/Items";
import ItemForm from "./components/ItemForm";
import ItemView from "./components/ItemView";


function App() {
  return (
    <Fragment>
      <NavBar />
      <Container>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/items" component={Items} />
          <Route exact path="/items/:id" component={ItemView} />
          <Route component={NoMatch} />
        </Switch>
      </Container>
    </Fragment>
  );
}

export default App;
