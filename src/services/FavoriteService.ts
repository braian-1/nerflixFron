export function getFavorites() {
  const favs = localStorage.getItem("favorites")
  return favs ? JSON.parse(favs) : []
}

export function isFavorite(movie: any) {
  return getFavorites().some((f: any) => f.id === movie.id)
}

export function toggleFavorite(movie: any) {
  let favs = getFavorites()
  const exists = favs.some((f: any) => f.id === movie.id)

  if (exists) {
    favs = favs.filter((f: any) => f.id !== movie.id)
  } else {
    favs.push(movie)
  }

  localStorage.setItem("favorites", JSON.stringify(favs))
}
