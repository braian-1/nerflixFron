# vue-fisrt

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```




¡Perfecto! 😎 Entonces podemos usar APIs gratuitas que no requieren registro ni API key para tener películas, series y podcasts de prueba. No van a ser tan completas como TMDB, pero sirven perfecto para tu demo o proyecto.

Te propongo esta combinación:

1️⃣ Películas y series gratis — Sample JSON

Podemos usar https://ghibliapi.herokuapp.com/films
 para películas (Studio Ghibli) y https://api.sampleapis.com/movies
 para más contenido de películas y series.

Ejemplo de películas:

https://ghibliapi.herokuapp.com/films
Devuelve JSON con título, descripción, imagen (movie_banner o image).

https://api.sampleapis.com/movies/action
JSON de películas de acción.

Ejemplo de series:

https://api.sampleapis.com/series/futurama

Podcasts:

iTunes Search API (sin API key) funciona perfecto:

https://itunes.apple.com/search?term=podcast&media=podcast&limit=20

2️⃣ Crear un servicio para consumir estas APIs

Crea ContentService.ts así:

import axios from "axios";

export class ContentService {
  // Películas de Studio Ghibli
  static async getGhibliMovies() {
    const res = await axios.get("https://ghibliapi.herokuapp.com/films");
    return res.data;
  }

  // Películas de sampleapis
  static async getActionMovies() {
    const res = await axios.get("https://api.sampleapis.com/movies/action");
    return res.data;
  }

  static async getComedyMovies() {
    const res = await axios.get("https://api.sampleapis.com/movies/comedy");
    return res.data;
  }

  // Series de sampleapis
  static async getFuturamaSeries() {
    const res = await axios.get("https://api.sampleapis.com/series/futurama");
    return res.data;
  }

  // Podcasts
  static async getPodcasts() {
    const res = await axios.get(
      "https://itunes.apple.com/search",
      { params: { term: "podcast", media: "podcast", limit: 20 } }
    );
    return res.data.results;
  }
}

3️⃣ Usar en tu HomeUserView.vue
import { ref, onMounted } from "vue";
import { ContentService } from "@/services/ContentService";

const ghibliMovies = ref<any[]>([]);
const actionMovies = ref<any[]>([]);
const comedyMovies = ref<any[]>([]);
const futuramaSeries = ref<any[]>([]);
const podcasts = ref<any[]>([]);

onMounted(async () => {
  ghibliMovies.value = await ContentService.getGhibliMovies();
  actionMovies.value = await ContentService.getActionMovies();
  comedyMovies.value = await ContentService.getComedyMovies();
  futuramaSeries.value = await ContentService.getFuturamaSeries();
  podcasts.value = await ContentService.getPodcasts();
});

4️⃣ Mostrar las películas en carruseles
<section class="movie-section">
  <h2>Películas Ghibli</h2>
  <div class="movie-row" ref="ghibliRow" tabindex="0">
    <div class="movie-card" v-for="movie in ghibliMovies" :key="movie.id">
      <img :src="movie.image || movie.movie_banner" />
      <p>{{ movie.title }}</p>
    </div>
  </div>
</section>

<section class="movie-section">
  <h2>Películas Acción</h2>
  <div class="movie-row" ref="actionRow" tabindex="0">
    <div class="movie-card" v-for="movie in actionMovies" :key="movie.id">
      <img :src="movie.posterURL || 'https://via.placeholder.com/300x450'" />
      <p>{{ movie.title }}</p>
    </div>
  </div>
</section>


Haz lo mismo para comedia, series y podcasts.

5️⃣ Admin vs User

Igual que antes: solo el admin ve los botones de agregar, editar y eliminar:

<div v-if="user.role === 'admin'" class="admin-buttons">
  <button @click="editItem(item)">✏ Editar</button>
  <button @click="deleteItem(item)">🗑 Eliminar</button>
</div>


💡 Ventajas de esto:

100% gratis

No necesitas API Key

Funciona en cualquier proyecto Vue local o deploy

Puedes tener secciones de películas, series y podcasts

Si quieres, puedo reescribir tu HomeUserView.vue completo usando estas APIs gratuitas, con:

Carruseles arrastrables y con flechas

Secciones de películas, series y podcasts

Perfil del usuario

Botones solo para admin

Barra de búsqueda

De esa manera tendrías un Netflix totalmente funcional y realista sin depender de APIs de pago.

¿Quieres que haga eso?
