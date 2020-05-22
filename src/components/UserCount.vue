<template>
  <span class="badge badge-pill badge-primary">Registered users {{userCount}}</span>
</template>

<script>
    export default {
        name: "UserCount",
        props: ["contract"]
        ,
        data() {
            return {
                userCount: 0
            }
        },
        methods: {
            async getUserCount() {
                this.userCount = (await this.contract.methods.userCount().call())
            }
        },
        mounted() {
            this.getUserCount()
        }
    }
</script>

<style scoped>

</style>
