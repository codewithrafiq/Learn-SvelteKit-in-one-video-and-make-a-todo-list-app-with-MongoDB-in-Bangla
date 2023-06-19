import { json } from '@sveltejs/kit';
import dbClient from '../../../db/dbClient.js';



export async function POST({ request }) {
    const client = await dbClient
    const db = client.db("sveltekit_db")
    const collection = db.collection("todos")

    const { title } = await request.json()
    console.log("title----->", title);
    const todo = await collection.insertOne({ "title": title })
    const find_todo = await collection.findOne({"_id":todo.insertedId})
    return json(find_todo)
}