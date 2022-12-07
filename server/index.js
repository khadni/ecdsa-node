const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  bd5948f0abe2fb7c6b851d5301e283f5f5a5bee3: 1000, // privateKey: d12e80e3480623cebc6ca42644a3423affff01085ba95ea8c33cfd3b7d2922fb
  "91d1307cfe8ca1b1858defa964d27cdf9c560e0e": 500, // privateKey: 39f71dd442af5f5f52b847d5094303ebb3f4074826a791f09e9e134afd8e2b9d
  "462173088179063637f0c57672ff4d8347a6db9d": 200, // privateKey: 2ff004289a332da9faf4a550e85737bdc2617d55e06cfbf9205a4b0e4f30f8a4
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  // get signature from the client-side app
  // recover the public address from the signature > this is our sender

  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
