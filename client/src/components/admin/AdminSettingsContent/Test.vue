<template>
   <div>
      <div>
         Load post id:
         <button class="uk-button bg-warning uk-margin-small-right" v-for="i in 5" :key="i" @click="id = i">{{ i }}</button>
      </div>

      <div v-if="error">
         <p>Oops! Error encountered: {{ error }}</p>
         <button @click="retry">Retry</button>
      </div>
      <div v-else-if="data">
         Data loaded:
         <pre>{{ data }}</pre>
      </div>
      <div v-else uk-spinner></div>
   </div>
</template>
<script setup lang="ts">
   import { ref, computed } from 'vue'
   import { useFetch } from '@/api/fetch'

   const baseUrl = 'https://jsonplaceholder.typicode.com/todos/'
   const id = ref(1)
   const url = computed(() => baseUrl + id.value)

   const { data, error, retry } = useFetch(url)
</script>
