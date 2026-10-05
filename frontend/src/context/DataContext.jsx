import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import api from '../api'
import {
  initialServices, initialTestimonials, initialFaqs, settings as initialSettings,
} from '../data/mock'

const Ctx = createContext()
export const useData = () => useContext(Ctx)

export function DataProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('sb_token'))

  // ---------- Projects (backend) ----------
  const [projects, setProjects] = useState([])

  const loadProjects = useCallback(async () => {
    try {
      const url = localStorage.getItem('sb_token') ? '/admin/projects' : '/public/projects'
      const { data } = await api.get(url)
      setProjects(data)
    } catch (e) {
      console.error('Could not load projects', e)
    }
  }, [])

  useEffect(() => { loadProjects() }, [loadProjects, loggedIn])

  const saveProject = async (p) => {
    try {
      if (p.id) await api.put(`/admin/projects/${p.id}`, p)
      else await api.post('/admin/projects', p)
      await loadProjects()
    } catch (e) {
      alert('Save failed: ' + JSON.stringify(e.response?.data || e.message))
    }
  }

  const deleteProject = async (id) => {
    try {
      await api.delete(`/admin/projects/${id}`)
      await loadProjects()
    } catch {
      alert('Delete failed')
    }
  }

  // ---------- Employees (backend) ----------
  const [employees, setEmployees] = useState([])

  const loadEmployees = useCallback(async () => {
    if (!localStorage.getItem('sb_token')) return setEmployees([])
    try {
      const { data } = await api.get('/admin/employees')
      setEmployees(data)
    } catch (e) {
      console.error('Could not load employees', e)
    }
  }, [])

  useEffect(() => { loadEmployees() }, [loadEmployees, loggedIn])

  const saveEmployee = async (emp) => {
    try {
      if (emp.id) await api.put(`/admin/employees/${emp.id}`, emp)
      else await api.post('/admin/employees', emp)
      await loadEmployees()
    } catch (e) {
      alert('Save failed: ' + JSON.stringify(e.response?.data || e.message))
    }
  }

  const deleteEmployee = async (id) => {
    try {
      await api.delete(`/admin/employees/${id}`)
      await loadEmployees()
    } catch {
      alert('Delete failed')
    }
  }

  // ---------- Quote requests (backend) ----------
  const [quotes, setQuotes] = useState([])

  const loadQuotes = useCallback(async () => {
    if (!localStorage.getItem('sb_token')) return setQuotes([])
    try {
      const { data } = await api.get('/admin/quotes')
      setQuotes(data)
    } catch (e) {
      console.error('Could not load quotes', e)
    }
  }, [])

  useEffect(() => {
    loadQuotes()
    if (!loggedIn) return
    const t = setInterval(loadQuotes, 30000)   // pick up new customer requests every 30 s
    return () => clearInterval(t)
  }, [loadQuotes, loggedIn])

  // customer form (public, no login). Returns true/false
  const addQuote = async (q) => {
    try {
      await api.post('/public/quote', {
        name: q.name, phone: q.phone, email: q.email, service: q.service, message: q.message,
      })
      return true
    } catch {
      return false
    }
  }

  const updateQuote = async (id, patch) => {
    try {
      await api.patch(`/admin/quotes/${id}`, patch)
      await loadQuotes()
    } catch {
      alert('Update failed')
    }
  }

  const deleteQuote = async (id) => {
    try {
      await api.delete(`/admin/quotes/${id}`)
      await loadQuotes()
    } catch {
      alert('Delete failed')
    }
  }

  // ---------- Login ----------
  const login = async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password })
      localStorage.setItem('sb_token', data.token)
      setLoggedIn(true)
      return true
    } catch {
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('sb_token')
    setLoggedIn(false)
  }

  // ---------- STILL IN MEMORY (connected in the next batch) ----------
  const [services, setServices] = useState(initialServices)
  const [testimonials, setTestimonials] = useState(initialTestimonials)
  const [faqs, setFaqs] = useState(initialFaqs)
  const [settings, setSettings] = useState(initialSettings)

  const save = (setter) => (item) =>
    setter((list) =>
      item.id ? list.map((i) => (i.id === item.id ? item : i))
              : [...list, { ...item, id: Date.now() }])
  const remove = (setter) => (id) => setter((list) => list.filter((i) => i.id !== id))

  return (
    <Ctx.Provider value={{
      loggedIn, login, logout,
      projects, saveProject, deleteProject,
      employees, saveEmployee, deleteEmployee,
      quotes, addQuote, updateQuote, deleteQuote,
      services, testimonials, faqs, settings,
      saveService: save(setServices), deleteService: remove(setServices),
      saveTestimonial: save(setTestimonials), deleteTestimonial: remove(setTestimonials),
      saveFaq: save(setFaqs), deleteFaq: remove(setFaqs),
      updateSettings: setSettings,
    }}>
      {children}
    </Ctx.Provider>
  )
}