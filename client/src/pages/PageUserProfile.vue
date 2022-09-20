<script setup lang="ts">
   import AUserBets from '@/components/A-UserBets.vue'
   import { useEventsStore, usePlayerStore } from '@/stores'
   import router from '@/router'
   import Icons from '@/features/Icons'

   const playerStore = usePlayerStore()
   const eventStore = useEventsStore()
   const user = playerStore.player

   const logOut = () => {
      playerStore.logout()
      router.push('/')
   }

   const accessRoles = ['super-admin', 'admin']
   const userRole = user?.role ? user.role : ''
</script>

<template>
   <div>
      <div class="action-btns">
         <a-button
            color="success"
            @click="eventStore.update"
            :text="eventStore.isLoading ? 'Загрузка данных...' : 'Обновить данные'"
            :disabled="eventStore.isLoading"
            :roundBorder="5"
            v-if="accessRoles.includes(userRole)"
         />
         <a-button color="primary" :icon="Icons['sign-out']" round="y" @click="logOut" />
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
   </div>
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
