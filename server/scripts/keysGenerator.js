const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKey = secp.utils.randomPrivateKey();

// public key derived from private key
const fullPublicKey = secp.getPublicKey(privateKey);

// public key "ethereum" way
const publicKey = keccak256(fullPublicKey).slice(-20);

console.log("privateKey: " + toHex(privateKey));
console.log("publicKey: " + toHex(publicKey));
