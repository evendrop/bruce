import React, { Component, PropTypes } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

import { createContainer } from 'meteor/react-meteor-data';
import { WaitingRoomPlayers } from '../../api/WaitingRoomPlayers.js';

import Header from '../components/Header.jsx';
import Home from '../pages/Home.jsx';
import Lobby from '../pages/Lobby.jsx';
import Instructions from '../pages/Instructions.jsx';
import About from '../pages/About.jsx';
import NotFound from '../pages/NotFound.jsx';
import Race from '../pages/Race.jsx';

//Global styles
import '../styles/App.css'

export default class MainLayout extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
            <Switch>
              <Redirect exact from="/" to="/about" />
              <Route path='/about' component={About} />
              <Route path = '/lobby' component={Lobby} />
              <Route path = '/instructions' component={Instructions} />
              <Route path = '/race/:raceid/:myid/' component={Race} />
              <Route component={NotFound} />
            </Switch>
        </div>
      </Router>
    );
  }
}
