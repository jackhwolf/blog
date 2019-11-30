import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from './Landing/Landing.js'  
import Post from './Post/Post.js'
import './App.scss';
import './Main.scss';
import marked from 'marked';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.renderPostHandler = this.renderPostHandler.bind(this)
  }

  async renderPostHandler(postid) {
    var fname = './posts/' + postid + '/post.md'
    const file = require("" + fname)
    const resp = await fetch(file)
      .then(response => {
        return response.text()
      })
      .then(text => {
        return marked(text)
      })
    return resp
    // return <Post postid={this.state.postid} markdown={resp} />
  }

  renderPost(props) {
    return <Post postid={props.match.params.id} handler={this.renderPostHandler}/>
  }

  renderLanding(props) {
    return <Landing search={props.match.params.q} />
  }

  render() {
    return (
      <Switch>

        <Route exact path={'/'}
          render={(props) => this.renderLanding(props)}
        />

        <Route path={'/search/:q'} render={(props) => this.renderLanding(props)}/>

        <Route path={'/post/:id'} render={(props) => this.renderPost(props)}/>

      </Switch>
    );
  }
}

export default App;
