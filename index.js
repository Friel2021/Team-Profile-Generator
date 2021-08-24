const Manager = require(".lib/Manager");
const Engineer = require(".lib/Engineer");
const Intern = require(".lib/Intern");
const Employee = require(".lib/Employee");
const inquirer = require("inquirer");
const fs = require("fs");

const employees = [];

function addEmployee(role) {
  role = role.toLowerCase();
  return inquirer
    .prompt([
      {
        name: "name",
        message: `What is your ${role}'s name?`,
      },
      {
        name: "id",
        message: `What is your ${role}'s id?`,
      },
      {
        name: "email",
        message: `What is your ${role}'s email?`,
      },
      {
        name: "officeNumber",
        message: `What is your ${role}'s office number?`,
        when: role === "manager",
      },
      {
        name: "github",
        message: `What is your ${role}'s GitHub username?`,
        when: role === "engineer",
      },
      {
        name: "school",
        message: `What is your ${role}'s school?`,
        when: role === "intern",
      },
    ])
    .then((answers) => {
      switch (role) {
        case "manager":
          return employees.push(
            new Manager(
              answers.name,
              answers.id,
              answers.email,
              answers.officeNumber
            )
          );
        case "engineer":
          return employees.push(
            new Engineer(
              answers.name,
              answers.id,
              answers.email,
              answers.github
            )
          );
        case "intern":
          return employees.push(
            new Intern(answers.name, answers.id, answers.email, answers.school)
          );
        default:
          return;
      }
    });
}
