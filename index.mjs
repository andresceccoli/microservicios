import express from "express";
import passport from "passport";
import { createUser, getCurrentUser, login, logout } from "./rest/user.mjs";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { SECRET } from "./config.mjs";
import { find } from "./domain/user.mjs";
import { find as findToken } from "./domain/token.mjs";

const app = express();

// middlewares
app.use(express.json());

passport.use('jwt', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET,
    issuer: 'testevents.com',
    audience: 'testevents.com'
}, (payload, done) => {
    console.log('auth payload', payload);
    find(payload.sub).then(user => {
        if (user) {
            findToken(payload.sub).then(token => {
                if (token) {
                    done(null, user);
                } else {
                    done(new Error("Session expired", false))
                }
            });
        } else {
            done(new Error('User does not exist', false));
        }
    }).catch(err => done(err, false));
}));

const authMiddleware = passport.authenticate('jwt', { session: false });

app.post('/user', createUser);
app.get('/user/current', authMiddleware, getCurrentUser);
app.post('/user/login', login);
app.post('/user/logout', authMiddleware, logout);

app.listen(3000, () => {
    console.log('Started');
});