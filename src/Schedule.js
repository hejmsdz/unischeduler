import React, { Component } from 'react';

class Schedule extends Component {
  render() {
    return (
      <ul>
        {this.props.classes.map((cl, i) => (
        <li key={i}>{cl.course}/{cl.type}, {cl.day} {cl.time[0]}-{cl.time[1]}</li>
        ))}
      </ul>
    );
  }
}

export default Schedule;
