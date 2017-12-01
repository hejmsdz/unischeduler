import React, { Component } from 'react';

class SelectBox extends Component {
  render() {
    return (
      <select value={this.props.active} onChange={this.handleChange.bind(this)}>
        {this.props.options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    );
  }

  handleChange(event) {
    this.props.onChange(event.target.value);
  }
}

export default SelectBox;
