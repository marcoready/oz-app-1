<template>
  <div>
    <form @submit="checkBalance">
      <div class="form-group mt-5">
        <h4>Transfer to an account</h4>
        <input class="form-control" v-model="toAccount" type="text" name="toAccount" placeholder="To witch account...">
        <input class="form-control" v-model="amountToTransfer" type="number" name="amountToTransfer" placeholder="Amount to transfer in Wei...">
        <input type="submit" value="Transfer" class="mt-3 btn btn-primary btn-block">
      </div>
    </form>
    <p><small><span v-if="showResultTransferHash">Transfer to account {{ toAccount }} sent. TX: {{transferHash}}</span></small></p>
    <p><small><span v-if="showResult">Transfer to account {{ toAccount }} succeeded</span></small></p>
  </div>
</template>

<script>

    export default {
        name: "TransferForm",
        props: ["contract","fromAccount"],
        data() {
            return {
                toAccount: null,
                amountToTransfer: null,
                showResult: false,
                showResultTransferHash: false,
                transferHash: null,
            }
        },
        methods: {
            async checkBalance(e) {
                e.preventDefault();
                this.showResult = false
                const transfer = {
                    account: this.toAccount,
                    amountToTransfer: this.amountToTransfer
                };
                //clear the from
                this.toAccount = null;
                this.amountToTransfer = null;

                await this.transferToAccount(transfer)
                this.showResult = true
            },
            async transferToAccount(transfer) {
                const _transferEvent = this.contract.methods.transfer(transfer.account, transfer.amountToTransfer).send({
                    from: this.fromAccount,
                    gasPrice: 21 * 1e5
                });
                _transferEvent.on("transactionHash", (_transactionHash) => {
                    console.log(_transactionHash)
                    this.transferHash = _transactionHash
                    this.showResultTransferHash = true
                });
                _transferEvent.on("receipt", (receipt) => {
                    console.log(receipt)
                });
                _transferEvent.on("confirmation", (number, confirmation) => {
                    console.log("Confirmation ", confirmation)
                    console.log("Confirmation Number", number)
                });
            }
        }
    }
</script>

<style scoped>

</style>
