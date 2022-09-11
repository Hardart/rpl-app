<script setup lang="ts">
   import ANextEvents from '@/components/A-NextEvents.vue'
</script>
<template>
   <div>
      <Suspense>
         <!-- main content -->
         <ANextEvents />

         <!-- loading state -->
         <template #fallback> Загрузка... </template>
      </Suspense>
   </div>
</template>
