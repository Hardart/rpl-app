<template>
   <label class="switch" for="checkbox">
      <input ref="sliderCheckbox" type="checkbox" id="checkbox" checked />
      <div class="slider round" @click="state"></div>
   </label>
</template>

<script setup lang="ts">
   import { ref, type Ref } from 'vue'

   const sliderCheckbox: Ref<HTMLFormElement | null> = ref(null)
   const state = () => {
      if (!sliderCheckbox.value) return
      console.log(!sliderCheckbox.value.checked)
   }
</script>

<style lang="scss">
   .switch {
      display: inline-block;
      position: relative;
      width: 60px;
      height: 34px;

      input {
         display: none;

         &:checked + .slider {
            background-color: $success;

            &:before {
               transform: translateX(26px);
            }
         }
      }

      .slider {
         position: absolute;
         top: 0;
         left: 0;
         bottom: 0;
         right: 0;
         transition: 0.4s;
         background-color: #ccc;
         cursor: pointer;

         &.round {
            border-radius: 34px;
            &:before {
               border-radius: 50%;
            }
         }

         &:before {
            content: '';
            position: absolute;
            width: 26px;
            height: 26px;
            bottom: 4px;
            left: 4px;
            background-color: #fff;
            transition: 0.4s;
         }
      }
   }
</style>
