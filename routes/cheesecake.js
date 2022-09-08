const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const Web3 = require('web3')
const HDWalletProvider = require('@truffle/hdwallet-provider')

const contractArtifact = require('../contracts/ranking.json')
const FTM_RPC = "https://rpc.testnet.fantom.network/"
const provider = new HDWalletProvider(process.env.MNEMONIC, FTM_RPC)
const contractAddress = "0x6c8a4CE1De7661A4185B1aB5DbC26f672dE52F97"
const userAddress = "0x0530EdE068F94ee2737fF8538a0D599c4a16f459"
const web3 = new Web3(provider)
const contract = new web3.eth.Contract(contractArtifact.output.abi, contractAddress)

router.get('/', async(req, res) => {
    res.status(200).json("OK")

})

router.post('/', jsonParser, async(req, res) => {
    const where = req.body.where
    const position = req.body.position
    const tx = await contract.methods.addCheesecake(where, parseInt(position)).send({ from: userAddress })
    res.status(200).json(tx)

})
module.exports = router