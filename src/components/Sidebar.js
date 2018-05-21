import React, { Component } from 'react';
import gql from "graphql-tag";
import ListItem from './ListItem';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            list: []
        }
        this.fetchCount();
    }

    fetchCount = () => {
        this.props.client.query({
            query: gql`{
                user(login: "kangsunlei") {
                    starredRepositories {
                        totalCount
                    }
                }
            }`,
        })
            .then(res => {
                const totalCount = res.data.user.starredRepositories.totalCount;
                if(totalCount) {
                    this.fetchList(totalCount);
                }
            })
            .catch(error => console.error(error));
    }

    fetchList = (totalCount) => {
        this.props.client.query({
            query: gql`{
                user(login: "kangsunlei") {
                    starredRepositories(first: ${totalCount}) {
                        nodes {
                            id,
                            url,
                            nameWithOwner
                            descriptionHTML
                            primaryLanguage {
                                name
                                color
                            },
                            stargazers {
                                totalCount
                            }
                        }
                    }
                }
            }`,
        })
            .then(res => {
                const list = res.data.user.starredRepositories.nodes;
                this.setState({
                    list
                });
            })
            .catch(error => console.error(error));
    }
    
    render() {
        const { count, list } = this.state;
        return (
            <div className="sidebar">
                {list.map(item => <ListItem key={item.id} item={item} onClick={this.props.onClick}/>)}
            </div>
        );
    }
}

export default Sidebar;