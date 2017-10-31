import React, { Component } from 'react';
import Chart from '../../../public/vendor/chartjs/chartjs.min';
// import Chart from 'chart.js';
import Show from './Show'
import StatButton from './StatButton'
import SkaterTable from './SkaterTable'
import GoalieTable from './GoalieTable'
import ReactImageFallback from "react-image-fallback";
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
global.jQuery = $;





class PlayerShow extends Component {
  constructor () {
    super();
    this.state = {
      player: { stats: [{}] },
      metrics: { total: 0 }
    }
  }

  convertClub = function (name) {
    var lower = name.toLowerCase();
    console.log("TTT: ", this.state.convertedName);

    return lower.replace("/","-");
    return name;

  }

  convertNation = function (country) {
    return country.replace(" ","-");
  }

  componentWillMount () {


  }

  computeStats (player) {
    let stats = player.stats.slice(-1)[0],
        blacklist = { id: true, game_date: true, createdAt: true, updatedAt: true, playerId: true },
        total = 0;

    for (var stat in stats) {
      if (!blacklist[stat]) {
        total = total + stats[stat];
      }
    }

    return total;
  }

  componentDidMount () {
    let url = 'http://localhost:4000/api/players/' + this.props.params.id;



    fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json' }
    })
      .then(response => response.json())
      .then((response) => {
        let total = this.computeStats(response);
        this.initRadarChart(response);
        this.setState({ player: response,
                        metrics: { total: total },
                        club: this.convertClub(response.club_playing),
                        nation: this.convertNation(response.nation)
                       })
        console.log("CLUB: ", response.club_playing)
      })
  }

  initRadarChart (player) {
    var s = player.stats.slice(-1)[0];

    Chart.defaults.global.defaultFontColor = "#ddd";

    var radarData = {
      labels: [ "Passing", "Positioning", "Stickhandling", "Wristshot", "Determination", "Accel", "Speed", "Strength" ],
      datasets: [
        {
          label: false,
          data: [ s.passing, s.positioning, s.stickhandling, s.wristshot, s.determination, s.acceleration, s.speed, s.strength ],
          backgroundColor: "rgba(220,220,220,0)",
          borderColor: "#eee",
          borderWidth: 2
        }
      ]
    };

    var radarOptions = {
      responsive: true,
      elements: {
        point:{
          radius: 0
        }
      },
      animation: {
        duration: 0
      },
      maintainAspectRatio: true,
      scale: {
        pointLabels: {
          fontSize: 13,
          color: "#eee"
        },
        angleLines: {
          display: false,
          color: "#555"
        },
        gridLines: {
          color: "#555",
          tickMarkLength: 20
        },
        ticks: {
          label: false,
          min: 1,
          max: 20,
          fixedStepSize: 4,
          showLabelBackdrop: false,
          fontSize: 0,
          color: "#eee"
        }
      },
      title: {
        display: false
      },
      legend: {
        display: false,
      }
    };

    var ctx5 = document.getElementById("radarChart").getContext("2d");

    new Chart(ctx5, { type: 'radar', data: radarData, options: radarOptions });
  }

  getStatClass (value) {
    if (value < 7) {
      return "btn m-r-sm stat-low"
    } else if (value < 12) {
      return "btn m-r-sm stat-normal"
    } else if (value < 17) {
      return "btn m-r-sm stat-good"
    } else {
      return "btn m-r-sm stat-excellent"
    }
  }

  render () {
    let player        = this.state.player,
        reversedStats = player.stats.reverse(),
        currentStats  = reversedStats[0],
        previousStats = reversedStats[1];

    return (
      <div id="page-wrapper" className="gray-bg player_detail">

        <div className="row wrapper border-bottom team-bg page-heading"  >
          <div className="pull-left" style={{ paddingTop: "15px" }}>
            <ReactImageFallback src={"img/clubs/all/" + this.state.club + ".png"}
                                fallbackImage="img/default_team.png"
                                alt="Missing Image"
                                className="" />
          </div>
          <div className="col-lg-10">
            <h2 className="player-name">{ player.squad_number }. { player.name } ({ player.id })</h2><h3>{ player.club_playing }</h3>
          </div>
        </div>
        <div className="wrapper wrapper-content">
          <div className="row animated">
            <div className="col-md-4">
              <div className="ibox float-e-margins">

                <div>
                  <div className="ibox-content profile-content" style={{ float: "left", clear: "both" }}>
                    <div className="col-md-4" style={{ margin: "0px 0px 0px -20px" }}>
                      <img alt="image" className="img-circle" src="img/portraits/center.png"></img>
                    </div>
                    <div className="col-md-7" style={{ margin: "0px 0px 0px 30px" }}>
                      <canvas id="radarChart" width="300" height="240"></canvas>
                    </div>

                    <div className="player-details">
                      <div className="col-md-12" style={{ marginBottom: "15px"}}>
                        <h3 className="text-abilities">
                          <img src={ "img/flags/32/" + this.state.nation + ".png" } alt="flag" />
                          <strong> { player.name } ({ player.positions_short }) - { this.state.metrics.total }</strong>
                        </h3>
                      </div>
                      <div className="col-md-2"><span className="text-warning">From:</span></div>
                      <div className="col-md-10">{ player.birth_town }, { player.nation } </div>
                      <div className="col-md-2"><span className="text-warning">Born:</span></div>
                      <div className="col-md-10">{ player.date_of_birth } ({ player.age })</div>
                      <div className="col-md-2"><span className="text-warning">Shoots:</span></div>
                      <div className="col-md-10">{ player.handedness }</div>
                      <div className="col-md-2"><span className="text-warning">Role:</span></div>
                      <div className="col-md-10">{ player.player_roles }</div>

                      <div className="col-md-2"><span className="text-warning">Junior:</span></div>
                      <div className="col-md-10">{ player.junior_preference }</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="ibox float-e-margins">
                <div className="ibox-content">
                  { player.positions_short === "G" ?
                  <GoalieTable player={ player }
                                getStatClass={ this.getStatClass }
                                currentStats={ currentStats }
                                previousStats={ previousStats } />
                  :
                  <SkaterTable player={ player }
                                getStatClass={ this.getStatClass }
                                currentStats={ currentStats }
                                previousStats={ previousStats } />
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <div>
            <strong>EHM Tracker</strong> 2017
          </div>
        </div>
      </div>
    )
  }
}

export default PlayerShow
