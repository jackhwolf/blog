import React from 'react';
import { withRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Header from '../Header/Header.js';
import Sidebar from '../Sidebar/Sidebar.js';
import PostArea from '../PostArea/PostArea.js';
import Footer from '../Footer/Footer.js';
import '../App.scss';
import '../Main.scss';


class Landing extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      search: this.props.match.params.q
    }
    this.changeSearch = this.changeSearch.bind(this)
  }

  changeSearch(search) { 
    console.log("change search")
    this.setState({search: search}) 
  }

  render () {
    console.log("render " + this.state.search)
    return (
      <div className="main">
        <Container className="maincontainer" fluid={"true"}>
          <Row className="mainrow" fluid={"true"}>
            <Col><Header handler={this.changeSearch}/></Col>
          </Row>
          <Row className="justify-content-md-center mainrow">
            {/*<Col xs={3} md={2} fluid={"true"} className="farleft sidecol"><Sidebar/></Col>*/}
            <Col fluid={"true"} className="maincol"><PostArea search={this.state.search}/></Col>
          </Row>
          <Row className="justify-content-md-center" fluid={"true"}>
            <Col fluid={"true"}><Footer/></Col>
          </Row>
        </Container>
      </div>
    )
  }

}

export default withRouter(Landing)
