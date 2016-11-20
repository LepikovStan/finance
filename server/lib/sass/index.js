let sass = require('node-sass');
let path = require('path');
let fs = require('fs');
let resolve = (url) => {
    return path.resolve(`${__dirname}/${url}`);
}
let render = (options) => {
    sass.render(options, (error, result) => {
        if (error) {
            console.error(error);
            return error;
        }
        let outFileStream = fs.createWriteStream(options.outFile);

        outFileStream.write(result.css.toString());
        console.log('sass rendered success');
    });
}

if (module.parent) {
    module.exports = render
} else {
    render();
}
