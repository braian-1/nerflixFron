<script setup lang="ts">
import MovieCard from "./MovieCard.vue"
defineProps<{ title:string; items:any[] }>()
</script>

<template>
  <section class="row">
    <h2>{{ title }}</h2>
    <div class="list">
      <MovieCard
        v-for="item in items"
        :key="item.id"
        :movie="item"
        @details="$emit('details',$event)"
      />
    </div>
  </section>
</template>

<style scoped>
.row {
  padding:20px 40px;
}

.list {
  display:flex;
  gap:14px;
  overflow-x:auto;
}
</style>
