const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');
const db = admin.firestore();


const problemCollection = db.collection("problems");
const messageCollection = db.collection("messages");

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




module.exports = {createProblem,getAllProblems, createMessage, getAllMessages}