<template>
   <h1>{{ name }}</h1>
   <div>
      <table class="table dark-mode" v-if="data?.players">
         <thead>
            <tr>
               <th class="expand-w">Имя</th>
               <th class="expand-w">Email</th>
               <th class="expand-w">Права</th>
               <th class="shrink-w">Очки</th>
               <th class="shrink-w">Удалить</th>
            </tr>
         </thead>
         <tbody>
            <tr v-for="player in data.players">
               <td>{{ player.full_name }}</td>
               <td>{{ player.email }}</td>
               <td>{{ player.role }}</td>
               <td class="text-center">{{ player.points }}</td>
               <td class="text-center">
                  <a-button @click="removeUser(player.email)" color="danger" isRound="true" :icon="Icons.close" />
               </td>
            </tr>
         </tbody>
      </table>

      <div v-else-if="error">
         <button class="btn btn-icon" @click="retry" v-html="Icons.reply"></button>
      </div>
      <div v-else>Загрузка...</div>
   </div>
</template>

<script setup lang="ts">
   import Icons from '@/features/Icons'
   import { getUsers } from '@/api/fetch'
   import { usePlayerStore } from '@/stores'

   defineProps<{
      name: string
   }>()
   const { data, error, retry } = getUsers()
   const removeUser = async (email: string) => await usePlayerStore().deleteOne(email)
</script>
<style lang="scss"></style>
