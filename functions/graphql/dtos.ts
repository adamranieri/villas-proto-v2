
export type Message = { //
    messageId: number
    senderUsername: string 
    recipientUsername: string 
    content: string 
    isRead: boolean 
    timestamp: number 
}

export type Employee = { //
    username: string 
    password: string 
    fname: string 
    lname: string
    isManager: boolean
    availableDates : number[]
}

export type Assignment = { //
    assignmentId: number 
    title: string 
    description: string 
    startTime: number 
    endTime: number 
    assignedEmployeeUsername: string
}

export type WorkLog = { //
    employeeUsername: string
    kind: "CLOCK_IN" | "CLOCK_OUT"
    timestamp: number
}


export type Problem = { //
    problemId: number 
    desc: string 
    photoLink?: string
    status : "UNRESOLVED"| "RESOLVED" | "PRIORITY"
    timestamp: number
}

// mutations


// createAssignment(input: NewAssignment):Assignment  
// deleteAssignemtn(input: {assignmentId:number}):Assignment | ResourceNotFound
// createMessage(input: NewMessage): Message 
// createProblem(input: NewProblem): Problem  ######
// updateProblemStatus(input:{problemId:number, status:string}): Problem | ResourceNotFound


// Queries
// messages(recipientUsername?:string, senderUsername?:string ) //username => Message[] ########
// employees(availabilitydate: number) // => Message[]
// assignments(assignedEmployee?: string)
// problems() #######
// employeeLogin(input:{username:string, password:string}): Employee
