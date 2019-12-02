import React from 'react';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { withRouter} from 'react-router-dom';
import hljs from 'highlight.js'
import './Post.scss'
// import './atom-one-dark.css'
import marked from 'marked';


marked.setOptions({
  highlight: (code) => hljs.highlightAuto(code).value
});


class Post extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      postid: this.props.postid,
      markdown: "# Post loading..."
    }
    document.body.style.background = 'rgb(78, 49, 87)';
  }

  async componentWillReceiveProps(props) {
    this.setState({postid: props.postid})
    await this.updateMD(props.postid)
  }

  async componentDidMount() {
    await this.updateMD(this.state.postid)
  }

  async updateMD(postid) {
    var resp = await this.props.handler(postid)
    this.setState({markdown: resp})
  }

  render () {
    return (
        <Container fluid={true} className="postcont">
          <Header/>
            <Container className="justify-content-md-center">
              <Row className="justify-content-md-center">
                <Col>
                  <Row className="justify-content-md-center">
                    <section>
                      <article dangerouslySetInnerHTML={{__html: this.state.markdown}}></article>
                    </section>
                  </Row>
                </Col>
              </Row>
            </Container>
          <Footer/>
        </Container>
    )
  }

}

export default withRouter(Post)
