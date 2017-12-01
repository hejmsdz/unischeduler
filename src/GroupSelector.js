import React, { Component } from 'react';
import SelectBox from './SelectBox';

class GroupSelector extends Component {
  constructor() {
    super();
    this.state = {courses: {}};
  }

  componentWillMount() {
    fetch('/data/groups.json')
      .then(resp => resp.json())
      .then(data => {
        this.setState({courses: data});
      });
  }

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
          {Object.entries(this.state.courses).map(([name, [theoryGroups, labGroups]]) => (
          <tr key={name}>
            <td>{name}</td>
            <td><SelectBox options={Object.keys(theoryGroups)} /></td>
            <td><SelectBox options={Object.keys(labGroups)} /></td>
          </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default GroupSelector;
