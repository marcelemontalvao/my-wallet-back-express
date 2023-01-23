import express from "express";
import cors from "cors"
import db from "./db/db.js";
import joi from 'joi'
import { v4 as uuidV4 } from 'uuid';
import bcrypt from "bcrypt"

const app = express() // Cria um servidor
const PORT = 5000;

app.use(cors());
app.use(express.json());

const userSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required()
});

const transactionSchema = joi.object({
    value: joi.number().required(),
    description: joi.string().required(),
    type: joi.string().required()
});

app.post('/user', async (req, res) => {
    const { name, email, password } = req.body
    const passwordHash = bcrypt.hashSync(password, 10);

    const user = {
        name: name,
        email: email,
        password: password
    }

    const validation = userSchema.validate(user, { abortEarly: true })
    if (validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    try {
        const resp = await db.collection("users").findOne({ email })

        if (resp && bcrypt.compareSync(password, resp.password)) {        
            res.status(422).send("Usuário já existe");
        } else {
            await db.collection("users").insertOne({
                name: name,
                email: email,
                password: passwordHash
            })
        }
        return res.sendStatus(201);
    } catch (error) {
        return res.status(500).send(error.message);
    }
})

app.get("/user", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await db.collection("users").findOne({
            email: email,
            password: password
        })

        const token = uuidV4();
            
        await db.collection("sessions").insertOne({
            userId: user._id,
            token
        })

        res.status(200).send(token)
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/transactions/input', async (req, res) => {
    const { value, description } = req.body

    const transaction = {
        value: value,
        description: description,
        type: "input"
    }

    const validation = transactionSchema.validate(transaction, { abortEarly: true })
    if (validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(422).send(errors)
    }

    try {
        await db.collection("transactions").insertOne({ transaction })
        return res.sendStatus(201);
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

app.post('/transactions/output', async (req, res) => {
    const { value, description } = req.body

    const transaction = {
        value: value,
        description: description,
        type: "output"
    }

    const validation = transactionSchema.validate(transaction, { abortEarly: true })
    if (validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(422).send(errors)
    }

    try {
        await db.collection("transactions").insertOne({ transaction })
        return res.sendStatus(201);
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

app.get("/transactions", (req, res) => {
    db.collection("transactions").find().toArray().then(transactions => {
        console.log(transactions); // array de transações
    }).then(transactions => {
        console.log(transactions);
        res.status(200).send(transactions);
    }).catch((error) => {
        console.error(error)
        res.status(404).send('Ops! Não foram encontradas transações!');
    });
});

app.listen(PORT, () => {
    console.log("Servidou rodou com sucesso")
});