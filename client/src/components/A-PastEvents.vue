<template>
  <!-- <AAccordeon :items="games" /> -->
  <AEventsGrid :accordeon="useEventsStore().getEventsForAccordeon" />
</template>
<script setup lang="ts">
  import { useEventsStore } from '@/stores'
  import AEventsGrid from './A-EventsGrid.vue'
</script>

<style lang="scss"></style>
