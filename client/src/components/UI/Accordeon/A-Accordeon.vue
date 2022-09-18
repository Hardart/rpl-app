<template>
   <ul class="accordeon">
      <template v-for="item in items">
         <li class="accordeon__item" @click="item.open.value = !item.open.value">
            <AAccordeonItem :item="item" />
         </li>
      </template>
   </ul>
</template>

<script lang="ts">
   export default {
      name: 'AAccordeon',
   }
</script>
<script setup lang="ts">
   import AAccordeonItem from './A-AccordeonItem.vue'
   import type { AccordeonEvents } from '@/assets/ts/interfaces/event-interface'

   defineProps<{
      items: AccordeonEvents[]
   }>()
   const animation = {
      duration: '400ms',
   }
</script>

<style lang="scss">
   .accordeon {
      background-color: $success;
      padding: 5px;

      &__item {
         position: relative;
         background-color: $primary;
         padding: 10px;

         &:not(:last-child) {
            margin-bottom: 5px;
         }

         i {
            position: absolute;
            display: flex;
            top: 16px;
            right: 10px;

            transition: all v-bind('animation.duration') ease;

            &.open {
               transform: rotateZ(90deg);
            }
         }

         .title {
            font-size: 1.4rem;
            text-transform: uppercase;
            cursor: pointer;
         }
      }
   }
</style>
