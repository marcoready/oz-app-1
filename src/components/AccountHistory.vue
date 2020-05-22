<template>
  <div class="mt-5">
    <div class="row">
      <div class="col">
        <h4>History</h4>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-header">
            Transfers received from account
          </div>
          <ul class="list-group list-group-flush" v-bind:key="transfer.id" v-for="transfer in receivedTransfers">
            <li class="list-group-item"><small class="text-black-50 mr-1">From:</small> <small class="text-secondary">{{ transfer.returnValues.from }} </small></li>
            <li class="list-group-item"><small class="text-black-50  mr-1">Value:</small> <small class="text-secondary">{{ transfer.returnValues.value }} </small></li>
          </ul>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <div class="card-header">
            Transfers sent from account
          </div>
          <ul class="list-group list-group-flush" v-bind:key="sentTransfer.id" v-for="sentTransfer in sentTransfers">
            <li class="list-group-item"><small class="text-black-50 mr-1">To:</small> <small class="text-secondary">{{ sentTransfer.returnValues.to }} </small></li>
            <li class="list-group-item"><small class="text-black-50  mr-1">Value:</small> <small class="text-secondary">{{ sentTransfer.returnValues.value }} </small></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import Web3 from 'web3';
    export default {
        name: 'AccountHistory',
        props: ["account","contract"],
        data(){
            return {
                receivedTransfers: null,
                sentTransfers: null
            }
        },
        methods: {
          async loadAccountHistory() {
              const receivedTransferEvents = await this.contract.getPastEvents('Transfer', {
                  filter: { to: this.account },
                  fromBlock: 0,
                  toBlock: 'latest'
              })
              this.receivedTransfers = receivedTransferEvents
              const sentTransfersEvents = await this.contract.getPastEvents('Transfer', {
                  filter: { from: this.account },
                  fromBlock: 0,
                  toBlock: 'latest'
              })
              this.sentTransfers = sentTransfersEvents
          },
          getValue(value) {
              return Web3.utils.fromWei(value)
          }
        },
        mounted() {
            this.loadAccountHistory()
        }
    }
</script>

<style></style>
