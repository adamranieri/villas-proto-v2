const typeDefs = `


  type Query {
    hello(name: String): String!
    problems: [Problem]!
    messages(recipientUsername:String, senderUsername:String): [Message]!
    employees(availableDate: Int): [Employee]!
    assignments(assignedEmployee: String): [Assignment]!
    login(username: String!): Employee!
    logout(username: String!): Employee!
  }

  type Mutation {
    addProblem(input: ProblemInput!): Problem!
    addMessage(input: MessageInput!): Message!
    markRead(messageId: String!): Boolean!
    addAssignment(input: AssignmentInput!): Assignment!
    deleteAssignment(assignmentId: String!): Boolean!
    updateProblem(problemId: String!, status: ProblemStatus!) : UpdateProblemStatusResult
  }

  input ProblemInput {
    desc: String! 
    photoLink: String
  }

  input MessageInput {
    senderUsername: String! 
    recipientUsername: String!  
    content: String!  
  }

  input AssignmentInput {
    title: String! 
    description: String! 
    startTime: Int! 
    endTime: Int! 
    assignedEmployeeUsername: String!
  }

  enum ProblemStatus {
    PRIORITY
    UNRESOLVED
    RESOLVED
  }

  type Problem {
    problemId: ID! 
    desc: String! 
    photoLink: String
    status: ProblemStatus!
    timestamp: Int!
  }

  type Message {
    messageId: String!
    senderUsername: String! 
    recipientUsername: String!  
    content: String!  
    isRead: Boolean 
    timestamp: Int!  
  }

  type Employee {
    username: String! 
    fname: String! 
    lname: String!
    isManager: Boolean
    availableDates : [Int]!
  }

  type Assignment {
    assignmentId: String! 
    title: String! 
    description: String! 
    startTime: Int! 
    endTime: Int! 
    assignedEmployeeUsername: String!
  }

  type ResourceNotFound {
    errMessage: String!
  }

  union UpdateProblemStatusResult = Problem | ResourceNotFound

`;

module.exports = typeDefs;
