import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import GroupSelector from './GroupSelector';
import Schedule from './Schedule';
import SvgSchedule from './SvgSchedule';
import Evaluation from './Evaluation';

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
    let classesList = this.generateClassesList();
    let evaluation = new Evaluation(classesList);
    let overlaps = evaluation.findOverlaps();

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="main">
          <SvgSchedule classes={classesList} overlaps={overlaps}></SvgSchedule>
          {/*<Schedule classes={classesList}></Schedule>*/}

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

  generateClassesList() {
    let timeToFloat = (timeStr) => {
      let [hour, min] = timeStr.split(':').map(Number);
      return hour + min / 60;
    }

    let restructure = (obj, course, type) => {
      let [startTime, endTime] = obj.time.split(' - ').map(timeToFloat);

      return {
        course: course,
        type: type,
        day: obj.day,
        time: startTime,
        duration: endTime - startTime
      }
    };

    let arrays = Object.entries(this.state.selection).map(([course, [theoryGroup, labGroup]]) => {
      let groups = this.state.courses[course];
      let theoryClasses = groups[0][theoryGroup].map(obj => restructure(obj, course, 0));
      let labClasses = groups[1][labGroup].map(obj => restructure(obj, course, 1));
      return theoryClasses.concat(labClasses);
    });
    return Array.prototype.concat.apply([], arrays);
  }
}

export default App;
