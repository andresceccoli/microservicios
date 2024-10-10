import jsonwebtoken from "jsonwebtoken";
import Db from "../db/index.mjs";
import { SECRET } from "../config.mjs";

const db = new Db();

export const find = async (userId) => {
    return await db.query(t => t.userId === userId)
        .then(tokens => tokens && tokens.length > 0 && tokens[0]); 
};

export const create = async (userId) => {
    const existing = await find(userId);
    if (existing) {
        try {
            const validToken = jsonwebtoken.verify(existing.token, SECRET);
            return existing.token;
        } catch (error) {
            // no es valido asi que lo borramos
            db.remove(existing);
        }
    }

    const token = jsonwebtoken.sign({}, SECRET, {
        subject: userId,
        expiresIn: "7d",
        issuer: 'testevents.com',
        audience: 'testevents.com'
    });

    db.add({ userId, token });

    return token;
};

export const remove = async (userId) => {
    const existing = await find(userId);
    if (existing) {
        db.remove(existing);
    }
};