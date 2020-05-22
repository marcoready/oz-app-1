<template>
  <div>
    <form @submit="submitUser">
      <h4>Register in MMCoin</h4>
      <div class="form-group mt-5">
        <input type="text" name="account" class="form-control" readonly v-bind:placeholder="this.account" >
        <input type="submit" value="Register" class="mt-3 btn btn-primary btn-block">
      </div>
    </form>
  </div>
</template>

<script>
    export default {
        name: "RegisterUser",
        props: ["contract", "account"],
        methods: {
            async submitUser(e) {
                e.preventDefault();
                const _user = await this.contract.methods.registerUser().send({ from: this.account})
                console.log(_user)
            }
        }
    }
</script>

<style scoped>

</style>
