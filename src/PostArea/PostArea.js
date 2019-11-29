import React from 'react';
import { withRouter } from 'react-router-dom';
import PostItem from './PostItem.js';

class PostArea extends React.Component {

  constructor(props) {
    super(props)
    this.endpoint = 'https://cors-anywhere.herokuapp.com/http://13.56.250.168/v1/blogpost'
    this.state = {
      postitems: []
    }
  }

  // fetch post info
  async componentDidMount() {
    var posts = []
    const resp = await fetch(this.endpoint)
      .then(x => x.json())
    console.log(resp)
    posts = resp['data']
    var postitems = []
    for (const x of posts) {
      postitems.push(
        <PostItem key={x['postid']} postID={x['postid']} 
                  postTitle={x['post']['title']} postDesc={x['post']['desc']}/>
      )
    }
    this.setState({postitems: postitems})
  }

  render() {
    return (
      <div className="postarea">
        {this.state.postitems}
      </div>
    )
  }

}

export default withRouter(PostArea)
