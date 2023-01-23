export async function validateUser(req, res, next) {
    try {
        const { authorization } = req.headers
        const token = authorization?.replace("Bearer ", '')

        if (!token) return res.status(422).send("Informe o token!")

        const checkToken = await db.collection("sessoes").findOne({ token })
        if (!checkToken) return res.status(401).send("Usuário não existe")
        res.locals.sessao = checkToken

        next()
    } catch (error) {
        return res.status(500).send(error)
    }
}