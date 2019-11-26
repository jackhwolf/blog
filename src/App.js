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
    var postid = props.match.path === '/about' ? "about" : props.match.params.id
    var fname = './posts/' + postid + '/markdown/post.md'
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

  render() {
    return (
      <Switch>

        <Route exact path='/'
          render = {() => <Landing/>}
        />

        <Route exact path='/about' render={(props) => this.renderPost(props)}></Route> 

        <Route path='/post/:id' render={(props) => this.renderPost(props)}/>

      </Switch>
    );
  }
}

export default App;
