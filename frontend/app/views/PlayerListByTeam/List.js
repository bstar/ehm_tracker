import React from 'react';
import { Link, Location } from 'react-router';


class List extends React.Component {
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }

  render () {
    return (
      <div className="ibox-content">
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Nation</th>
                <th>Birth Town</th>
                <th>Position</th>
                <th>Age</th>
                <th>Club Contracted</th>
                <th>Morale</th>
              </tr>
            </thead>
            <tbody>
              { this.props.players.map( player =>
                <tr>
                  <td>
                    <Link to={ "/player/" + player.id }><i className="fa fa-users"></i> <span className="nav-label">{ player.name } </span></Link>
                  </td>
                  <td>{ player.nation }</td>
                  <td>{ player.birth_town }</td>
                  <td>{ player.positions_short }</td>
                  <td>{ player.age }</td>
                  <td>{ player.club_contracted }</td>
                  <td>{ player.morale }</td>
                </tr>
              ) }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}




export default List
