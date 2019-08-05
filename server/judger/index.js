/**
 * @file: index.js
 * @author: NicoCoco1163
 * @create_at: 2019-08-01 17:45:44
 * @update_at: 2019-08-05 15:39:13
 */

const ifCurseForge = require('./if-curse-forge');
const ifGithub = require('./if-github');

module.exports = async function (query) {
    return await ifCurseForge(query)
        || await ifGithub(query);
};
