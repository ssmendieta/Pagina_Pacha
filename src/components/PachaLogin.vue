<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const statusMessage = ref('')
    const statusColor = ref('')
    const isLoading = ref(false)
    const router = useRouter()  

    function handleLogin() {
      statusMessage.value = ""
      isLoading.value = false

      if (email.value === "" || password.value === "") {
        statusMessage.value = "ERROR: Por favor, complete todos los campos."
        statusColor.value = "var(--color-accent-red)"
      } else if (password.value.length < 6) {
        statusMessage.value =
          "ERROR: La contraseña debe tener al menos 6 caracteres."
        statusColor.value = "var(--color-accent-red)"
      } else {
        statusMessage.value = `¡Acceso concedido a ${email.value}! Redirigiendo...`
        statusColor.value = "var(--color-text-light)"
        isLoading.value = true

        setTimeout(() => {
          isLoading.value = false
          router.push('/inicio')  
        }, 2000)
      }
    }

    return { email, password, statusMessage, statusColor, isLoading, handleLogin }
  }
}
</script>


<template>
  <main class="login-background">
    <section class="login-card">
      <header class="header-card">
        <img
          src="../assets/imagenes/llamita-amarilla.png"
          alt="Logo Llama"
          class="logo-llama"
        />
        <h1>BIENVENIDO A PACHA</h1>
        <p>Inicia sesión en una noche inolvidable</p>
      </header>

      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label for="email">E-MAIL</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="tu.correo@ejemplo.com"
            required
          />
        </div>

        <div class="input-group">
          <label for="password">CONTRASEÑA</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="••••••••"
            required
          />
        </div>

        <button type="submit" class="cta-button" :disabled="isLoading">
          {{ isLoading ? "ACCEDIENDO..." : "INGRESAR" }}
        </button>
      </form>

      <p
        v-if="statusMessage"
        id="status-message"
        :style="{ color: statusColor }"
      >
        {{ statusMessage }}
      </p>

      <footer class="footer-card">
        <p><router-link to="/inicio">← Volver al Inicio</router-link></p>
        <a href="#" class="link-forgot">¿Olvidaste tu contraseña?</a>
        <p>
          ¿No tienes cuenta?
          <a href="registro.html" class="link-register">Regístrate aquí</a>
        </p>
      </footer>
    </section>
  </main>
</template>

<style scoped>
.login-background {
  width: 100%;
  height: 100vh;
  background-image: url("../assets/imagenes/login-fondo.jpg");
  background-size: cover;
  background-position: center;
  display: flex;           
  justify-content: center;
  align-items: center; 
}

.login-card {
  background: rgba(10, 10, 10, 0.7);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 40px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  width: 90%;
  max-width: 400px;
}

.header-card h1 {
  font-family: var(--font-heading);
  color: var(--color-primary-white);
  font-size: 2em;
  margin: 10px 0;
}

.logo-llama {
  width: 40px;
  height: auto;
}

.input-group {
  text-align: left;
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  color: var(--color-text-light);
  font-size: 0.8em;
  font-weight: 600;
}

.input-group input {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid var(--color-accent-gold);
  border-radius: 10px;
  background-color: transparent;
  color: var(--color-primary-white);
  font-size: 1em;
  outline: none;
  transition: border-color 0.3s;
}

.input-group input::placeholder {
  color: #555;
}

.input-group input:focus {
  border-color: var(--color-primary-white);
}

.cta-button:disabled {
  cursor: not-allowed;
  opacity: 0.7;
  background-color: #4caf50 !important;
}

.cta-button {
  width: 100%;
  padding: 15px;
  background: var(--color-accent-gold);
  color: var(--color-dark-bg);
  border: none;
  border-radius: 10px;
  font-size: 1.1em;
  font-weight: 700;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s, transform 0.1s;
}

.cta-button:hover {
  background: #ffdb4d;
}

.footer-card {
  margin-top: 20px;
  font-size: 0.9em;
}

.footer-card a {
  color: var(--color-accent-gold);
  text-decoration: none;
  transition: color 0.3s;
}

.footer-card a:hover {
  color: var(--color-primary-white);
  text-decoration: underline;
}

.link-forgot {
  display: block;
  margin-bottom: 15px;
}

@media (max-width: 600px) {
  .login-card {
    padding: 30px 20px;
    margin: 20px;
  }

  .header-card h1 {
    font-size: 1.5em;
  }
}
</style>
