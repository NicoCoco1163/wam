/**
 * @file: curse-forge.js
 * @author: NicoCoco1163
 * @create_at: 2019-08-05 18:04:28
 * @update_at: 2019-08-05 18:06:04
 */

const cheerio = require('cheerio');

function getText(cNode) {
    let textNode;

    for (let i = 0; i < cNode.children.length; i += 1) {
        const child = cNode.children[i];

        if (child.type === 'tag') {
            return getText(child);
        }

        // use first text child
        if (child.type === 'text' && !textNode) {
            textNode = child;
        }
    }

    if (textNode && textNode.type === 'text') {
        // rm spaces
        return textNode.data.replace(/(^\s+)|(\s+$)/g, '');
    }

    return '';
}

module.exports = function (res, callback) {
    const $ = res.$;
    const baseURL = res.options.url;
    const trs = $('.listing-project-file tr');

    const files = [];

    trs.each((index, el) => {
        const tr = cheerio.load(el);
        const rawTds = tr('td');
        const tds = Array.from(rawTds.slice(1, 3))
            .concat(Array.from(rawTds.slice(3, -1)));

        if (tds.length > 0) {
            let [
                version,
                size,
                updated,
                gVersion,
                downloads
            ] = [].map.call(tds, getText);

            if (downloads) {
                // rm comma in downloads
                downloads = parseInt(downloads.replace(',', ''), 10);
            }

            const file = {version, size, updated, gVersion, downloads};

            // use data-epoch as updated
            const updatedNode = tr('[data-epoch]')[0];

            if (updatedNode) {
                file.updated = updatedNode.attribs['data-epoch'] * 1000;
            }

            // file is required
            const fileNode = tr('[data-action=file-link]')[0];

            if (fileNode) {
                // handle relative or absolute path
                const url = new URL(fileNode.attribs.href, baseURL);

                file.file = url.href;
                files.push(file);
            }
        }
    });

    callback(files);
};
