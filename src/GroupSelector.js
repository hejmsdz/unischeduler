import React, { Component } from 'react';
import SelectBox from './SelectBox';

class GroupSelector extends Component {
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Course</th>
            <th>Theory group</th>
            <th>Lab group</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(this.props.courses).map(([name, [theoryGroups, labGroups]]) => (
          <tr key={name}>
            <td>{name}</td>
            <td><SelectBox options={Object.keys(theoryGroups)} active={this.props.selection[name][0]} onChange={(newValue) => this.props.onUpdate(name, 0, newValue)} /></td>
            <td><SelectBox options={Object.keys(labGroups)} active={this.props.selection[name][1]} onChange={(newValue) => this.props.onUpdate(name, 1, newValue)} /></td>
          </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default GroupSelector;
