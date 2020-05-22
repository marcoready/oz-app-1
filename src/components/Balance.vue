<template>
  <div class="card mt-5">
    <div class="card-header">
      {{accountInfo.account}}
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item"><small class="text-secondary">Your balance is {{accountInfo.balance}} </small></li>
    </ul>
  </div>
</template>

<script>

    export default {
        name: 'Balance',
        props: ["accountInfo"],
    }
</script>

<style></style>
