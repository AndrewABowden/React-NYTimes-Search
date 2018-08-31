import React, { Component } from 'react';
import Results from './Results';

class Search extends Component {
    //set up data through constructor and props
    constructor(props) {
        this.state = {
            topc: undefined,
            startYear: undefined,
            endYear: undefined,
            results: []
        }
        //binds to handlechange function
        this.handleChange = this.handleChange.bind(this)
    }
    
    //api call
    theSearch(event) {
        e.preventDefault();
        const key= '775f14ef020945c49e51356ce23d9a5c';
        var apiUrl="https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${key}&q=${this.state.topic}&begin_date=${this.state.startYear}0101&end_date=${this.state.endYear}1231&fl=web_url,headline,pub_date&page=0";

        let userRequest = new Request(apiUrl);
        fetch(userRequest)
            .then(res => {
                return res.json();
            }).then(data => {
                this.setState({
                    results: data.response.docs
                });
            }).catch(event => {
                this.setState({
                    results: `YOUR API CALL ISNT WORKING ${event}`
                });
            });
    };
    
    render() {
		return (
			<div>
				<div className="search row">
					<form className="col s10 offset-s1" id="article_search" onSubmit={this.theSearch.bind(this)}>
						<div className="row center-align">
							<div className="input-field col s12">
								<input name="topic" id="topic" type="text" value={this.state.topic} onChange={this.handleChange}/>
								<label for="topic">Topic</label>
							</div>
							<div className="input-field col s12 m6">
								<input name="start_year" id="startYear" type="number" value={this.state.startYear} onChange={this.handleChange}/>
								<label for="start_year">Start Year</label>
							</div>
							<div className="input-field col s12 m6">
								<input name="end_year" id="endYear" type="number" value={this.state.endYear} onChange={this.handleChange}/>
								<label for="end_year">End Year</label>
							</div>
							<button className="btn waves-effect waves-light" type="submit" name="action">Search
							</button>
						</div>
					</form>
				</div>

				<Results 
					results={this.state.results}
				/>
				
			</div>
		);
	}
}

export default Search;