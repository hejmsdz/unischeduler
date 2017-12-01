import React, { Component } from 'react';

class Schedule extends Component {
  render() {
    return (
      <ul>
        {this.props.classes.map((cl, i) => (
        <li key={i}>{cl.course}/{cl.type}, {cl.day} {cl.time}+{cl.duration}</li>
        ))}
      </ul>
    );
  }
}

export default Schedule;
