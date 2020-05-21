<template>
  <div id="app">
    <Navbar v-bind:account="account" />
    <p>Your balance is {{balance}}</p>
  </div>
</template>

<script>
import Web3 from 'web3';
import Contract from '../build/contracts/MMToken.json'
import Navbar from './components/Navbar'

export default {
  name: 'App',
  // props: ["account", ],
  components: {
      Navbar
  },
    data() {
        return {
            web3: null,
            account: '',
            contract: null,
            balance: ''
        }
    },
  methods: {
      async loadWeb3() {
          if (window.ethereum) {
              window.web3 = new Web3(window.ethereum)
              await window.ethereum.enable()
          }
          else if (window.web3) {
              window.web3 = new Web3(window.web3.currentProvider)
          }
          else {
              window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
          }
      },
      async loadBlockchainData() {
          const web3 = window.web3
          this.web3 = web3
          // Load account
          const accounts = await web3.eth.getAccounts()
          //set Account in state
           this.account = accounts[0]
          // Network ID
           const networkId = await web3.eth.net.getId()
           const networkData = Contract.networks[networkId]
          if(networkData) {
              const contract = new web3.eth.Contract(Contract.abi, networkData.address)
              // Set Contract in state
              this.contract = contract
               await this.loadEthBalance()
              //  await this.loadBalance()
              // this.contract.methods.getBalanceOf(this.account).call({ from: this.account }).then((error, balance) => {
              //     this.accounts = balance;
              // });

          } else {
              window.alert('SocialNetwork contract not deployed to detected network.')
          }
      },
      async loadEthBalance() {
          const _ethBalance = await this.web3.eth.getBalance(this.account);
          const readableEthBalance = Web3.utils.fromWei(_ethBalance);
          this.balance = readableEthBalance;
      },
      async loadBalance() {
          console.log(this.contract)
          const _ethBalance = await this.contract.methods.getBalanceOf(this.account).call({ from: this.account });
          const readableEthBalance = Web3.utils.fromWei(_ethBalance);
          this.balance = readableEthBalance;
      }
  },
    mounted() {
        this.loadWeb3()
        this.loadBlockchainData()
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
