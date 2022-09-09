<template>
   <div class="bet">
      <div class="bet-wrap">
         <div class="bet-wrap__input">
            <button class="bet-wrap__input--btn decrement" @click="bet.decreaseHome">-</button>
            <input type="number" name="home" id="home_score_value" min="0" max="9" :value="bet.scoreHome.value" readonly />
            <button class="bet-wrap__input--btn increment" @click="bet.increaseHome">+</button>
         </div>
         <div class="bet-wrap__input">
            <button class="bet-wrap__input--btn decrement" @click="bet.decreaseAway">-</button>
            <input type="number" name="home" id="home_score_value" min="0" max="9" :value="bet.scoreAway.value" readonly />
            <button class="bet-wrap__input--btn increment" @click="bet.increaseAway">+</button>
         </div>
      </div>
      <div class="buttons">
         <div class="btn btn-danger w-100" @click="bet.cancel">Отменить</div>
         <div class="btn btn-success w-100" @click="bet.accept">Применить</div>
      </div>
   </div>
</template>

<script setup lang="ts">
   import type Bet from '@/features/Bet-class'
   const props = defineProps<{
      bet: Bet
   }>()
</script>

<style lang="scss">
   .bet {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      background: #6b6b6b32;
      transition: all 0.3s ease;
      &.open {
         top: 0%;
      }

      .bet-wrap {
         display: flex;
         justify-content: space-around;
         align-items: center;
         width: 100%;

         &__input {
            display: flex;
            padding: 5px;

            > * {
               font-size: 2rem;
               border: none;
               outline: none;
               box-shadow: 1px 0.1px 2px #22222232;
            }

            &--btn {
               color: #2d8fe6;
               background-color: #fff;
               cursor: pointer;

               &.increment {
                  border-top-right-radius: 20px;
                  border-bottom-right-radius: 20px;
                  padding: 0 15px;
               }
               &.decrement {
                  border-top-left-radius: 20px;
                  border-bottom-left-radius: 20px;
                  padding: 0 17px 5px;
               }
               &:hover {
                  color: #3e9ff4;
                  background-color: #fbfbfb;
               }
               &:active {
                  color: #1b6fb9;
                  background-color: #f5f5f5;
               }
            }

            input[type='number'] {
               text-align: center;
               margin: 0;
               padding: 0 10px;
               cursor: default;
            }

            input::-webkit-inner-spin-button,
            input::-webkit-outer-spin-button {
               appearance: none;
            }
         }
      }
      .buttons {
         display: flex;
         width: 100%;
      }
   }
</style>
