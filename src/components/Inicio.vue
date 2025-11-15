<template>
  <div>
    <Header />

    <main>
      <section class="hero-section">
        <div class="hero-image"></div>
        <div class="hero-text">
          <h1>¿Listo para esta noche?</h1>
          <p>La mejor música, el mejor ambiente. Vive una noche inolvidable en PACHA.</p>
          <div class="line"></div>
          <a :href="whatsappReserva" target="_blank" class="btn-principal">Realizar Reserva</a>
        </div>
      </section>

      <section class="weekly-agenda-section">
        <div class="contenedor-principal">
          <h2 class="section-title animar">Nuestra Semana</h2>
          <div class="agenda-grid">
            <div class="agenda-card animar" v-for="item in agendaData" :key="item.dia">
              <h3>{{ item.dia }}</h3>
              <h4>{{ item.titulo }}</h4>
              <p>{{ item.desc }}</p>
              <a href="#" class="btn-terciario">Ver más</a>
            </div>
          </div>
        </div>
      </section>

      <section class="events-section">
        <div class="contenedor-principal">
          <div class="event-content">
            <div class="event-image animar"></div>
            <div class="event-details animar">
              <p class="subtitle">Evento Principal de la Semana</p>
              <h2>FIESTA BLANCA</h2>
              <p class="description">
                Prepárate para una noche mágica. Dress code: blanco obligatorio. Show de
                performance, sorpresas y la mejor música.
              </p>

              <div id="contador">
                <template v-if="!fiestaComenzo">
                  <div>
                    <span>{{ dias }}</span>
                    <p>Días</p>
                  </div>
                  <div>
                    <span>{{ horas }}</span>
                    <p>Horas</p>
                  </div>
                  <div>
                    <span>{{ minutos }}</span>
                    <p>Min</p>
                  </div>
                  <div>
                    <span>{{ segundos }}</span>
                    <p>Seg</p>
                  </div>
                </template>
                <h3 v-else>¡LA FIESTA YA COMENZÓ!</h3>
              </div>

              <div class="event-card">
                <div class="event-info">
                  <h4>Sábado de Gala</h4>
                  <p>Sábado, 18 de Diciembre</p>
                </div>
                <a :href="whatsappReserva" target="_blank" class="btn-secundario"
                  >Comprar Entradas</a
                >
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="location-section">
        <div class="contenedor-principal">
          <h2 class="section-title animar">Encuéntranos</h2>
          <div class="location-content">
            <div class="location-info animar">
              <h3>Nuestra Ubicación</h3>
              <p><strong>Dirección:</strong> Calle 28 de Calacoto, La Paz, Bolivia</p>
              <p>
                <strong>Horarios:</strong><br />
                Jueves: 16:00 - 22:00<br />
                Viernes: 16:00 - 22:00<br />
                Sábado: 16:00 - 22:00
              </p>
              <a
                href="https://maps.app.goo.gl/k9Gj1n8zX4iC5gpo6"
                target="_blank"
                class="btn-secundario"
                >Ver en Google Maps</a
              >
            </div>
            <div class="map-container animar">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d956.1956501170798!2d-68.0664278304419!3d-16.53723789965017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915f210d7cffffff%3A0x6b6e4e3c5a7f9a1b!2sPacha%20Bolivian%20Sunsets!5e0!3m2!1ses-419!2sbo!4v1728792271373!5m2!1ses-419!2sbo"
                width="600"
                height="450"
                style="border: 0"
                allow="fullscreen"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <section class="newsletter-section">
        <div class="contenedor-principal text-center animar">
          <h2>NO TE PIERDAS NINGUNA FIESTA</h2>
          <p>
            Suscríbete a nuestro newsletter y recibe acceso anticipado a entradas, promociones
            exclusivas y las últimas noticias.
          </p>

          <form class="newsletter-form" @submit.prevent="enviarFormulario">
            <input type="email" placeholder="Tu correo electrónico" required v-model="email" />
            <button type="submit" class="btn-principal">Suscribirme</button>
          </form>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Footer from './Footer.vue';
import footer from './Footer.vue';
export default {
  name: 'App', 
  components: {
    Header,
    Footer
  },
  data() {
    return {
      // --- ESTADO Y DATOS PARA EL HEADER ---
      isMenuActivo: false,
      navLinks: [
        { text: "INICIO", url: "/inicio" },
        { text: "EVENTOS", url: "/evento" },
        { text: "GALERIA", url: "/galeria" }
      ],


      // --- DATOS PARA EL FOOTER ---
      socialLinks: [
        {
          icon: 'fa-brands fa-instagram',
          url: 'https://www.instagram.com/pacha_bolivian_sunsets/',
        },
        {
          icon: 'fa-brands fa-facebook',
          url: 'https://www.facebook.com/profile.php?id=61574652278658&locale=es_LA',
        },
        { icon: 'fa-brands fa-tiktok', url: 'https://www.tiktok.com/@pachaboliviansunset' },
      ],

      // --- DATOS PARA EL CONTENIDO PRINCIPAL ---
      whatsappReserva:
        'https://wa.me/59176007750?text=Hola%2C%20me%20gustaría%20realizar%20una%20reserva.',
      agendaData: [
        {
          dia: 'JUEVES',
          titulo: 'Noche de Reggaetón',
          desc: 'Los clásicos y los nuevos hits que te hacen bailar.',
        },
        {
          dia: 'VIERNES',
          titulo: 'Electronic Vibes',
          desc: 'Siente la energía de la música electrónica con DJs invitados.',
        },
        {
          dia: 'SÁBADO',
          titulo: 'Fiesta Blanca',
          desc: 'Nuestra noche de gala. Vístete de blanco y sé parte del evento.',
        },
      ],

      // --- ESTADO Y DATOS PARA EL CONTADOR (Mejora 3 de script.js) ---
      // Esta es la fecha de tu App.vue (18 de Diciembre)
      fechaFiestaBlanca: new Date(2025, 11, 18, 23, 0, 0), // 11 = Diciembre
      dias: 0,
      horas: 0,
      minutos: 0,
      segundos: 0,
      fiestaComenzo: false,
      intervalo: null,

      // --- ESTADO PARA EL NEWSLETTER ---
      email: '',
    }
  },
  methods: {
    // --- LÓGICA MIGRADA DE SCRIPT.JS (Mejora 1: Menú Móvil) ---
    toggleMenu() {
      // Esta lógica estaba en Header.vue, pero ahora está aquí,
      // en el componente principal que lo contiene todo.
      this.isMenuActivo = !this.isMenuActivo // Invierte el estado (true/false)
    },

    // --- LÓGICA MIGRADA DE SCRIPT.JS (Mejora 2: Animaciones) ---
    iniciarAnimacionesScroll() {
      // Esta función ahora se ejecuta en 'mounted'
      const elementosAnimados = document.querySelectorAll('.animar')
      const observador = new IntersectionObserver(
        (entradas) => {
          entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
              entrada.target.classList.add('visible')
            }
          })
        },
        { threshold: 0.2 },
      )

      elementosAnimados.forEach((elemento) => {
        observador.observe(elemento)
      })
    },

    // --- LÓGICA MIGRADA DE SCRIPT.JS (Mejora 3: Contador) ---
    actualizarContador() {
      const ahora = new Date()
      const diferencia = this.fechaFiestaBlanca - ahora
      if (diferencia < 0) {
        clearInterval(this.intervalo)
        this.fiestaComenzo = true
        return
      }
      this.dias = Math.floor(diferencia / (1000 * 60 * 60 * 24))
      this.horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      this.minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60))
      this.segundos = Math.floor((diferencia % (1000 * 60)) / 1000)
    },

    // --- LÓGICA DEL NEWSLETTER ---
    enviarFormulario() {
      alert('¡Gracias por suscribirte con: ' + this.email)
      this.email = '' // Limpia el input
    },
  },
  mounted() {
    // Iniciar las animaciones de scroll
    // $nextTick se asegura de que el HTML esté en la página antes de buscarlo
    this.$nextTick(() => {
      this.iniciarAnimacionesScroll()
    })

    // Iniciar el contador del evento
    this.actualizarContador() // Lo ejecutamos una vez al inicio
    this.intervalo = setInterval(this.actualizarContador, 1000) // Y luego cada segundo
  },
  beforeUnmount() {
    // Limpiamos el intervalo cuando el componente se destruye
    clearInterval(this.intervalo)
  },
}
</script>

<style>
.contenedor-principal {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
}
.section-title {
    text-align: center;
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 50px;
    text-transform: uppercase;
    letter-spacing: 2px;
}
.encabezado {
    background-color: var(--color-fondo);
    padding: 5px 0; 
    border-bottom: 1px solid var(--color-borde);
    position: sticky; 
    top: 0;
    z-index: 1000; 
}
.encabezado .contenedor-principal {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.logo{
  flex-shrink: 0;
  width: 120px;
  height: auto;
}
.navbar ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    gap: 40px;
}
.navbar a {
    color: var(--color-texto-principal);
    text-decoration: none;
    font-weight: 300;
    font-size: 14px;
    text-transform: uppercase;
    padding-bottom: 5px;
    transition: color 0.3s, border-color 0.3s;
}
.navbar a.active {
    font-weight: 700;
    border-bottom: 2px solid var(--color-principal);
}
.navbar a:hover {
    color: var(--color-principal);
}
.btn-cta {
    color: var(--color-texto-principal);
    text-decoration: none;
    font-weight: 700;
    font-size: 14px;
}
.btn-principal {
    background-color: var(--color-boton);
    color: #000000;
    padding: 12px 28px;
    text-decoration: none;
    border-radius: 50px;
    font-weight: 700;
    display: inline-block;
    border: 2px solid var(--color-boton);
    transition: transform 0.3s, background-color 0.3s;
}
.btn-principal:hover {
    transform: scale(1.05);
}
.btn-secundario {
    background-color: transparent;
    color: var(--color-boton);
    padding: 12px 28px;
    text-decoration: none;
    border-radius: 50px;
    font-weight: 700;
    display: inline-block;
    border: 2px solid var(--color-boton);
    transition: background-color 0.3s, color 0.3s;
}
.btn-secundario:hover {
    background-color: var(--color-boton);
    color: #000000;
}
.hero-section {
    display: flex;
    min-height: 85vh;
}
.hero-image {
    flex: 1.2;
    background-image: url('https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2940&auto=format&fit=crop');
    background-size: cover;
    background-position: center;
}
.hero-text {
    flex: 1;
    background-color: var(--color-fondo);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 8%;
}
.hero-text h1 { font-size: 52px; }
.hero-text .line { width: 80px; height: 3px; background-color: var(--color-principal); margin: 30px 0; }
.weekly-agenda-section { padding: 100px 0; background-color: var(--color-fondo-secundario); }
.agenda-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; }
.agenda-card {
    background-color: var(--color-tarjeta);
    padding: 40px;
    border-radius: 12px;
    border: 1px solid var(--color-borde);
    text-align: center;
    transition: transform 0.3s;
}
.agenda-card:hover { transform: translateY(-10px); }
.agenda-card h3 { color: var(--color-principal); }
.events-section { padding: 100px 0; }
.event-content { display: flex; align-items: center; gap: 60px; }
.event-image {
    flex: 1;
    height: 450px;
    background-image: url('../assets/imagenes/foto-evento.jpg');
    background-size: cover;
    background-position: center;
    border-radius: 12px;
}
.event-details { flex: 1; }
.event-card {
    background-color: var(--color-tarjeta);
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 40px;
    padding: 25px 30px;
    border-radius: 12px;
}
.location-section { padding: 100px 0; background-color: var(--color-fondo-secundario); }
.location-content { display: flex; gap: 60px; align-items: center; }
.map-container { flex: 1.5; height: 400px; border-radius: 12px; overflow: hidden; }
.map-container iframe { width: 100%; height: 100%; border: 0; }
.newsletter-section { padding: 80px 0; }
.newsletter-form { display: flex; justify-content: center; gap: 15px; max-width: 500px; margin: 0 auto; }
.newsletter-form input { width: 100%; padding: 15px; border-radius: 50px; border: 1px solid var(--color-borde); background-color: var(--color-tarjeta); color: var(--color-texto-principal); }
.newsletter-form button { background-color: var(--color-boton); color: #000; padding: 12px 28px; border-radius: 50px; border: 2px solid var(--color-boton); cursor: pointer; }
.footer { padding: 50px 0; border-top: 1px solid var(--color-borde); text-align: center; }
.social-media { display: flex; justify-content: center; gap: 30px; margin-bottom: 30px; }
.social-icon { color: var(--color-texto-principal); text-decoration: none; }
.social-icon:hover { color: var(--color-principal); }
.social-icon i { font-size: 24px; }
.footer-copyright p { font-size: 14px; color: #666; }
.menu-hamburguesa { display: none; flex-direction: column; cursor: pointer; gap: 5px; }
.menu-hamburguesa span { display: block; width: 25px; height: 3px; background-color: var(--color-texto-principal); border-radius: 3px; }
.animar { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
.animar.visible { opacity: 1; transform: translateY(0); }
#contador { display: flex; gap: 20px; margin: 30px 0; color: var(--color-boton); }
#contador div { text-align: center; }
#contador div span { font-size: 36px; font-weight: 700; }
#contador div p { font-size: 12px; margin: 0; color: var(--color-texto-secundario); }
#contador h3 { color: var(--color-boton); }
@media (max-width: 992px) {
    .hero-section, .event-content, .location-content { flex-direction: column; }
    .location-content { flex-direction: column-reverse; }
}
@media (max-width: 768px) {
    .navbar ul { display: none; flex-direction: column; position: absolute; top: 75px; left: 0; width: 100%; background-color: var(--color-fondo); text-align: center; gap: 0; }
    .navbar ul.activo { display: flex; }
    .navbar ul li { padding: 15px 0; border-top: 1px solid var(--color-borde); }
    .menu-hamburguesa { display: flex; }
    .btn-cta { display: none; }
    .agenda-grid { grid-template-columns: 1fr; }
    .hero-text h1 { font-size: 42px; }
    .section-title { font-size: 28px; }
}
</style>
