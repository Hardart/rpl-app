<template>
   <i :class="{ open: open }" v-html="Icons['arrow-right']"></i>
   <div class="title">Рануд {{ round }}</div>
   <transition>
      <div class="body" v-if="open">
         <a-events-grid :events="events" :round="round" />
      </div>
   </transition>
</template>

<script setup lang="ts">
   import type { Event } from '@/assets/ts/interfaces/event-interface'
   import Icons from '@/features/Icons'
   import AEventsGrid from '../A-EventsGrid.vue'
   defineProps<{
      events: Event[]
      open: any
      round: number
   }>()
</script>

<style lang="scss"></style>
