import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import GroupSelector from './GroupSelector';
import Schedule from './Schedule';
import SvgSchedule from './SvgSchedule';
import Evaluation from './Evaluation';
import generateClassesList from './funcs';
import GeneticAlgorithm from './GeneticAlgorithm';

class App extends Component {
  constructor() {
    super();
    this.state = {courses: {}, selection: {}};
  }

  componentWillMount() {
    fetch('data/groups.json')
      .then(resp => resp.json())
      .then(data => {
        let selection = {};
        Object.entries(data).forEach(([course, [theoryGroups, labGroups]]) => {
          selection[course] = [Object.keys(theoryGroups)[0], Object.keys(labGroups)[0]];
        });

        console.log('initial selection: ', selection);
        this.setState({courses: data, selection: selection});

        this.genetic = new GeneticAlgorithm(data);
        this.genetic.init();
      });
  }

  render() {
    let classesList = generateClassesList(this.state.courses, this.state.selection);
    let evaluation = new Evaluation(classesList);
    let overlaps = evaluation.findOverlaps();
    let score = evaluation.score();

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Schedule generator</h1>
        </header>
        <div className="main">
          <SvgSchedule classes={classesList} overlaps={overlaps}></SvgSchedule>
          {/*<Schedule classes={classesList}></Schedule>*/}
          <p>Score: {score}</p>

          <GroupSelector courses={this.state.courses} selection={this.state.selection} onUpdate={this.handleChangeSelection.bind(this)} />
          <button onClick={this.resetGenetic.bind(this)}>Reset genetic algorithm</button>
          <button onClick={this.runGenetic.bind(this)}>Run genetic algorithm</button>
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

  resetGenetic() {
    this.genetic.init();
  }

  runGenetic() {
    this.genetic.run();
    this.setState({selection: this.genetic.best});
  }
}

export default App;
