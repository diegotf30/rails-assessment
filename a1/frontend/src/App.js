import React from 'react';
import './App.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './components/login/login';
import Register from './components/register/register';
import { Button } from 'reactstrap';
import { Container, Row } from 'react-bootstrap';
import {ReactComponent as LogoutSVG} from './svgs/logout.svg';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem('token'),
      login: true
    }
    this.handleToken = this.handleToken.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
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
        <Container>
          <Row className="justify-content-md-end">
            <Button color="primary" id="continue" onClick={this.handleLogout}>
              <LogoutSVG width="20px" height="20px" fill="white"/> Log out
            </Button>
          </Row>
          <Row className="justify-content-md-center">
            <h1>Shortr</h1>
          </Row>
          <Row className="justify-content-md-center">
            <h5>Welcome back!</h5>
          </Row>
        </Container>
      );
    }
  }

  handleToken(data) {
    console.log(data)
    localStorage.setItem('token', data.headers.authorization);

    this.setState({
      token: data.headers.authorization
    });
  }

  handleLogout() {
    localStorage.removeItem('token');
    this.setState({ login: true });
    window.location.reload(false);
  }
}

export default App;