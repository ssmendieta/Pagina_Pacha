<template>
  <div id="app">
    <Header />

    <section class="slider">
      <div 
        v-for="(slide, index) in slides" 
        :key="index"
        class="option" 
        :class="{ active: activeSlide === index }"
        :style="{ '--optionBackground': `url(${slide.src})` }"
        @click="activeSlide = index"
      >
        <div class="shadow"></div>
        <div class="label">
          <div class="info">
            <div class="main">{{ slide.title }}</div>
            <div class="sub">{{ slide.date }}</div>
          </div>
        </div>
      </div>
    </section>

    <div class="descargar">
      <a href="../assets/fondo-discoteca.zip" download class="btn-descargar">⬇ Descargar Fondos</a>
    </div>

    <section class="galeria-grid">
      <div 
        class="foto" 
        v-for="(img, index) in imagenes" 
        :key="index" 
        @click="abrirVisor(img.src)"
      >
        <img :src="img.src" :alt="`Imagen ${index}`">
        <p class="fecha">{{ img.date }}</p>
      </div>
    </section>

    <div v-if="visorVisible" class="visor" @click.self="cerrarVisor">
      <span class="cerrar" @click="cerrarVisor">&times;</span>
      <img class="visor-contenido" :src="imagenSeleccionada" alt="Imagen ampliada">
    </div>

  </div>
  <Footer />
</template>

<script >
import Header from './Header.vue'
import Footer from './Footer.vue';
import logoPacha from '../assets/imagenes/logopacha.jpg'; 
import slide1 from '../assets/imagenes/1galeria.png';
import slide2 from '../assets/imagenes/2galeria.png';
import slide3 from '../assets/imagenes/3galeria.png';
import slide4 from '../assets/imagenes/4galeria.png';
import slide5 from '../assets/imagenes/5galeria.png';
import slide6 from '../assets/imagenes/6galeria.png';

import foto1 from '../assets/imagenes/LunesaSabado.png';
import foto2 from '../assets/imagenes/ElsapoyDonald.png';
import foto3 from '../assets/imagenes/7galeria.png'; 
import foto4 from '../assets/imagenes/ElDJyelTeleferico.png';
import foto5 from '../assets/imagenes/Plantitas.png';
import foto6 from '../assets/imagenes/Plantitas.png'; 


export default {
  name: "PachaGaleria",
  components: {
    Header, 
    Footer

  },
  data() {
    return {
      logoSrc: logoPacha, 

      activeSlide: 0,
      slides: [
        { title: "Diversión", date: "12/10/2025", src: slide1 },
        { title: "Alegría", date: "09/09/2025", src: slide2 },
        { title: "Senss", date: "03/08/2025", src: slide3 },
        { title: "Paracaídas", date: "04/08/2025", src: slide4 },
        { title: "Mar", date: "04/08/2025", src: slide5 },
        { title: "Mar", date: "04/08/2025", src: slide6 }
      ],

      visorVisible: false,
      imagenSeleccionada: null,
      imagenes: [
        { src: foto1, date: "12/10/2025" },
        { src: foto2, date: "09/09/2025" },
        { src: foto3, date: "03/08/2025" }, 
        { src: foto4, date: "03/08/2025" },
        { src: foto5, date: "03/08/2025" },
        { src: foto6, date: "03/08/2025" }
      ]
    };
  },
  methods: {
    abrirVisor(src) {
      this.imagenSeleccionada = src;
      this.visorVisible = true;
    },
    cerrarVisor() {
      this.visorVisible = false;
      this.imagenSeleccionada = null;
    }
  }
};
</script>

<style>


@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

.encabezado {
  height: 80px;
  background-color: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #1f1f1f;
  position: sticky; 
  top: 0;
  z-index: 100;
}

.contenedor-encabezado {
  position: relative;
  height: 100%;
  max-width: 1200px; 
  margin: 0 auto; 
  display: flex;
  align-items: center;
  justify-content: space-between; 
  padding: 0 16px;
}

.logo {
  width: 40px;
  height: auto;
}

.navbar {
  display: flex;
  gap: 32px;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
  margin-left: auto;
  margin-right: 50px; 
}

.navbar a {
  font-weight: 600;
  color: #fff;
  transition: all 0.3s ease;
}

.navbar a:hover,
.navbar a.active-link { 
  transform: translateY(-3px);
  color: #ee05f2; 
  text-decoration: underline;
  text-underline-offset: 10px;
  text-decoration-thickness: 3px;
}

.contenedor-registro-btn {
  flex-shrink: 0; 
}

.btn-registro {
  background-color: #f29f05; 
  color: #000;
  font-weight: 700;
  padding: 10px 20px;
  border-radius: 8px; 
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.btn-registro:hover {
  background-color: #d18a04;
  transform: scale(1.05);
}

.slider {
  display: flex;
  height: 300px;
  justify-content: center;
  align-items: center;
  margin: 40px auto;
  width: 90%;
  gap: 10px;
}

.option {
  flex-grow: 1;
  background-size: cover;
  background-position: center;
  background-image: var(--optionBackground);
  border-radius: 20px;
  cursor: pointer;
  position: relative;
  transition: all 0.6s ease;
  height: 100%;
}

.option.active {
  flex-grow: 4;
}

.option .shadow {
  position: absolute;
  inset: 0;
  border-radius: 20px;
  background: rgba(0,0,0,0.3);
}

.label {
  position: absolute;
  bottom: 20px;
  left: 20px;
}

.label .main {
  font-weight: bold;
  font-size: 18px;
}

.label .sub {
  font-size: 14px;
  opacity: 0.8;
}

.descargar {
  text-align: center;
  padding: 40px 20px;
  background-color: #000; 
  border-top: 2px solid #ee05f2; 
  border-bottom: 2px solid #ee05f2;
}

.btn-descargar {
  margin-top: 20px;
  padding: 12px 25px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background: linear-gradient(90deg, #e6007e, #ee05f2);
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px #ee05f2;
  text-decoration: none;
}

.btn-descargar:hover {
  transform: scale(1.1);
  box-shadow: 0 0 20px #ee05f2;
}


.galeria-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  padding: 40px;
  background-color: #000;
}

.foto {
  background: #111;
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.foto:hover {
  transform: scale(1.05);
  box-shadow: 0 0 15px #ee05f2;
}

.foto img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.foto .fecha {
  padding: 10px;
  font-size: 14px;
  color: #ccc;
}


.visor {
  display: flex; 
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.95);
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.visor-contenido {
  max-width: 90%;
  max-height: 85%;
  border-radius: 10px;
  box-shadow: 0 0 25px #ee05f2;
  animation: zoomIn 0.3s ease; 
}

@keyframes zoomIn {
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.cerrar {
  position: absolute;
  top: 20px;
  right: 35px;
  font-size: 40px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: color 0.3s;
}

.cerrar:hover {
  color: #ee05f2;
}
</style>