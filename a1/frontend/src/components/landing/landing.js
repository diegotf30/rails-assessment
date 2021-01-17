import axios from 'axios';
import React from 'react';
import validator from 'validator'
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { Row, Container, InputGroup, FormControl, Button } from 'react-bootstrap';
import {ReactComponent as LogoutSVG} from '../../svgs/logout.svg';
import LinkCard from './link_card';

class Landing extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.id, this.props.token)
        this.state = {
            invalidURL: false,
            url: '',
            links: []
        };
        this.onKeyUp = this.onKeyUp.bind(this);
        this.handleShorten = this.handleShorten.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.getLinks();
    }

    render() {
        return(
            <Container>
                <Popover placement="right" isOpen={this.state.invalidURL} target="shortenBtn">
                    <PopoverHeader>Error</PopoverHeader>
                    <PopoverBody>
                        URL is invalid!
                    </PopoverBody>
                </Popover>

                <Row className="justify-content-md-end">
                    <Button color="primary" id="continue" onClick={this.handleLogout}>
                    <LogoutSVG width="20px" height="20px" fill="white"/> Log out
                    </Button>
                </Row>
                <Row className="justify-content-md-center">
                    <h1>Shor</h1>
                    <h1 style={{color: '#007bff'}}>tr</h1>
                </Row>
                <Row className="justify-content-md-center">
                    <h5>Welcome back!</h5>

                    <InputGroup className="mb-3 mt-3">
                        <FormControl
                        id="shortenInput"
                        placeholder="URL to shorten"
                        aria-label="URL to shorten"
                        onKeyPress={this.onKeyUp}
                        value={this.state.url}
                        onChange={e => this.setState({url: e.target.value})}
                        />
                        <InputGroup.Append>
                            <Button variant="outline-primary" onClick={this.handleShorten} id="shortenBtn">+</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Row>

                <Row className="justify-content-md-center">
                    <h5>Your links</h5>
                </Row>
                    {this.state.links.map(link => {
                        return (
                            <Row className="justify-content-md-center mb-4">
                                <LinkCard link={link}/>
                            </Row>
                        );
                    })}
            </Container>
        );
    }

    onKeyUp(event) {
        if (event.charCode === 13) {
          this.handleShorten();
        }
    }

    handleShorten() {
        if (validator.isURL(this.state.url)) {
            let url = this.state.url
            if (!url.includes('http')) {
                url = `http://${this.state.url}`;
            }
            const postBody = { 
                link: {
                    url: url,
                    user_id: this.props.id,
                    clicks: 0,
                }
             }
            this.setState({url: ''});
            axios.post(`/links`, postBody, { headers: { authentication: this.props.token } })
                .then(res => {
                    console.log(res);
                    window.location.reload(false);
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            this.setState({
                invalidURL : true,
            });
            setTimeout(function() {
                this.setState({ invalidURL: false});
            }.bind(this),3500);
        }
    }

    getLinks() {
        axios.get(`/users/${this.props.id}/links`, { headers: { authentication: this.props.token } })
            .then(res => {
                this.setState({ links: res.data })
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    handleLogout() {
        localStorage.removeItem('token');
        this.setState({ login: true });
        window.location.reload(false);
      }
}

export default Landing;