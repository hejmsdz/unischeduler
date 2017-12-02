class Evaluation {
  constructor(classes) {
    this.classes = classes;
  }

  findOverlaps() {
    const days = ['mon', 'tue', 'wed', 'thu', 'fri'];
    let classesByDays = days.map(day => this.classes.filter(cl => cl.day === day).sort((a, b) => a.time - b.time));
    
    let overlaps = [];
    classesByDays.forEach((day, d) => {
      if (day.length <= 1) {
        return;
      }

      let endTime = day[0].time + day[0].duration;
      for (let i=1; i<day.length; i++) {
        let cl = day[i];
        if (cl.time < endTime) {
          overlaps.push({day: days[d], time: cl.time, duration: endTime - cl.time});
        }
        endTime = cl.time + cl.duration;
      }
    });

    return overlaps;
  }
}

export default Evaluation;