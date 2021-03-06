import React from 'react';
import { withRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PostDate from './PostDate.js'
import './PostArea.scss'
import '../PostSidebarText.scss'

const days = [
  'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'
]
const mos = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]

class PostTag extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      tag: this.props.tag
    }
    this.searchTag = this.searchTag.bind(this)
  }

  searchTag() {
    this.props.callback(this.state.tag)
    this.props.history.push({
      pathname: '/search/' + this.state.tag
    })
  }

  render() {
    return (
      <Card.Link className="cardtag"
        onClick={() => this.searchTag()}
        style={{textDecoration: 'underline', 
                fontSize: 'medium'}}>{this.state.tag}</Card.Link>
    )
  }
}

class PostItem extends React.Component {

  constructor(props) {
    super(props);
    this.cardstyle = {
      backgroundColor: "#C8DAFE",
      width: '50rem'
    }
    this.state = {
      id: this.props.postID,
      postdate: [], 
      tags: this.props.postTags.split(', '), 
      title: this.props.postTitle,
      desc: this.props.postDesc,
      btnKey: 'read me!'
    }
  }

  componentDidMount(date) {
    var epoch = this.props.postID.split("===")
    epoch = epoch[epoch.length-1]
    var date = new Date(0)
    date.setUTCSeconds(epoch)
    var day = days[date.getDay()]
    var month = mos[date.getMonth()]
    var A = day + ", " + month + " " + date.getDate()
    var m = date.getMinutes().toString()
    if (m.length == 1) {
      m = '0' + m
    }
    var B = date.getHours() + ":" + m
    this.setState({
      postdate: A + " " + B
    })
  }

  viewpost(postID) {
    this.props.history.push({
      pathname: '/post/' + postID
    })
  }

  renderTags() {
    var t = []
    for (var i=0; i<this.state.tags.length; i++) {
      t.push(<PostTag key={i} tag={this.state.tags[i]} history={this.props.history} callback={this.props.changeSearch}/>)
    }
    return t
  }

  render() {
    return (
      <>
        <Container fluid={"true"} className="postitem">
          <Row className="justify-content-md-center">
            {/* 
              <Col fluid={"true"}>
                <PostDate postdate={this.state.postdate}/>
              </Col>
            */}
            <Col fluid={"true"} className="justify-content-md-center">
              <Card style={this.cardstyle} border="info" className="postitemcard" fluid={"true"}>
                <Card.Header>
                  <Card.Text className="featuredheader">{this.state.title}</Card.Text>
                  <Card.Text className="carddate">{this.state.postdate}</Card.Text>
                </Card.Header>
                <Card.Body className="cardbody">
                  <Card.Text className="cardtext">{this.state.desc}</Card.Text>
                  <Card.Text>{this.renderTags()}</Card.Text>
                  <Button onClick={() => this.viewpost(this.state.id)} variant="primary"
                          className="readmore">{this.state.btnKey}</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    )
  }

}

export default withRouter(PostItem);
