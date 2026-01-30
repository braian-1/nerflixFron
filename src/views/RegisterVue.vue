<script setup lang="ts">
import { ref } from "vue";
import api from "@/services/http";
import { useRouter } from "vue-router";

const name = ref("");
const email = ref("");
const password = ref("");
const router = useRouter();

async function handleRegister() {
  try {
    await api.post("/auth/register", {
      name: name.value,
      email: email.value,
      password: password.value,
      Role: "user"
    });

    alert("Registro exitoso, ahora inicia sesión");
    router.push("/");
  } catch (error) {
    alert("Error al registrarse");
  }
}
</script>


<template>
  <div class="register-container">
    <div class="overlay"></div>

    <div class="register-box">
      <h1 class="logo">NERFLIX</h1>
      <h2>Regístrate</h2>

      <input
        v-model="name"
        type="text"
        placeholder="Usuario"
      />

      <input
        v-model="email"
        type="email"
        placeholder="Email"
      />

      <input
        v-model="password"
        type="password"
        placeholder="Contraseña"
      />

      <button @click="handleRegister">
        Registrarse
      </button>

      <p class="login">
        ¿Ya tienes una cuenta? 
        <span @click="$router.push('/')">Inicia sesión</span>
      </p>
    </div>
  </div>
</template>

<style scoped>
.register-container {
  position: relative;
  min-height: 100vh;
  width: 100vw;
  background: url("https://assets.nflxext.com/ffe/siteui/vlv3/0c1e9d09-4a6a-4efb-b0c7-2e2fdf5c2b39/6e0c5c62-3c8f-4d70-b67a-1f26c7c0e591/CO-es-20240115-popsignuptwoweeks-perspective_alpha_website_large.jpg")
    center / cover no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
}

.register-box {
  position: relative;
  z-index: 1;
  background: rgba(0, 0, 0, 0.75);
  padding: 60px 40px;
  width: 100%;
  max-width: 380px;
  color: #fff;
  border-radius: 6px;
}

.logo {
  color: #e50914;
  font-size: 36px;
  font-weight: 900;
  margin-bottom: 20px;
}

.register-box h2 {
  margin-bottom: 20px;
}

.register-box input {
  width: 100%;
  padding: 14px;
  margin-bottom: 16px;
  background: #333;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 15px;
}

.register-box input::placeholder {
  color: #8c8c8c;
}

.register-box input:focus {
  outline: none;
  background: #454545;
}

.register-box button {
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

.register-box button:hover {
  background: #f6121d;
}

.login {
  margin-top: 20px;
  color: #b3b3b3;
  font-size: 14px;
}

.login span {
  color: #fff;
  cursor: pointer;
}

.login span:hover {
  text-decoration: underline;
}
</style>
