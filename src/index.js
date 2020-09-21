import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App pageNumber={1}/>, document.getElementById('root'));
registerServiceWorker();
