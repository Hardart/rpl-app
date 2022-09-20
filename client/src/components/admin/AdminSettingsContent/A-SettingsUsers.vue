<template>
   <ASettingsTitle>{{ name }}</ASettingsTitle>
   <div v-if="playerStore.players">
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
            <tr v-for="(player, i) in playerStore.players">
               <td>{{ player.full_name }}</td>
               <td>{{ player.email }}</td>
               <td>{{ player.role }}</td>
               <td class="text-center">{{ player.points }}</td>
               <td class="text-center">
                  <AButton @click="playerStore.deleteOne(player.email)" color="danger" round="y" :icon="Icons.close" />
               </td>
               <td class="text-center"><ACheckbox :name="`check_${i}`" :id="i" @check="changeState" /></td>
            </tr>
         </tbody>
      </table>
      <AButton @click="sendRequest" :roundBorder="5" text="Изменить выбранное" :disabled="disabled" />
   </div>
   <div v-else>Загрузка...</div>
</template>

<script setup lang="ts">
   import ASettingsTitle from '@/components/UI/A-SettingsTitle.vue'
   import ACheckbox from '@/components/UI/A-Checkbox.vue'
   import AButton from '@/components/UI/A-Button.vue'
   import Icons from '@/features/Icons'
   import { usePlayerStore } from '@/stores'
   import type { Checkbox } from '@/api/test-api'
   import sokolAPI from '@/api/test-api'
   import { ref } from 'vue'

   defineProps<{
      name: string
   }>()
   const playerStore = usePlayerStore()
   playerStore.getAllPlayers()

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
