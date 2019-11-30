import React from 'react';
import Card from 'react-bootstrap/Card';
import './PostArea.scss'

class PostDate extends React.Component {

  constructor(props) {
    super(props)
    this.cardstyle = {
      backgroundColor: "#C8DAFE",
      width: '8rem'
    }
  }

  render() {
    return (
      <>
      <Card border="justify-content-md-center primary" className="posttag" fluid={"true"} style={this.cardstyle}>
        <Card.Body className="cardbody">
        <Card.Title className="justify-content-md-center postdate">{this.props.postdate[0]}</Card.Title>
        </Card.Body>
      </Card>
      </>
    )
  }
}

export default PostDate;
