<template>
  <div class="fetch">
    <prospects-fetch />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import ProspectsFetch from '@/components/ProspectsFetch.vue'

@Options({
  components: {
    ProspectsFetch
  },
})
export default class Home extends Vue { }
</script>
