class Option {
    constructor(config, input, output) {
        this.config = config;
        this.input = input || '';
        this.output = output || '';
    }
}

module.exports = Option;