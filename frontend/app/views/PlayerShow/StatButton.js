import React from 'react';
const Boron = require('boron');
const LineChart = require("react-chartjs").Line;
import StatHistoryChart from './StatHistoryChart'

var styles = {
  btn: {
      margin: '.5em auto',
      padding: '.5em 1em',
      outline: 'none',
      fontSize: 16,
      fontWeight: '600',
      color: '#FFFFFF',
      border: 'none'
  },
  container: {
      background: '#FFF',
      padding: '1em',
      textAlign: 'center',
      width: 800
  },
  title: {
    margin: 0,
    color: '#C94E50',
    fontWeight: 400
  }
};

var StatProgressIcon = React.createClass({

  setClass: function () {
    let cStatValue = this.props.current[this.props.stat],
        pStatValue = this.props.previous && this.props.previous[this.props.stat],
        cssClass = "fa ";

    if (pStatValue && pStatValue > cStatValue) {
      cssClass = cssClass + " fa-level-down text-warning";
    } else if (pStatValue && pStatValue < cStatValue) {
      cssClass = cssClass + " fa-level-up text-navy";
    } else {
      cssClass = cssClass;
    }

    return cssClass;
  },

  render: function () {
    return (
      <i className={ this.setClass() }></i>
    )
  }
});


var StatButton = React.createClass({
  toggleDialog: function (ref) {
      return function() {
        this.refs[ref].toggle();
      }.bind(this)
  },

  getContent: function (modalName){
      return (
        <div style={styles.container}>
          <h2 style={styles.title}>"{this.props.stat}" Growth History</h2>
          <div><StatHistoryChart stat={this.props.stat} stats={this.props.player.stats} /></div>
          <button style={styles.btn} onClick={this.toggleDialog(modalName)}>Close</button>
        </div>
      )
  },

  getTiggerAndModal: function (modalName) {
      var Modal = Boron[modalName],
          current = this.props.currentStats,
          previous = this.props.previousStats;

      return (
        <div span={{ float: "left", clear: "both", margin: "0px", padding: "0px" }}>
          <button onClick={ this.toggleDialog(modalName) } type="button" className={ this.props.statClass }>{ current[this.props.stat] }</button>
          <StatProgressIcon stat={ this.props.stat } current={ current } previous={ previous } />
          <Modal ref={modalName}>{this.getContent(modalName)}</Modal>
        </div>
      )
  },
  render: function () {
    return (
      <div>
        { this.getTiggerAndModal('FadeModal') }
      </div>
    );
  }
});

export default StatButton
