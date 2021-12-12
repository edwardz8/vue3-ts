<template>
  <div class="section">
    <div class="container">
      <suspense>
        <template #default>
        <Timeline />
        </template>
        <template #fallback>
          <Progress />
        </template>
      </suspense>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Timeline from '@/components/Timeline.vue';
import Progress from '@/components/Progress.vue';

@Options({
  components: {
    Timeline,
    Progress
  },
})
export default class Home extends Vue { }
</script>
