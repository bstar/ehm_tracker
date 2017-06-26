import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link, Location, browserHistory } from 'react-router';
import ReactImageFallback from "react-image-fallback";

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
      var east = [ "Boston Bruins", "Buffalo Sabres", "Detroit Red Wings", "Florida Panthers", "Montreal Canadiens", "Ottawa Senators", "Tampa Bay Lightning", "Toronto Maple Leafs", "Carolina Hurricanes", "Columbus Blue Jackets", "New Jersey Devils", "New York Islanders", "New York Rangers", "Philadelphia Flyers", "Pittsburgh Penguins", "Washington Capitals" ];

      var west = [ "Anaheim Ducks", "Arizona Coyotes", "Calgary Flames", "Edmonton Oilers", "Los Angeles Kings", "San Jose Sharks", "Vancouver Canucks", "Chicago Blackhawks", "Colorado Avalanche", "Dallas Stars", "Minnesota Wild", "Nashville Predators", "St. Louis Blues", "Winnipeg Jets" ]

      return (
        <nav className="navbar-default navbar-static-side" role="navigation" style={{ textShadow: "2px 1px 7px #222" }}>
          <ul className="nav metismenu" id="side-menu" ref="menu">

            <li style={{ padding: "10px" }}>
              <strong className="font-bold gm-name">
                <img style={{ width: "100%" }} src="/img/tracker.png" />
                <a style={{ color: "#98c2d6" }} onClick={browserHistory.goBack}> <i className="fa fa-arrow-left"></i> </a>
                <a style={{ color: "#98c2d6" }} onClick={browserHistory.goForward}> <i className="fa fa-arrow-right"></i></a>
              </strong>
            </li>

            <li className={this.activeRoute("/main")}>
              <Link to="/main"><i className="fa fa-th-large"></i> <span className="nav-label">Home</span></Link>
            </li>
            <li className={this.activeRoute("/players")}>
              <Link to="/players"><i className="fa fa-th-large"></i> <span className="nav-label">Player List</span></Link>
            </li>



            <li>
              <a href="#"><i className="fa fa-files-o"></i> <span className="nav-label">Eastern Conference</span><span className="fa arrow"></span></a>
              <ul className="nav nav-second-level collapse">
                { east.map( team =>
                  <li className={this.activeRoute("/players/"+team)}>
                    <Link to={ "/players/"+team }>
                      <span className="nav-label">
                        <ReactImageFallback src={"img/clubs/small/" + team + ".png"}
                                            fallbackImage="img/default_team.png"
                                            alt="Missing Image"
                                            style={{ paddingRight:"10px", width: "28px"}}
                                            className="" />
                        {team}
                      </span>
                    </Link>
                  </li>
                ) }
              </ul>
            </li>
            <li>
              <a href="#"><i className="fa fa-files-o"></i> <span className="nav-label">Western Conference</span><span className="fa arrow"></span></a>
              <ul className="nav nav-second-level collapse">
                { west.map( team =>
                  <li className={this.activeRoute("/players/"+team)}>
                    <Link to={ "/players/"+team }><span className="nav-label">
                    <ReactImageFallback src={"img/clubs/small/" + team + ".png"}
                                        fallbackImage="img/default_team.png"
                                        alt="Missing Image"
                                        style={{ paddingRight:"10px", width: "28px"}}
                                        className="" />
                        {team}
                      </span>
                    </Link>
                  </li>
                ) }
              </ul>
            </li>

          </ul>
        </nav>
      )
    }
}

export default Navigation
