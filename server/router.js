/**
 * @file: router.js
 * @author: NicoCoco1163
 * @create_at: 2019-08-05 15:49:28
 * @update_at: 2019-08-07 16:37:01
 */

const router = require('koa-joi-router');
const Joi = router.Joi;

const spider = require('./spider');
const judger = require('./judger');
const worker = require('./worker');
const getMongoClient = require('./mongodb');

let mongodb;
let mutexes = [];

const RUN_SPIDER_INTERVAL = 1e4;

async function run(ctx, q) {
    if (mutexes.indexOf(q) > -1) {
        return;
    }

    mutexes.push(q);

    // run spider
    const {s, su} = await judger(q);
    const handler = worker[s];

    if (su) {
        await spider.push(su, handler, function (files) {
            const mutexIndex = mutexes.indexOf(q);

            if (mutexIndex > -1) {
                setTimeout(() => {
                    mutexes.splice(mutexIndex, 1);
                }, RUN_SPIDER_INTERVAL);
            }

            // store db
            mongodb.insertAddon(q, ctx.body = files);
        });
    }
}

exports.s = router();
exports.s.get('/s', async (ctx, next) => {

    const q = ctx.query && ctx.query.q;

    if (q) {
        ctx.status = 200;

        // init mongodb methods
        mongodb = mongodb || await getMongoClient();

        // requset db
        ctx.body = await mongodb.getAddons(q);

        if (ctx.body.length) {
            // run spider & update background
            run(ctx, q);

            return next();
        }

        // run spider & wait result
        return await run(ctx, q);
    }

    ctx.status = 404;
});
