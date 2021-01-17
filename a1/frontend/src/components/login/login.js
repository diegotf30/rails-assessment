import axios from 'axios';
import React from 'react';
import { Button, Input, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { FormGroup, Form, Col, Row, Container, Alert } from 'react-bootstrap';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEmpty : false,
            showErrors : false,
            errors: [],
            email : '',
            password: ''
        };

        // Form Logic
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    render() {
        return(
            <Container>
                <Popover placement="bottom" isOpen={this.state.isEmpty} target="continue">
                    <PopoverHeader>Error</PopoverHeader>
                    <PopoverBody>
                        Todos los campos deben de estar llenos.
                    </PopoverBody>
                </Popover>

                <Alert variant="danger" className={this.state.showErrors ? '' : 'd-none'}>
                    <ul>
                        { this.state.errors.map(err => <li>{err}</li>) }
                    </ul>
                </Alert>

                <FormGroup id="loginForm" className="">
                <Col>
                        <Form.Label className="input_label">Email</Form.Label>   
                    </Col>
                    <Col>
                        <Input  
                                className="input_field"
                                type = "email"
                                value = {this.state.email}
                                onChange = {this.handleEmailChange}
                                required
                                />
                    </Col>

                    <Col>
                        <Form.Label className="input_label">Password</Form.Label>   
                    </Col>
                    <Col>
                        <Input  
                                className="input_field"
                                type = "password"
                                onChange = {this.handlePasswordChange}
                                required
                                />
                        <a href={"/"} onClick={localStorage.setItem('login', false)}>Don't have an account?</a>
                    </Col>
                </FormGroup>

                <Row className="justify-content-md-end">
                    <Button color="primary" id="continue" onClick={this.handleLogin}>Login</Button>
                </Row>
            </Container>
        );
    }

    handleEmailChange(event) {
        this.setState({
            email : event.target.value
        });
    }

    handlePasswordChange(event) {
        this.setState({
            password : event.target.value
        });
    }

    handleLogin() {
        console.log(this.state)
        if(this.state.email === "" || this.state.password === "") {
            this.setState({
                isEmpty : true,
            });
            setTimeout(function() {
                this.setState({ isEmpty: false});
            }.bind(this),3500);
            return;
        }

        axios.post('/users/sign_in', { user: { email: this.state.email, password: this.state.password } })
            .then(res => {
                this.props.handleToken(res);
            })
            .catch(err => {
                let errorMsgs = [];
                if (err.response.data.error !== undefined) {
                    errorMsgs = [err.response.data.error];
                } else {
                    let errors = err.response.data.errors;
                    for (let k in errors) {
                        errors[k].map(msg => errorMsgs.push(`${k} ${msg}`));
                    }
                }

                console.log(err);
                console.log(errorMsgs);
                this.setState({ showErrors: true });
                this.setState({ errors: errorMsgs });
            })
    }
}

export default Login;