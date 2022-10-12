<template>
   <LayoutSection section-color="success" container-size="expand">
      <h1>Hello World</h1>

      <div ref="container" @dragenter.prevent @dragover.prevent @drop="onDrop" class="drag-container">
         <div
            @dragend="onDragEnd($event, item)"
            @dragover="onDragOver($event, item)"
            @dragstart="dragStart($event, item)"
            class="drag-item"
            :class="{ move: item.drag }"
            v-for="item in list"
            draggable="true"
         >
            {{ item.title }}
         </div>
      </div>
   </LayoutSection>
</template>

<script setup lang="ts">
   import LayoutSection from '../layouts/LayoutSection.vue'
   import { ref, type Ref } from 'vue'
   interface Draggable {
      id: number
      title: string
      drag: boolean
   }
   let startItem = 0
   let endItem = 0
   const container: Ref<HTMLElement | null> = ref(null)
   const list: Ref<Draggable[]> = ref([
      { id: 1, title: 'A', drag: false },
      { id: 2, title: 'B', drag: false },
      { id: 3, title: 'C', drag: false },
      { id: 4, title: 'D', drag: false },
   ])

   const dragStart = (event: DragEvent, item: Draggable) => {
      startItem = list.value.indexOf(item)
      item.drag = true
      if (!event.dataTransfer) return
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('itemID', `${item.id}`)
   }

   const onDragEnd = (event: DragEvent, item: Draggable) => {
      item.drag = false
   }

   const onDrop = (event: DragEvent) => {
      if (!event.dataTransfer) return
      const itemID = event.dataTransfer.getData('itemID')
      const item = list.value.find((item) => item.id == Number(itemID))
      if (!item) return
      item.drag = false
      swap(list.value, startItem, endItem)
   }

   const onDragOver = (event: DragEvent, item: Draggable) => {
      endItem = list.value.indexOf(item)
   }

   function swap(arr: any[], from: number, to: number) {
      arr.splice(from, 1, arr.splice(to, 1, arr[from])[0])
   }
</script>

<style lang="scss">
   .drag-container {
      display: block;
      width: 50%;
      padding: 2px;
      background-color: $primary;
   }
   .drag-item {
      margin-bottom: 2px;
      padding: 20px;
      background-color: $dark;

      &.move {
         opacity: 0.7;
      }
   }
</style>
