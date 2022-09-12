<template>
   <div class="grid">
      <div class="w-25">
         <ul class="settings-nav">
            <li class="settings-nav__title">Настройки</li>
            <li v-for="item in menuItems" :class="['settings-nav__item', { active: comp.activeSlug === item.slug }]" @click="setActiveComp(item)">
               <a>{{ item.title }}</a>
            </li>
         </ul>
      </div>
      <div class="w-expand">
         <div class="settings-content">
            <KeepAlive>
               <component :is="Content.comp[comp.id]" :name="comp.activeTitle"></component>
            </KeepAlive>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
   import * as Content from './AdminSettingsContent'
   import { comp, menuItems, setActiveComp } from '@/features/adminSettings'
</script>
