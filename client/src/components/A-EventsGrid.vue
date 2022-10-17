<template>
  <template v-for="events in accordeon">
    <h1 class="p-10">Раунд {{ events.round }}</h1>
    <div class="grid childs-w-100 childs-w-50@s childs-w-25@l mb-40">
      <template v-for="item in events.events">
        <div>
          <ABetCard :event="item" :show-bet="false" />
        </div>
      </template>
    </div>
  </template>
</template>

<script setup lang="ts">
  import type { AccordeonEvents, Event } from '@/assets/ts/interfaces/event-interface'
  import ABetCard from './A-BetCard.vue'

  defineProps<{
    accordeon?: AccordeonEvents[]
    events?: Event[]
    round?: number
  }>()
</script>

<style></style>
