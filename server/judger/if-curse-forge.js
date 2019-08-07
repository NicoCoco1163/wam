/**
 * @file: if-curse-forge.js
 * @author: NicoCoco1163
 * @create_at: 2019-08-01 17:44:27
 * @update_at: 2019-08-06 14:09:47
 */

const axios = require('axios');

function parser(str) {
    return str.toLowerCase().replace(/\s/g, '-');
}

module.exports = function (query) {
    const queryComputed = parser(query);

    const judgerUrl = 'https://www.curseforge.com/wow/addons/' + queryComputed;
    const spiderUrl = 'https://www.curseforge.com/wow/addons/' + queryComputed + '/files';

    return new Promise(resolve => {
        axios.get(judgerUrl, {timeout: 5e3})
            .then(() => resolve({s: 'curse-forge', su: spiderUrl}))
            .catch(() => resolve(false));
    });
};
