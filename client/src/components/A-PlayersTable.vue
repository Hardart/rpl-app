<template>
   <table class="users-table" v-if="data?.players">
      <thead>
         <tr>
            <th class="shrink-w"></th>
            <th class="expand-w">Имя</th>
            <th class="shrink-w">Очки</th>
         </tr>
      </thead>
      <tbody>
         <tr v-for="(player, index) in data.players">
            <td>{{ index + 1 }}</td>
            <td>{{ player.full_name }}</td>
            <td class="text-center">{{ player.points }}</td>
         </tr>
      </tbody>
   </table>

   <div v-else-if="error">
      <button class="btn btn-icon" @click="retry" v-html="Icons.reply"></button>
   </div>
   <div v-else>Загрузка...</div>
</template>

<script setup lang="ts">
   import { getUsers } from '@/api/fetch'
   import Icons from '@/features/Icons'
   const { data, error, retry } = getUsers()
</script>

<style></style>
