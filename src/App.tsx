import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Index from './pages/index'
import Login from './pages/login';

function App() {
    return (
        <Router>
            <Route exact path={'/'} component={Index}/>
            <Route exact path={'/login'} component={Login}/>

        </Router>
    );
}

export default App;
