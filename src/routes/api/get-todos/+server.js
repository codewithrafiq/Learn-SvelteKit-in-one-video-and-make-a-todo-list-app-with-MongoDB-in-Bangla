import { json } from "@sveltejs/kit"
import dbClient from "../../../db/dbClient"




export async function GET() {
    const client = await dbClient
    const db = client.db("sveltekit_db")
    const collection = db.collection("todos")

    let todos = await collection.find({}).toArray()
    return json(todos)
}