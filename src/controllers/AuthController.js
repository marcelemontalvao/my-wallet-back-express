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
        return res.status(201).send("Usuário cadastrado com sucesso!");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function signIn(req, res) {
    const { email, password } = req.body

    try {
        const user = await db.collection("users").findOne({ email: email })
        if (user && bcrypt.compareSync(password, user.password)) {

            const token = uuidV4();
            console.log(
                {
                    userId: user._id,
                    token
                }
            )
            console.log(
                await db.collection("sessions").insertOne({
                    userId: user._id,
                    token
                })
            ) 

            res.locals.token = token;

            return res.status(200).send(
                {
                    name: user.name,
                    token
                });
        } else {
            return res.status(401).send("Usuário ou senha incorretos");
        }

    } catch (error) {
        return res.status(500).send(error.message);
    }
}