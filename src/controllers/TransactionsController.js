import db from "../config/database.js";

export async function postTransaction(req, res) {
    const { value, description, type } = req.body

    const transaction = {
        value: value,
        description: description,
        type: type
    }

    try {
        await db.collection("transactions").insertOne({ transaction })
        return res.sendStatus(201);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function getTransactions(req, res) {
    // const user = res.locals.user 
    // console.log(user)
    // try {
    //     const transactions = await db.collection("transactions").find({ user: user._id }).toArray();
    //     delete user.password;
    //     return res.status(200).send(transactions); // array de transações
    // } catch (error) {
    //     console.error(error)
    //     return res.status(404).send('Ops! Não foram encontradas transações!');
    // }
    const token = res.locals.token 
    try {
        const transactions = await db.collection("transactions").find(token).toArray();
        return res.status(200).send(transactions); // array de transações
    } catch (error) {
        console.error(error)
        return res.status(404).send('Ops! Não foram encontradas transações!');
    }
}

export function getSessions(req, res) {
    const token = res.locals.token
    try {
        const sessions = db.collection("sessions").find(token).toArray();
        return res.status(200).send(sessions); // array de sessions
    } catch (error) {
        console.error(error)
        return res.status(404).send('Ops! Não foram encontradas sessions!');
    }
}