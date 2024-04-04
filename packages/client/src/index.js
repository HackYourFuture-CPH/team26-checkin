import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

assertEnvironment();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

function assertEnvironment() {
  if (process.env.REACT_APP_API_HOST === undefined) {
    throw new Error('Missing environment variable: REACT_APP_API_HOST');
  }

  if (process.env.REACT_APP_API_PORT === undefined) {
    throw new Error('Missing environment variable: REACT_APP_API_PORT');
  }

  if (process.env.REACT_APP_API_PATH === undefined) {
    throw new Error('Missing environment variable: REACT_APP_API_PATH');
  }
}
