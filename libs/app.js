const { pipeline } = require('stream/promises');
const Options = require('./options');
const Acipher = require('./utils');
const CustomReadStream = require('./readableStream');
const CustomWriteStream = require('./writableStream');
const CustomTransformStream = require('./transform');

class App {
    static async run(argv) {
        try {
            const options = Options.parce(argv)

            const aciphers = Acipher.generateAciphers(options);
            
            const transformStreams = [];
            for (const acipher of aciphers) {
                const transformStream = new CustomTransformStream(acipher);

                transformStreams.push(transformStream);
            }

            await pipeline(options.input ? new CustomReadStream(options.input) : process.stdin,
            ...transformStreams, 
            options.output ? new CustomWriteStream(options.output) : process.stdout);
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = App;
