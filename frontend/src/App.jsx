import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Employees from './pages/Employees'
import Services from './pages/Services'
import Testimonials from './pages/Testimonials'
import Faqs from './pages/Faqs'
import Quotes from './pages/Quotes'
import Settings from './pages/Settings'
import Login from './pages/Login'
import SiteLayout from './components/site/SiteLayout'
import Home from './pages/site/Home'
import ProjectsPage from './pages/site/ProjectsPage'
import Contact from './pages/site/Contact'

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="projects" element={<Projects />} />
        <Route path="employees" element={<Employees />} />
        <Route path="quotes" element={<Quotes />} />
        <Route path="services" element={<Services />} />
        <Route path="testimonials" element={<Testimonials />} />
        <Route path="faqs" element={<Faqs />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}