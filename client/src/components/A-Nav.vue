<template>
   <nav class="nav">
      <ul class="nav-list">
         <template v-for="menuItem in menu">
            <router-link custom v-slot="{ navigate, isExactActive }" :to="menuItem.link" v-if="!menuItem.auth || playerStore.isLogin">
               <li class="nav-list__item btn btn-icon btn-success" :class="{ active: isExactActive }" @click="navigate" role="link" v-html="menuItem.icon"></li>
            </router-link>
         </template>
         <router-link custom v-slot="{ navigate, isExactActive }" :to="{ name: playerStore.isLogin ? 'user' : 'login' }">
            <li
               class="nav-list__item btn btn-icon btn-secondary user-profile"
               :class="{ active: isExactActive }"
               @click="navigate"
               role="link"
               v-html="playerStore.isLogin ? Icons.user : Icons['sign-in']"
            ></li>
         </router-link>
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
   import { onMounted } from 'vue'
   import Icons from '@/features/Icons'
   import { changeSVG } from '@/helpers'
   const playerStore = usePlayerStore()
   const menu: MainMenu[] = useMenuStore().getMainMenu

   onMounted(() => changeSVG())
</script>

<style lang="scss"></style>
