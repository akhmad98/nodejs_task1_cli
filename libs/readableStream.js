const fs = require('fs');
const Readable = require('stream');

class myReadStream extends Readable {
    constructor(filename) {
        this.filename = filename;
        this.fd = null;
    }

    _construct(callback) {
        fs.open(this.filename, fs.constants.R_OK, (err, fd) => {
            if (err) {
                callback(err)
            } else {
                this.fd = fd;
                callback()
            }
        });
    }

    _read(n) {
        const buff = Buffer.alloc(n);
        fs.read(this.fd, buff, 0, n, null, (err, bytesRead) => {
            if (err) {
                this.destroy(err)
            } else {
                this.push((bytesRead > 0) ? buff.slice(0, bytesRead) : null);
            }
        });
    }

    _destroy(err, callback) {
        if (this.fd) {
            fs.close(this.fd, (er) => callback(er || err));
        } else {
            callback(err);
        }
    }
}
module.exports = myReadStream;