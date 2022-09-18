<template>
   <div>
      <Suspense>
         <ANextEvents />
         <template #fallback> Загрузка... </template>
      </Suspense>
   </div>
</template>
<script setup lang="ts">
   import ANextEvents from '@/components/A-NextEvents.vue'
</script>
