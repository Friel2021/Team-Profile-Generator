const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const fs = require("fs");

// create generated html file path
const generatedHtmlFilePath = "./dist/rosterListing.html";
let teamMembers = [];

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
      name: "additionalTeamMember",
      message: "Please select a team member to add",
      choices: ["Engineer", "Intern", "Exit"]
    },
  ])

  .then(answers => {
    let manager = new Manager(answers.managerName, answers.managerID, answers.managerEmail, answers.managerOfficeNumber);

    teamMembers.push(manager);
    evaluateAdditionalTeamMemberResult(answers.additionalTeamMember);
  })
  .catch(error => {
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
        name: "additionalTeamMember",
        message: "Please select a team member to add or Exit to exit",
        choices: ["Engineer", "Intern", "Exit"],
      },
    ])

    .then(answers => {
      let engineer = new Engineer(answers.engineerName, answers.engineerID, answers.engineerEmail, answers.engineerGitHub);
      teamMembers.push(engineer);
      evaluateAdditionalTeamMemberResult(answers.additionalTeamMember);
    })
    .catch(error => {
      if (error.isTtyError) {
      } else {
      }
    });
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
        name: "additionalTeamMember",
        message: "Please select a team member to add or Exit to exit",
        choices: ["Engineer", "Intern", "Exit"],
      },
    ])

    .then(answers => {
      let intern = new Intern(answers.internName, answers.internID, answers.internEmail, answers.internSchool);
      teamMembers.push(intern);
      evaluateAdditionalTeamMemberResult(answers.additionalTeamMember);
    })
    .catch(error => {
      if (error.isTtyError) {
      } else {
      }
    });
}

function evaluateAdditionalTeamMemberResult(result) {
  if (result === "Engineer") {
    addEngineer();
  } else if (result === "Intern") {
    addIntern();
  } else {
    // Finish and generate HTML
    generateHTML();
  }
}function generateInitialHTML()
{
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <div class="col-12 jumbotron mb-3 team-heading">
        <title>Team Profile</title>
        <link rel="stylesheet" href="./style.css">
    </head>
    <body>
        <div class="teamNavBar">
            <h1 class="navBarTitle">My Team</h2>
        </div>
        <div class="cardBody">`
}

function generateTeamMemberHtml(teamMember)
{
    return `        <div class="teamMemberCard">
    <div class="teamMemberTitle">

        <h3>${teamMember.getName()} - ${teamMember.getRole()}</h3>
    </div>
    <div class="teamMemberBody">
        <ul>
            <li>ID:${teamMember.getId()}</li>
            <li>Email: <a href="mailto:${teamMember.getEmail()}">${teamMember.getEmail()}</a></li>
            ${teamMember.getRoleHtml()}
        </ul>
    </div>
</div>`;
}

function generateFinalHtml()
{
    return `    </div>
    </body>
    </html>`;
}

//loop through team members array and generate html
function generateHTML()
{
    //first create new file (overwrite existing if file exists)
    fs.writeFileSync(generatedHtmlFilePath,"");
    //setup string to hold generated html
    let htmlData = generateInitialHTML();
    //loop through team members
    for(var a in teamMembers)
    {
        htmlData += generateTeamMemberHtml(teamMembers[a]);
    }
    //add final html to data
    htmlData += generateFinalHtml();
    //write data to file
    fs.writeFileSync(generatedHtmlFilePath,htmlData);
}