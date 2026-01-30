<script setup lang="ts">
import { isAdmin } from "@/services/AuthService"

defineProps<{ movie: any }>()
const imageBase = "https://image.tmdb.org/t/p/w500"
</script>

<template>
  <div class="card">
    <img :src="imageBase + movie.poster_path" />

    <div class="overlay">
      <button @click="$emit('details', movie)">Ver detalles</button>

      <template v-if="isAdmin()">
        <button class="edit">✏️</button>
        <button class="delete">🗑</button>
      </template>
    </div>
  </div>
</template>

<style scoped>
.card {
  position: relative;
  width: 220px;      /* 🔥 MÁS GRANDE */
  height: 330px;
  flex-shrink: 0;
}

.card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,.75);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  opacity: 0;
  transition: .3s;
}

.card:hover .overlay {
  opacity: 1;
}

.overlay button {
  padding: 8px 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
  background: #e50914;
}

.edit { background: #ffa500; }
.delete { background: #b00020; }
</style>
