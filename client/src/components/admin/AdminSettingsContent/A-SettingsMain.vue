<template>
   <h1>{{ name }}</h1>
   <ASelect />
</template>

<script setup lang="ts">
   import ASelect from '../../UI/A-Select.vue'
   defineProps<{
      name: string
   }>()
</script>

<style></style>
