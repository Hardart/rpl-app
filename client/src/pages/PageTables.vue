<template>
   <div>
      <div class="tabs">
         <ul class="tabs-list">
            <router-link custom v-slot="{ navigate, isExactActive }" :to="{ name: 'rplTable' }">
               <li class="tabs-list__item" :class="{ active: isExactActive }" @click="navigate" role="link">Команды РПЛ</li>
            </router-link>
            <router-link custom v-slot="{ navigate, isExactActive }" :to="{ name: 'playersTable' }">
               <li class="tabs-list__item" :class="{ active: isExactActive }" @click="navigate" role="link">Игроки</li>
            </router-link>
         </ul>
      </div>
      <div>
         <router-view></router-view>
      </div>
   </div>
</template>

<script setup lang="ts">
   import { usePlayerStore } from '@/stores'
</script>

<style lang="scss"></style>
