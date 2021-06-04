import React, { Component } from 'react';
// import Modal from 'react-modal';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import 'semantic-ui-css/semantic.min.css';
import Header from './components/Header/index';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from './pages/Home';

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('id_token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
  uri: '/graphql',
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="App">
            <Header />
            <Switch>
              <Route exact path = "/" component = {Home} />
              <Route exact path = "/login" component = {Login} />
              <Route exact path = "/signup" component = {Signup} />
            </Switch>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}
export default App;