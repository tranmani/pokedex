
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'favorite', component: () => import('pages/Favorite.vue') },
      { path: 'search', component: () => import('pages/Search.vue'), props: (route) => ({ name: route.query.q }) },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
