<template>
  <div class="card mt-5 ml-1" style="max-width: 40rem;">
    <div class="card-header">
      {{account}}
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item"><small class="text-secondary">Your balance is {{balance}} </small></li>
    </ul>
  </div>
</template>

<script>

    export default {
        name: 'Balance',
        props: ["account","balance"],
    }
</script>

<style></style>
