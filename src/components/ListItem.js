import React, { Component } from 'react';

class ListItem extends Component {
    render() {
        const { onClick, item } = this.props;
        const {
            id,
            url,
            nameWithOwner,
            descriptionHTML,
            primaryLanguage,
            stargazers: {
                totalCount
            }
        } = item;

        const { name: lang, color } = primaryLanguage || {};

        const svgStar = <svg aria-label="star" className="octicon octicon-star" viewBox="0 0 14 16" version="1.1" width="14" height="16" role="img"><path fillRule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"></path></svg>

        return (
            <div className="item" onClick={() => onClick(nameWithOwner)}>
                <div className="name">
                    {nameWithOwner}
                </div>
                <div className="desc" dangerouslySetInnerHTML={{ __html: descriptionHTML }}></div>
                <div className="info">
                    {lang && <div className="lang">
                        <div className="point" style={{background: color}}></div>
                        <span>{lang}</span>
                    </div>}
                    <div className="star">
                        {svgStar}
                        <span>{totalCount}</span>
                        <a href={url} target="__blank">View on GitHub</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default ListItem;