import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GroupSelector from './GroupSelector';

class App extends Component {
  constructor() {
    super();
    this.state = {courses: {}, selection: {}};
  }

  componentWillMount() {
    fetch('/data/groups.json')
      .then(resp => resp.json())
      .then(data => {
        let selection = {};
        Object.entries(data).forEach(([course, [theoryGroups, labGroups]]) => {
          selection[course] = [Object.keys(theoryGroups)[0], Object.keys(labGroups)[0]];
        });

        console.log('initial selection: ', selection);
        this.setState({courses: data, selection: selection});
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="main">
          <GroupSelector courses={this.state.courses} selection={this.state.selection} onUpdate={this.handleChangeSelection.bind(this)} />
        </div>
      </div>
    );
  }

  handleChangeSelection(course, index, newValue) {
    let selection = this.state.selection;
    selection[course][index] = newValue;
    this.setState({selection});

    console.log('new selection: ', selection);
  }
}

export default App;
