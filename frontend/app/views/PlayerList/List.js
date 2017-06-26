import React from 'react';
import { Link, Location } from 'react-router';


class List extends React.Component {
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }

  render () {
    console.log("RENDER RENDER", this.props.players)
    return (
      <div className="ibox-content">
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Id</th>
                <th>Nation</th>
                <th>Birth Town</th>
                <th>Value</th>
                <th>Division</th>
                <th>Position</th>
                <th>Age</th>
                <th>Club Playing</th>
                <th>Morale</th>
              </tr>
            </thead>
            <tbody>
              { this.props.players.map( player =>
                <tr key={player.id}>
                  <td>
                    <Link to={ "/player/" + player.id }> <span className="nav-label"><b>{ player.name }</b> </span></Link>
                  </td>
                  <td>{ player.id }</td>
                  <td>{ player.nation }</td>
                  <td>{ player.birth_town }</td>
                  <td>{ player.estimated_value }</td>
                  <td>{ player.division_playing }</td>
                  <td>{ player.positions_short }</td>
                  <td>{ player.age }</td>
                  <td>{ player.club_playing }</td>
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
