const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const fs = require("fs");

// create generated html file path
const generatedHtmlFilePath = "./dist/TeamRoster.html";

inquirer
  .prompt([
    {
      type: "input",
      name: "managerName",
      message: "What is your managers name?",
    },
    {
      type: "input",
      name: "managerID",
      message: "What is your managers ID #?",
    },
    {
      type: "input",
      name: "managerEmail",
      message: "What is your managers email address?",
    },
    {
      type: "input",
      name: "managerOfficeNumber",
      message: "What is your managers office number?",
    },
    {
      type: "list",
      name: "extraTeamMember",
      message: "Please select a team member to add",
      choices: ["Engineer", "Intern"],
    },
  ])

  .then((answers) => {
    let manager = new Manager(
      answers.managerName,
      answers.managerID,
      answers.managerEmail,
      answers.managerOfficeNumber
    );
    teamMembers.push(manager);
    evaluateExtraTeamMemberResult(answers.ExtraTeamMember);
  })
  .catch((error) => {
    if (error.isTtyError) {
    } else {
    }
  });

function addEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "engineerName",
        message: "What is your engineers name?",
      },
      {
        type: "input",
        name: "engineerID",
        message: "What is your engineers ID #?",
      },
      {
        type: "input",
        name: "engineerEmail",
        message: "What is your engineers email address?",
      },
      {
        type: "input",
        name: "engineerGitHub",
        message: "What is your engineers GitHub address?",
      },
      {
        type: "list",
        name: "extraTeamMember",
        message: "Please select a team member to add",
        choices: ["Engineer", "Intern", "Exit"],
      },
    ])

    .then(
      ((answers) => {
        let engineer = new Engineer(
          answers.engineerName,
          answers.engineerID,
          answers.engineerEmail,
          answers.engineerGitHub
        );
        teamMembers.push(engineer);
        evaluateExtraTeamMemberResult(answers.ExtraTeamMember);
      }).catch((error) => {
        if (error.isTtyError) {
        } else {
        }
      })
    );
}

// calls to have extra team member added - as many times as needed
function addIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "internName",
        message: "What is your interns name?",
      },
      {
        type: "input",
        name: "internID",
        message: "What is your interns ID #?",
      },
      {
        type: "input",
        name: "internEmail",
        message: "What is your interns email address?",
      },
      {
        type: "input",
        name: "internSchool",
        message: "What is your interns school?",
      },
      {
        type: "list",
        name: "extraTeamMember",
        message: "Please select a team member to add",
        choices: ["Engineer", "Intern", "Exit"],
      },
    ])

    .then(
      ((answers) => {
        let intern = new Intern(
          answers.internName,
          answers.internID,
          answers.internEmail,
          answers.internSchool
        );
        teamMembers.push(intern);
        evaluateExtraTeamMemberResult(answers.ExtraTeamMember);
      }).catch((error) => {
        if (error.isTtyError) {
        } else {
        }
      })
    );
}

function evaluateExtraTeamMemberResult(result) {
  if (result === "Engineer") {
    addEngineer();
  } else if (result === "Intern") {
    addIntern();
  } else {
    // Finish and generate HTML
    generateHTML();
  }
}

// loop through array and generate HTML
function generateHTML() {
  fs.writeFileSync(generatedHtmlFilePath, "");
}
