import React from 'react';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { withRouter} from 'react-router-dom';
import marked from 'marked';
import hljs from 'highlight.js'
import './Post.scss'

marked.setOptions({
  highlight: (code) => hljs.highlightAuto(code).value
});



class Post extends React.Component {

  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    const md = await this.props.markdown
    this.setState({markdown: md})
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
                      <article dangerouslySetInnerHTML={{__html: this.state === null ? "" : this.state.markdown}}></article>
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
