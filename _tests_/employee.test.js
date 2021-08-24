const employee = require("../lib/Employee");

describe("Employee", () => {
  describe("Initilization", () => {
    it("it should create an object with name, ID and email", () => {
      const emp = new Employee("Greg", "1", "G@gmail.com");
      expect(emp.name).toEqual("Greg");
      expect(emp.id).toEqual(1);
      expect(emp.email).toEqual("G@gmail.com");
    });
    it("should throw an error if provided with no arguements", () => {
      const emp = new employee();
      expect(emp).toThrow();
    });
    it("should throw an error if provided with an incorrect name", () => {
      const emp = new employee(453, 955, "G@gmail.com");
    });
    it("should throw an error if provided with an incorrect name", () => {
      const emp = new employee(453, "955", "G@gmail.com");
    });
    it("should throw an error if provided with an incorrect name", () => {
      const emp = new employee("453", 955, "G@gmail.c");
    });
  });
});
