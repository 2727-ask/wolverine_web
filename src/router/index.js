import { createRouter, createWebHistory } from 'vue-router'



const routes = [
  { path: '/', redirect: '/newrecord' },
  {
    path: '/newrecord',
    name: 'NewRecord',
    component: () => import('../screens/NewRecord.vue')
  },
  {
    path: '/doctors',
    name: 'Doctors',
    component: () => import('../screens/Doctors.vue')
  },
  {
    path: '/facilities',
    name: 'Facilities',
    component: () => import('../screens/Facilities.vue')
  },
  {
    path: '/payments',
    name: 'Payments',
    component: () => import('../screens/Payments.vue')
  },
  {
    path: '/detailed_payments/',
    name: 'Payment_Details',
    component: () => import('../screens/PaymentDetails.vue')
  },
  {
    path: '/your_profile/',
    name: 'Your_Profile',
    component: () => import('../screens/YourProfile.vue')
  },
  {
    path: '/profit/',
    name: 'Profit',
    component: () => import('../screens/Profit.vue')
  },
  {
    path: '/print/',
    name: 'Print',
    component: () => import('../screens/Print.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
