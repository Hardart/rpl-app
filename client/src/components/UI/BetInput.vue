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

<style lang="scss"></style>
