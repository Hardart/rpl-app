import { defineStore } from 'pinia'
import type { MainMenu } from '@/assets/ts/interfaces/menu-interface'
import Icons from '@/features/Icons'

export const useMenuStore = defineStore('menu', {
   state: () => ({
      mainMenu: [
         { id: 1, title: 'Home', icon: Icons.home, link: '/', auth: false, exact: true },
         { id: 3, title: 'Tables', icon: Icons.grid, link: '/tables', auth: true },
      ] as MainMenu[],
      eventsLimit: 12,
   }),
   getters: {
      getMainMenu: (state) => state.mainMenu,
   },
   actions: {},
})
