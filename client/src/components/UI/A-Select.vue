<template>
   <div class="select">
      <div class="select__input">
         <input ref="selectInput" @keyup.esc="escPress" @blur="escPres" @focus="changeState()" @input="filterList" :value="modelValue" type="text" />
         <span v-html="Icons.arrows"></span>
      </div>
      <ul class="select__list" :class="{ active: isOpen }">
         <li class="select__list-item" @click.stop="selectPlayer(player.full_name)" v-for="player in options">{{ player.full_name }}</li>
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
   import { ref, type Ref } from 'vue'
   const selectInput: Ref<HTMLInputElement | null> = ref(null)
   const isOpen = ref(false)
   const changeState = (state: boolean = false) => {
      if (!state) {
         isOpen.value = !isOpen.value
         selectInput.value?.focus()
         return
      }
      isOpen.value = state
   }
   const props = defineProps<{
      options: Player[] | null
      modelValue: string
   }>()
   const emits = defineEmits<{
      (e: 'selected', player: string | undefined): void
      (e: 'inputValue', value: string): void
   }>()
   const selectPlayer = (playerName: string | undefined) => {
      emits('selected', playerName)
      isOpen.value = !isOpen.value
      selectInput.value?.blur()
   }
   const filterList = () => {
      const inputValue = (selectInput.value as HTMLInputElement).value
      emits('inputValue', inputValue)
   }

   const escPress = () => {
      const input = selectInput.value as HTMLInputElement
      isOpen.value = false
      input.blur()
   }
   const escPres = async () => {
      const input = selectInput.value as HTMLInputElement
      input.blur()
   }
</script>

<style lang="scss">
   .select {
      width: 250px;

      &__input {
         position: relative;
         border-radius: 10px;
         overflow: hidden;

         input {
            width: 100%;
            padding: 12px 12px 10px;
            outline: none;
            border: none;
            background-color: $muted;
            font-size: 1rem;
         }

         span {
            position: absolute;
            display: flex;
            align-items: center;
            top: 0;
            bottom: 0;
            right: 0;
            padding: 0 10px;
            color: $disable;
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
