class  Acipher {
    alphabet = [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ];
    encodeAlphabet;
    options;
    encode;

    constructor(options) {
        this.options = options;
        this.encode = options.type === "Atbash" ? true : options.action === "encode";
        this.generateAphabetEncode()

    }

    static generateAciphers(options) {
        const ciphers = [];
        
        for (const eachCipher of options.ciphers) {
            ciphers.push(new Acipher(eachCipher))
        }

        return ciphers;
    }

    generateAphabetEncode() {
        if (this.options.type === "Atbash") {
            this.encodeAlphabet = this.alphabet.slice().reverse()
        } else {
            this.encodeAlphabet = this.alphabet.map( (_, idx) => {
                let decodeCharIdex = (idx + this.options.shift) % this.alphabet.length;
            
                if ( decodeCharIdex < 0 ) {
                    decodeCharIdex += this.alphabet.length;
                }

                return this.alphabet[decodeCharIdex];
            })
        }
    }
}

module.exports = Acipher;