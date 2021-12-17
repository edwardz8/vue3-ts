<template>
  <section class="section">
    <div class="container">
      <navbar />
      <router-view />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Navbar from '@/components/Navbar.vue'

export default defineComponent({
  components: { Navbar }
})


</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

  ul {
    list-style: revert;
    list-style-position: inside;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    font-size: revert;
    margin: 10px 0 !important;
  }

  pre {
    margin: 10px 0 !important;
  }

  p {
    margin: 10px 0;
  }
</style>
