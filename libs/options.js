const path = require('path');
const fs = require('fs');

class Options {
    // outer var to avoid it from block-statement issue, 
    // so i can declare  to other functions. for example argv for parceArgv
    argv;
    input;
    output;
    ciphers = [];

    constructor(argv) {
        this.argv = argv;
        this.parceArgv();
    }

    static parce(argv) {
        return new Options(argv);
    }

    // parcing path values
    parcePath(argvVal, type) {
        
        // Check for delivered path correct type or not
        if (!["input", "output"].includes(type)) {
            throw new Error('Incorrect argument value type');
        }
        // Check for whether value properly provided relatively to args
        if (!argvVal) {
            throw new Error(`${type} is missing`);
        }
        // For duplicate
        if (this[type]) {
            throw new Error(`${type} can not be duplicated`)
        }

        const rPath = path.isAbsolute(argvVal) ? argvVal : path.join(process.cwd(), argvVal);

        if (!fs.existsSync(rPath)) {
            throw new Error(
                `${type} file by path ${rPath} doesn't exist`
            );
        }

        // checking for file access according to flags W_OK, R_OK, F_OK
        try {
            fs.accessSync(
                rPath,
                type === "input" ? fs.constants.R_OK : fs.constants.R_OK | fs.constants.W_OK
            );
        } catch (err) {
            throw new Error(
                `${type} access for ${argvVal} is not allowed`
            );
        }

        this[type] = rPath;
    }

    // parcing cipher patterns
    parceCiphers(ciphersVal) {
        const stacks = ciphersVal.split("-");

        if (stacks.length === 0) {
            throw new Error('Chipher value is not available')
        }

        for (const stack of stacks) {
            if (!["C1", "C0", "R1", "R0", "A"].includes(stack)) {
                throw new Error(`Unkown cipher value given: ${stack}`);
            }

            const cipher = {};

            if (stack === "A") {
                cipher.type = "Atbash";
            } else {
                cipher.type = stack[0] === "C" ? "Caesar" : "Rot";
                cipher.shift = stack[0] === "C" ? 1 : 8;
                cipher.action = stack[0] === "1" ? "encode" : "decode";
            }

            this.ciphers.push(cipher);
        }
    }

    // parcing arguments for argv
    parceArgv() {
        for(let i = 0; i < this.argv.length; i++) {
            const args = this.argv[i];

            // another variable for val at the same time, and skip
            const value = this.argv[i + 1];
            i++;
            // checking ...
            switch (args) {
                // only configuratrion arguments mandatory 
                // and should be checked for duplicate and patterns
                case "-c":
                case "--config": {
                    if (!value) {
                        throw new Error('Configuration patterns are missing')
                    }
                    if (this.ciphers.length !== 0) {
                        throw new Error('Configuration duplicated');
                    }
                    this.parceCiphers(value);

                    break;
                }
                case "-i":
                case "--input": {
                    this.parcePath(value, "input");
                    break;
                }
                case "-o":
                case "--output": {
                    this.parcePath(value, "output");
                    break;
                }
                
                default:
                    throw new Error('Unknown argument')
            }
        }
    }
}

module.exports = Options;