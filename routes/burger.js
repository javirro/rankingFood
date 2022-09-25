const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");

const contractArtifact = require('../contracts/ranking.json')
const FTM_RPC = "https://rpc.testnet.fantom.network/";
const provider = new HDWalletProvider(process.env.MNEMONIC, FTM_RPC);
const contractAddress = "0xcA38aCE78e08537763A62B0d3247B9a5cEC651C2";
const userAddress = "0x57Fea11dA9e4d52262cf25d6D487BE2724b2FF09";
const web3 = new Web3(provider);
const contract = new web3.eth.Contract(contractArtifact.output.abi, contractAddress)

router.get("/", async(req, res) => {
    const burgerNumber = await contract.methods.burgerNumber().call()
    const ranking = []
    for (let i = 1; i <= burgerNumber; i++) {
        ranking.push(await contract.methods.burgerRanking([i]).call())
    }
    console.log(ranking)
    res.status(200).json(ranking)
});

router.post("/", jsonParser, async(req, res) => {
    const where = req.body.where;
    const position = req.body.position;
    const tx = await contract.methods.addBurger(where, parseInt(position)).send({ from: userAddress })
    res.status(200).json(tx)
});

router.get('/number', async(req, res) => {
    const burgerNumber = await contract.methods.burgerNumber().call()
    res.status(200).json(burgerNumber)

})

module.exports = router;