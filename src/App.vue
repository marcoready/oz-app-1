<template>
  <div id="app">
    <Navbar v-bind:account="account" />
    <div class="container-fluid mt-5">
      <div class="row">
        <main role="main" class="col-lg-12 ml-auto mr-auto " style="max-width:1000px" >
          <div v-if="contract">
            <Balance :account="account" :contract="contract" :symbol="symbol" />
            <AccountHistory :account="account" :contract="contract" />
            <BalanceForm :contract="contract" />
            <TransferForm :contract="contract" :fromAccount="account" />
            <UserCount :contract="contract" />
            <RegisterUser :contract="contract" :account="account" />
          </div>
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
    import UserCount from "./components/UserCount";
    import RegisterUser from "./components/RegisterUser";

    export default {
  name: 'App',
  components: {
      RegisterUser,
      UserCount,
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
            symbol: ''
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
              this.contract = new web3.eth.Contract(Contract.abi, networkData.address)
              await this.loadCurrencySymbol()
          } else {
              window.alert('SocialNetwork contract not deployed to detected network.')
          }
      },
      async loadCurrencySymbol() {
          this.symbol = await this.contract.methods.symbol().call()
      },
  },
    mounted() {
        this.loadWeb3()
        this.loadBlockchainData()
    }
}
</script>

<style></style>
