<template>
   <button class="btn btn-close" :class="`btn-${color}`" v-html="Icons.close"></button>
</template>

<script lang="ts">
   export default {
      name: 'ACloseButton',
   }
</script>

<script setup lang="ts">
   import Icons from '@/features/Icons'
   defineProps<{
      color: string
   }>()
</script>

<style></style>
