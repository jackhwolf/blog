import React from 'react';
import { withRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Footer.scss'
import aws from '../media/awslogo.png'
import flask from '../media/flasklogo.png'
import reactjs from '../media/reactjslogo.png'

class Footer extends React.Component {

  constructor(props) {
    super(props);
    this.imgstyle = {width: 'auto', height: 100}
    this.cardstyle = {
      backgroundColor: "indianred"
    }
  }

  render() {
    return (
      <>
      <Container fluid={true} className="footer">
        <Card className="justify-content-md-center footercard" style={this.cardstyle}>
          <Row className="justify-content-md-center">
            <Col xs lg="2" className="justify-content-md-center">
              <Row className="justify-content-md-center">
                <Image className="footerimg" src={aws} rounded style={this.imgstyle}/>
              </Row>
            </Col>
            <Col xs lg="2" className="justify-content-md-center">
              <Row className="justify-content-md-center">
                <Image className="footerimg" src={flask} rounded style={this.imgstyle}/>
              </Row>
            </Col>
            <Col xs lg="2" className="justify-content-md-center">
              <Row className="justify-content-md-center">
                <Image className="footerimg" src={reactjs} rounded style={this.imgstyle}/>
              </Row>
            </Col>
          </Row>
        </Card>
      </Container>
      </>
    )
  }
}

export default withRouter(Footer);
