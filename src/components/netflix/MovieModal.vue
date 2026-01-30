<script setup lang="ts">
defineProps<{ movie:any }>()
const imageBase="https://image.tmdb.org/t/p/original"
</script>

<template>
  <div class="backdrop" @click.self="$emit('close')">
    <div class="modal">
      <img :src="imageBase + movie.backdrop_path" class="banner"/>

      <div class="content">
        <h2>{{ movie.title || movie.name }}</h2>

        <div class="meta">
          <span>⭐ {{ movie.vote_average }}</span>
          <span v-if="movie.release_date">📅 {{ movie.release_date }}</span>
          <span v-if="movie.runtime">⏱ {{ movie.runtime }} min</span>
        </div>

        <p>{{ movie.overview }}</p>

        <button @click="$emit('close')">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.backdrop {
  position:fixed;
  inset:0;
  background:rgba(0,0,0,.85);
  display:flex;
  justify-content:center;
  align-items:center;
  z-index:300;
}

.modal {
  max-width:900px;
  max-height:90vh;
  overflow-y:auto;
  background:#141414;
  border-radius:12px;
}

.banner {
  width:100%;
  height:350px;
  object-fit:cover;
}

.content {
  padding:24px;
  color:white;
}

.meta {
  display:flex;
  gap:15px;
  margin-bottom:10px;
  color:#bbb;
}
</style>
