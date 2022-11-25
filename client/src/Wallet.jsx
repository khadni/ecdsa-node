import server from "./server";

import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";

function Wallet({
  address,
  setAddress,
  balance,
  setBalance,
  privateKey,
  setPrivateKey,
}) {
  // async function onChange(evt) {
  //   const address = evt.target.value;
  //   setAddress(address);
  //   if (address) {
  //     const {
  //       data: { balance },
  //     } = await server.get(`balance/${address}`);
  //     setBalance(balance);
  //   } else {
  //     setBalance(0);
  //   }
  // }

  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    const address = toHex(keccak256(secp.getPublicKey(privateKey)).slice(-20));
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

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      {/* <label>
        Wallet Address
        <input
          placeholder="Type an address, for example: 0x1"
          value={address}
          onChange={onChange}
        ></input>
      </label> */}

      <label>
        Private Key
        <input
          placeholder="Type a private key..."
          value={privateKey}
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
