const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');
const db = admin.firestore();


const problemCollection = db.collection("problems");
const messageCollection = db.collection("messages");
const employeesCollection = db.collection("employees");
const assignmentsCollection = db.collection("assignments");

async function getAllProblems(){

    const snapShot = await problemCollection.get()
    const problems = [];
    snapShot.forEach(doc =>{
        problems.push(doc.data());
    })

    return problems;
}

async function getAllMessages(recipientUsername = "", senderUsername = ""){


    if(recipientUsername && senderUsername){
        const snapshot = await messageCollection
        .where("recipientUsername", "==", recipientUsername)
        .where("senderUsername", "==", senderUsername).get();

        const messages = [];
        snapshot.forEach(doc =>{
            messages.push(doc.data());
        })

        return messages;
    }

    if(recipientUsername){
        const snapshot = await messageCollection
        .where("recipientUsername", "==", recipientUsername).get();

        const messages = [];
        snapshot.forEach(doc =>{
            messages.push(doc.data());
        })

        return messages;
    }


    if(senderUsername){
        const snapshot = await messageCollection
        .where("senderUsername", "==", senderUsername).get();

        const messages = [];
        snapshot.forEach(doc =>{
            messages.push(doc.data());
        })

        return messages;
    }

    const snapshot = await messageCollection.get();

    const messages = [];
    snapshot.forEach(doc =>{
        messages.push(doc.data());
    })

    return messages; 

}

async function createProblem(desc = "", photoLink = ""){
    const problemId = uuidv4();
    const timestamp = Math.floor((Date.now()/1000));
    const problem = {problemId, timestamp, desc, photoLink, status:"UNRESOLVED"};
    await problemCollection.doc(problemId).set(problem);
    return problem;
}

async function createMessage(senderUsername, recipientUsername, content){
    const messageId = uuidv4();
    const timestamp = Math.floor((Date.now()/1000));
    const message = {messageId,timestamp, senderUsername, recipientUsername, content, isRead:false};
    await messageCollection.doc(messageId).set(message);
    return message;
}

async function getEmployees(availableDate){

    let snapShot;
    
    if(availableDate){
        snapShot = await employeesCollection.where("availableDates", "array-contains-any", [availableDate]).get(); 
    }else{
        snapShot = await employeesCollection.get();
    }

    const employees = [];
    snapShot.forEach(doc =>{
        employees.push(doc.data())
    })
    return employees;

}

async function loginEmployee(username){

    const snapShot = await employeesCollection.where("username","==", username).get();
    const employees = [];
    snapShot.forEach(doc =>{
        employees.push(doc.data());
    })
    return employees[0];
}

async function logoutEmployee(username){
    // logs to be added
}

async function createAssignment(title, description, startTime, endTime, assignedEmployeeUsername){
    const assignmentId = uuidv4();
    const assignment = {assignmentId, title, description, startTime, endTime, assignedEmployeeUsername};
    await assignmentsCollection.doc(assignmentId).set(assignment);
    return assignment;
}

async function removeAssignment(assignmentId){
    const snapShot =await assignmentsCollection.where("assignmentId", "==", assignmentId).count().get();

    if(snapShot.data().count == 1){
        await assignmentsCollection.doc(assignmentId).delete()
        return true
    }else{
        return false;
    }
}

async function acknowledgeRead(messageId){
    const snapShot = await messageCollection.where("messageId", "==",messageId ).get();
    const messages = [];
    snapShot.forEach(doc => {
        messages.push(doc.data());
    });

    if(messages.length === 0){
        return false
    }else{
        messages[0].isRead = true;
        await messageCollection.doc(messageId).set(messages[0]);
        return true
    }

}

async function getAssignments(assignedEmployee){
    let snapShot;

    if(assignedEmployee){
        snapShot = await assignmentsCollection.where("assignedEmployeeUsername", "==", assignedEmployee).get();
    }else{
        snapShot = await assignmentsCollection.get();
    }

    const assignments = [];
    snapShot.forEach(doc =>{
        assignments.push(doc.data())
    })
    
    return assignments;
}

async function modifyProblem(problemId, status){
    const snapshot = await problemCollection.where("problemId", "==", problemId).get();

    const problems = [];
    snapshot.forEach(doc => {
        problems.push(doc.data());
    })

    if(problems.length === 0){
        return {
            errMessage:`No Problem with id ${problemId} found`,
            isTypeOf: () => "ResourceNotFound"
        }
    }
    problems[0].status = status;

    await problemCollection.doc(problemId).set(problems[0]);

    problems[0].isTypeOf = () => "Problem"
    return problems[0];

}

module.exports = {
    createProblem,
    getAllProblems, 
    createMessage, 
    getAllMessages, 
    getEmployees, 
    loginEmployee, 
    logoutEmployee, 
    createAssignment,
    removeAssignment,
    acknowledgeRead,
    getAssignments,
    modifyProblem
};