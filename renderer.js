/**
 * @file: renderer.js
 * @author: NicoCoco1163
 * @create_at: 2019-07-31 11:43:44
 * @update_at: 2019-07-31 14:59:35
 */

const {ipcRenderer, remote} = require('electron');

document.getElementById('button').onclick = function () {
    const msg = document.getElementById('message').value;
    ipcRenderer.send('asynchronous-message', msg);
};

ipcRenderer.on('asynchronous-reply', function (evt, arg) {
    console.log(evt, arg);
});

const BrowserWindow = remote.BrowserWindow;
const win = new BrowserWindow({
    width: 200,
    height: 150
});

win.loadURL('http://www.baidu.com');


// function bindEvents(observable, events) {
//     if (!('addEventListener' in observable)) {
//         return;
//     }

//     for (let i = 0; i < events.length; i += 1) {
//         observable.addEventListener(...events[i]);
//     }
// }

// window.onload = function () {
//     const webview = document.getElementById('webview');
//     const indicator = document.querySelector('.loading');

//     bindEvents(
//         webview,
//         [
//             ['did-start-loading', function () {
//                 indicator.innerText = 'loading...';
//             }],
//             ['did-stop-loading', function () {
//                 indicator.innerText = '';
//             }],
//             ['dom-ready', function () {
//                 webview.openDevTools();
//             }]
//         ]
//     );
// };
