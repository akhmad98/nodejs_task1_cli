const { Transform } = require('stream');

class CustomTransformStream extends Transform {
    constructor(acipher) {
        super();
        this.acipher = acipher;
    }

    _transform(chunk, encoding, callback) {
        callback(null, this.acipher.startEngine(String(chunk)));
    }

    _flush(callback) {
        callback();
    }
}

module.exports = CustomTransformStream;