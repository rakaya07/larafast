export default class CoreEngine {

  constructor() {
    this.modules = [];
  }

  register(module) {
    this.modules.push(module);
  }

  async run() {

    console.log("Starting installation engine...");

    for (const module of this.modules) {
      console.log(`Running module: ${module.name}`);
      await module.run();
    }

    console.log("Installation complete.");
  }

}
