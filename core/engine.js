export default class CoreEngine {

  constructor(pipeline) {
    this.pipeline = pipeline;
  }

  async run() {

    const steps = this.pipeline.getSteps();

    const total = steps.length;

    for (let i = 0; i < steps.length; i++) {

      const module = steps[i];

      console.log(`\nStep ${i+1}/${total} - ${module.name}`);

      await module.run();

    }

    console.log("\nProject installation complete.");

  }

}
