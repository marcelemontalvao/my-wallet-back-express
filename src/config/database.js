import { MongoClient } from "mongodb";
import dotenv from "dotenv"

dotenv.config();

// conectando ao banco
const mongoClient = new MongoClient(process.env.DATABASE_URL);

try {
    await mongoClient.connect();
    console.log('MongoDB Connected!');
} catch (error) {
    console.log(error.message);
}

const db = mongoClient.db();

export default db;