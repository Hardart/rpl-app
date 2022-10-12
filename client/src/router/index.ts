import { usePlayerStore } from '@/stores/player'
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/PageHome.vue'
import NextEvents from '@/pages/PageNextRound.vue'
import FinishedEvents from '@/pages/PagePastRounds.vue'
import Tables from '@/pages/PageTables.vue'
import RPLTeams from '@/pages/PagePRLTeamsTable.vue'
import Players from '@/pages/PagePlayersTable.vue'
import Login from '@/pages/PageLogin.vue'
import Registration from '@/pages/PageRegistration.vue'
import Player from '@/pages/PageUserProfile.vue'

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: [
      {
         path: '/',
         name: 'home',
         component: HomePage,
         children: [
            {
               path: '/next-round',
               name: 'next',
               meta: { auth: true },
               component: NextEvents,
            },
            {
               path: '',
               name: 'finished',
               // route level code-splitting
               // this generates a separate chunk (About.[hash].js) for this route
               // which is lazy-loaded when the route is visited.
               component: FinishedEvents,
            },
         ],
      },
      {
         path: '/tables',
         name: 'tables',
         meta: { auth: true },
         component: Tables,
         children: [
            {
               path: '',
               name: 'rplTable',
               // route level code-splitting
               // this generates a separate chunk (About.[hash].js) for this route
               // which is lazy-loaded when the route is visited.
               component: RPLTeams,
            },
            {
               path: 'players',
               name: 'playersTable',
               meta: { auth: true },
               component: Players,
            },
         ],
      },
      {
         path: '/login',
         name: 'login',
         beforeEnter: async (to, from, next) => {
            await usePlayerStore().isReady
            if (usePlayerStore().isLogin) return next({ name: 'home' })
            next()
         },
         component: Login,
      },
      {
         path: '/registration',
         name: 'registration',
         beforeEnter: async (to, from, next) => {
            await usePlayerStore().isReady
            if (usePlayerStore().isLogin) return next({ name: 'home' })
            next()
         },
         component: Registration,
      },
      {
         path: '/user',
         name: 'user',
         meta: { auth: true },
         component: Player,
      },
      {
         path: '/test-page',
         name: 'test',
         component: () => import('@/pages/PageForTests.vue'),
      },
   ],
})

router.beforeEach(async (to, from, next) => {
   if (to.meta.auth) {
      await usePlayerStore().isReady
      if (!usePlayerStore().isLogin) return next({ name: 'login' })
   }
   next()
})

export default router
