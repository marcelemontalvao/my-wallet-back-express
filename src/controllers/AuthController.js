import db from "../config/database.js";
import { v4 as uuidV4 } from 'uuid';
import bcrypt from "bcrypt"

export async function signUp(req, res) {
    const { name, email, password } = req.body

    const passwordHash = bcrypt.hashSync(password, 10);

    try {
        const resp = await db.collection("users").findOne({ email })

        if (resp && bcrypt.compareSync(password, resp.password)) {
            return res.status(422).send("Usuário já existe");
        } else {
            await db.collection("users").insertOne({
                name,
                email,
                password: passwordHash
            })
        }
        return res.sendStatus(201).send("Usuário cadastrado com sucesso!");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function signIn(req, res) {
    const { email, password } = req.body

    try {

        const user = await db.collection("users").findOne({ email })

        if (user && bcrypt.compareSync(password, user.password)) {

            const token = uuidV4();

            await db.collection("sessions").insertOne({
                userId: user._id,
                token
            })

            return res.status(200).send(token);
        } else {
            return res.sendStatus(401).send("Usuárioimage.png ou senha incorretos");
        }

    } catch (error) {
        return res.status(500).send(error.message);
    }
}