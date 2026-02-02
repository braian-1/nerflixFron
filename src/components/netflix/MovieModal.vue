<script setup lang="ts">
import { ref } from "vue"

const props = defineProps<{ movie: any }>()
const emit = defineEmits(["close"])

const imageBase = "https://image.tmdb.org/t/p/original"
const playing = ref(false)

const playMovie = () => {
  playing.value = true
}
</script>

<template>
  <div class="backdrop" @click.self="emit('close')">
    <div class="modal">

      <!-- 🎬 PLAYER -->
      <div v-if="playing" class="player">
        <iframe
          :src="`https://player.embed-api.stream/?id=${movie.id}&type=${movie.media_type === 'tv' ? 'tv' : 'movie'}`"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>

      <!-- 🖼️ INFO -->
      <template v-else>
        <img
          :src="imageBase + movie.backdrop_path"
          class="banner"
        />

        <div class="content">
          <h2>{{ movie.title || movie.name }}</h2>

          <div class="meta">
            <span>⭐ {{ movie.vote_average }}</span>
            <span v-if="movie.release_date">📅 {{ movie.release_date }}</span>
          </div>

          <p>{{ movie.overview }}</p>

          <div class="actions">
            <button class="play" @click="playMovie">▶ Reproducir</button>
            <button class="close" @click="emit('close')">Cerrar</button>
          </div>
        </div>
      </template>

    </div>
  </div>
</template>

<style scoped>
.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 300;
}

.modal {
  width: 90%;
  max-width: 1000px;
  background: #141414;
  border-radius: 12px;
  overflow: hidden;
}

.banner {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.content {
  padding: 24px;
  color: white;
}

.meta {
  display: flex;
  gap: 15px;
  margin-bottom: 10px;
  color: #bbb;
}

.actions {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}

.play {
  background: #e50914;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.close {
  background: #333;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.player iframe {
  width: 100%;
  height: 560px;
}
</style>
