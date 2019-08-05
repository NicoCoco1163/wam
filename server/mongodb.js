/**
 * @file: mongodb.js
 * @author: NicoCoco1163
 * @create_at: 2019-07-31 17:21:38
 * @update_at: 2019-08-01 17:33:35
 */

const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://wam:wam@localhost:27017/wam';
const dbName = 'wam';

let client;

const ADDON = 'addon';
const ADDON_DOWNLOAD = 'addon.download';

function compose(mongoClient) {
    const db = mongoClient.db(dbName);

    return {
        getAddons: function (query) {
            return new Promise((resolve, reject) => {
                db
                    .collection(ADDON)
                    .find({name: query})
                    // TODO: order and others
                    .toArray()
                    .then(resolve)
                    .catch(reject);
            });
        },
        getAddonDownload: function (query) {
            return new Promise((resolve, reject) => {
                db
                    .collection(ADDON_DOWNLOAD)
                    .findOne({name: query})
                    .then(resolve)
                    .catch(reject);
            });
        },
        insertAddon: function () {

        },
        updateAddon: function () {

        },
        updateAddonDownload: function () {

        }
        // findOne: function (query, options = {}) {
        //     return new Promise((resolve, reject) => {
        //         mongoClient
        //             .findOne(query, options)
        //             .then(resolve)
        //             .catch(reject);
        //     });
        // },
        // find: function (query, options = {}) {
        //     return new Promise((resolve, reject) => {
        //         mongoClient
        //             .find(query)
        //             .then(resolve)
        //             .catch(reject);
        //     });
        // }
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
