import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'

//the main persistent navigation
//using bootstrap columns
export default class MainNav extends React.Component {
  render() {
    return (
        <Grid>
            <Row className="show-grid">
                <Col xs={12} md={4}>
                    <NavLink activeClassName="active" className="fun-cta" to="/about">About BRUCE</NavLink>
                </Col>
                <Col xs={12} md={4}>
                    <NavLink activeClassName="active" className="fun-cta" to="/instructions">How to Play</NavLink>
                </Col>
                <Col xs={12} md={4}>
                    <NavLink activeClassName="active" className="fun-cta" to="/lobby">Race Lobby</NavLink>
                </Col>
            </Row>
        </Grid>
    );
  }
}
