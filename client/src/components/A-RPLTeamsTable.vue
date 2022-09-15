<template>
   <table class="table" v-if="eventsStore.standingsTable[0]">
      <thead>
         <tr>
            <th class="shrink-w"></th>
            <th class="expand-w">Команда</th>
            <th class="shrink-w">{{ TotalKeys.matches_total }}</th>
            <th class="shrink-w">{{ TotalKeys.wins_total }}</th>
            <th class="shrink-w">{{ TotalKeys.draws_total }}</th>
            <th class="shrink-w">{{ TotalKeys.losses_total }}</th>
            <th class="shrink-w">{{ TotalKeys.points_total }}</th>
         </tr>
      </thead>
      <tbody>
         <tr v-for="(team, index) in eventsStore.standingsTable">
            <td class="text-center remove-p">{{ index + 1 }}</td>
            <td>{{ shortName(team.name) }}</td>
            <td class="text-center">{{ team.matches_total }}</td>
            <td class="text-center">{{ team.wins_total }}</td>
            <td class="text-center">{{ team.draws_total }}</td>
            <td class="text-center">{{ team.losses_total }}</td>
            <td class="text-center">{{ team.points_total }}</td>
         </tr>
      </tbody>
   </table>
   <div v-else>Загрузка...</div>
</template>

<script setup lang="ts">
   import { useEventsStore } from '@/stores'
   import { shortName } from '@/helpers'
   import { TotalKeys } from '@/assets/ts/enums/table-enum'

   const eventsStore = useEventsStore()
   eventsStore.loadTable()
</script>

<style></style>
