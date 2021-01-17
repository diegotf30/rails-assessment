import React from 'react';
import { Button, Card } from 'react-bootstrap';

class LinkCard extends React.Component {
    render() {
        const link = this.props.link;
        return(
            <Card>
                <Card.Header as="h5">{link.url} - {link.short_code}</Card.Header>
                <Card.Body>
                    <Card.Title>Clicks: {link.clicks}</Card.Title>
                    <Card.Text>
                    TODO
                    </Card.Text>
                    <Button variant="primary">Edit</Button>
                    <Button variant="danger">Delete</Button>
                </Card.Body>
            </Card>
        );
    }
}

export default LinkCard;