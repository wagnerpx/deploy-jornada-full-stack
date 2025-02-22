// senha= alexandresuporte911:eh24uklJpdGwBWpS
// JavaScript assincrono
// await async
// Fullfilled
import { MongoClient } from "mongodb";

const URI =
  "mongodb+srv://alexandresuporte911:eh24uklJpdGwBWpS@cluster0.agcvn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(URI);

export const db = client.db("spotifyAula");
// const songCollection = await db.collection("songs").find({}).toArray();

// console.log(songCollection);
