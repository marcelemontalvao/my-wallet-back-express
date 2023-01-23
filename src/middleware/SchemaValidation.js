import { transactionSchema } from "../schema/TransactionsSchema.js";
import { loginSchema, userSchema } from "../schema/AuthSchema.js";

export function validateUserSchema(req, res, next) {
    const { name, email, password } = req.body

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

    next();
}


export function validateLoginSchema(req, res, next) {
    const { email, password } = req.body

    const user = {
        email: email,
        password: password
    }

    const validation = loginSchema.validate(user, { abortEarly: true })
    if (validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    next();
}

export async function validateTransactionSchema(req, res, next) {
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

    next();
}