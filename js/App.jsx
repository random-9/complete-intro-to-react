// @flow

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import type { Match } from 'react-router-dom';
import Landing from './Landing';
import Search from './Search';
import Details from './Details';
import preload from '../data.json';

const FourOhFour = () => <h1>404</h1>;

const App = () => (
    <BrowserRouter>
        <div className="app">
            {/* Switch ensures that only one component is rendered
        If there is no Switch, both first and last Route component will be rendered at http://localhost:8081/, as path matches both
        With Switch component, only first component will be rendered as it is the first one that matches (goes down the list)
        */}
            <Switch>
                <Route exact path="/" component={Landing} />
                <Route 
                    path="/search" 
                    component={props => <Search shows={preload.shows} {...props} />}
                />
                <Route 
                    path="/details/:id" 
                    component={(props: { match: Match }) => {
                        const selectedShow = preload.shows.find(show => props.match.params.id === show.imdbID);
                        return <Details show={selectedShow} {...props} />
                    }}
                />
                <Route component={FourOhFour} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default App;