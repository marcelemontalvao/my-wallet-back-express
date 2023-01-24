import db from "../config/database.js";

export async function postTransaction(req, res) {
    const { value, description, type } = req.body
    const user = res.locals.user
    console.log(user)
    const transaction = {
        value: value,
        description: description,
        type: type
    }

    try {
        const transaction1 = await db.collection("transactions").insertOne({ 
            userId: user._id,
            transaction 
        });
        console.log(transaction1)
        return res.sendStatus(201);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function getTransactions(req, res) {
    const user = res.locals.user 
    console.log(user)
    try {
        const transactions = await db.collection("transactions").find({userId: user._id}).toArray();
        return res.status(200).send(transactions); // array de transações
    } catch (error) {
        console.error(error)
        return res.status(404).send('Ops! Não foram encontradas transações!');
    }
}