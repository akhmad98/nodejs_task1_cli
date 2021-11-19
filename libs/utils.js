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

    makeByChar(char) {
        const upCase = char.toUpperCase();

        const charIndex = 
          this[this.encode ? "alphabet" : "encodeAlphabet"].indexOf(upCase);

        if (charIndex === -1) {
            return char;
        }

        let result = 
        this[this.encode ? "encodeAlphabet" : "alphabet"][charIndex]

        if (upCase !== char) {
            result = result.toLowerCase();
        }

        return result;
    }

    startEngine(text) {
        let result = "";

        for(const char of text) {
            result += this.makeByChar(char);
        }

        return result;
    }
}

module.exports = Acipher;