<template>
   <APlayersTable />
</template>

<script setup lang="ts">
   import APlayersTable from '../components/A-PlayersTable.vue'
</script>

<style lang="scss">
   .tabs {
      display: flex;
      justify-content: center;
      &-list {
         display: inline-flex;
         justify-content: center;
         align-items: center;
         gap: 15px;
         padding: 14px;

         margin-bottom: 20px;
         border-radius: 12px;
         background-color: $light;
         box-shadow: inset 0px 1px 5px rgba(0, 0, 0, 0.2);

         &__item {
            padding: 10px;
            background-color: $muted;
            border-radius: 8px;
            box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.25);
            transition: all 200ms ease-in-out;
            cursor: pointer;

            &.active {
               background-color: $primary;
            }

            &:hover {
               box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
            }

            &:active {
               box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
            }
         }
      }
   }
</style>
