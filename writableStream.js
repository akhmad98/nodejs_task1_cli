const { Writable } = require('stream');
const fs = require('fs');

class myWritableStream extends Writable {
    constructor(filename) {
        super();
        this.filename = filename;
    }

    _construct(callback) {
        fs.open(this.filename, (err, fs) => {
            if (err) {
                callback(err)
            } else {
                this.fd = fd;
                callback();
            }
        })
    }
}