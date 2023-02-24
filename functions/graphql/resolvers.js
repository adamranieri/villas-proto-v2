const firebase = require('firebase-admin');
const { getAllProblems, createProblem, createMessage, getAllMessages, getEmployees, loginEmployee, logoutEmployee, createAssignment, removeAssignment, acknowledgeRead, getAssignments, modifyProblem} = require('./helpers');

const resolvers = {
  Query: {
    async hello(_, { name }) {
      return `Hello ${name || 'World'}`;
    },

    async problems(_){
      return getAllProblems();
    },

    async messages(_, {recipientUsername, senderUsername}){
      return getAllMessages(recipientUsername, senderUsername);
    },

    async employees(_, {availableDate}){
      return getEmployees(availableDate);
    },

    async login(_, {username}){
      return loginEmployee(username);
    },

    async logout(_, {username}){
      return logoutEmployee(username);
    },

    async assignments(_, {assignedEmployee}){
      console.log(assignedEmployee)
      return getAssignments(assignedEmployee);
    }

  },

  Mutation: {
    async addProblem(_, input) {
      const {desc, photoLink} = JSON.parse(JSON.stringify(input)).input
      return createProblem(desc,photoLink);
    },

    async addMessage(_, input){
      const {senderUsername, recipientUsername, content} = JSON.parse(JSON.stringify(input)).input;
      return createMessage(senderUsername, recipientUsername, content);
    },

    async addAssignment(_, input){
      const {title, description, startTime, endTime, assignedEmployeeUsername} = JSON.parse(JSON.stringify(input)).input;
      return createAssignment(title, description, startTime, endTime, assignedEmployeeUsername);
    },

    async deleteAssignment(_, {assignmentId}){
      return removeAssignment(assignmentId)
    },

    async markRead(_, {messageId}){
      return acknowledgeRead(messageId)
    },

    async updateProblem(_,{problemId, status}){
      return modifyProblem(problemId,status);
    }

  }
};

module.exports = resolvers;
