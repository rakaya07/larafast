export default class ModuleInterface {

  constructor(name, description) {
    this.name = name;
    this.description = description;
  }

  async run() {
    throw new Error("Module must implement run() method");
  }

}
