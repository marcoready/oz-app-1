<template>
  <div>
    <form @submit="checkBalance">
      <div class="form-group mt-5">
        <h4>Check the balance from an account</h4>
        <input class="form-control" v-model="otherAccount" type="text" name="title" placeholder="Check balance from account...">
        <input type="submit" value="Check account" class="mt-3 btn btn-primary btn-block">
      </div>
    </form>
    <small><span v-if="showBalance">The balance for account {{ otherAccount }} is {{otherAccountBalance}}</span></small>
  </div>
</template>

<script>

    import Web3 from "web3";

    export default {
        name: 'BalanceForm',
        props: ["contract"],
        data() {
            return {
                otherAccount: null,
                otherAccountBalance: null,
                showBalance: false,
            }
        },
        methods: {
            async checkBalance(e) {
                e.preventDefault();
                this.showBalance = false
                const accountToCheck = {
                    account: this.otherAccount
                };
                await this.loadBalanceFromOtherAccount(accountToCheck)
                this.showBalance = true
            },
            async loadBalanceFromOtherAccount(accountToCheck) {
                const _balance = await this.contract.methods.balanceOf(accountToCheck.account).call({ from: accountToCheck.account });
                this.otherAccount =  accountToCheck.account;
                this.otherAccountBalance =  Web3.utils.fromWei(_balance);
            }
        }
    }
</script>

<style></style>
