import React from 'react';
import axios from 'axios';
import { Row, Container, Col, Button } from 'react-bootstrap';
import { Collapse, CardBody, Card  } from 'reactstrap';

import {ReactComponent as Edit} from '../../svgs/edit.svg';
import {ReactComponent as Trash} from '../../svgs/trash.svg';
import {ReactComponent as RightArrow} from '../../svgs/right-arrow.svg';
import {ReactComponent as DownArrow} from '../../svgs/down-arrow.svg';

class LinkCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCard: true,
            isOpen: false,
            editing: false,
            url: this.props.link.url
        }

        this.handleClick = this.handleClick.bind(this);
        this.getStats = this.getStats.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    render() {
        const link = this.props.link;
        const short_link = window.location.href + link.short_code;
        const stats = this.getStats(link.visits);
        const cardStyle = this.state.showCard ? { cursor : 'pointer' } : { display: 'none' };
        return(
            <Card className="w-75" onClick={this.handleClick} style={cardStyle}>
                <CardBody>
                    <Container>
                        <Row>
                            <Col xs={8}>
                                { this.state.editing ? <input autoFocus defaultValue={link.url} onKeyPress={this.handleUpdate} onChange={this.handleInput}></input> : <a href={this.state.url}>{this.state.url}</a>}
                            </Col>
                            <Col>
                                <a className="pr-3" href={short_link}>{short_link}</a>
                                {!this.state.isOpen ? <RightArrow width="10px" height="10px"/> : <DownArrow width="10px" height="10px"/>}
                            </Col>
                        </Row>
                        <Collapse className="mt-3" isOpen={this.state.isOpen}>
                            <h5>Statistics</h5>
                            <ul>
                                <li>Total clicks: <b>{link.clicks}</b></li>
                                <li>Operating systems
                                    <ul>
                                        {Object.entries(stats.os).map(([k,v]) => { return <li>{k} - {v}%</li> })}
                                    </ul>
                                </li>
                                <li>Platforms
                                    <ul>
                                        {Object.entries(stats.platform).map(([k,v]) => { return <li>{k} - {v}%</li> })}
                                    </ul>
                                </li>
                                <li>Browsers
                                    <ul>
                                        {Object.entries(stats.browser).map(([k,v]) => { return <li>{k} - {v}%</li> })}
                                    </ul>
                                </li>

                                <li>Mobile - {(stats.mobile / link.visits.length) * 100}%
                                </li>
                            </ul>
                            <Row className="justify-content-md-end">
                                <Button variant="success" onClick={this.handleEdit}>
                                    <Edit className="mr-1 mb-1" fill="white" width="20px" height="20px"/>
                                    Edit
                                </Button>
                                <Button className="ml-2" variant="danger" onClick={this.handleDelete}>
                                    <Trash className="mr-1 mb-1" fill="white" width="20px" height="20px"/>
                                    Delete
                                </Button>
                            </Row>
                        </Collapse>
                    </Container>
                </CardBody>
            </Card>
        );
    }

    handleEdit() {
        this.setState({ editing: !this.state.editing });
    }

    handleInput(event) {
        this.setState({ url: event.target.value });
    }

    handleDelete() {
        axios.delete(`/links/${this.props.link.id}`, { headers: { authentication: this.props.token } })
            .then(res => {
                console.log(res);
                this.setState({ showCard: false });
            })
            .catch(err => {
                console.log(err);
            })
    }

    handleUpdate(event) {
        if (event.charCode === 13) {
            axios.put(`/links/${this.props.link.id}`, { link: { url: this.state.url } }, { headers: { authentication: this.props.token } })
                .then(res => {
                    console.log(res);
                    this.setState({ editing: false });
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    handleClick() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    getStats(visits) {
        let os_count = 0;
        let platform_count = 0;
        let browser_count = 0;
        let stats = { os: {}, platform: {}, browser: {}, mobile: 0 };
        for (const visit of visits) {
            if (visit.os !== '') {
                if (visit.os in stats.os) {
                    stats.os[visit.os]++;
                } else {
                    stats.os[visit.os] = 1;
                }
                os_count++;
            }

            if (visit.platform !== '') {
                if (visit.platform in stats.platform) {
                    stats.platform[visit.platform]++;
                } else {
                    stats.platform[visit.platform] = 1;
                }
                platform_count++;
            }

            if (visit.browser !== '') {
                if (visit.browser in stats.browser) {
                    stats.browser[visit.browser]++;
                } else {
                    stats.browser[visit.browser] = 1;
                }
                browser_count++;
            }

            if (visit.mobile)
                stats.mobile++;
        }

        for (const os in stats.os) {
            stats.os[os] = (stats.os[os] / os_count) * 100;
        }

        for (const platform in stats.platform) {
            stats.platform[platform] = (stats.platform[platform] / platform_count) * 100;
        }

        for (const browser in stats.browser) {
            stats.browser[browser] = (stats.browser[browser] / browser_count) * 100;
        }
        return stats;
    }
}

export default LinkCard;