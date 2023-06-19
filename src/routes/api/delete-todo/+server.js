import { json } from '@sveltejs/kit'
import { ObjectId } from 'mongodb'
import dbClient from '../../../db/dbClient.js'




export async function POST({ request }) {
    const client = await dbClient
    const db = client.db("sveltekit_db")
    const collection = db.collection("todos")

    const { id } = await request.json()
    console.log("id--->", id);

    console.log("id--->", id);
    const find_todo_by_id = await collection.findOne({"_id": new ObjectId(id)})
    console.log("find_todo_by_id---->", find_todo_by_id);
    if (!find_todo_by_id) {
        return json({
            "error":"Todo Not Found !"
        })
    }
    await collection.deleteOne({_id:new ObjectId(id)})
    return json({
        "message": "Todo is Deleted",
        "id":id
    })
}