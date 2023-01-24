export async function validateUser(req, res, next) {
    try {
        console.log("CAIU AQUI 1")
        const { authorization } = req.headers
        // console.log("Authorization: " + authorization)
        const token = authorization?.replace("Bearer ", '')
        // console.log("Token: " + token)

        if (!token) return res.status(422).send("Informe o token!")

        const session = await db.collection("sessions").findOne({ token })
        console.log("Session: " +session)

        if (!session) return res.status(401).send("Usuário não existe")

        const user = await  db.collection("users").findOne({ _id: session?.userId });
        console.log("user: " +user)
        if (!user) return res.status(401).send("Usuário não existe")
        res.locals.user = user;

        next()
    } catch (error) {
        console.log("CAIU AQUI")
        return res.status(500).send(error)
    }
}