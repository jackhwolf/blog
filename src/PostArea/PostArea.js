import React from 'react';
import { withRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import PostItem from './PostItem.js';

class PostArea extends React.Component {

  constructor(props) {
    super(props)
    this.endpoint = 'https://cors-anywhere.herokuapp.com/http://13.56.250.168/v1/blogpost'
    this.state = {
      postitems: [],
      search: this.props.search
    }
  }

  // fetch post info
  async componentDidMount() {
    const resp = await fetch(this.endpoint)
      .then(x => x.json())
    var posts = resp['data']
    var postitems = []
    for (const x of posts) {
      // check search
      if (this.state.search === undefined || x['post']['tags'].indexOf(this.state.search) >= 0) {
        postitems.push(
          <PostItem key={x['postid']} postID={x['postid']} 
                    postTitle={x['post']['title']} postDesc={x['post']['desc']}
                    postTags={x['post']['tags']}/>
        )
      }
    }
    this.setState({postitems: postitems})
  }

  render() {
    return (
      <Container fluid={"true"} className="postarea">
        {this.state.postitems}
      </Container>
    )
  }

}

export default withRouter(PostArea)
