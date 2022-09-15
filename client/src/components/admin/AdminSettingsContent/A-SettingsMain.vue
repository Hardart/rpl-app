<template>
   <h1>{{ name }}</h1>
   <div class="select-form">
      <ASelect :options="players" @selected="selectPlayer" @input-value="onChangValue" v-model="inputValue" />
      <div>
         <button @click="changeAdmin" class="btn btn-success" :disabled="isDisable">Изменить</button>
      </div>
   </div>
</template>

<script setup lang="ts">
   import ASelect from '@/components/UI/A-Select.vue'
   import { ref } from 'vue'
   import { useAlertStore, usePlayerStore } from '@/stores'
   defineProps<{
      name: string
   }>()

   const players = await usePlayerStore().getAllPlayers()
   const isDisable = ref(true)
   const inputValue = ref('Выбери игрока...')

   const selectPlayer = (name: string | undefined) => {
      inputValue.value = name ?? ''
      isDisable.value = false
   }
   const onChangValue = (v: string) => {
      if (!players) return
      isDisable.value = !players?.some((player) => player.full_name == v)
   }

   const changeAdmin = async () => {
      if (!players) return false
      const player = players.find((player) => player.full_name == inputValue.value)
      if (!player) return false
      const res = await usePlayerStore().setNewAdmin(player.email)
      if (res.message) return useAlertStore().addAlert('Ошибка', res.message)
      useAlertStore().addAlert('Информация', `Новым администратором назначен ${player.full_name}`)
      inputValue.value = 'Выбери игрока...'
      isDisable.value = true
   }
</script>

<style>
   .select-form {
      display: flex;
   }
</style>
