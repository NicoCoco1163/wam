/**
 * @file: app.js
 * @author: NicoCoco1163
 * @create_at: 2019-07-31 15:23:19
 * @update_at: 2019-08-05 15:57:41
 */

const Koa = require('koa');
const app = new Koa();
const router = require('./router');

// const getMongoClient = require('./mongodb');

app.use(async (ctx, next) => {
    const start = Date.now();

    await next();
    ctx.set('X-Response-Time', `${Date.now() - start}ms`);
});

for (let key in router) {
    app.use(router[key].middleware());
}

// getMongoClient().then(client => {
//     client.getAddons('a').then(
//         res => {
//             console.log(res);
//         }
//     )
// })

const judger = require('./judger');
const spider = require('./spider');

// judger('WeakAuras 2').then(source => {
//     console.log('Come from: ', source);
// });

// ifCurseForge('WeakAuras 2').then(res => {
//     console.log(res);
// })

// spider.push();

app.listen(3001);