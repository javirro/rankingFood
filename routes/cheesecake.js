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
    const cheesecakeNumber = await contract.methods.cheesecakeNumber().call()
    const ranking = []
    for (let i = 1; i <= cheesecakeNumber; i++) {
        ranking.push(await contract.methods.cheesecakeRanking([i]).call())
    }
    console.log(ranking)
    res.status(200).json(ranking)

})

router.post('/', jsonParser, async(req, res) => {
    const where = req.body.where
    const position = req.body.position
    const tx = await contract.methods.addCheesecake(where, parseInt(position)).send({ from: userAddress })
    res.status(200).json(tx)

})

router.get('/number', async(req, res) => {
    const cheesecakeNumber = await contract.methods.cheesecakeNumber().call()
    res.status(200).json(cheesecakeNumber)
})
module.exports = router