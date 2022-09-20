<template>
   <label class="switch" :for="`checkbox_${id}`">
      <input @change="handleCheckbox($event.target as EventTarget, id)" :name="name" type="checkbox" :id="`checkbox_${id}`" />
      <div class="slider"></div>
   </label>
</template>

<script setup lang="ts">
   defineProps<{
      id: number
      name: string
   }>()
   const emits = defineEmits<{
      (e: 'check', isChecked: boolean, id: number): void
   }>()
   const handleCheckbox = (e: EventTarget, id: number) => {
      const check = (e as HTMLInputElement).checked
      emits('check', check, id)
   }
</script>

<style lang="scss">
   .switch {
      display: inline-block;
      position: relative;
      min-width: 60px;
      height: 32px;

      input {
         display: none;

         &:checked + .slider {
            background-color: $warning;

            &:before {
               transform: translateX(100%);
            }
         }
      }

      .slider {
         position: absolute;
         top: 0;
         left: 0;
         bottom: 0;
         right: 0;
         border-radius: 34px;
         transition: 0.4s;
         background-color: #ccc;
         cursor: pointer;

         &:before {
            content: '';
            position: absolute;
            width: 26px;
            height: 26px;
            bottom: 3px;
            left: 4px;
            border-radius: 50%;
            background-color: #fff;
            transition: 0.4s;
         }
      }
   }
</style>
