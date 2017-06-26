import React, { Component } from 'react';
import Progress from '../../components/common/Progress';
import List from './List';

class Players extends Component {
  constructor () {
    super()
    this.state = {
      players: [],
      name: ""
    }

    this.getPlayers = this.getPlayers.bind(this);
  }

  getPlayers (team) {
    var self = this;
    // var team = this.props.params.team;
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
        this.setState({ players: response });
      })
  }

  getPlayersByName () {
    var self = this,
        url = "http://localhost:4000/api/players?filter=name:" + this.state.name;

    fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json' }
    })
      .then(response => response.json())
      .then((response) => {
        this.setState({ players: response });
      })
  }

  componentWillReceiveProps(nextProps) {
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



  onChange (event) {
    const fieldName = event.target.name,
          fieldValue = event.target.value;

    this.setState({ [fieldName]: fieldValue }, function () {
      this.getPlayersByName();
    });
  }

  render () {
    let players = this.state.players



    return (
      <div id="page-wrapper" className="gray-bg player_list">
        <Progress />

        <div style={{ paddingBottom: "50px" }} >
          <div className="form-group" style={{ paddingTop: "20px" }}>
            <input onChange={ this.onChange.bind(this) } name="name" type="text" placeholder="Enter Filter Text" className="form-control"></input>
          </div>
          <List players={ players || [] } />
        </div>
      </div>
    )
  }
}

export default Players
