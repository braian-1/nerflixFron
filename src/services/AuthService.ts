const API_URL = import.meta.env.VITE_API_URL

if (!API_URL) {
  throw new Error("VITE_API_URL no está definido en el .env")
}

const TOKEN_KEY = "token"
const USER_KEY = "user"

/* =========================
   AUTH REQUESTS
========================= */

export async function register(
  name: string,
  password: string,
  email: string,
  role: string = "User"
) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, password, email, role }),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || "Error al registrar")
  }

  return res.json()
}

export async function login(name: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, password }),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || "Credenciales incorrectas")
  }

  return res.json()
}

/* =========================
   SESSION
========================= */

export function saveSession(data: {
  token: string
  role: string
  email?: string
  name?: string
}) {
  localStorage.setItem(TOKEN_KEY, data.token)
  localStorage.setItem(
    USER_KEY,
    JSON.stringify({
      role: data.role,
      email: data.email,
      name: data.name,
    })
  )
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export function isLoggedIn(): boolean {
  return !!localStorage.getItem(TOKEN_KEY)
}

export function isAdmin(): boolean {
  const user = localStorage.getItem(USER_KEY)
  if (!user) return false

  try {
    return JSON.parse(user).role === "Admin"
  } catch {
    return false
  }
}

export function getUser() {
  const user = localStorage.getItem(USER_KEY)
  return user ? JSON.parse(user) : null
}
