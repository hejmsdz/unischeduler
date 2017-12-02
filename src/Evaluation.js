class Evaluation {
  constructor(classes) {
    this.classes = classes;
    this.days = ['mon', 'tue', 'wed', 'thu', 'fri'];
    this.classesByDays = this.days.map(day =>
      this.classes.filter(cl => cl.day === day)
        .sort((a, b) => a.time - b.time)
    );
  }

  findOverlaps() {
    let overlaps = [];
    this.classesByDays.forEach((day, d) => {
      if (day.length <= 1) {
        return;
      }

      let endTime = day[0].time + day[0].duration;
      for (let i=1; i<day.length; i++) {
        let cl = day[i];
        if (cl.time < endTime) {
          overlaps.push({day: this.days[d], time: cl.time, duration: endTime - cl.time});
        }
        endTime = cl.time + cl.duration;
      }
    });

    return overlaps;
  }

  totalTime() {
    return this.classesByDays.map((day, d) => {
      if (!day.length) {
        return 0;
      }
      let last = day[day.length - 1];
      return last.time + last.duration - day[0].time;
    }).reduce((a, b) => a+b, 0);
  }

  score() {
    let totalClassTime = this.classes.map(cl => cl.duration).reduce((a, b) => a+b, 0);
    let totalTime = this.totalTime();
    let totalOverlaps = this.findOverlaps().map(ov => ov.duration).reduce((a, b) => a+b, 0);
    return (totalClassTime / totalTime) * Math.exp(-totalOverlaps);
  }
}

export default Evaluation;