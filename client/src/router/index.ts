import { usePlayerStore } from '@/stores/player'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: [
      {
         path: '/',
         name: 'home',
         component: () => import('@/pages/PageHome.vue'),
         children: [
            {
               path: '/next-round',
               name: 'next',
               meta: { auth: true },
               component: () => import('@/pages/PageNextRound.vue'),
            },
            {
               path: '',
               name: 'finished',
               // route level code-splitting
               // this generates a separate chunk (About.[hash].js) for this route
               // which is lazy-loaded when the route is visited.
               component: () => import('@/pages/PagePastRounds.vue'),
            },
         ],
      },
      {
         path: '/teams-table',
         name: 'teams-table',
         component: () => import('@/pages/PageNextRound.vue'),
      },
      {
         path: '/tables',
         name: 'tables',
         meta: { auth: true },
         component: () => import('@/pages/PageNextRound.vue'),
      },
      {
         path: '/login',
         name: 'login',
         beforeEnter: async (to, from, next) => {
            await usePlayerStore().isReady
            if (usePlayerStore().isLogin) return next({ name: 'home' })
            next()
         },
         component: () => import('@/pages/PageLogin.vue'),
      },
      {
         path: '/registration',
         name: 'registration',
         beforeEnter: async (to, from, next) => {
            await usePlayerStore().isReady
            if (usePlayerStore().isLogin) return next({ name: 'home' })
            next()
         },
         component: () => import('@/pages/PageRegistration.vue'),
      },
      {
         path: '/user',
         name: 'user',
         meta: { auth: true },
         component: () => import('@/pages/PageUserProfile.vue'),
      },
      {
         path: '/admin-settings',
         name: 'adminSettings',
         meta: { auth: true },
         component: () => import('@/pages/PageAdminSettings.vue'),
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
