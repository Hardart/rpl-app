<template>
   <div class="login">
      <div class="login__panel">
         <h2>Регистрация</h2>
         <form action="#">
            <input v-model="authData.email" type="text" placeholder="Email" name="email" />
            <input v-model="authData.name" type="text" placeholder="Имя" name="name" />
            <input v-model="authData.last_name" type="text" placeholder="Фамилия" name="last_name" />
            <input v-model="authData.password" type="password" placeholder="Пароль" name="password" />
            <input v-model="authData.password_confirm" type="password" placeholder="Повторите пароль" name="password_check" />
            <a-button type="submit" @click.prevent="tryRegistration" text="Зарегистрироваться" />
         </form>
         <router-link to="login">войти</router-link>
      </div>
   </div>
</template>

<script setup lang="ts">
   import type { Player } from '@/assets/ts/interfaces/player-interface'
   import { usePlayerStore } from '@/stores/player'
   import { reactive } from 'vue'

   const authData = reactive({
      email: '',
      name: '',
      last_name: '',
      password: '',
      password_confirm: '',
   })

   const tryRegistration = () => {
      const player: Player = {
         email: authData.email,
         name: authData.name,
         last_name: authData.last_name,
         password: authData.password,
         points: 0,
      }

      usePlayerStore().registration(player)
   }
</script>

<style lang="scss"></style>
