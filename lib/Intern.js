const Employee = require("./Employee");

if (typeof name !== "string" || !name.trim().length) {
  throw new Error("Expected parameter 'name' to be a non-empty string");
}

if (typeof id !== "number" || isNaN(id) || id < 0) {
  throw new Error("Expected parameter 'id' to be a non-empty string");
}

if (typeof email !== "string" || !email.trim().length || email.isEmail()) {
  throw new Error("Expected parameter 'email' to be a non-empty string");
}

class Intern extends Employee {
  constructor(name, id, email, school) {
    super(name, id, email);

    this.school = school;
    this.role = "Intern";
  }

  getSchool() {
    return this.school;
  }
}

module.exports = Intern;
