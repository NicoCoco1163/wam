/**
 * @file: if-curse-forge.js
 * @author: NicoCoco1163
 * @create_at: 2019-08-01 17:44:27
 * @update_at: 2019-08-05 15:41:00
 */

const axios = require('axios');

function parser(str) {
    return str.toLowerCase().replace(/\s/g, '-');
}

module.exports = function (query) {
    const targetUrl = 'https://www.curseforge.com/wow/addons/' + parser(query);

    // TODO: store

    return new Promise(resolve => {
        axios.get(targetUrl, {timeout: 5e3})
            .then(() => resolve('curse-forge'))
            .catch(() => resolve(false));
    });
};
