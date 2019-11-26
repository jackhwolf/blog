import React from 'react';
import { withRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PostTag from './PostTag.js'
import './PostArea.scss'
import '../PostSidebarText.scss'

class PostItem extends React.Component {

  constructor(props) {
    super(props);
    this.cardstyle = {
      backgroundColor: "#C8DAFE"
    }
    this.state = {
      id: this.props.postID,
      postdate: ["Oct 30", "2019"], // this.props.postDate,
      tags: ["A", "B"], // this.props.postTag
      title: this.props.postTitle,
      desc: this.props.postDesc,
      btnKey: 'read me!'
    }
  }

  viewpost(postID) {
    this.props.history.push({
      pathname: '/post/' + postID
    })
  }

  render() {
    return (
      <>
        <Container fluid={"true"} className="postitem">
          <Row className="justify-content-md-center" fluid={"true"}>
            <Col xs={3} md={2} fluid={"true"}>
              <PostTag postdate={this.state.postdate}/>
            </Col>
            <Col fluid={"true"}>
              <Card style={this.cardstyle} border="info" className="postitemcard" fluid={"true"}>
                <Card.Header className="featuredheader">{this.state.title}</Card.Header>
                <Card.Body className="cardbody">
                  <Card.Text className="cardtext">
                    {this.state.desc}
                  </Card.Text>
                  <Card.Text>{this.state.tags[0]}, {this.state.tags[1]}</Card.Text>
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
