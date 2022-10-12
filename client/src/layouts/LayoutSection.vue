<template>
   <section :class="['section', `section-${sectionColor}`]">
      <div class="container" :class="`container-${containerSize}`">
         <slot />
      </div>
   </section>
</template>

<script setup lang="ts">
   import type { Colors, ContainerSize } from '@/assets/ts/types/elements'

   interface PropsButton {
      sectionColor?: Colors
      containerSize?: ContainerSize
   }
   withDefaults(defineProps<PropsButton>(), {
      sectionColor: 'default',
      containerSize: 'expand',
   })
</script>

<style lang="scss"></style>
