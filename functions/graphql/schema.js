const typeDefs = `


  type Query {
    hello(name: String): String!
    problems: [Problem]!
    messages(recipientUsername:String, senderUsername:String): [Message]!
    employees(availabilityDate: Int): [Employee]!
    assignments(assignedEmployee: String, afterStartTime: Int): [Assignment]!
  }

  type Mutation {
    addProblem(input: ProblemInput!): Problem!
    addMessage(input: MessageInput!): Message!
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
    password: String! 
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

  union AssignmentResult = Assignment | ResourceNotFound
  union LoginResult = Employee | ResourceNotFound
  union UpdateProblemStatusResult = Problem | ResourceNotFound

`;

module.exports = typeDefs;
