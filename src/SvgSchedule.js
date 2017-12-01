import React, { Component } from 'react';

class SvgSchedule extends Component {
  render() {
    const startHour = 8;
    const endHour = 20;
    const hourHeight = 40;
    const dayWidth = 150;
    const days = ['mon', 'tue', 'wed', 'thu', 'fri'];
    const marginTop = 50;
    const marginLeft = 20;

    const width = marginLeft + dayWidth * days.length;
    const height = marginTop + (endHour - startHour) * hourHeight;

    let xs = {};
    days.forEach((day, i) => {
      xs[day] = marginLeft + i * dayWidth;
    });

    let y = (hour) => marginTop + (hour - startHour) * hourHeight;

    let hourLines = [];
    for (let h=startHour; h<=endHour; h++) {
      hourLines.push((
        <g>
          <line x1="0" y1={y(h)} x2={width} y2={y(h)} style={{stroke:'#777', strokeWidth:1}} />
          <text x="0" y={y(h)}>{h}</text>
        </g>
      ))
    }

    return (
      <svg width={width} height={height}>
        {days.map((day, i) => (
        <g>
          <text x={xs[day] + 20} y="35" font-size="24">{day}</text>
          <line x1={xs[day]} y1="0" x2={xs[day]} y2={width} style={{stroke:'black', strokeWidth:1}} />
        </g>
        ))};
        {hourLines}
        <line x1="0" y1={marginTop} x2={width} y2={marginTop} style={{stroke:'black', strokeWidth:2}} />
        <line x1={marginLeft} y1="0" x2={marginLeft} y2={width} style={{stroke:'black', strokeWidth:2}} />

        {this.props.classes.map(cl => (
        <g>
          <rect x={xs[cl.day]} y={y(cl.time)} width={dayWidth} height={hourHeight * cl.duration} style={{fill:'rgba(97, 218, 251, 0.5)', stroke:'black', strokeWidth:1}} />
          <text x={xs[cl.day] + 20} y={y(cl.time) + 20} font-size="20">{cl.course + '/' + cl.type}</text>
        </g>
        ))}
      </svg>
    );
  }
}

export default SvgSchedule;
