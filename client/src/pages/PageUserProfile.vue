<script setup lang="ts">
   import { useEventsStore, usePlayerStore } from '@/stores'
   import router from '@/router'
   import AUserBets from '../components/A-UserBets.vue'
   import Icons from '@/features/Icons'
   const user = usePlayerStore().player

   const logOut = () => {
      usePlayerStore().logout()
      router.push('/')
   }

   const accessRoles = ['super-admin', 'admin']
   const userRole = user?.role ? user.role : ''
</script>

<template>
   <div class="action-btns">
      <button v-if="accessRoles.includes(userRole)" class="btn btn-danger" :disabled="useEventsStore().isLoading" @click="useEventsStore().update">
         {{ useEventsStore().isLoading ? 'Loading...' : 'Обновить данные о матчах' }}
      </button>
      <button class="btn btn-icon btn-secondary" @click="logOut" v-html="Icons['sign-out']"></button>
   </div>
   <div class="player">
      <div class="player__points">
         <h3>Количество набранных очков: {{ user?.points }}</h3>
      </div>
   </div>
   <Suspense>
      <!-- main content -->
      <AUserBets />
      <!-- loading state -->
      <template #fallback> Загрузка... </template>
   </Suspense>
</template>

<style lang="scss">
   .action-btns,
   .player {
      margin-bottom: 20px;
   }
   .action-btns {
      display: flex;

      .btn:last-child {
         margin-left: auto;
      }
   }

   .player {
      &__points {
         font-size: 1.2rem;
      }
   }

   .user-card {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 10px;
      box-shadow: 0 7px 10px rgba(0, 0, 0, 0.1);

      &__item {
         display: flex;
         width: 25%;
         align-items: flex-start;
         margin-bottom: 10px;
         background-color: #fff;
      }
      &__status {
         text-align: center;
      }
   }
</style>
