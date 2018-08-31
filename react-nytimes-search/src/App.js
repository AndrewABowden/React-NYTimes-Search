import React, { Component } from 'react';
import Search from './components/Search';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			savedArticles: []
		};
	}

	componentDidMount() {
		
	}

	render() {
		return (
			<div className="App container">
				<div className="App-header row center-align">
					<h2>Article Scrubber</h2>
					<p className="App-intro">
						Search for and annotate articles from the internet
					</p>
				</div>
				<Search />
				
			</div>
		);
	}
}

export default App;s