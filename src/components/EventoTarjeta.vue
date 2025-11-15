<script setup>
const props = defineProps({
  evento: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(['ver'])  

function reservar() {
  emit('ver', props.evento)
}
</script>
<template>
    <div class="tarjeta-evento">
              <div class="img-evento-cont">
                <img 
                  :src="evento.imagen" 
                  :alt="evento.nombre" 
                  class="img-evento"
                >
                <h3 class="titulo-evento">{{ evento.nombre }}</h3>
              </div>

              <div class="info-evento">
                <div class="detalles-evento">
                  <svg class="icono-evento" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <span>{{ evento.fecha }}</span>
                </div>

                <div class="pie-evento">
                  <div class="descripcion-evento">
                    <p>{{ evento.descripcion }}</p>
                  </div>
                  <button class="boton-evento reservar-btn" @click="reservar">Reservar</button>
                </div>
              </div>
    </div>

</template>