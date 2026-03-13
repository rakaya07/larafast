import inquirer from "inquirer";

export async function runWizard(projectName) {

  console.log("\nLarafast Project Setup\n");

  const answers = await inquirer.prompt([

    {
      type: "list",
      name: "auth",
      message: "Auth system?",
      choices: [
        { name: "None", value: "none" },
        { name: "Breeze", value: "breeze" }
      ]
    },

    {
      type: "list",
      name: "stack",
      message: "Frontend stack?",
      choices: [
        { name: "Blade", value: "blade" },
        { name: "React", value: "react" },
        { name: "Vue", value: "vue" }
      ]
    },

    {
      type: "list",
      name: "database",
      message: "Database?",
      choices: [
        { name: "SQLite", value: "sqlite" },
        { name: "MySQL", value: "mysql" },
        { name: "PostgreSQL", value: "pgsql" }
      ]
    }

  ]);

  return {
    projectName,
    ...answers
  };

}
