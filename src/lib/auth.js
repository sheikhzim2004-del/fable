import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";


const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db(process.env.AUTH_DB_NAME || "fable_db");

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
    },
    database: mongodbAdapter(db, {
        client
    }),
});