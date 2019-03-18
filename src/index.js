import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from "react-router-dom";

// import drizzle functions and contract artifact
import { Drizzle, generateStore } from "drizzle";
import options from "./drizzleOptions";

// setup the drizzle store and drizzle
const drizzle = new Drizzle(options);

ReactDOM.render(
    <Router>
        <App drizzle={drizzle} />
    </Router>
    , document.getElementById('root'));
