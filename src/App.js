import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
  }

  renderPost(props) {
    return <Post postid={props.match.params.id} handler={this.renderPostHandler} />
  }

  renderLanding(props) {
    return <Landing search={props.match.params.q} />
  }

  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>

          <Route exact path={'/'}
            render={(props) => this.renderLanding(props)}
          />

          <Route path={'/search/:q'} render={(props) => this.renderLanding(props)} />

          <Route path={'/post/:id'} render={(props) => this.renderPost(props)} />

        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;