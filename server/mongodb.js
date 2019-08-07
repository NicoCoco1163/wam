/**
 * @file: mongodb.js
 * @author: NicoCoco1163
 * @create_at: 2019-07-31 17:21:38
 * @update_at: 2019-08-07 14:57:32
 */

const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://wam:wam@localhost:27017/wam';
const dbName = 'wam';

let client;

const ADDON = 'addon';

function compose(mongoClient) {
    const db = mongoClient.db(dbName);

    // name as unique index
    db
        .collection(ADDON)
        .createIndex({name: 1}, {unique: true});

    return {
        getAddons: function (query) {
            query = {
                // fuzzy search
                name: new RegExp(query, 'gi')
            };

            return new Promise((resolve, reject) => {
                db
                    .collection(ADDON)
                    .find(query)
                    // TODO: order and others
                    .toArray()
                    .then(resolve)
                    .catch(reject);
            });
        },
        insertAddon: function (query, payload) {
            return new Promise((resolve, reject) => {
                db
                    .collection(ADDON)
                    .findOneAndUpdate(
                        {name: query},
                        {$set: {s: payload}},
                        {upsert: true},
                    function (err, res) {
                        if (err) {
                            return reject(err);
                        }

                        resolve(res.value);
                    });

                    // .insertOne({
                    //     name: query,
                    //     s: payload
                    // })
                    // .then(resolve)
                    // .catch(reject);
            });
        }
    };
}

// use wam;
// db.createUser({user: 'wam', pwd: 'wam', roles: [{role: 'dbOwner', db: 'wam'}]})

module.exports = async function getMongoClient() {
    if (!client) {
        client = await MongoClient.connect(url, {
            useNewUrlParser: true
        });
    }

    return {
        client,
        ...compose(client)
    };
};
