<template>
   <button 
      class="btn" 
      :class="[{ 'btn-icon': round == 'y' }, 
      color ? `btn-${color}` : '']" 
      v-html="icon + text" 
      :style="roundBorder ? `border-radius: ${roundBorder}px` : ''"
   />
</template>

<script lang="ts">
   export default {
      name: 'AButton',
   }
</script>

<script setup lang="ts">
   type Colors = 'primary' | 'secondary' | 'warning' | 'success' | 'danger' | 'light' | 'dark' | 'transparent'
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
      color: 'primary',
      text: '',
      icon: '',
      roundBorder: 0,
   })
</script>

<style></style>
