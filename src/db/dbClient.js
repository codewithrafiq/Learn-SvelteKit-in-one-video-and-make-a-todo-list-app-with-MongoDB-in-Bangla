import {
    MongoClient
} from 'mongodb';


const clientPromise = new MongoClient("mongodb+srv://codewithrafiq:cwr123456@codewithrafiq.q1lclif.mongodb.net/?retryWrites=true&w=majority", {})

const dbClient = clientPromise.connect()

export default dbClient;