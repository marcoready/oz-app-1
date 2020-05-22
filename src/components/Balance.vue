<template>
  <div class="card mt-5">
    <div class="card-header">
      {{account}}
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item"><small class="text-secondary">Your balance is {{balance}} </small></li>
    </ul>
  </div>
</template>

<script>

    import Web3 from "web3";

    export default {
        name: 'Balance',
        props: ["account","contract","symbol"],
        data() {
            return {
               balance: ''
          }
        },
        methods: {
            async loadBalance() {
                const _balance = await this.contract.methods.balanceOf(this.account).call({ from: this.account });
                this.balance = Web3.utils.fromWei(_balance) + ' '  + this.symbol;
            }
        },
        mounted() {
            this.loadBalance()
        }
    }
</script>

<style></style>
