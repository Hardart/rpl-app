<template>
   <div class="tabs" v-if="usePlayerStore().isLogin">
      <ul class="tabs-list">
         <router-link custom v-slot="{ navigate, isExactActive }" :to="{ name: 'finished' }">
            <li class="tabs-list__item" :class="{ active: isExactActive }" @click="navigate" role="link">Прошедшие матчи</li>
         </router-link>
         <router-link custom v-slot="{ navigate, isExactActive }" :to="{ name: 'next' }">
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
</script>

<style lang="scss"></style>
