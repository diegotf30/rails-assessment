import axios from 'axios';
import React from 'react';
import { Button, Input, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { FormGroup, Form, Col, Row, Container, Alert } from 'react-bootstrap';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEmpty : false,
            showErrors: false,
            errors: [],
            name: '',
            email : '',
            password: '',
            password_confirmation: ''
        };

        // Form Logic
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePasswordConfirmationChange = this.handlePasswordConfirmationChange.bind(this);
        this.handleRegistration = this.handleRegistration.bind(this);
    }

    render() {
        console.log(this.state.errors)
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
                        <Form.Label className="input_label">Name</Form.Label>   
                    </Col>
                    <Col>
                        <Input  
                                className="input_field"
                                type = "name"
                                value = {this.state.name}
                                onChange = {this.handleNameChange}
                                required
                                />
                    </Col>

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
                    </Col>

                    <Col>
                        <Form.Label className="input_label">Password Confirmation</Form.Label>   
                    </Col>
                    <Col>
                        <Input  
                                className="input_field"
                                type = "password"
                                onChange = {this.handlePasswordConfirmationChange}
                                required
                                />
                        <a href={"/"} onClick={localStorage.setItem('login', true)}>Already have an account?</a>
                    </Col>
                </FormGroup>

                <Row className="justify-content-md-end">
                    <Button color="primary" id="continue" onClick={this.handleRegistration}>Register</Button>
                </Row>
            </Container>
        );
    }

    handleNameChange(event) {
        this.setState({
            name : event.target.value
        });
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

    handlePasswordConfirmationChange(event) {
        this.setState({
            password_confirmation : event.target.value
        });
    }

    handleRegistration() {
        if(this.state.email === "" || this.state.password === ""
           || this.state.password_confirmation === ""
           || this.state.name === "") {
            this.setState({
                isEmpty : true,
            });
            setTimeout(function() {
                this.setState({ isEmpty: false});
            }.bind(this),3500);
            return;
        }

        axios.post('/users/', { 'user': { 'name': this.state.name, 'email': this.state.email, 'password': this.state.password, 'password_confirmation': this.state.password_confirmation } })
            .then(res => {
                this.props.handleToken(res);
            })
            .catch(err => {
                console.log(err);
                let errorMsgs = [];
                let errors = err.response.data.errors;
                for (let k in errors) {
                    errors[k].map(msg => errorMsgs.push(`${k} ${msg}`));
                }
                console.log(errorMsgs);
                this.setState({ showErrors: true });
                this.setState({ errors: errorMsgs });
            })
    }
}

export default Register;