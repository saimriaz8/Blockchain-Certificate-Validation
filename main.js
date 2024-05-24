
// import SHA256 from 'crypto-js/sha256.js'; // This is used when you are using node
let SHA256 = CryptoJS.SHA256; // This is used when you are using browser


class Data {
    constructor( {name, CertificateID} ) {
        this.name = name;
        this.CertificateID = CertificateID;
    }
}

class Block {
    constructor(index, timestamp, data, publicKey, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = new Data(data);
        this.publicKey = publicKey;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.publicKey).toString();
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        //this.chain.push(this.createGenesisBlock());
    }

    createGenesisBlock() {
        return new Block("0", "01/01/2024", { name: "Genesis", CertificateID: "0" }, "0x123456789", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        // newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                currentBlock.hash=currentBlock.calculateHash();
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}


let myBlockChain = new Blockchain();

async function fetchData() {
    const response = await fetch('http://localhost:3000/certificates');
    const data  = await response.json();
    data.forEach(entry => {
            const newBlock = new Block(entry.id, entry.date, entry.details, entry.publickey, myBlockChain.getLatestBlock().hash);
            myBlockChain.addBlock(newBlock);
        });
        console.log(JSON.stringify(myBlockChain,"",3)); // Comment in when you want to see that the blockchain is valid or not after making some changes.
    }; 

    
    
    // console.log(JSON.stringify(myBlockChain,"",3)); // due to async nature of fetch data, this will run before the data is fetched
    //  fetchData();



// Comment in the following to run node main.js // The code below this will be able to execute front-end.
document.getElementById('myForm').addEventListener('submit', function (event) {
    console.log('Form submitted');
    event.preventDefault();

    const inputName = document.getElementById('inputName4').value;
    const inputCertificateID = document.getElementById('inputCertificateID4').value;
    const inputPublickey = document.getElementById('inputPublickey4').value;
    isVerified = ()=>{
        for (let i = 0; i < myBlockChain.chain.length; i++) {
            if (myBlockChain.chain[i].data.name === inputName && myBlockChain.chain[i].data.CertificateID === inputCertificateID && myBlockChain.chain[i].publicKey === inputPublickey) {
                return true;
            }
        }
    }
    
    if (inputName === '' || inputCertificateID === '' || inputPublickey === '') {
        document.getElementById('result').textContent = 'Please fill all necessary fields';
        return;
    }


    if (isVerified()) {
        document.getElementById('result').textContent = 'Certificate is verified';
    } else {
        document.getElementById('result').textContent = 'Certificate is not verified';
    }
});
// -------------------------------------------------------------------------------------------------------
// fetchData();


// // check to see if the blockchain is valid or not after fetching data
fetchData().then(() => {
    myBlockChain.chain[1].data.name = 'Shahzaib Ali';
    myBlockChain.chain[1].data.CertificateID = 'B47612';
    console.log('Is blockchain valid? ' + myBlockChain.isChainValid());
    console.log(JSON.stringify(myBlockChain,"",3)); 
});

