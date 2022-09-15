<template>
   <AAccordeon :items="events" />
</template>
<script setup lang="ts">
   import AEventsGrid from '@/components/A-EventsGrid.vue'
   import { useEventsStore } from '@/stores'
   import { computed } from 'vue'
   import AAccordeon from './UI/A-Accordeon.vue'

   const events = computed(() => useEventsStore().finished)
   defineEmits<{
      (e: 'more'): void
   }>()
</script>

<style lang="scss">
   .observer {
      display: block;
      width: 100%;
      height: 10px;
      margin-left: 15px;
   }

   hr {
      margin-bottom: 15px;
   }
</style>
