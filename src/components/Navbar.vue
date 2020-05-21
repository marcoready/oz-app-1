<template>
  <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
    <a
      class="navbar-brand col-sm-3 col-md-2 mr-0"
      href=""
      target="_blank"
      rel="noopener noreferrer"
    >
      Ledger Academy
    </a>
    <ul class="navbar-nav px-3">
      <li class="nav-item text-nowrap d-none d-sm-none d-sm-block" >
        <small class="text-secondary">
          <small id="account">{{account}}</small>
        </small>
        <img v-if="account" class="ml-2"
             width='30'
             height='30'
             :src="`data:image/png;base64,${ this.getAvatar() }`"
        />
      </li>
    </ul>
  </nav>
</template>

<script>
     import Identicon from 'identicon.js';
    export default {
        name: 'Navbar',
        props: ["account"],
        methods: {
            getAvatar() {
                return new Identicon(this.account, 30).toString();
            }
        }
    }
</script>

<style></style>
