/**
 * @file: router.js
 * @author: NicoCoco1163
 * @create_at: 2019-08-05 15:49:28
 * @update_at: 2019-08-05 16:03:18
 */

const router = require('koa-joi-router');
const Joi = router.Joi;

const judger = require('./judger');

exports.s = router();
exports.s.get('/s', async ctx => {

    const q = ctx.query && ctx.query.q;

    if (q) {
        ctx.status = 200;
        return ctx.body = await judger(q);
    }

    ctx.status = 404;
});
