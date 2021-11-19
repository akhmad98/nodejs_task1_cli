const fs = require('fs');
const path = require('path');
const Options = require('./options');
const Acipher = require('./utils');
const stream = require('stream'); 

class App {
    static async run(argv) {
        try {
            const options = Options.parce(argv)
            console.log(options)

            const aciphers = Acipher.generateAciphers(options);
            console.log(aciphers);
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = App;



// function Cesar(options) {

//     if (!(this instanceof Cesar)) {
//         return new Cesar(options);
//     }

//     Transform.call(this, options);
// }
// util.inherits(Cesar, Transform);

// Cesar.prototype._transform = function (chunk, enc, cb) {
//     const cesarChunk = cisarShift(chunk.toString(), 1);
//     this.push(cesarChunk);
//     cb();
// }


// const cesar = new Cesar();
// cesar.pipe(process.stdout);
// cesar.write('hello world');
// cesar.end();
// var stream = require('stream');
// var util = require('util');

// // node v0.10+ use native Transform, else polyfill
// var Transform = stream.Transform ||
//   require('readable-stream').Transform;

// /*
//  * Filters an object stream properties
//  *
//  * @param filterProps array of props to filter
//  */
// function Filter(filterProps, options) {
//   // allow use without new
//   if (!(this instanceof Filter)) {
//     return new Filter(filterProps, options);
//   }

//   // init Transform
//   if (!options) options = {}; // ensure object
//   options.objectMode = true; // forcing object mode
//   Transform.call(this, options);
//   this.filterProps = filterProps;
// }
// util.inherits(Filter, Transform);

// /* filter each object's sensitive properties */
// Filter.prototype._transform = function (obj, enc, cb) {
//   var self = this;
//   // determine what keys to keep
//   var filteredKeys = Object.keys(obj).filter(
//     function (key) {
//       // only those keys not in this list
//       return (self.filterProps.indexOf(key) === -1);
//     }
//   );

//   // create clone with only these keys
//   var filteredObj = filteredKeys.reduce(
//     function (accum, key) {
//       accum[key] = obj[key];
//       return accum;
//     },
//     {}
//   );

//   // push the filtered obj out
//   this.push(filteredObj);
//   cb();
// };


// // try it out, output to stdout
// // filter phone and email from objects
// var filter = new Filter([ 'phone', 'email' ]);
// filter
//   .on('readable', function () {
//     var obj;
//     while (null !== (obj = filter.read())) {
//       console.log(obj);
//     }
//   });

// // now send some objects to filter through
// filter.write({ name: 'Foo', phone: '555-1212',
//                email: 'foo@foo.com', id: 123 });
// filter.write({ name: 'Bar', phone: '555-1313',
//                email: 'bar@bar.com', id: 456 });
// filter.end();  // finish

// const { createReadStream, createWriteStream } = require('fs');
// // const readStream = createReadStream('./anime_dancing.mp4');
// const writeStream = createWriteStream('./file.txt');

// process.stdin.pipe(writeStream);