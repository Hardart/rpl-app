<template>
   <div class="select">
      <div class="select__input">
         <input v-model="val" type="text" />
         <button @click="changeState" class="btn btn-warning" v-html="Icons['arrow-down']"></button>
      </div>
      <ul class="select__list" :class="{ active: isOpen }">
         <li @click="setName" class="select__list-item">Денис</li>
         <li class="select__list-item">Арчи</li>
      </ul>
   </div>
</template>

<script setup lang="ts">
   import Icons from '@/features/Icons'
   import { ref } from 'vue'
   const isOpen = ref(false)
   const changeState = () => (isOpen.value = !isOpen.value)
   const setName = () => {
      isOpen.value = !isOpen.value
      val.value = 'Денис'
   }
   const val = ref('Выбери игрока')
</script>

<style lang="scss">
   .select {
      width: 50%;
      &__input {
         position: relative;
         border-radius: 10px;
         overflow: hidden;

         input {
            width: 100%;
            padding: 12px;
            padding-right: 20px;
            outline: none;
            border: none;
            background-color: $muted;
            font-size: 1rem;
         }

         button {
            position: absolute;
            display: flex;
            align-items: center;
            top: 0;
            bottom: 0;
            right: 0;
            padding: 0 10px;
            cursor: pointer;
         }
      }

      &__list {
         width: 100%;
         margin-top: 5px;
         background-color: $danger;
         border-radius: 10px;
         overflow: hidden;
         opacity: 0;
         transition: all 0.2s ease-in-out;

         &-item {
            padding: 5px 12px;
            font-size: 1.2rem;

            &:hover {
               background-color: mix(#ffffff, $danger, 10);
            }
         }

         &#{&}.active {
            opacity: 1;
         }
      }
   }
</style>
