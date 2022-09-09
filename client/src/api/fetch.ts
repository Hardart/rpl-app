import { ref, isRef, unref, watchEffect, type Ref, type ComputedRef } from 'vue'
import type { PlayerBets } from '@/assets/ts/interfaces/bet-interface'
import type { Player } from '@/assets/ts/interfaces/player-interface'
import JWT from '@/features/Token-class'

const baseUrl = 'http://localhost:80'

export async function getBets(url: string) {
   let bets: Ref<PlayerBets[] | null> = ref(null)
   let betsError: Ref<null | unknown> = ref(null)

   async function doFetch() {
      // reset state before fetching..
      bets.value = null
      betsError.value = null
      const urlValue = baseUrl + url

      try {
         const config: RequestInit = {
            headers: {
               Authorization: 'Bearer ' + JWT.accessToken,
            },
         }

         const res = await fetch(urlValue, config)
         bets.value = await res.json()
      } catch (e) {
         betsError.value = e
      }
   }

   await doFetch()

   return { bets, betsError, retryGetBets: doFetch }
}

export function getUsers() {
   let data: Ref<null | Player[]> = ref(null)
   let error: Ref<null | unknown> = ref(null)

   async function doFetch() {
      // reset state before fetching..
      data.value = null
      error.value = null
      const urlValue = baseUrl + '/all-players'

      try {
         const config: RequestInit = {
            headers: {
               Authorization: 'Bearer ' + JWT.accessToken,
            },
         }

         const res = await fetch(urlValue, config)
         data.value = await res.json()
      } catch (e) {
         error.value = e
      }
   }

   doFetch()

   return { data, error, retry: doFetch }
}

export function useFetch(url: ComputedRef<string> | string) {
   const data: Ref<null> = ref(null)
   const error: Ref<null | unknown> = ref(null)

   async function doFetch() {
      // reset state before fetching..
      data.value = null
      error.value = null

      // resolve the url value synchronously so it's tracked as a
      // dependency by watchEffect()
      const urlValue: string = unref(url)

      try {
         // artificial delay / random error
         await timeout()

         // unref() will return the ref value if it's a ref
         // otherwise the value will be returned as-is
         const config: RequestInit = {
            headers: {
               Authorization: 'Bearer ' + JWT.accessToken,
            },
         }
         const res = await fetch(urlValue, config)
         data.value = await res.json()
      } catch (e) {
         error.value = e
      }
   }

   if (isRef(url)) {
      // setup reactive re-fetch if input URL is a ref
      watchEffect(doFetch)
   } else {
      // otherwise, just fetch once
      doFetch()
   }

   return { data, error, retry: doFetch }
}

function timeout() {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         if (Math.random() > 0.3) {
            resolve(true)
         } else {
            reject(new Error('Random Error'))
         }
      }, 300)
   })
}
