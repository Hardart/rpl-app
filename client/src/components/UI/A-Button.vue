<template>
   <button class="btn" :class="[{ 'btn-icon': isRound }, color ? `btn-${color}` : '']" v-html="icon + text"></button>
</template>

<script lang="ts">
   export default {
      name: 'AButton',
   }
</script>

<script setup lang="ts">
   export type Colors = 'primary' | 'secondary' | 'warning' | 'success' | 'danger' | 'light' | 'dark'
   export type Icon = 'true'
   export interface Props {
      clickFn?: undefined
      color?: Colors
      icon?: string
      isRound?: Icon
      text?: string
   }

   const props = withDefaults(defineProps<Props>(), {
      clickFn: undefined,
      color: 'primary',
      text: '',
      icon: '',
   })
</script>

<style></style>
