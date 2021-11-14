const Option = require('./models/options.model');
const Config = require('./models/config.model');

const fs = require('fs');

const program = {
    options: [
        {
            flags: '-c, --config <string>',
            mandatory: true,
            optional: false,
            short: '-c',
            long: '--config',
            duplicate: false,
            config: {
                pairs: {
                    'R0': true,
                    'R1': true,
                    'C0': true,
                    'C1': true,
                    'A': true,
                    'A0': false,
                    'A1': false
                }
            }
        },
        {
            flags: '-i, --input <filename>',
            mandatory: false,
            optional: true,
            short: '-i',
            long: '--input',
            duplicate: false

        },
        {
            flags: '-o, --output <filename>',
            mandatory: false,
            optional: true,
            short: '-o',
            long: '--output',
            duplicate: false
        }
    ],
    rawArgs: [...process.argv.slice(2)],
    optionValues: {}
}

program.rawArgs = program.rawArgs.map(el => el.replace(/\.\/|\/|\..\//, '')) 

let keys = (program.rawArgs).filter((element, index, array) => index%2==0)
let values = (program.rawArgs).filter((element, index, array) => index%2)
let obj = Object.assign.apply({}, keys.map( (v, i) => ({[v]: values[i]})));
let pairs = [];

let findDuplicates = keys.filter((item, index) => keys.indexOf(item) != index)

process.exitCode=3;
if (findDuplicates.length) {
    process.stderr.write(
        'Duplicate option/options issue. Please, avoid from duplicate option tag/tags\n'
    )
    
    console.log(`Exit with Code: ${process.exitCode}`);
    process.exit();
} else {
    for(let i=0;i<3;i++){
        if (keys.includes(program.options[i].short) && keys.includes(program.options[i].long)) {
            process.stderr.write(
                `Duplicate option/options issue. Please, avoid from duplicate option ${program.options[i].short} or ${program.options[i].long}\n`
            )
            console.log(`Exit with Code: ${process.exitCode}`);
        }
    }
    if ( obj[program.options.filter(el => el.mandatory)[0].short] === undefined && obj[program.options.filter(el => el.mandatory)[0].long] === undefined ) {
            process.stderr.write(
                'Config option is required\n'
            )
            process.exitCode=1;
            console.log(`Exit with Code: ${process.exitCode}`);
            process.exit();
    } else {
        pairs = (obj[program.options[0].short] || obj[program.options[0].long]).match(/([ACR]\d|A)/g);
        if(pairs.some(el => !program.options[0].config.pairs[el])) {
            process.stderr.write(
                'Config validation is incorrect\n'
            )
            process.exitCode=1;
            console.log(`Exit with Code: ${process.exitCode}`);
            process.exit()
        }
    }
}

const optionIns = new Option(
    new Config ({
        string: obj[program.options[0].short] || obj[program.options[1].long],
        X: {
            'C': 'caesar',
            'R': 'rot',
            'A': 'atbash'
        },
        Y: {
            0: 'encoding',
            1: 'decoding'
        }
    }),
    obj[program.options[1].short] || obj[program.options[1].long],
    obj[program.options[2].short] || obj[program.options[2].long],
);
program.optionValues = optionIns;

module.exports = program;