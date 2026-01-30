<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import HeroMovie from "@/components/netflix/HeroMovie.vue"
import MovieRow from "@/components/netflix/MovieRow.vue"
import MovieModal from "@/components/netflix/MovieModal.vue"
import { isAdmin, logout } from "@/services/AuthService"
import { TmdbService } from "@/services/TmdbService"
import { useRouter } from "vue-router"

const router = useRouter()

const filter = ref<"all" | "movies" | "series" | "list">("all")

const popularMovies = ref<any[]>([])
const topMovies = ref<any[]>([])
const popularSeries = ref<any[]>([])
const selected = ref<any>(null)

const isAdminUser = computed(() => isAdmin())

/* 👤 USER INFO */
const user = ref<{ username:string; email:string; role:string } | null>(null)
const showProfile = ref(false)

onMounted(() => {
  const data = localStorage.getItem("user")
  if (data) user.value = JSON.parse(data)
})

function handleLogout() {
  logout()
  router.push("/login")
}

/* 🔍 SEARCH */
const search = ref("")
const results = ref<any[]>([])
const showResults = ref(false)

const imageSmall = "https://image.tmdb.org/t/p/w92"

async function onSearch() {
  if (search.value.trim().length < 2) {
    results.value = []
    showResults.value = false
    return
  }

  const data = await TmdbService.searchMulti(search.value)
  results.value = data.results
    .filter((r:any) => r.poster_path)
    .slice(0,6)
  showResults.value = true
}

function openDetails(item:any) {
  selected.value = item
  search.value = ""
  showResults.value = false
}

/* 🎬 DATA */
onMounted(async () => {
  const movies = await TmdbService.getPopularMovies(1)
  popularMovies.value = movies.results.filter((m:any)=>m.poster_path)

  const top = await TmdbService.getTopRatedMovies()
  topMovies.value = top.results.slice(0,10)

  const series = await TmdbService.getPopularSeries(1)
  popularSeries.value = series.results.filter((s:any)=>s.poster_path)
})
</script>

<template>
  <div class="home-container">

    <!-- 🔥 HEADER -->
    <header class="header">
      <div class="left">
        <span class="logo">NERFLIX</span>

        <nav>
          <span @click="filter='all'">Inicio</span>
          <span @click="filter='movies'">Películas</span>
          <span @click="filter='series'">Series</span>
          <span @click="filter='list'">Mi lista</span>
        </nav>
      </div>

      <!-- RIGHT -->
      <div class="right">

        <!-- 🔍 SEARCH -->
        <div class="search-box">
          <input
            v-model="search"
            placeholder="Buscar películas o series..."
            @input="onSearch"
            @focus="showResults = true"
          />

          <div v-if="showResults && results.length" class="search-results">
            <div
              v-for="item in results"
              :key="item.id"
              class="result"
              @click="openDetails(item)"
            >
              <img :src="imageSmall + item.poster_path" />
              <span>{{ item.title || item.name }}</span>
            </div>
          </div>
        </div>

        <!-- 👤 PROFILE -->
        <div class="profile" @click="showProfile = !showProfile">
          <div class="avatar">{{ user?.username?.charAt(0).toUpperCase() }}</div>

          <div v-if="showProfile" class="profile-menu">
            <p><strong>{{ user?.username }}</strong></p>
            <p>{{ user?.email }}</p>
            <p class="role">{{ user?.role }}</p>
            <hr />
            <button @click.stop="handleLogout">Cerrar sesión</button>
          </div>
        </div>

      </div>
    </header>

    <!-- ➕ ADMIN -->
    <button v-if="isAdminUser" class="upload-btn">➕</button>

    <!-- HERO -->
    <HeroMovie v-if="popularMovies.length && filter !== 'series'" :movies="popularMovies"/>

    <!-- 🎬 ROWS -->
    <MovieRow
      v-if="filter !== 'series'"
      title="🔥 Películas Populares"
      :items="popularMovies"
      @details="selected = $event"
    />

    <MovieRow
      v-if="filter !== 'series'"
      title="⭐ Top 10 Películas"
      :items="topMovies"
      @details="selected = $event"
    />

    <MovieRow
      v-if="filter !== 'movies'"
      title="📺 Series Populares"
      :items="popularSeries"
      @details="selected = $event"
    />

    <MovieModal
      v-if="selected"
      :movie="selected"
      @close="selected = null"
    />
  </div>
</template>

<style scoped>
.home-container {
  background:#141414;
  min-height:100vh;
  color:white;
  padding-top:70px;
}

/* HEADER */
.header {
  position:fixed;
  top:0;
  width:100%;
  height:70px;
  padding:0 40px;
  background:rgba(20,20,20,.96);
  display:flex;
  justify-content:space-between;
  align-items:center;
  z-index:200;
}

.left {
  display:flex;
  align-items:center;
  gap:35px;
}

.right {
  display:flex;
  align-items:center;
  gap:20px;
}

.logo {
  font-size:28px;
  color:#e50914;
  font-weight:bold;
}

nav span {
  margin-right:18px;
  cursor:pointer;
  color:#ddd;
  font-size:15px;
}

nav span:hover {
  color:white;
}

/* SEARCH */
.search-box {
  position:relative;
}

.search-box input {
  width:240px;
  padding:7px 10px;
  background:#000;
  border:1px solid #333;
  color:white;
  border-radius:4px;
}

.search-results {
  position:absolute;
  top:42px;
  right:0;
  width:320px;
  background:#141414;
  border-radius:6px;
  overflow:hidden;
}

.result {
  display:flex;
  align-items:center;
  gap:10px;
  padding:8px;
  cursor:pointer;
}

.result img {
  width:40px;
  border-radius:4px;
}

.result:hover {
  background:#222;
}

/* PROFILE */
.profile {
  position:relative;
  cursor:pointer;
}

.avatar {
  width:36px;
  height:36px;
  background:#e50914;
  border-radius:6px;
  display:flex;
  align-items:center;
  justify-content:center;
  font-weight:bold;
}

.profile-menu {
  position:absolute;
  right:0;
  top:48px;
  background:#141414;
  padding:12px;
  border-radius:6px;
  width:220px;
}

.profile-menu p {
  margin:4px 0;
  font-size:14px;
}

.role {
  color:#e50914;
  font-weight:bold;
}

.profile-menu hr {
  border:0;
  border-top:1px solid #333;
  margin:8px 0;
}

.profile-menu button {
  width:100%;
  background:#e50914;
  border:none;
  padding:8px;
  color:white;
  cursor:pointer;
  border-radius:4px;
}

/* ADMIN BTN */
.upload-btn {
  position:fixed;
  right:30px;
  bottom:30px;
  background:#e50914;
  color:white;
  border:none;
  padding:18px;
  border-radius:50%;
  font-size:22px;
  cursor:pointer;
  z-index:300;
}
</style>
