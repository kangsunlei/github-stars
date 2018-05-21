import React, { Component } from 'react';
import Sidebar from './Sidebar';
import { ApolloConsumer } from 'react-apollo';
import { Base64 } from 'js-base64';

import '../css/index.scss';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: ''
        }
    }
    
    hanldeClick = (nameWithOwner) => {
        fetch(`https://api.github.com/repos/${nameWithOwner}/readme`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                const body = Base64.decode(data.content)
                return fetch('https://api.github.com/markdown/raw', {
                    method: 'POST',
                    body
                });
            }).then(res => {
                return res.text();
            }).then(content => {
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
                    <div className="content" dangerouslySetInnerHTML={{ __html: content }}></div>
                </div>}
            </ApolloConsumer>
        );
    }
}

export default Main;