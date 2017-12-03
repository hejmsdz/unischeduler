import Evaluation from './Evaluation';
import generateClassesList from './funcs';

class GeneticAlgorithm {
  constructor(courses) {
    this.courses = courses;
  }

  init() {
    this.population = this.createPopulation(200);
    this.best = null;
    this.bestScore = 0;
    this.gen = 0;
  }

  iteration() {
    let n = Math.floor(0.4 * this.population.length);
    let parents = this.select(JSON.parse(JSON.stringify(this.population)), n);
    let improved = false;
    for (let i=0; i+1<parents.length; i+=2) {
      let child = this.crossover(parents[i], parents[i+1]);
      this.mutate(child, 0.1);
      this.population.push(child);
      let score = new Evaluation(generateClassesList(this.courses, child)).score();
      if (score > this.bestScore) {
        this.best = child;
        this.bestScore = score;
        improved = true;
      }
    }
    this.gen++;
    this.reducePopulation(200);
    return improved;
  }

  run() {
    let i = 0;
    while(!this.iteration()) {
      if (++i >= 50) {
        break;
      }
    }
    console.log(i, 'iterations');
  }

  createPopulation(size) {
    let population = [];
    for (let i=0; i<size; i++) {
      population.push(this.random());
    }
    return population;
  }

  select(population, size) {
    let scores = population.map(sel => new Evaluation(generateClassesList(this.courses, sel)).score());
    let sumScores = scores.reduce((a, b) => a+b, 0);

    let selected = [];
    for (let k=0; k<size; k++) {
      let x = Math.random() * sumScores;
      for (let i=0; i<population.length; i++) {
        if (x <= scores[i]) {
          selected.push(population.splice(i, 1)[0]);
          sumScores -= scores.splice(i, 1)[0];
          break;
        } else {
          x -= scores[i];
        }
      }
    }
    return selected;
  }

  crossover(parent1, parent2) { // politically correct
    let child = {};
    Object.keys(this.courses).forEach(course => {
      let theoryGroup = (Math.random() < 0.5 ? parent1 : parent2)[course][0];
      let labGroup = (Math.random() < 0.5 ? parent1 : parent2)[course][1];
      child[course] = [theoryGroup, labGroup];
    });
    return child;
  }

  mutate(child, probability) {
    if (Math.random() < probability) {
      let courseNames = Object.keys(this.courses);
      let randomCourse = courseNames[Math.floor(Math.random() * courseNames.length)];
      let theoryOrLab = Math.random() < 0.5 ? 0 : 1;
      let groups = Object.keys(this.courses[randomCourse][theoryOrLab]);
      let choice = groups[Math.floor(Math.random() * groups.length)];
      child[randomCourse][theoryOrLab] = choice;
    }
  }

  reducePopulation(size) {
    let scores = this.population.map(sel => new Evaluation(generateClassesList(this.courses, sel)).score());
    let sortedScores = scores.sort();
    let threshold = sortedScores[sortedScores.length - size];
    this.population = this.population.filter((x, i) => scores[i] >= threshold);
  }
  
  random() {
    let selection = {};
    Object.entries(this.courses).forEach(([name, [theoryGroups, labGroups]]) => {
      let theory = Object.keys(theoryGroups);
      let lab = Object.keys(labGroups);
      selection[name] = [
        theory[Math.floor(Math.random() * theory.length)],
        lab[Math.floor(Math.random() * lab.length)]
      ];
    });
    return selection;
  }
}

export default GeneticAlgorithm;