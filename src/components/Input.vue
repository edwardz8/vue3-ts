<template>
  <div>
    <input type="text" name="Test Value" v-model="text" />

    <label>{{label}}</label>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  setup() {
    const text = ref("test");

    const label = computed(() => {
      return text.value;
    });

    return {
      text,
      label
    };
  }
});
</script>