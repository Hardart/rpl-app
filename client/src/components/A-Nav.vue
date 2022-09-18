<template>
   <nav>
      <ul class="nav-list">
         <li class="nav-list__item" v-for="menuItem in menu">
            <RouterLink :to="menuItem.link" active-class="active" v-if="!menuItem.auth || usePlayerStore().isLogin" v-html="menuItem.icon"> </RouterLink>
         </li>
         <li v-if="usePlayerStore().isLogin" class="nav-list__item auth">
            <RouterLink :to="{ name: 'user' }" v-html="Icons.user"></RouterLink>
         </li>
         <li v-else class="nav-list__item auth">
            <RouterLink to="login" v-html="Icons['sign-in']"></RouterLink>
         </li>
         <li v-if="usePlayerStore().player?.role == 'super-admin'" class="btn btn-icon btn-secondary" @click="isOpen = !isOpen" v-html="Icons.cog"></li>
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

   const menu: MainMenu[] = useMenuStore().getMainMenu
</script>

<style lang="scss"></style>
