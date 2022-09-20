<template>
   <nav>
      <ul class="nav-list">
         <li class="nav-list__item" v-for="menuItem in menu">
            <RouterLink :to="menuItem.link" active-class="active" v-if="!menuItem.auth || playerStore.isLogin" v-html="menuItem.icon"> </RouterLink>
         </li>
         <li class="nav-list__item auth">
            <RouterLink :to="{ name: playerStore.isLogin ? 'user' : 'login' }" v-html="playerStore.isLogin ? Icons.user : Icons['sign-in']"></RouterLink>
         </li>
         <li v-if="playerStore.player?.role == 'super-admin'" class="btn btn-icon btn-secondary" @click="isOpen = !isOpen" v-html="Icons.cog"></li>
      </ul>
   </nav>
   <Teleport to="body">
      <ASettingsContainer />
   </Teleport>
</template>

<script setup lang="ts">
   import ASettingsContainer from './admin/A-SettingsContainer.vue'
   import type { MainMenu } from '@/assets/ts/interfaces/menu-interface'
   import { useMenuStore, usePlayerStore } from '@/stores'
   import { isOpen } from '@/features/adminSettings'
   import Icons from '@/features/Icons'
   const playerStore = usePlayerStore()
   const menu: MainMenu[] = useMenuStore().getMainMenu
</script>

<style lang="scss"></style>
