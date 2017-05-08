import React, { Component } from 'react';
import Chart from '../../../public/vendor/chartjs/chartjs.min';
// import Chart from 'chart.js';
import Show from './Show'
import StatButton from './StatButton'
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
            <h2 className="player-name">{ player.squad_number }. { player.name }</h2><h3>{ player.club_playing }</h3>
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="ibox float-e-margins">
                <div className="ibox-content">
                  <table className="table player_stats">
                    <tbody>
                      <tr>
                          <td>
                            <div className="pad_bottom text-abilities"><h3>Technical</h3></div>
                            <div className="pull-left stat"><h4>Checking</h4></div>
                            <div className="pull-right">
                              <StatButton player={player} stat="checking" currentStats={currentStats} previousStats={previousStats} statClass={ this.getStatClass(currentStats.checking) } />
                            </div>
                          </td>
                          <td>
                            <div className="pad_bottom text-abilities"><h3>Mental</h3></div>
                            <div className="pull-left stat"><h4>Aggression</h4></div>
                            <div className="pull-right">
                              <StatButton player={player} stat="aggression" currentStats={currentStats} previousStats={previousStats} statClass={ this.getStatClass(currentStats.aggression) } />
                            </div>
                          </td>
                          <td>
                            <div className="pad_bottom text-abilities"><h3>Physical</h3></div>
                            <div className="pull-left stat"><h4>Acceleration</h4></div>
                            <div className="pull-right">
                              <StatButton player={player} stat="acceleration" currentStats={currentStats} previousStats={previousStats} statClass={ this.getStatClass(currentStats.acceleration) } />
                            </div>
                          </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="pull-left stat"><h4>Deflections</h4></div>
                          <div className="pull-right">
                            <StatButton player={player} stat="deflections" currentStats={currentStats} previousStats={previousStats} statClass={ this.getStatClass(currentStats.deflections) } />
                          </div>
                        </td>
                        <td>
                          <div className="pull-left stat"><h4>Anticipation</h4></div>
                          <div className="pull-right">
                            <StatButton player={player} stat="anticipation" currentStats={currentStats} previousStats={previousStats} statClass={ this.getStatClass(currentStats.anticipation) } />
                          </div>
                        </td>
                        <td>
                          <div className="pull-left stat"><h4>Agility</h4></div>
                          <div className="pull-right">
                            <StatButton player={player} stat="agility" currentStats={currentStats} previousStats={previousStats} statClass={ this.getStatClass(currentStats.agility) } />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="pull-left stat"><h4>Deking</h4></div>
                          <div className="pull-right">
                            <StatButton player={player} stat="deking" currentStats={currentStats} previousStats={previousStats} statClass={ this.getStatClass(currentStats.deking) } />
                          </div>
                        </td>
                        <td>
                          <div className="pull-left stat"><h4>Bravery</h4></div>
                          <div className="pull-right">
                            <StatButton player={player} stat="bravery" currentStats={currentStats} previousStats={previousStats} statClass={ this.getStatClass(currentStats.bravery) } />
                          </div>
                        </td>
                        <td>
                          <div className="pull-left stat"><h4>Balance</h4></div>
                          <div className="pull-right">
                            <StatButton player={player} stat="balance" currentStats={currentStats} previousStats={previousStats} statClass={ this.getStatClass(currentStats.balance) } />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="pull-left stat"><h4>Faceoffs</h4></div>
                          <div className="pull-right">
                            <StatButton player={player} stat="faceoffs" currentStats={currentStats} previousStats={previousStats} statClass={ this.getStatClass(currentStats.faceoffs) } />
                          </div>
                        </td>
                        <td>
                          <div className="pull-left stat"><h4>Creativity</h4></div>
                          <div className="pull-right">
                            <StatButton player={player} stat="creativity" currentStats={currentStats} previousStats={previousStats} statClass={ this.getStatClass(currentStats.creativity) } />
                          </div>
                        </td>
                        <td>
                          <div className="pull-left stat"><h4>Speed</h4></div>
                          <div className="pull-right">
                            <StatButton player={player} stat="speed" currentStats={currentStats} previousStats={previousStats} statClass={ this.getStatClass(currentStats.speed) } />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="pull-left stat"><h4>Hitting</h4></div>
                          <div className="pull-right">
                            <StatButton player={player} stat="hitting" currentStats={currentStats} previousStats={previousStats} statClass={ this.getStatClass(currentStats.hitting) } />
                          </div>
                        </td>
                        <td>
                          <div className="pull-left stat"><h4>Determination</h4></div>
                          <div className="pull-right">
                            <StatButton player={player} stat="determination" currentStats={currentStats} previousStats={previousStats} statClass={ this.getStatClass(currentStats.determination) } />
                          </div>
                        </td>
                        <td>
                          <div className="pull-left stat"><h4>Stamina</h4></div>
                          <div className="pull-right">
                            <StatButton player={player} stat="stamina" currentStats={currentStats} previousStats={previousStats} statClass={ this.getStatClass(currentStats.stamina) } />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="pull-left stat"><h4>Off the Puck</h4></div>
                          <div className="pull-right">
                            <StatButton player={player} stat="off_the_puck" currentStats={currentStats} previousStats={previousStats} statClass={ this.getStatClass(currentStats.off_the_puck) } />
                          </div>
                        </td>
                        <td>
                          <div className="pull-left stat"><h4>Flair</h4></div>
                          <div className="pull-right">
                            <StatButton player={player} stat="flair" currentStats={currentStats} previousStats={previousStats} statClass={ this.getStatClass(currentStats.flair) } />
                          </div>
                        </td>
                        <td>
                          <div className="pull-left stat"><h4>Strength</h4></div>
                          <div className="pull-right">
                            <StatButton player={player} stat="strength" currentStats={currentStats} previousStats={previousStats} statClass={ this.getStatClass(currentStats.strength) } />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="pull-left stat"><h4>Passing</h4></div>
                          <div className="pull-right">
                            <StatButton player={player} stat="passing" currentStats={currentStats} previousStats={previousStats} statClass={ this.getStatClass(currentStats.passing) } />
                          </div>
                        </td>
                        <td>
                          <div className="pull-left stat"><h4>Influence</h4></div>
                          <div className="pull-right">
                            <StatButton player={player} stat="influence" currentStats={currentStats} previousStats={previousStats} statClass={ this.getStatClass(currentStats.influence) } />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="pull-left stat"><h4>Pokecheck</h4></div>
                          <div className="pull-right">
                            <StatButton player={player} stat="pokecheck" currentStats={currentStats} previousStats={previousStats} statClass={ this.getStatClass(currentStats.pokecheck) } />
                          </div>
                        </td>
                        <td>
                          <div className="pull-left stat"><h4>Teamwork</h4></div>
                          <div className="pull-right">
                            <StatButton player={player} stat="teamwork" currentStats={currentStats} previousStats={previousStats} statClass={ this.getStatClass(currentStats.teamwork) } />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="pull-left stat"><h4>Positioning</h4></div>
                          <div className="pull-right">
                            <StatButton player={player} stat="positioning" currentStats={currentStats} previousStats={previousStats} statClass={ this.getStatClass(currentStats.positioning) } />
                          </div>
                        </td>
                        <td>
                          <div className="pull-left stat"><h4>Work Rate</h4></div>
                          <div className="pull-right">
                            <StatButton player={player} stat="work_rate" currentStats={currentStats} previousStats={previousStats} statClass={ this.getStatClass(currentStats.work_rate) } />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="pull-left stat"><h4>Slapshot</h4></div>
                          <div className="pull-right">
                            <StatButton player={player} stat="slapshot" currentStats={currentStats} previousStats={previousStats} statClass={ this.getStatClass(currentStats.slapshot) } />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="pull-left stat"><h4>Stickhandling</h4></div>
                          <div className="pull-right">
                            <StatButton player={player} stat="stickhandling" currentStats={currentStats} previousStats={previousStats} statClass={ this.getStatClass(currentStats.stickhandling) } />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="pull-left stat"><h4>Wristshot</h4></div>
                          <div className="pull-right">
                            <StatButton player={player} stat="wristshot" currentStats={currentStats} previousStats={previousStats} statClass={ this.getStatClass(currentStats.wristshot) } />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
