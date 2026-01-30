<script setup lang="ts">
import { ref } from "vue"
import { login, saveSession } from "@/services/AuthService"
import { useRouter } from "vue-router"

const name = ref("")
const password = ref("")
const router = useRouter()

async function handleLogin() {
  try {
    const data = await login(name.value, password.value)

    saveSession({
      token: data.token,
      role: data.role,
      email: data.email,
      name: data.name,
    })

    router.push("/home")
  } catch (err: any) {
    alert(err.message)
  }
}
</script>




<template>
  <div class="login-container">
    <!-- Overlay -->
    <div class="overlay"></div>

    <!-- Login box -->
    <div class="login-box">
      <h1 class="logo">NERFLIX</h1>
      <h2>Inicia sesión</h2>

      <input
        v-model="name"
        type="text"
        placeholder="Usuario"
      />

      <input
        v-model="password"
        type="password"
        placeholder="Contraseña"
      />

      <button @click="handleLogin">
        Iniciar sesión
      </button>

      <p class="register">
        ¿Primera vez en Nerflix?
        <span @click="$router.push('/register')">Regístrate ahora</span>
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Fondo */
.login-container {
  position: relative;
  height: 100vh;
  background: url("https://assets.nflxext.com/ffe/siteui/vlv3/0c1e9d09-4a6a-4efb-b0c7-2e2fdf5c2b39/6e0c5c62-3c8f-4d70-b67a-1f26c7c0e591/CO-es-20240115-popsignuptwoweeks-perspective_alpha_website_large.jpg")
    center / cover no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Oscurecer fondo */
.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
}

/* Caja */
.login-box {
  position: relative;
  z-index: 1;
  background: rgba(0, 0, 0, 0.75);
  padding: 60px 40px;
  width: 100%;
  max-width: 380px;
  color: #fff;
  border-radius: 6px;
}

/* Logo */
.logo {
  color: #e50914;
  font-size: 36px;
  font-weight: 900;
  margin-bottom: 20px;
}

/* Título */
.login-box h2 {
  margin-bottom: 20px;
}

/* Inputs */
.login-box input {
  width: 100%;
  padding: 14px;
  margin-bottom: 16px;
  background: #333;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 15px;
}

.login-box input::placeholder {
  color: #8c8c8c;
}

.login-box input:focus {
  outline: none;
  background: #454545;
}

/* Botón */
.login-box button {
  width: 100%;
  padding: 14px;
  background: #e50914;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
}

.login-box button:hover {
  background: #f6121d;
}

/* Register */
.register {
  margin-top: 20px;
  color: #b3b3b3;
  font-size: 14px;
}

.register span {
  color: #fff;
  cursor: pointer;
}

.register span:hover {
  text-decoration: underline;
}
</style>
