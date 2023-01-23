import express from "express";
import cors from "cors"
import { getUser, signUp } from "./controllers/AuthController.js";
import { getTransactions, postTransaction } from "./controllers/TransationsController.js";

const app = express() // Cria um servidor
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/user', signUp)

app.get("/user", getUser);

app.post('/transactions', postTransaction);

app.get("/transactions", getTransactions);

app.listen(PORT, () => {
    console.log("Servidou rodou com sucesso")
});