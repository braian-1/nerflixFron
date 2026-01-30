<template>
  <section class="section">
    <h2>{{ title }}</h2>

    <div class="row">
      <div
        v-for="item in items"
        :key="item.id"
        class="card"
      >
        <img
          v-if="item.poster_path"
          :src="`${IMAGE_BASE}${item.poster_path}`"
          :alt="item.title || item.name"
        />

        <div v-else class="no-image">
          Sin imagen
        </div>

        <button class="fav-btn" @click="toggleFav(item)">
          ⭐
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { TmdbMovie } from "@/services/TmdbService";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

defineProps<{
  title: string;
  items: TmdbMovie[];
}>();

function toggleFav(item: TmdbMovie) {
  let favs = JSON.parse(localStorage.getItem("favorites") || "[]");
  const exists = favs.some((f: any) => f.id === item.id);

  favs = exists
    ? favs.filter((f: any) => f.id !== item.id)
    : [...favs, item];

  localStorage.setItem("favorites", JSON.stringify(favs));
}
</script>

<style scoped>
.section {
  padding: 30px;
}

.row {
  display: flex;
  gap: 12px;
  overflow-x: auto;
}

.card {
  position: relative;
  min-width: 200px;
}

.card img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 6px;
}

.no-image {
  width: 200px;
  height: 300px;
  background: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
  border-radius: 6px;
}

.fav-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #e50914;
  border: none;
  padding: 6px;
  border-radius: 50%;
  cursor: pointer;
}
</style>
