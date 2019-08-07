/**
 * @file: spider.js
 * @author: NicoCoco1163
 * @create_at: 2019-08-01 17:35:39
 * @update_at: 2019-08-06 11:50:14
 */

const Crawler = require('crawler');
const spider = new Crawler({
    maxContections: 10
});

module.exports = {
    _: spider,
    // https://www.curseforge.com/wow/addons/weakauras-2/files
    push: function (url, handler, callback) {
        return new Promise(resolve => {
            spider.queue({
                url,
                callback(err, res, done) {
                    if (err) {
                        // TODO: logger
                    }
                    else {
                        handler(res, callback);
                    }

                    done();
                    resolve();
                }
            });
        });
    }
};
