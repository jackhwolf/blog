import React from 'react';
import { withRouter } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import './Header.scss';

class Header extends React.Component {

  constructor(props) {
    super(props)
    this.links = [
      ["#tutorials", "Tutorials, "],
      ["#allposts", "All Posts"],
    ]
    this.goToAbout = this.goToAbout.bind(this)
  }

  goToAbout() {
    this.props.history.push({
      pathname: '/about'
    })
  }

  getLinks() {
    var links = [];
    this.links.forEach(elem => {
      links.push(<Nav.Link key={elem[0]} href={elem[0]}>{elem[1]}</Nav.Link>);
    });
    return links;
  }

  render() {
    return (
      <>
      <div className="header">
        <Navbar className="headerbar">
          <Navbar.Brand className="myname" onClick={() => this.goToAbout()}>Jack Wolf</Navbar.Brand>
          <Nav className="mr-auto">
            {this.getLinks()}
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Enter search" className="mr-sm-2" />
            <Button variant="info">go!!!</Button>
          </Form>
        </Navbar>
      </div>
      </>
    )
  }

}

export default withRouter(Header)
