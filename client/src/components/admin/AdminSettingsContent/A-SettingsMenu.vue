<template>
   <ul class="settings-nav">
      <li class="settings-nav__title">Настройки</li>
      <a-close-button @click="isOpenMobileMenu = false" color="danger" />
      <li v-for="item in menuItems" :class="['settings-nav__item', { active: comp.activeSlug === item.slug }]" @click="setActiveComp(item)">
         <a>{{ item.title }}</a>
      </li>
   </ul>
</template>

<script setup lang="ts">
   import { comp, menuItems, setActiveComp, isOpenMobileMenu } from '@/features/adminSettings'
</script>

<style></style>
