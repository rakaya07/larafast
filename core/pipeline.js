export default class Pipeline {

  constructor() {
    this.steps = [];
  }

  add(module) {
    this.steps.push(module);
  }

  getSteps() {
    return this.steps;
  }

}
