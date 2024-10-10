import Db from "../db/index.mjs";

const db = new Db();

export const create = async (user) => {
    // username no repetido
    
    const existing = await db.query(u => u.username === user.username);
    console.log(user.username, existing)
    if (existing.length > 0) {
        throw new Error("Username already exists");
    }

    db.add(user);

    return user;
};

export const find = async (id) => {
    return await db.find(id);
}

export const findByUsername = async (username) => {
    return await db.query(u => u.username === username).then(users => users && users.length > 0 && users[0]);
}