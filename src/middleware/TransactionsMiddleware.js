import db from "../config/database.js"

export async function validateUser(req, res, next) {
    try {
        const { authorization } = req.headers
      
        const token = authorization?.replace("Bearer ", '')

        if (!token) return res.status(422).send("Informe o token!")

        const session = await db.collection("sessions").findOne({ token })

        if (!session) return res.status(401).send("Usuário não existe")

        const user = await  db.collection("users").findOne({ _id: session?.userId });

        if (!user) return res.status(401).send("Usuário não existe")
        res.locals.user = user;

        next()
    } catch (error) {
        return res.status(500).send("Houve um problema no servidor")
    }
}