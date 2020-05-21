<template>
  <form @submit="checkBalance">
    <div class="form-group mt-5">
      <h4>Check the balance from an account</h4>
      <input class="form-control" v-model="otherAccount" type="text" name="title" placeholder="Check balance from account...">
      <input type="submit" value="Check account" class="mt-3 btn btn-primary btn-block">
    </div>

  </form>
</template>

<script>

    export default {
        name: 'BalanceForm',
        data() {
            return {
                otherAccount: ''
            }
        },
        methods: {
            checkBalance(e) {
                e.preventDefault();
                const accountToCheck = {
                    account: this.otherAccount
                };
                this.$emit('load-balance-from-other-account', accountToCheck)
            }
        }
    }
</script>

<style></style>
