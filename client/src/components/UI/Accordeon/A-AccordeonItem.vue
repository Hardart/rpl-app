<template>
   <i :class="{ open: item.open.value }" v-html="Icons['arrow-right']"></i>
   <div class="title">Рануд {{ item.round }}</div>
   <transition name="open-up" @enter="onEnter" @leave="onLeave" @after-enter="onAfterEnter">
      <div v-if="item.open.value">
         <a-events-grid :events="item.events" :round="item.round" />
      </div>
   </transition>
</template>

<script setup lang="ts">
   import AEventsGrid from '@/components/A-EventsGrid.vue'
   import Icons from '@/features/Icons'
   import type { AccordeonEvents } from '@/assets/ts/interfaces/event-interface'
   import { onEnter, onLeave, onAfterEnter } from '@/features/accordeonTransision'
   defineProps<{
      item: AccordeonEvents
   }>()
</script>

<style lang="scss">
   .open-up-enter-active,
   .open-up-leave-active {
      transition: all 0.4s ease-in-out;
      overflow: hidden;
   }
</style>
