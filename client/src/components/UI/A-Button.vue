<template>
   <button class="btn" :class="[{ 'btn-icon': icon !== '' }, `btn-${color}`]" v-html="icon + text" />
</template>

<script lang="ts">
   export default {
      name: 'AButton',
   }
</script>

<script setup lang="ts">
   import type { Colors } from '@/assets/ts/types/elements'
   type BorderRound = 0 | 3 | 4 | 5 | 6 | 8 | 10 | 12
   type isRound = 'y' | 'n'

   interface PropsButton {
      color?: Colors
      icon?: string
      round?: isRound
      text?: string
      roundBorder?: BorderRound
   }
   withDefaults(defineProps<PropsButton>(), {
      color: 'default',
      text: '',
      icon: '',
      roundBorder: 0,
   })
</script>

<style></style>
