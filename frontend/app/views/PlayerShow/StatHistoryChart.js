import React from 'react';
const Boron = require('boron');
const LineChart = require("react-chartjs").Line;

var ProcessData = function (stats, stat) {
  let historyObj = { labels: [], data: [] },
      statsReversed = stats.reverse();

  for (let i = 0; i < statsReversed.length; i++) {
    let val = statsReversed[i];

    historyObj.labels.push(val.game_date);
    historyObj.data.push( val[stat]  );
  }

  return historyObj;
};

var StatHistoryChart = React.createClass({
  getConfig: function () {
    let stats = this.props.stats,
        stat = this.props.stat,
        processedData = ProcessData(stats, this.props.stat);

    let data = {
      labels: processedData.labels,
      datasets: [{
        data: processedData.data,
        borderWidth: 1
      }]
     };

     let options = {
      scaleOverride : true,
      scaleSteps : 20,
      scaleStepWidth : 1,
      scaleStartValue : 0,
      bezierCurve: false,
      maintainAspectRatio: true,
      animation: false,
      responsive: true
     };

    return { data: data, options: options };
  },

  render: function() {
    return <LineChart data={this.getConfig().data} options={this.getConfig().options} />
  }
});



export default StatHistoryChart;
