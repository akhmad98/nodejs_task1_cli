const { Readable } = require('stream');

class ReadStream extends Readable {
    constructor(filename) {
        super();
        this.filename = filename;
    }

    _read(size) {
        this.push(chunk)
    }
}

module.exports = ReadStream;