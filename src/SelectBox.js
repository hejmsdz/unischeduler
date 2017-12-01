import React, { Component } from 'react';

class SelectBox extends Component {
  render() {
    return (
      <select>
        {this.props.options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    );
  }
}

export default SelectBox;
