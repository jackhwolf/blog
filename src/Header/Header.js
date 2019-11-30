import React from 'react';
import ReactDOM from 'react-dom'
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
      ["/post/about", "About me"],
      ["/", "Home"]
    ]
    this.goToAbout = this.goToAbout.bind(this)
    this.submit = this.submit.bind(this)
    this.searchForm = React.createRef()
    this.searchEntry = React.createRef()
  }

  goToAbout() {
    // this.props.history.push({
    //   pathname: '/'
    // })
    console.log("Hello")
  }

  getLinks() {
    var links = [];
    var k = 0
    this.links.forEach(elem => {
      links.push(
        <Button key={k} onClick={this.goToAbout}>{elem[1]}</Button>
      );
      k += 1
    });
    return links;
  }

  submit() {
    if (this.searchEntry.current.value != "") {
      this.props.history.push({
        pathname: '/search/' + this.searchEntry.current.value
      })
      ReactDOM.findDOMNode(this.searchForm).reset();
    }
  }

  render() {
    return (
      <>
      <div className="header">
        <Navbar className="headerbar">
            <Navbar.Brand className="myname" onClick={() => this.props.history.push({pathname: '/'})}>Jack Wolf</Navbar.Brand>
          <Nav className="mr-auto">
            {this.getLinks()}
          </Nav>
          <Form inline id='searchForm' className='searchForm' ref={form => this.searchForm = form} onSubmit={this.submit}>
              <FormControl type="text" placeholder="Enter search" className="mr-sm-2" ref={this.searchEntry}/>
              <Button variant="info" type="submit">go!!!</Button>
          </Form>
        </Navbar>
      </div>
      </>
    )
  }

}

export default withRouter(Header)
