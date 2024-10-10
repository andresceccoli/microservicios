import { nanoid } from "nanoid";

class Db {
    constructor() {
    }

    db = [];
    index = {};

    add = async obj => {
        const id = nanoid();
        obj.id = id;
        obj.created = new Date().getTime();
        this.db.push(obj);
        this.index[id] = obj;
    };

    update = async obj => {
        if (!obj.id) {
            throw new Error("Object has no id");
        }
        if (await this.find(obj.id)) {
            const i = await this.findIndex(obj.id);
            obj.updated = new Date().getTime();
            this.db[i] = obj;
            this.index[obj.id] = obj;
        }
    };

    remove = async obj => {
        if (!obj.id) {
            throw new Error("Object has no id");
        }
        if (await this.find(obj.id)) {
            const i = await this.findIndex(obj.id);
            this.db.splice(i, 1);
            delete this.index[obj.id];
        }
    };

    list = async () => {
        return this.db;
    }

    query = async (predicate) => {
        return this.db.filter(predicate);
    }

    find = async id => {
        return this.index[id];
    };

    findIndex = async id => {
        const i = this.db.findIndex(o => o.id === id);
        if (i >= 0) {
            return i;
        } else {
            throw new Error("Id not found");
        }
    };

}

export default Db;