// API significa Application Programming Interface
// POST, GET, PUT, DELETE
// CRUD - Create Read Update Delete
// Endpoint
// Middleware

import express from "express";
import cors from "cors";
import { db } from "./connect.js";

const app = express();
const PORT = 3001;

app.use(cors());
// app.use(express.json());

app.get("/", (request, response) => {
  response.send("Não preciso mais ficar atualizando!");
});

app.get("/artists", async (request, response) => {
  response.send(await db.collection("artists").find({}).toArray());
});

app.get("/songs", async (request, response) => {
  response.send(await db.collection("songs").find({}).toArray());
});

app.listen(PORT, () => {
  console.log(`O servidor esta escutando na porta ${PORT}`);
});
