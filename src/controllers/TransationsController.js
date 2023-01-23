import { transactionSchema } from "../schema/TransationsSchema.js";
import db from "../config/database.js";

export async function postTransaction(req, res) {
    const { value, description, type } = req.body

    const transaction = {
        value: value,
        description: description,
        type: type
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
}

export async function getTransactions(req, res) {
    try {
        const transactions = await db.collection("transactions").find().toArray()
        res.status(200).send(transactions); // array de transações
    } catch (error) {
        console.error(error)
        res.status(404).send('Ops! Não foram encontradas transações!');
    }
}