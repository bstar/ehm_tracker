import React from 'react';
const Boron = require('boron');
const LineChart = require("react-chartjs").Line;
import StatButton from './StatButton'


var ForwardPlayer = React.createClass({
  render: function () {
    return (
      <table className="table player_stats">
        <tbody>
          <tr>
              <td>
                <div className="pad_bottom text-abilities"><h3>Technical</h3></div>
                <div className="pull-left stat"><h4>Blocker</h4></div>
                <div className="pull-right">
                  <StatButton player={this.props.player} stat="blocker" currentStats={this.props.currentStats} previousStats={this.props.previousStats} statClass={ this.props.getStatClass(this.props.currentStats.blocker) } />
                </div>
              </td>
              <td>
                <div className="pad_bottom text-abilities"><h3>Mental</h3></div>
                <div className="pull-left stat"><h4>Aggression</h4></div>
                <div className="pull-right">
                  <StatButton player={this.props.player} stat="aggression" currentStats={this.props.currentStats} previousStats={this.props.previousStats} statClass={ this.props.getStatClass(this.props.currentStats.aggression) } />
                </div>
              </td>
              <td>
                <div className="pad_bottom text-abilities"><h3>Physical</h3></div>
                <div className="pull-left stat"><h4>Acceleration</h4></div>
                <div className="pull-right">
                  <StatButton player={this.props.player} stat="acceleration" currentStats={this.props.currentStats} previousStats={this.props.previousStats} statClass={ this.props.getStatClass(this.props.currentStats.acceleration) } />
                </div>
              </td>
          </tr>
          <tr>
            <td>
              <div className="pull-left stat"><h4>Glove</h4></div>
              <div className="pull-right">
                <StatButton player={this.props.player} stat="glove" currentStats={this.props.currentStats} previousStats={this.props.previousStats} statClass={ this.props.getStatClass(this.props.currentStats.glove) } />
              </div>
            </td>
            <td>
              <div className="pull-left stat"><h4>Anticipation</h4></div>
              <div className="pull-right">
                <StatButton player={this.props.player} stat="anticipation" currentStats={this.props.currentStats} previousStats={this.props.previousStats} statClass={ this.props.getStatClass(this.props.currentStats.anticipation) } />
              </div>
            </td>
            <td>
              <div className="pull-left stat"><h4>Agility</h4></div>
              <div className="pull-right">
                <StatButton player={this.props.player} stat="agility" currentStats={this.props.currentStats} previousStats={this.props.previousStats} statClass={ this.props.getStatClass(this.props.currentStats.agility) } />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="pull-left stat"><h4>Passing</h4></div>
              <div className="pull-right">
                <StatButton player={this.props.player} stat="passing" currentStats={this.props.currentStats} previousStats={this.props.previousStats} statClass={ this.props.getStatClass(this.props.currentStats.passing) } />
              </div>
            </td>
            <td>
              <div className="pull-left stat"><h4>Bravery</h4></div>
              <div className="pull-right">
                <StatButton player={this.props.player} stat="bravery" currentStats={this.props.currentStats} previousStats={this.props.previousStats} statClass={ this.props.getStatClass(this.props.currentStats.bravery) } />
              </div>
            </td>
            <td>
              <div className="pull-left stat"><h4>Balance</h4></div>
              <div className="pull-right">
                <StatButton player={this.props.player} stat="balance" currentStats={this.props.currentStats} previousStats={this.props.previousStats} statClass={ this.props.getStatClass(this.props.currentStats.balance) } />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="pull-left stat"><h4>Pokecheck</h4></div>
              <div className="pull-right">
                <StatButton player={this.props.player} stat="pokecheck" currentStats={this.props.currentStats} previousStats={this.props.previousStats} statClass={ this.props.getStatClass(this.props.currentStats.pokecheck) } />
              </div>
            </td>
            <td>
              <div className="pull-left stat"><h4>Creativity</h4></div>
              <div className="pull-right">
                <StatButton player={this.props.player} stat="creativity" currentStats={this.props.currentStats} previousStats={this.props.previousStats} statClass={ this.props.getStatClass(this.props.currentStats.creativity) } />
              </div>
            </td>
            <td>
              <div className="pull-left stat"><h4>Speed</h4></div>
              <div className="pull-right">
                <StatButton player={this.props.player} stat="speed" currentStats={this.props.currentStats} previousStats={this.props.previousStats} statClass={ this.props.getStatClass(this.props.currentStats.speed) } />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="pull-left stat"><h4>positioning</h4></div>
              <div className="pull-right">
                <StatButton player={this.props.player} stat="positioning" currentStats={this.props.currentStats} previousStats={this.props.previousStats} statClass={ this.props.getStatClass(this.props.currentStats.positioning) } />
              </div>
            </td>
            <td>
              <div className="pull-left stat"><h4>Determination</h4></div>
              <div className="pull-right">
                <StatButton player={this.props.player} stat="determination" currentStats={this.props.currentStats} previousStats={this.props.previousStats} statClass={ this.props.getStatClass(this.props.currentStats.determination) } />
              </div>
            </td>
            <td>
              <div className="pull-left stat"><h4>Stamina</h4></div>
              <div className="pull-right">
                <StatButton player={this.props.player} stat="stamina" currentStats={this.props.currentStats} previousStats={this.props.previousStats} statClass={ this.props.getStatClass(this.props.currentStats.stamina) } />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="pull-left stat"><h4>Rebound Control</h4></div>
              <div className="pull-right">
                <StatButton player={this.props.player} stat="rebound_control" currentStats={this.props.currentStats} previousStats={this.props.previousStats} statClass={ this.props.getStatClass(this.props.currentStats.rebound_control) } />
              </div>
            </td>
            <td>
              <div className="pull-left stat"><h4>Flair</h4></div>
              <div className="pull-right">
                <StatButton player={this.props.player} stat="flair" currentStats={this.props.currentStats} previousStats={this.props.previousStats} statClass={ this.props.getStatClass(this.props.currentStats.flair) } />
              </div>
            </td>
            <td>
              <div className="pull-left stat"><h4>Strength</h4></div>
              <div className="pull-right">
                <StatButton player={this.props.player} stat="strength" currentStats={this.props.currentStats} previousStats={this.props.previousStats} statClass={ this.props.getStatClass(this.props.currentStats.strength) } />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="pull-left stat"><h4>Recovery</h4></div>
              <div className="pull-right">
                <StatButton player={this.props.player} stat="recovery" currentStats={this.props.currentStats} previousStats={this.props.previousStats} statClass={ this.props.getStatClass(this.props.currentStats.recovery) } />
              </div>
            </td>
            <td>
              <div className="pull-left stat"><h4>Influence</h4></div>
              <div className="pull-right">
                <StatButton player={this.props.player} stat="influence" currentStats={this.props.currentStats} previousStats={this.props.previousStats} statClass={ this.props.getStatClass(this.props.currentStats.influence) } />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="pull-left stat"><h4>Reflexes</h4></div>
              <div className="pull-right">
                <StatButton player={this.props.player} stat="reflexes" currentStats={this.props.currentStats} previousStats={this.props.previousStats} statClass={ this.props.getStatClass(this.props.currentStats.reflexes) } />
              </div>
            </td>
            <td>
              <div className="pull-left stat"><h4>Teamwork</h4></div>
              <div className="pull-right">
                <StatButton player={this.props.player} stat="teamwork" currentStats={this.props.currentStats} previousStats={this.props.previousStats} statClass={ this.props.getStatClass(this.props.currentStats.teamwork) } />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="pull-left stat"><h4>Stickhandling</h4></div>
              <div className="pull-right">
                <StatButton player={this.props.player} stat="stickhandling" currentStats={this.props.currentStats} previousStats={this.props.previousStats} statClass={ this.props.getStatClass(this.props.currentStats.stickhandling) } />
              </div>
            </td>
            <td>
              <div className="pull-left stat"><h4>Work Rate</h4></div>
              <div className="pull-right">
                <StatButton player={this.props.player} stat="work_rate" currentStats={this.props.currentStats} previousStats={this.props.previousStats} statClass={ this.props.getStatClass(this.props.currentStats.work_rate) } />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
});

export default ForwardPlayer
