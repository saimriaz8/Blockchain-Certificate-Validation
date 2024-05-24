Description:
 This project is a web-based Certificate Verification Portal that allows users to verify the authenticity of their certificates by entering their name, certificate ID, and public key.
 The portal utilizes blockchain technology to store and validate certificate data.

Features:
 • Responsive design using Bootstrap.
 • Form fields for user details including name, certificate ID, public key, level of study, and board.
 • Validation checkbox to confirm the accuracy of the provided information.
 • Certificate verification button.
 • Display verification result.
 • Blockchain implementation to securely store certificate data.

Technologies Used:
 • HTML
 • CSS
 • Bootstrap 5.3.3
 • JavaScript
 • CryptoJS for SHA-256 hashing
 • Fetch API for data retrieval

Usage:
1.Enter your details:
 • Name
 • Certificate ID
 • Public Key
 • Level of Study
 • Board

2.Confirm the accuracy of the information by checking the confirmation checkbox.

3.Verify the certificate:
 • Click on the "Verify Certificate" button.

4.View the result:
 • The verification result will be displayed below the form.

JavaScript Explanation:
 • main.js
    This JavaScript file contains the logic for the blockchain implementation and the form submission process.

Blockchain Classes:
 • Data Class: Represents the data structure for the certificate.
 • Block Class: Represents a block in the blockchain.
 • Blockchain Class: Represents the blockchain itself.

Blockchain Methods:
 • calculateHash(): Calculates the hash of a block using SHA-256.
 • createGenesisBlock(): Creates the genesis block.
 • getLatestBlock(): Retrieves the latest block in the chain.
 • addBlock(newBlock): Adds a new block to the chain.
 • isChainValid(): Validates the integrity of the blockchain.

Form Submission and Verification:
 • The form submission event listener checks if the provided details match any certificate data in the blockchain and displays the verification result.

Blockchain Validation:
 •The integrity of the blockchain is checked to ensure it hasn't been tampered with.
 •If any block's data is altered, the blockchain becomes invalid.

Fetching Data:
 • The fetchData function retrieves certificate data from a local server and adds it to the blockchain.

Acknowledgements:
 • Bootstrap
 • CryptoJS
