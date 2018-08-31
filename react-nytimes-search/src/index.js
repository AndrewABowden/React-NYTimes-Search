
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<div className="main-container">
		<App />
	</div>
	, document.getElementById('root'));
	registerServiceWorker();