<template>
   <div class="alert">
      <span @click="$emit('change', alert.id)" class="alert__close-btn" v-html="Icons['close']"></span>
      <p class="alert__body">
         <span class="alert__body--type">{{ alert.type }}:</span> {{ alert.text }}
      </p>
   </div>
</template>

<script lang="ts">
   export default {
      name: 'A-Alert',
   }
</script>

<script setup lang="ts">
   import type { Alert } from '@/assets/ts/interfaces/alert-interface'
   import Icons from '@/features/Icons'
   defineProps<{
      alert: Alert
   }>()
   defineEmits<{
      (e: 'change', id: number): void
   }>()
</script>

<style lang="scss">
   .alerts {
      position: fixed;
      width: 95%;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9999;
   }
   .alert {
      position: relative;
      width: 100%;
      padding: 20px;
      margin-top: 10px;
      margin-left: auto;
      color: #fff;
      background-color: #ba3f23;
      transition: all 0.4s ease-out;

      &.show {
         top: 0;
      }

      &__close-btn {
         position: absolute;
         top: 7px;
         right: 10px;
         cursor: pointer;

         & > svg {
            width: 20px;
         }
      }

      &__body {
         font-size: 1.2rem;
         letter-spacing: 1px;

         &--type {
            font-size: 1.3rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0px;
         }
      }
   }
</style>
