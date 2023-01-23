import express from "express";
import cors from "cors"
import authRouter from "./routes/AuthRouter.js"; 
import transactionRouter from "./routes/TransactionsRouter.js";

const PORT = 5000;

const app = express();

app.use(express.json());

app.use(cors());

app.use([authRouter, transactionRouter]);

app.listen(PORT, () => {
    console.log("Servidou rodou com sucesso")
});