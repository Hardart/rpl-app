<template>
   <div class="login">
      <div class="login__panel">
         <h2>Авторизация</h2>
         <form action="#">
            <input v-model="authData.email" type="text" placeholder="Email" name="email" />
            <input v-model="authData.password" type="password" placeholder="Пароль" name="password" />
            <button class="btn btn-primary" type="submit" @click.prevent="tryLogin">Войти</button>
         </form>
         <router-link to="registration">регистрация</router-link>
      </div>
   </div>
</template>

<script setup lang="ts">
   import router from '@/router'
   import { usePlayerStore } from '@/stores'
   import { reactive } from 'vue'
   const authData = reactive({ email: '', password: '' })
   const tryLogin = () => {
      usePlayerStore().login({ email: authData.email, password: authData.password })
      authData.email = ''
      authData.password = ''
      router.push('/')
   }
</script>

<style lang="scss"></style>
