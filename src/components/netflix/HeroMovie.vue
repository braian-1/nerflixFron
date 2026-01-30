<template>
  <section
    v-if="currentMovie"
    class="hero"
    :style="{ backgroundImage: `url(${imageBase}${currentMovie.backdrop_path})` }"
  >
    <div class="overlay"></div>
    <div class="content">
      <h1>{{ currentMovie.title || currentMovie.name }}</h1>
      <p>{{ currentMovie.overview }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from "vue";

const props = defineProps<{ movies: any[] }>();
const imageBase = "https://image.tmdb.org/t/p/original";
const currentMovie = ref<any>(null);

let index = 0;
let interval: any = null;

watch(
  () => props.movies,
  (movies) => {
    if (movies.length) {
      currentMovie.value = movies[0];
      clearInterval(interval);
      interval = setInterval(() => {
        index = (index + 1) % movies.length;
        currentMovie.value = movies[index];
      }, 10000);
    }
  },
  { immediate: true }
);

onUnmounted(() => clearInterval(interval));
</script>

<style scoped>
.hero {
  height: 70vh;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  padding: 60px;
  position: relative;
}
.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, #141414, transparent);
}
.content {
  position: relative;
  z-index: 2;
  max-width: 600px;
}
</style>
