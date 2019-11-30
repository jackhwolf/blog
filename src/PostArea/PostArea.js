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
      display: [],
      search: this.props.search
    }
    this.changeSearch = this.changeSearch.bind(this)
    console.log(this.state.search)
  }

  // fetch post info
  async componentDidMount() {
    const resp = await fetch(this.endpoint).then(x => x.json())
    var posts = resp['data']
    var postitems = []
    for (const x of posts) {
      // check search
      if (this.state.search === undefined || x['post']['tags'].indexOf(this.state.search) >= 0) {
        postitems.push(
          <PostItem key={x['postid']} postID={x['postid']} 
                    postTitle={x['post']['title']} postDesc={x['post']['desc']}
                    postTags={x['post']['tags']} changeSearch={this.changeSearch}/>
        )
      }
    }
    this.setState({postitems: postitems, display: postitems, posts: resp['data']})
  }

  changeSearch(search) {
    var display = []
    for (const x of this.state.posts) {
      if (search === undefined || x['post']['tags'].indexOf(search) >= 0) {
        display.push(
          <PostItem key={x['postid']} postID={x['postid']}
            postTitle={x['post']['title']} postDesc={x['post']['desc']}
            postTags={x['post']['tags']} changeSearch={this.changeSearch} />
        )
      }
    }
    this.setState({ display: display })
  }

  render() {
    return (
      <Container fluid={"true"} className="postarea">
        {this.state.display}
      </Container>
    )
  }

}

export default withRouter(PostArea)
