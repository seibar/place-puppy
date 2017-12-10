import React from 'react';
import ReactDOM from 'react-dom';
import Main from '../components/main';

window.onload = () => {
	ReactDOM.render(<Main tenant={window.tenant} />, document.getElementById('app'));
};