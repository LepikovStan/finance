let fs = require('fs');
let watch = require('node-watch');

module.exports = (path) => {
    return new Promise((resolve, reject) => {
        let w = watch(path, { recursive: false });
        w.on('change', resolve);
        w.on('error', reject);
    })
}
