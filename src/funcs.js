function generateClassesList(courses, selection) {
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

  let arrays = Object.entries(selection).map(([course, [theoryGroup, labGroup]]) => {
    let groups = courses[course];
    let theoryClasses = groups[0][theoryGroup].map(obj => restructure(obj, course, 0));
    let labClasses = groups[1][labGroup].map(obj => restructure(obj, course, 1));
    return theoryClasses.concat(labClasses);
  });
  return Array.prototype.concat.apply([], arrays);
}

export default generateClassesList;