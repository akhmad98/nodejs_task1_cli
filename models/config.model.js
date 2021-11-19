class Config {
    constructor({
        string = 'C1-C0-A-R1-R0-A-R0-R0-C1-A',
        X,
        Y,
    } = {}) {
        this.string = string;
        this.X = X;
        this.Y = Y
    }
}

module.exports = Config;