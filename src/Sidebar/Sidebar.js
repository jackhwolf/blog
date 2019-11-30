import React from 'react';
import { withRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card';
import SidebarItem from './SidebarItem.js'
import './Sidebar.scss'

class Sidebar extends React.Component {

  constructor(props) {
    super(props)
    this.sidebaritems = [];
    this.sidebarcardstyle = {
      backgroundColor: "#999999",
      padding: "4px",
      width: '20rem'
    }
    this.titlecardstyle = {
      backgroundColor: "#F0E3EF"
    }
  }

  fillSidebar() {
    for (var i=0; i<3; i++) {
      this.sidebaritems.push(<SidebarItem key={i}/>)
    }
    return this.sidebaritems
  }


  render() {
    return (
      <>
      <div className="sidebar">
      <Card className="outercard" style={this.sidebarcardstyle}>
          <Container fluid={"true"}>
            <Row className="justify-content-md-center" fluid={"true"}>
              <Col className="justify-content-md-center">
                <Card border="primary" className="sidebartitle" fluid={"true"} style={this.titlecardstyle}>
                    <Card.Text align="center" className="sidebartitletext">Featured condean</Card.Text>
                </Card>
              </Col>
            </Row>
            <Row className="justify-content-md-center" fluid={"true"}>
              <Col fluid={"true"}>
                {this.fillSidebar()}
              </Col>
            </Row>
          </Container>
        </Card>
      </div>
      </>
    )
  }

}

export default withRouter(Sidebar)
