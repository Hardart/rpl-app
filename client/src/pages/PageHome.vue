<template>
   <h1>Home Page</h1>
   <h2 v-if="usePlayerStore().isLogin">{{ usePlayerStore().player?.name }}</h2>

   <ul class="tabs">
      <router-link custom v-slot="{ navigate }" :to="{ name: 'finished' }">
         <li class="tabs__item" @click="navigate" role="link">Прошедшие матчи</li>
      </router-link>
      <router-link custom v-slot="{ navigate }" :to="{ name: 'next' }">
         <li class="tabs__item" @click="navigate" role="link">Следующий тур</li>
      </router-link>
   </ul>
   <div>
      <router-view></router-view>
   </div>
</template>

<script setup lang="ts">
   import { usePlayerStore } from '@/stores'
</script>

<style lang="scss">
   .tabs {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      border: solid 1px black;

      &__item {
         margin: 4px;
         padding: 10px;
         border: solid 1px black;
         cursor: pointer;
      }
   }
</style>
