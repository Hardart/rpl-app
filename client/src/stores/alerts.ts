import type { Alert, AlertType } from '@/assets/ts/interfaces/alert-interface'
import { defineStore } from 'pinia'

export const useAlertStore = defineStore('alert', {
   state: () => ({
      alerts: [] as Alert[],
      id: 0 as number,
   }),
   getters: {
      delete: (state) => (id: number) => (state.alerts = state.alerts.filter((alert) => alert.id !== id)),
   },
   actions: {
      async addAlert(type: AlertType, text: string, timeout: number = 3000) {
         const alert: Alert = {
            id: ++this.id,
            type: type,
            text: text,
         }
         this.alerts.push(alert)

         if (alert.type !== 'Ошибка') {
            setTimeout(() => {
               this.delete(alert.id)
            }, timeout)
         }
      },
   },
})
