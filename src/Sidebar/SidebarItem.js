import React from 'react';
import { withRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './Sidebar.scss'
import '../PostSidebarText.scss'

class SidebarItem extends React.Component {

  constructor(props) {
    super(props);
    this.cardstyle = {
      backgroundColor: "#F0E3EF"
    }
  }

  render() {
    return (
      <>
        <Container fluid={true} className="sidebarcontainer">
          <Row className="sidebarcontainer">
            <Card border="primary" style={this.cardstyle} className="sidebaritem">
              <Card.Header className="featuredheader">Featured</Card.Header>
              <Card.Body className="cardbody">
                <Card.Title className="cardtitle">Special title treatment</Card.Title>
                <Card.Text className="cardtext">
                  With supporting text below as a natural lead-in to additional content.
                </Card.Text>
                <Button variant="primary" className="readmore">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Row>
        </Container>
      </>
    )
  }

}

export default withRouter(SidebarItem);
