import React, { Component } from 'react';
import Saved from './Saved';
import {Toast} from 'react-materialize';
import axios from 'axios';


class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newArticle: [],
            response: undefined
        };
        this.handleClick = this.handleClick.bind(this);
    }


    //article saver on db click
    handleClick(article) {
        axios.post('/api/article', {
            title: article.headline.main,
            date: article.pub_date,
            url: article.web_url
        }).then(result => {
            this.setState({ response: result });
        }).catch(event => {
            this.setState({
                response: `API CALL NOT WORKIN MAN ${event}`
            });
        });
    }

    //use props to grab array from search js
    render() {
        return (
            <div>
                <div className="results row">
                    <div className="col s12">
                        <div className="collection with-header">
                            <div className="collection-header">
                            <h4>Search Results:</h4>
                            </div>
                            
								{this.props.results.map((result, i) =>

                                <div className="collection-item row">
                                <div className="col s6"><a href={result.web_url}><h6>{result.headline.main}</h6></a></div>
                                <div className="col s4"><p>{result.pub_date}</p></div>
                                <div className="col s2"><button className="waves-effect waves-light btn article-save-btn" key={i} onClick={this.handleClick.bind(this, result)}>Save</button></div>
                                </div>

)}


</div>
</div>
</div>

<Saved
response={this.state.response}
/>

</div>
);
}
}

export default Results;