<template>
  <div id="app">
    <Navbar v-bind:account="account" />
    <div class="container-fluid mt-5">
      <div class="row">
        <main role="main" class="col-lg-12 ml-auto mr-auto " style="max-width:1000px" >
          <Balance :accountInfo="{ account: account, balance: balance }" />
          <AccountHistory v-bind:receivedTransfers="receivedTransfers" v-bind:sentTransfers="sentTransfers" />
          <BalanceForm :contract="contract" />
          <TransferForm :contract="contract" :fromAccount="account" />
        </main>
      </div>
    </div>
  </div>
</template>

<script>
    import Web3 from 'web3';
    import Contract from '../build/contracts/MMToken.json'
    import Navbar from './components/Navbar'
    import Balance from "./components/Balance";
    import BalanceForm from "./components/BalanceForm";
    import AccountHistory from "./components/AccountHistory";
    import TransferForm from "./components/TransferForm";

    export default {
  name: 'App',
  components: {
      TransferForm,
      AccountHistory,
      Balance,
      BalanceForm,
      Navbar
  },
    data() {
        return {
            web3: null,
            account: '',
            contract: null,
            balance: '',
            symbol: '',
            otherAccount: '',
            otherAccountBalance: null,
            receivedTransfers: [],
            sentTransfers: []
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
              await this.loadCurrencySymbol()
               await this.loadBalance()
              await this.loadAccountHistory()
          } else {
              window.alert('SocialNetwork contract not deployed to detected network.')
          }
      },
      async loadBalance() {
          console.log(this.contract)
          const _balance = await this.contract.methods.balanceOf(this.account).call({ from: this.account });
          this.balance = Web3.utils.fromWei(_balance) + ' '  + this.symbol;
      },

      async loadCurrencySymbol() {
          this.symbol = await this.contract.methods.symbol().call()
      },
      async loadAccountHistory() {
          const receivedTransferEvents = await this.contract.getPastEvents('Transfer', {
              filter: { to: this.account },
              fromBlock: 0,
              toBlock: 'latest'
          })
          console.log(receivedTransferEvents)
          this.receivedTransfers = receivedTransferEvents
          const sentTransfersEvents = await this.contract.getPastEvents('Transfer', {
              filter: { from: this.account },
              fromBlock: 0,
              toBlock: 'latest'
          })
          console.log(sentTransfersEvents)
          this.sentTransfers = sentTransfersEvents
      }
  },
    mounted() {
        this.loadWeb3()
        this.loadBlockchainData()
    }
}
</script>

<style></style>
