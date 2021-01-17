import React from 'react';
import { Row, Container, Col, Button } from 'react-bootstrap';
import { Collapse, CardBody, Card  } from 'reactstrap';
import {ReactComponent as RightArrow} from '../../svgs/right-arrow.svg';
import {ReactComponent as DownArrow} from '../../svgs/down-arrow.svg';

class LinkCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }

        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const link = this.props.link;
        const short_link = window.location.href + link.short_code;
        return(
            <Card className="w-75" onClick={this.handleClick} style={{ cursor : 'pointer' }}>
                <CardBody>
                    <Container>
                        <Row>
                            <Col xs={8}>
                                <a href={link.url}>{link.url}</a>
                            </Col>
                            <Col>
                                <a className="pr-3" href={short_link}>{short_link}</a>
                                {!this.state.isOpen ? <RightArrow width="10px" height="10px"/> : <DownArrow width="10px" height="10px"/>}
                            </Col>
                        </Row>
                        <Collapse className="mt-3" isOpen={this.state.isOpen}>
                            <h5>Clicks: {link.clicks}</h5>
                        </Collapse>
                    </Container>
                </CardBody>
            </Card>
        );
    }

    handleClick() {
        this.setState({ isOpen: !this.state.isOpen });
    }
}

export default LinkCard;