<template>
   <AAccordeon :items="useEventsStore().getEventsForAccordeon" />
</template>
<script setup lang="ts">
   import { useEventsStore } from '@/stores'
</script>

<style lang="scss"></style>
