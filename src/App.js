import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from './Landing/Landing.js'  
import Post from './Post/Post.js'
import './App.scss';
import './Main.scss';
import marked from 'marked'


class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      markdown: ""
    }
  }

  renderPost(props) {
    var fname = './posts/' + props.match.params.id + '/post.md'
    const file = require("" + fname)
    const resp = fetch(file)
      .then(response => {
        return response.text()
      })
      .then(text => {
          return marked(text)
      })
    return <Post postid={postid} markdown={resp}/>
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

        <Route path={'/post/:id'} render={(props) => this.renderPost(props)}/>

        <Route path={'/search/:q'} render={(props) => this.renderLanding(props)}/>

      </Switch>
    );
  }
}

export default App;
