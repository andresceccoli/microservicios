import { create, find, findByUsername } from "../domain/user.mjs";
import { create as createToken, remove as removeToken } from "../domain/token.mjs";

export const createUser = (req, res) => {
    const user = req.body;
    try {
        if (!user.name) {
            throw new Error("Name is required");
        }
        if (!user.username) {
            throw new Error("User name is required");
        }
        if (!user.password) {
            throw new Error("Password is required");
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
        return;
    }

    create(req.body).then(r => res.status(201).json(r))
        .catch(err => {
            res.status(400).json({
                message: err.message
            });
        });
};

export const getCurrentUser = (req, res) => {
    console.log('get current user', req.user);
    const { name, username, id, created } = req.user;
    res.status(200).json({
        name, username, id, created
    });
};

export const login = (req, res) => {
    console.log('login');
    const auth = req.get('Authorization');
    console.log('auth', auth);
    const x = Buffer.from(auth.substring('Basic '.length), 'base64').toString('utf8');
    console.log('x', x);
    const [username, password] = x.split(':');
    console.log('u:a', username, password);
    findByUsername(username).then(user => {
        if (user && user.password === password) {
            console.log('id', user.id);
            createToken(user.id).then(token => res.status(200).send(token));
        }
    });
};

export const logout = (req, res) => {
    console.log('logout', req.user);
    const { id } = req.user;
    removeToken(id).then(() => {
        res.status(200).send();
    });
};