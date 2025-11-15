<script setup>
import { ref } from 'vue'
import eventosData from '../data/eventos.js'
import EventoTarjeta from './EventoTarjeta.vue'
import Header from './Header.vue'
import Footer from './Footer.vue'
const eventos = ref(eventosData)
const mostrarModal = ref(false)
const eventoSeleccionado = ref(null)
const form = ref({
  titular: '',
  personas: 1,
  botella: ''
})

function abrirModal(evento) {
  eventoSeleccionado.value = evento,  
  mostrarModal.value = true
}

function cerrarModal() {
  mostrarModal.value = false
}

function enviarReserva() {
  alert(`Reserva enviada para ${form.value.titular} - ${eventoSeleccionado.value.nombre}`)
  cerrarModal()
}
</script>

<template>
  
  <div class="pagina-eventos">
    <Header />
    <main class="principal">
      <div class="contenedor">
        <section class="eventos">
          <p>¡Haz tu reserva antes que nadie!</p>
        </section>

        <section class="despliegue-eventos">
           <EventoTarjeta 
            v-for="evento in eventos" 
            :key="evento.id" 
            :evento="evento" 
            @ver="abrirModal" 
          />
        </section>
      </div>
    </main>

    
    <div v-if="mostrarModal" class="modal">
      <div class="modal-content">
        <span class="cerrar" @click="cerrarModal">&times;</span>
        <h2>Reserva para {{ eventoSeleccionado?.nombre }}</h2>
        <form @submit.prevent="enviarReserva">
          <label for="titular">Titular:</label>
          <input v-model="form.titular" type="text" id="titular" required>

          <label for="personas">Número de personas:</label>
          <input v-model.number="form.personas" type="number" id="personas" min="1" max="20" required>

          <label for="botella">Botella:</label>
          <select v-model="form.botella" id="botella" required>
            <option value="">Selecciona una botella</option>
            <option>Jagger</option>
            <option>Fernet</option>
            <option>Whisky</option>
          </select>

          <button type="submit" class="boton-evento">Enviar Reserva</button>
        </form>
      </div>
    </div>

    <Footer />

  </div>
</template>



<style >
.encabezado {
    height: 80px;
    background-color: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--color-footer);
}

.contenedor-encabezado {
    position: relative;
    height: 100%;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
}

.logo {
    flex-shrink: 0;
    width: 150px;
    height: auto;
}

.navbar {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 32px;
}

.navbar a {
    font-weight: bold;
    color: var(--color-texto);
    font-size: 15px;
    transition: all 0.3s ease;
}

.navbar a:hover {
    transform: translateY(-5%);
    text-decoration: underline;
    text-underline-offset: 10px;
    text-decoration-thickness: 3px;
    transition: all 400ms ease;
}

.navbar a.activo {
    color: var(--color-primario);
    font-weight: bold;
    text-decoration: underline;
    text-underline-offset: 10px;
    text-decoration-thickness: 3px;
}

.contenedor-registro-btn {
  flex-shrink: 0; 
}
.principal {
    padding-top: 30px;
    padding-bottom: 64px;
    min-height: 100vh;
}

.contenedor {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 16px;
}


.eventos {
    margin-bottom: 32px;
    font-size: 18px;
    font-weight: bold;
}

.eventos p {
    font-size: 18px;
    color: var(--color-secundario);
}


.despliegue-eventos {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
}

@media (min-width: 768px) {
    .despliegue-eventos {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 1024px) {
    .despliegue-eventos {
        grid-template-columns: repeat(3, 1fr);
    }
}


.tarjeta-evento {
    cursor: pointer;
    border-radius: 16px;
    overflow: hidden;
    background-color: #121212;
    transition: all 0.3s;
}

.tarjeta-evento:hover {
    background-color: #1212128f;
    transform: scale(1.05);
}

.img-evento-cont {
    position: relative;
    height: 256px;
    overflow: hidden;
}

.img-evento {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s;
}

.img-evento-cont::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40%;
    background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
    pointer-events: none;
    z-index: 1;
}

.tarjeta-evento:hover .img-evento {
    transform: scale(1.1);
}

.info-evento {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    text-align: left;
}

.titulo-evento {
    position: absolute;
    bottom: 16px;
    left: 16px;
    right: 16px;
    font-size: 20px;
    font-weight: bold;
    color: var(--color-texto);
    z-index: 2;
    text-shadow: 0 0 6px rgba(0,0,0,0.8);
}

.detalles-evento {
    display: flex;
    align-items: center;
    color: #d0d0d0;
    font-size: 14px;
}

.icono-evento {
    width: 16px;
    height: 16px;
    margin-right: 8px;
}

.pie-evento {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 12px;
    border-top: 1px solid var(--color-footer);
}

.asistentes-evento {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #a0a0a0;
}

.boton-evento {
    padding: 8px 16px;
    background-color: var(--color-primario);
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    border: none;
    border-radius: 9999px;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.boton-evento:hover {
    background-color: var(--color-primario-hover);
}


.footer {
    background-color: var(--color-fondo);
    border-top: 1px solid var(--color-footer);
}

.contenedor-footer {
    max-width: 1280px;
    margin: 0 auto;
    padding: 48px 16px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;
}

@media (min-width: 768px) {
    .contenedor-footer {
        grid-template-columns: repeat(2, 1fr);
    }
}

.footer h3 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 16px;
}

.footer p {
    color: #a0a0a0;
    font-size: 14px;
}

.footer h4 {
    margin-bottom: 16px;
    font-weight: bold;
}

.redes-sociales {
    display: flex;
    gap: 16px;
}

.enlace-red-social {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: #ee05f2;
    border-radius: 50%;
    transition: background-color 0.4s ease, transform 0.2s ease;
}

.enlace-red-social:hover {
    background-color: var(--color-primario-hover);
    transform: translateY(-3%);
}

.enlace-red-social img {
    filter: invert(1);
    width: 20px;
    height: 20px;
}

.footer-inferior {
    padding: 32px 16px 48px;
    border-top: 1px solid var(--color-footer);
    text-align: center;
    font-size: 14px;
    color: #6b6b6b;
}


.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background-color: #121212;
    padding: 32px;
    border-radius: 16px;
    width: 90%;
    max-width: 400px;
    color: var(--color-texto);
    position: relative;
}

.cerrar {
    position: absolute;
    top: 16px;
    right: 16px;
    font-size: 24px;
    cursor: pointer;
    color: var(--color-primario);
}

.modal-content label {
    display: block;
    margin-top: 16px;
    font-weight: bold;
}

.modal-content input,
.modal-content select {
    width: 100%;
    padding: 8px;
    margin-top: 4px;
    border-radius: 8px;
    border: none;
    background-color: #1f1f1f;
    color: var(--color-texto);
}

.modal-content input:focus,
.modal-content select:focus {
    outline: 2px solid var(--color-primario);
}

.modal-content button {
    margin-top: 24px;
    width: 100%;
    background-color: var(--color-primario);
    border: none;
    color: #fff;
    padding: 10px;
    border-radius: 9999px;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.2s ease;
}

.modal-content button:hover {
    background-color: var(--color-primario-hover);
    transform: translateY(-2%);
}

</style>
