import React from 'react';

class Show extends React.Component {
  render () {
    return (
      <div>

        <h2>{ this.props.player.name }</h2>
      </div>
    );
  }
}

export default Show
