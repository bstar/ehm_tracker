import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link, Location } from 'react-router';

class Navigation extends Component {

    componentDidMount() {
      const { menu } = this.refs;
      $(menu).metisMenu();
    }

    activeRoute(routeName) {
      return this.props.location.pathname === routeName ? "active" : "";
    }

    secondLevelActive(routeName) {
      return this.props.location.pathname.indexOf(routeName) > -1 ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
    }

    render() {
      return (
        <nav className="navbar-default navbar-static-side" role="navigation" style={{ textShadow: "2px 1px 7px #222" }}>
          <ul className="nav metismenu" id="side-menu" ref="menu">
            <li className="nav-header">
              <div className="dropdown profile-element">
                <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                  <span className="clear">
                    <span className="block m-t-xs"><strong className="font-bold gm-name">EHM Tracker</strong></span>
                  </span>
                </a>
              </div>
              <div className="logo-element">
                EHM
              </div>
            </li>
            <li className={this.activeRoute("/main")}>
              <Link to="/main"><i className="fa fa-th-large"></i> <span className="nav-label">Home</span></Link>
            </li>
            <li className={this.activeRoute("/players")}>
              <Link to="/players"><i className="fa fa-th-large"></i> <span className="nav-label">Player List</span></Link>
            </li>
            <li className={this.activeRoute("/players/Arizona Coyotes")}>
              <Link to="/players/Arizona Coyotes"><i className="fa fa-th-large"></i> <span className="nav-label">Coyotes</span></Link>
            </li>
            <li className={this.activeRoute("/players/Pittsburgh Penguins")}>
              <Link to="/players/Pittsburgh Penguins"><i className="fa fa-th-large"></i> <span className="nav-label">Penguins</span></Link>
            </li>
            <li className={this.activeRoute("/players/Nashville Predators")}>
              <Link to="/players/Nashville Predators"><i className="fa fa-th-large"></i> <span className="nav-label">Predators</span></Link>
            </li>
          </ul>
        </nav>
      )
    }
}

export default Navigation
