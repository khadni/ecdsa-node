import server from "./server";

import * as secp from "ethereum-cryptography/secp256k1";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";

function Wallet({
  address,
  setAddress,
  balance,
  setBalance,
  signature,
  signatureBrute,
  setSignatureBrute,
}) {
  function hashMessage(message) {
    const bytes = utf8ToBytes(message);
    const hash = keccak256(bytes);
    return hash;
  }

  async function onChange(evt) {
    const signatureBrute = evt.target.value;
    setSignatureBrute(signatureBrute);
    signature = new Uint8Array(signatureBrute);
    recoverKey("test", signature, 1);
    const address = recoverKeyFormated;
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  async function recoverKey(message, signature, recoveryBit) {
    console.log("--- RECOVERKEY ---");
    const recoverKey = secp.recoverPublicKey(
      hashMessage("test"),
      signature,
      recoveryBit
    );
    const recoverKeyFormated = "0x" + toHex(keccak256(recoverKey).slice(-20));
    return recoverKeyFormated;
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>
      <label>
        Signature
        <input
          placeholder="Enter signature (computed offline)..."
          value={signature}
          onChange={onChange}
        ></input>
      </label>

      <label>
        <div>Address: 0x{address}</div>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
