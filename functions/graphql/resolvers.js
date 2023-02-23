const firebase = require('firebase-admin');
const { getAllProblems, createProblem, createMessage, getAllMessages } = require('./helpers');

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

    async employees(_, {availabilityDate}){
      return []
    },

    async assignments(_, {assignedEmployee, afterStartTime}){
      return []
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
    }

  }
};

module.exports = resolvers;
