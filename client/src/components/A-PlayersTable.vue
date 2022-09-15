<template>
   <table class="table" v-if="data?.players">
      <thead>
         <tr>
            <th class="shrink-w"></th>
            <th class="expand-w">Имя</th>
            <th class="shrink-w">Очки</th>
         </tr>
      </thead>
      <tbody>
         <template v-for="(player, index) in data.players">
            <tr v-if="usePlayerStore().player?.role == 'super-admin'">
               <td>{{ index + 1 }}</td>
               <td>{{ player.full_name }}</td>
               <td class="text-center">{{ player.points }}</td>
            </tr>
            <tr v-else-if="player.role != 'super-admin'">
               <td>{{ index + 1 }}</td>
               <td>{{ player.full_name }}</td>
               <td class="text-center">{{ player.points }}</td>
            </tr>
         </template>
      </tbody>
   </table>

   <div v-else-if="error">
      <a-button isRound="true" @click="retry" :icon="Icons.reply" />
   </div>
   <div v-else>Загрузка...</div>
</template>

<script setup lang="ts">
   import { usePlayerStore } from '@/stores'
   import Icons from '@/features/Icons'
   import { getUsers } from '@/api/fetch'

   const { data, error, retry } = getUsers()
</script>

<style></style>
