import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/PachaLogin.vue'
import Evento from '../components/Eventos.vue'
import Galeria from '../components/PachaGaleria.vue'
import Inicio from '../components/Inicio.vue'
import PachaMusica from '../components/PachaMusica.vue'; 


const routes = [
  { path: '/', redirect: '/inicio' },
  { path: '/evento', component: Evento },
  { path: '/login', component: Login },
  { path: '/galeria', component: Galeria },
  { path: '/inicio', component: Inicio },
  { path: '/musica', component: PachaMusica }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
