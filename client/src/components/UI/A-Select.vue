<template>
   <div class="select">
      <div class="select__input">
         <input @keyup.esc="escPress" @focus="changeState(true)" @input="filterList($event.target as EventTarget)" :value="modelValue" type="text" />
         <button @click="changeState()" class="btn btn-warning" v-html="Icons['arrow-down']"></button>
      </div>
      <ul class="select__list" :class="{ active: isOpen }">
         <li class="select__list-item" @click="selectPlayer(player.full_name)" v-for="player in options">{{ player.full_name }}</li>
      </ul>
   </div>
</template>

<script lang="ts">
   export default {
      name: 'A-Select',
   }
</script>

<script setup lang="ts">
   import type { Player } from '@/assets/ts/interfaces/player-interface'
   import Icons from '@/features/Icons'
   import { ref } from 'vue'

   const isOpen = ref(false)
   const changeState = (state: boolean = false) => {
      if (!state) return (isOpen.value = !isOpen.value)
      isOpen.value = state
   }

   const props = defineProps<{
      options: Player[]
      modelValue: string
   }>()

   const emits = defineEmits<{
      (e: 'selected', player: string | undefined): void
      (e: 'inputValue', value: string): void
   }>()

   const selectPlayer = (playerName: string | undefined) => {
      emits('selected', playerName)
      isOpen.value = !isOpen.value
   }

   const filterList = (e: EventTarget) => {
      const inputValue = (e as HTMLInputElement).value
      emits('inputValue', inputValue)
   }

   const escPress = () => {
      isOpen.value = false
   }
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
            padding: 12px 12px 10px;
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
         display: none;
         transition: all 0.2s ease-in-out;

         &-item {
            padding: 5px 12px;
            font-size: 1.2rem;

            &:hover {
               background-color: mix(#ffffff, $danger, 10);
            }
         }

         &#{&}.active {
            display: block;
         }
      }
   }
</style>
