const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const Web3 = require('web3')
const HDWalletProvider = require('@truffle/hdwallet-provider')

const contractArtifact = require('../contracts/ranking.json')
const FTM_RPC = "https://rpc.testnet.fantom.network/"
const provider = new HDWalletProvider(process.env.MNEMONIC, FTM_RPC)
const contractAddress = "0xfeed04EFFE80a246aD279372d9094643f2F43B6c"
const userAddress = "0x57Fea11dA9e4d52262cf25d6D487BE2724b2FF09"
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