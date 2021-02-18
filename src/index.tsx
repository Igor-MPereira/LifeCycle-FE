import React from 'react';
import ReactDOM from 'react-dom';
import { Metric } from 'web-vitals';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.sass';
import { BrowserRouter } from 'react-router-dom';
import pkg from 'package.json';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App AppVersion={pkg.version} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

function sendToAnalytics({name, delta, id}: Metric) {
  window['ga' as keyof Window] as Function && window['ga' as keyof Window]('send', 'event', {
    eventCategory: 'Web Vitals',
    eventAction: name,
    eventValue: Math.round(name === 'CLS' ? delta * 1000 : delta), // values must be integers
    eventLabel: id, // id unique to current page load
    nonInteraction: true, // avoids affecting bounce rate
  });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
