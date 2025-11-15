<template>
  <footer class="footer">
    <div class="contenedor-footer">
      <div class="footer-info">
        <h3>PACHA.</h3>
        <p>La mejor fiesta de Bolivia.</p>
      </div>
      <div class="footer-redes">
        <h4>Síguenos en nuestras redes</h4>
        <div class="redes-sociales">
          <a
            v-for="link in socialLinks"
            :key="link.name"
            :href="link.url"
            target="_blank"
            class="enlace-red-social"
          >
            <img :src="link.icon" :alt="link.name" width="24" />
          </a>
        </div>
      </div>
    </div>

    <div class="footer-inferior">
      <p>© PACHA La Paz, {{ new Date().getFullYear() }}. Todos los derechos reservados.</p>
    </div>
  </footer>
</template>

<script setup>
const socialLinks = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/pacha_bolivian_sunsets/?hl=es",
    icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg"
  },
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@pachaboliviansunsets",
    icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/tiktok.svg"
  },
  {
    name: "WhatsApp",
    url: "https://api.whatsapp.com/send/?phone=59176007750",
    icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/whatsapp.svg"
  }
];
</script>

<style scoped>
.footer {
  background-color: #000000;
  color: #fff;
  padding: 40px 20px 20px 20px;
  font-family: Arial, sans-serif;
}

.contenedor-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 450px; 
  max-width: 1200px;
  margin: 0 auto;
}

.footer-info h3 {
  font-size: 24px;
  margin-bottom: 10px;

}

.footer-info p {
  font-size: 14px;
  color: #ccc;
}

.footer-redes h4 {
  font-size: 16px;
  margin-bottom: 10px;
}

.redes-sociales {
  display: flex;
  gap: 12px;
}

.enlace-red-social img {
  filter: brightness(0) invert(1); 
  transition: transform 0.3s;
}

.enlace-red-social img:hover {
  transform: scale(1.2);
}

.footer-inferior {
  text-align: center;
  margin-top: 30px;
  font-size: 13px;
  color: #888;
}
</style>
