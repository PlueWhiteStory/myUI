import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/faultAll_sd/main/main.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: "/read",
      name: "read",
      component: "",
    },
    {
      path: "/fault",
      name: "fault",
      component: ""
    },
    {
      path: "/defect",
      name: "defect",
      component: ""
    },
    {
      path: "/diagnose",
      name: "diagnose",
      component: ""
    },
    {
      path: "/communication",
      name: "communication",
      component: ""
    },
    {
      path: "/model",
      name: "model",
      component: ""
    },
    {
      path: "/shortcut",
      name: "shortcut",
      component: ""
    }
  ]
})
