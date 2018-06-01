import React, { Component } from 'react';
import Sidebar from './Sidebar';
import { ApolloConsumer } from 'react-apollo';
import { Base64 } from 'js-base64';
import marked from 'marked';
import hljs from 'highlight.js';

import 'highlight.js/styles/tomorrow-night.css';
import '../css/index.scss';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: ''
        }

        marked.setOptions({
            highlight: function (code) {
                return hljs.highlightAuto(code).value;
            }
        });
    }
    
    hanldeClick = (nameWithOwner) => {
        fetch(`https://api.github.com/repos/${nameWithOwner}/readme`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                const content = Base64.decode(data.content)
                this.setState({
                    content
                });
            });
    }

    render() {
        const { content } = this.state;
        return (
            <ApolloConsumer>
                {client => <div className="main">
                    <Sidebar client={client} onClick={this.hanldeClick} />
                    <div className="content" dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
                </div>}
            </ApolloConsumer>
        );
    }
}

export default Main;