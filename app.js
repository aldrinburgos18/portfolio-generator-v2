const inquirer = require("inquirer");
const fs = require("fs");
const generatePage = require("./src/page-template.js");

/* const mockData = {
  name: "Aldrin",
  github: "aldrinburgos18",
  about:
    "Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et.",
  projects: [
    {
      name: "Run Buddy",
      description:
        "Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.",
      languages: ["HTML", "CSS"],
      link: "https://github.com/lernantino/run-buddy",
      feature: true,
      confirmAddProject: true,
    },
  ],
}; */

/* const pageHTML = generatePage(mockData); */

const promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?",
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log("Please enter your name!");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "github",
      message: "Enter your GitHub username:",
      validate: (githubInput) => {
        if (githubInput) {
          return true;
        } else {
          console.log("Please enter your GitHub username!");
          return false;
        }
      },
    },
    {
      type: "confirm",
      name: "confirmAbout",
      message:
        'Would you like to enter some information about yourself for an "About" section?',
      default: true,
    },
    {
      type: "input",
      name: "about",
      message: "Provide some information about yourself:",
      when: ({ confirmAbout }) => {
        if (confirmAbout) {
          return true;
        } else {
          return false;
        }
      },
      validate: (aboutInput) => {
        if (aboutInput) {
          return true;
        } else {
          console.log("Please provide some information about yourself.");
          return false;
        }
      },
    },
  ]);
};

const promptProject = (portfolioData) => {
  //if there are no 'projects' array property, create one
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }
  console.log(`
=================
Add a New Project
=================
`);
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of your project?",
        validate: (projInput) => {
          if (projInput) {
            return true;
          } else {
            console.log("Please enter the name of your project!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "description",
        message: "Provide a description of the project (Required):",
        validate: (descInput) => {
          if (descInput) {
            return true;
          } else {
            console.log("Please provide a description of the project!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "link",
        message: "Enter the GitHub link to your project. (Required):",
        validate: (linkInput) => {
          if (linkInput) {
            return true;
          } else {
            console.log("Please enter a link!");
            return false;
          }
        },
      },
      {
        type: "checkbox",
        name: "languages",
        message:
          "What did you build this project with? (Check all that apply): ",
        choices: [
          "Javascript",
          "HTML",
          "CSS",
          "ES6",
          "jQuery",
          "Bootstrap",
          "Node",
        ],
      },
      {
        type: "confirm",
        name: "feature",
        message: "Would you like to feature this project?",
        default: true,
      },
      {
        type: "confirm",
        name: "confirmAddProject",
        message: "Would you like to enter another project?",
        default: true,
      },
    ])
    .then((projectData) => {
      portfolioData.projects.push(projectData);
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
      } else {
        return portfolioData;
      }
    });
};

promptUser()
  .then(promptProject)
  .then((portfolioData) => {
    const pageHTML = generatePage(portfolioData);

    fs.writeFile("index.html", pageHTML, (err) => {
      if (err) throw new Error(err);

      console.log(
        "Portfolio complete! Check out index.html to see the output!"
      );
    });
  });
