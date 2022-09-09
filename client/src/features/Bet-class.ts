import { ref, type Ref } from 'vue'
import { usePlayerStore, useEventsStore, useAlertStore } from '@/stores'
import type { NewBet } from '@/assets/ts/interfaces/bet-interface'
import { BetButtonText } from '@/assets/ts/enums/status-enum'
import { checkDateOfGame } from '@/helpers'

export default class Bet {
   cardID: Ref<number>
   open: Ref<boolean>
   scoreHome: Ref<number>
   scoreAway: Ref<number>
   closeTimeout: number
   isDisabled: Ref<boolean>
   buttonText: Ref<string>

   constructor() {
      this.cardID = ref(0)
      this.open = ref(false)
      this.scoreHome = ref(0)
      this.scoreAway = ref(0)
      this.closeTimeout = 300
      this.isDisabled = ref(false)
      this.buttonText = ref('Сделать ставку')
   }

   show(id: number) {
      if (!this.isDatePass(id)) {
         this.isDisabled.value = true
         this.buttonText.value = 'Автоматическая ставка'
         return useAlertStore().addAlert('Ошибка', 'ставку сделать нельзя, игра уже началась')
      }
      this.open.value = true
      setTimeout(() => (this.cardID.value = id))
   }

   async accept() {
      const playerEmail = usePlayerStore().player?.email
      if (!playerEmail) return useAlertStore().addAlert('Ошибка', 'Игрок не авторизован')
      await usePlayerStore().makeBet(this.newBet)

      this.cardID.value = 0
      setTimeout(() => {
         this.open.value = false
      }, this.closeTimeout)
   }

   cancel() {
      this.cardID.value = 0
      setTimeout(() => {
         this.open.value = false
         this.scoreHome.value = 0
         this.scoreAway.value = 0
      }, this.closeTimeout)
   }

   increaseHome() {
      this.scoreHome.value++
      if (this.scoreHome.value > 9) this.scoreHome.value = 9
   }

   decreaseHome() {
      this.scoreHome.value--
      if (this.scoreHome.value < 0) this.scoreHome.value = 0
   }

   increaseAway() {
      this.scoreAway.value++
      if (this.scoreAway.value > 9) this.scoreAway.value = 9
   }

   decreaseAway() {
      this.scoreAway.value--
      if (this.scoreAway.value < 0) this.scoreAway.value = 0
   }

   get betCode(): number {
      if (this.scoreHome.value > this.scoreAway.value) return 1
      if (this.scoreHome.value < this.scoreAway.value) return 2
      return 3
   }

   private get newBet(): NewBet[] {
      return [
         {
            event_id: this.cardID.value,
            status: false,
            home_score: this.scoreHome.value,
            away_score: this.scoreAway.value,
            winner_code: null,
            bet_code: this.betCode,
         },
      ]
   }

   private isDatePass(cardID: number): boolean {
      const event = useEventsStore().getEventByID(cardID)
      return checkDateOfGame(event.start_at)
   }
}
