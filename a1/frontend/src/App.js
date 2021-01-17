import React from 'react';
import './App.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './components/login/login';
import Landing from './components/landing/landing';
import Register from './components/register/register';
import { Container, Row } from 'react-bootstrap';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: localStorage.getItem('id'),
      token: localStorage.getItem('token'),
      login: true
    }
    this.handleToken = this.handleToken.bind(this);
  }

  render() {
    if(this.state.token === null) {
      if (localStorage.getItem('login') === 'true') {
        return(
          <Container>
            <Row><br></br></Row>
            <Row className="justify-content-md-center">
              <h1>Shortr</h1>
            </Row>
            <Row className="justify-content-md-center">
              <Login handleToken={this.handleToken}/>
            </Row>
          </Container>
        );
      } else {
        return(
          <Container>
            <Row><br></br></Row>
            <Row className="justify-content-md-center">
              <h1>Shortr</h1>
            </Row>
            <Row className="justify-content-md-center">
              <Register handleToken={this.handleToken}/>
            </Row>
          </Container>
        );
      }
    }
    else {
      return(
        <Landing token={this.state.token} id={this.state.id}/>
      );
    }
  }

  handleToken(data) {
    console.log(data)
    localStorage.setItem('token', data.headers.authorization);
    localStorage.setItem('id', data.data.id);

    this.setState({
      token: data.headers.authorization,
      id: data.data.id
    });
  }
}

export default App;