<template>
   <div class="tabs">
      <ul class="tabs-list">
         <router-link custom v-slot="{ navigate, isExactActive }" :to="{ name: 'finished' }">
            <li class="tabs-list__item" :class="{ active: isExactActive }" @click="navigate" role="link">Прошедшие матчи</li>
         </router-link>
         <router-link v-if="usePlayerStore().isLogin" custom v-slot="{ navigate, isExactActive }" :to="{ name: 'next' }">
            <li class="tabs-list__item" :class="{ active: isExactActive }" @click="navigate" role="link">Следующий тур</li>
         </router-link>
      </ul>
   </div>
   <div>
      <router-view></router-view>
   </div>
</template>

<script setup lang="ts">
   import { usePlayerStore } from '@/stores'
   import { useLink } from 'vue-router'
   const active = useLink({
      to: { name: 'finished' },
   }).isExactActive
   console.log(active.value)
</script>

<style lang="scss">
   .tabs {
      display: flex;
      justify-content: center;
      &-list {
         display: inline-flex;
         justify-content: center;
         align-items: center;
         gap: 15px;
         padding: 14px;

         margin-bottom: 20px;
         border-radius: 12px;
         background-color: $light;
         box-shadow: inset 0px 1px 5px rgba(0, 0, 0, 0.2);

         &__item {
            padding: 10px;
            background-color: $muted;
            border-radius: 8px;
            box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.25);
            transition: all 200ms ease-in-out;
            cursor: pointer;

            &.active {
               background-color: $primary;
            }

            &:hover {
               box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
            }

            &:active {
               box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
            }
         }
      }
   }
</style>
