<template>
   <ul class="accordeon">
      <template v-for="round in 9">
         <li class="accordeon-container">
            <AAccordeonItem :events="items" :open="false" :round="round" />
         </li>
      </template>
   </ul>
</template>

<script setup lang="ts">
   import AAccordeonItem from './A-AccordeonItem.vue'
   import type { Event } from '@/assets/ts/interfaces/event-interface'

   defineProps<{
      items: Event[]
   }>()
</script>

<style lang="scss">
   .accordeon {
      display: flex;
      flex-direction: column-reverse;
      background-color: $success;
      padding: 5px;

      &-container {
         position: relative;
         background-color: $primary;
         padding: 10px;

         cursor: pointer;

         &:not(:first-child) {
            margin-bottom: 5px;
         }

         i {
            position: absolute;
            display: flex;
            top: 16px;
            right: 10px;

            transition: all 300ms ease;

            &.open {
               transform: rotateZ(90deg);
            }
         }

         .title {
            font-size: 1.4rem;
            text-transform: uppercase;
         }

         .body {
            padding: 10px;
         }
      }
   }
</style>
