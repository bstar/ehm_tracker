import React, { Component } from 'react';
import Progress from '../../components/common/Progress';
import List from './List';

class Players extends Component {
  constructor () {
    super()
    this.state = {
      players: []
    }

    this.getPlayers = this.getPlayers.bind(this);
  }

  getPlayers (team) {
    var self = this;
    // var team = this.props.params.team;
    console.log("TEAMMMMM: ", team)
    if (team) {
      var url = "http://localhost:4000/api/players?filter=club_contracted:" + team;
    } else {
      var url = "http://localhost:4000/api/players";
    }

    fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json' }
    })
      .then(response => response.json())
      .then((response) => {
        console.log("AJAX REQUEST")
        this.setState({ players: response });
      })
  }

  componentWillReceiveProps(nextProps) {
    console.log("NEXT PROP: ", nextProps);
    this.getPlayers(nextProps.params.team);
  }
  componentDidMount() {
    this.getPlayers(this.props.params.team);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  update (e) {
    this.setState({ txt: e.target.value })
  }

  playerFilter (e) {
    console.log(e.target.value)
    this.setState({ playerFilter: e.target.value })
  }

  render () {
    let players = this.state.players

    if (this.state.playerFilter) {
      players = players.filter( player =>
        player.name.toLowerCase()
        .includes(this.state.playerFilter.toLowerCase() )
      )
    }

    return (
      <div id="page-wrapper" className="gray-bg player_list">
        <Progress />

        <div style={{ paddingBottom: "50px" }} >
          <div className="form-group" style={{ paddingTop: "20px" }}>
            <input onChange={ this.playerFilter.bind(this) } type="text" placeholder="Enter Filter Text" className="form-control"></input>
          </div>
          <List players={ players || [] } />
        </div>
      </div>
    )
  }
}

export default Players
