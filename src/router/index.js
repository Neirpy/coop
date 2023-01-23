import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')

    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginView.vue')
    },
    {
      path:'/logout',
      name:'logout',
      component: () => import('../views/LogoutView.vue')
    },
    {
      path: '/add-user',
      name: 'add-user',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AddUserView.vue')
    },
    {
      path:'/list-members',
      name:'list-members',

      component: () => import('../views/ListMembersView.vue')
    },
    {
      path:'/member/:id',
      name:'member',
      component: () => import('../views/MemberView.vue')
    },
    {
      path: '/add-conversation',
      name: 'add-conversation',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AddConversationView.vue')
    },
    {
      path:'/conversation/:id',
      name:'conversation',
      component: () => import('../views/ConversationView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
