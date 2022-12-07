const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const { toHex } = require("ethereum-cryptography/utils");

const PRIVATE_KEY =
  "19ce8a86fdfc3a5d688924014284964625bbb6dfbbe16ed30e909a3736d8818b"; // public: 23d638c6404629a002b02e9eb53cd89e95e936d0

const publicKey = secp.getPublicKey(PRIVATE_KEY);
console.log("--- PUBLIC KEY ---");
console.log("0x" + toHex(keccak256(publicKey).slice(-20)));

function hashMessage(message) {
  const bytes = utf8ToBytes(message);
  const hash = keccak256(bytes);
  return hash;
}

async function signMessage(msg) {
  const msgHash = hashMessage(msg);
  console.log("--- MSG HASH ---");
  console.log(msgHash);
  const signature = await secp.sign(msgHash, PRIVATE_KEY, { recovered: true });
  // return signature;
  console.log("--- SIGNATURE ---");
  console.log(signature);
}

async function recoverKey(message, signature, recoveryBit) {
  console.log("--- RECOVERKEY ---");
  const recoverKey = secp.recoverPublicKey(
    hashMessage(message),
    signature,
    recoveryBit
  );
  console.log("0x" + toHex(keccak256(recoverKey).slice(-20)));
  return recoverKey;
}

const uint8test = new Uint8Array([
  48, 69, 2, 33, 0, 233, 0, 82, 41, 236, 197, 254, 233, 252, 158, 226, 15, 87,
  131, 218, 237, 227, 138, 238, 135, 65, 105, 28, 47, 119, 74, 166, 61, 174,
  107, 168, 228, 2, 32, 69, 1, 218, 96, 71, 50, 236, 104, 207, 1, 112, 70, 88,
  0, 187, 224, 158, 81, 52, 31, 221, 15, 182, 53, 87, 56, 179, 204, 81, 157,
  254, 215,
]);

signMessage("test").then(recoverKey("test", uint8test, 1));
