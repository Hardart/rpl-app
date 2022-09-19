<template>
   <h1>{{ name }}</h1>
   <div v-if="data?.players">
      <table class="table dark-mode">
         <thead>
            <tr>
               <th class="expand-w">Имя</th>
               <th class="expand-w">Email</th>
               <th class="expand-w">Права</th>
               <th class="shrink-w">Очки</th>
               <th class="shrink-w">Удалить</th>
               <th class="shrink-w">Изменить</th>
            </tr>
         </thead>
         <tbody>
            <tr v-for="(player, i) in data.players">
               <td>{{ player.full_name }}</td>
               <td>{{ player.email }}</td>
               <td>{{ player.role }}</td>
               <td class="text-center">{{ player.points }}</td>
               <td class="text-center">
                  <a-button @click="removeUser(player.email)" color="danger" isRound="true" :icon="Icons.close" />
               </td>
               <td class="text-center"><ACheckbox :name="`check_${i}`" :id="i" @check="changeState" /></td>
            </tr>
         </tbody>
      </table>
      <AButton @click="sendRequest" text="Изменить выбранное" :disabled="disabled" />
   </div>
   <div v-else-if="error">
      <AButton isRound="true" @click="retry" :icon="Icons.reply"></AButton>
   </div>
   <div v-else>Загрузка...</div>
</template>

<script setup lang="ts">
   import ACheckbox from '@/components/UI/A-Checkbox.vue'
   import Icons from '@/features/Icons'
   import { getUsers } from '@/api/fetch'
   import { usePlayerStore } from '@/stores'
   import type { Checkbox } from '@/api/test-api'
   import AButton from '../../UI/A-Button.vue'
   import sokolAPI from '@/api/test-api'
   import { ref } from 'vue'

   defineProps<{
      name: string
   }>()
   const { data, error, retry } = getUsers()
   const removeUser = async (email: string) => await usePlayerStore().deleteOne(email)
   let box: Checkbox[] = []
   const disabled = ref(true)
   const changeState = (state: boolean, id: number) => {
      disabled.value = false
      box.some((item, i) => {
         if (item.id == id) {
            item.state = state
            box.splice(i, 1)
         }
      })
      box.push({ state, id })
   }

   const sendRequest = async () => {
      if (box.length == 0) return
      const res = await sokolAPI.sokolova(box)
      console.log(res)
      box = []
      disabled.value = true
   }
</script>
<style lang="scss"></style>
