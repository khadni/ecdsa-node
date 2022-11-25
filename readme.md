## ECDSA Node (Alchemy Univesity ethereum bootcamp week 1)

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

---

- The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/).
- The server folder contains a node.js server using [express](https://expressjs.com/).

---

### Tools
- [ethereum-cryptography](/ethereum/js-ethereum-cryptography): All pure-js cryptographic primitives

---

### In this version:
- Public keys are derived from private keys. `keysGenerator.js` under the scripts folder allows to generate private keys, using [ethereum-cryptography](/ethereum/js-ethereum-cryptography) `secp256k1`.
	
~~~~
const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKey = secp.utils.randomPrivateKey();

// public key derived from private key
const fullPublicKey = secp.getPublicKey(privateKey);

// public key "ethereum" way
const publicKey = keccak256(fullPublicKey).slice(-20);
	
~~~~
- Users have to input their private key. This is **NOT** secured. **NEVER** input your private key on a client. This is only for educational purposes. Ideally:
  * The signature should be computed offline,
  * The signature is passed through the client,
  * The server gets the signature and derives the address.
This method will be implemented in a second version, using secp256k1 `secp.recoverPublicKey()` function.
