<template>
   <h1>Home Page</h1>
   <h2 v-if="usePlayerStore().isLogin">{{ usePlayerStore().player?.name }}</h2>
</template>

<script setup lang="ts">
   import { usePlayerStore } from '@/stores'
</script>
