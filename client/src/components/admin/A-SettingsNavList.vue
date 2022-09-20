<template>
   <div class="grid">
      <div class="w-100" v-if="globalWidth < 960">
         <AButton @click="isOpenMobileMenu = true" color="primary" :round-border="4" :icon="Icons.menu" />
      </div>
      <transition name="set-up" @enter="onEnter" @leave="onLeave">
         <!-- need to split!!!! -->
         <div :class="[globalWidth < 960 ? 'mobile' : 'w-25']" v-if="globalWidth > 960 || isOpenMobileMenu">
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
   import Content, { AdminMenu } from './AdminSettingsContent'
   import { comp, isOpenMobileMenu } from '@/features/adminSettings'
   import { ref, onMounted, onBeforeUnmount } from 'vue'
   import { onEnter, onLeave } from '@/features/menuTransition'
   import Icons from '@/features/Icons'
   import AButton from '../UI/A-Button.vue'

   const globalWidth = ref(window.innerWidth)
   const getScreenWidth = () => {
      globalWidth.value = window.innerWidth
   }
   onMounted(() => {
      window.addEventListener('resize', getScreenWidth)
      document.body.classList.add('scroll-disable')
   })
   onBeforeUnmount(() => {
      window.removeEventListener('resize', getScreenWidth)
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
