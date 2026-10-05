import axios from 'axios'

export const API = import.meta.env.VITE_API_URL || 'http://localhost:8080'

const api = axios.create({ baseURL: `${API}/api` })

// attach the JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('sb_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// if the token is expired or invalid, go back to login
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && !err.config.url.includes('/auth/login')) {
      localStorage.removeItem('sb_token')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

// image URLs from the backend are like /uploads/abc.jpg


export const imgUrl = (u) => {
  if (!u) return ''
  if (u.startsWith('http') || u.startsWith('data:')) return u
  if (u.startsWith('/uploads/')) return `${API}${u}`
  return ''   // junk values like "string" show the fallback
}
export default api