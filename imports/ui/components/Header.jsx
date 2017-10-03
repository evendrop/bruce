import React from 'react';
import { Link } from 'react-router-dom';

import LoginButtons from './LoginButtons.jsx';
import MainNav from './MainNav.jsx';

import '../styles/Header.css'

//just the app header, like
//logo and menu and whatnot
export default class Header extends React.Component {
  render() {
    return (
      <header className='Header'>
        <div className="logo-container">
            <Link to="/">
                <span className="logo-text">Greetings from BRUCE...</span>
            </Link>
        </div>
        <div className="main-nav">
            <MainNav/>
        </div>
      </header>
    );
  }
}
