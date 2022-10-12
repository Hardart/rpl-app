<template>
   <div class="grid">
      <div class="w-100" v-if="isMobileLandscape">
         <AButton @click="isOpenMobileMenu = true" color="primary" :round-border="4" :icon="Icons.menu" />
      </div>
      <transition name="set-up" @enter="onEnter" @leave="onLeave">
         <!-- need to split!!!! -->
         <div :class="[isMobileLandscape ? 'mobile' : 'w-25']" v-if="!isMobileLandscape || isOpenMobileMenu">
            <AdminMenu />
         </div>
      </transition>
      <div class="w-expand">
         <div class="settings-content">
            <KeepAlive>
               <Suspense>
                  <component :is="Content[comp.id]" :name="comp.activeTitle"></component>
               </Suspense>
            </KeepAlive>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
   import AButton from '../UI/A-Button.vue'
   import Content, { AdminMenu } from './AdminSettingsContent'
   import { comp, isOpenMobileMenu } from '@/features/adminSettings'
   import { onMounted, onBeforeUnmount } from 'vue'
   import { onEnter, onLeave } from '@/features/menuTransition'
   import Icons from '@/features/Icons'
   import { isMobileLandscape } from '@/helpers'

   onMounted(() => {
      document.body.classList.add('scroll-disable')
   })
   onBeforeUnmount(() => {
      document.body.classList.remove('scroll-disable')
   })
</script>

<style lang="scss">
   .set-up-enter-active,
   .set-up-leave-active {
      transition: all 0.3s ease-in-out;
      overflow: hidden;
   }
</style>
