import { useState } from 'react'
import { NavLink, Outlet, Navigate } from 'react-router-dom'
import { useData } from '../context/DataContext'

const links = [
  ['/admin', 'Dashboard'], ['/admin/projects', 'Projects'], ['/admin/employees', 'Employees'],
  ['/admin/quotes', 'Quote Requests'], ['/admin/services', 'Services'],
  ['/admin/testimonials', 'Testimonials'], ['/admin/faqs', 'FAQ'], ['/admin/settings', 'Settings'],
]

export default function Layout() {
  const { loggedIn, logout, quotes } = useData()
  const [open, setOpen] = useState(false)
  if (!loggedIn) return <Navigate to="/login" replace />
  const newCount = quotes.filter((q) => q.status === 'New').length

  return (
    <div className="min-h-screen md:flex">
      {/* mobile top bar */}
      <div className="md:hidden bg-slate-900 text-white flex items-center justify-between px-4 h-14 sticky top-0 z-30">
        <span className="font-bold">SB <span className="text-yellow-400">Admin</span></span>
        <button onClick={() => setOpen(true)} className="text-2xl" aria-label="Menu">☰</button>
      </div>

      {/* dark backdrop on mobile when the drawer is open */}
      {open && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setOpen(false)} />}

      <aside className={`fixed md:static inset-y-0 left-0 z-50 w-60 bg-slate-900 text-white p-5 shrink-0 flex flex-col
        transform transition-transform ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <h2 className="text-xl font-bold mb-8">SB <span className="text-yellow-400">Admin</span></h2>
        <nav className="space-y-1 flex-1">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/admin'} onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex justify-between px-3 py-2 rounded ${isActive ? 'bg-yellow-400 text-black font-semibold' : 'hover:bg-slate-800'}`}>
              {label}
              {label === 'Quote Requests' && newCount > 0 && <span className="bg-red-500 text-white text-xs rounded-full px-2">{newCount}</span>}
            </NavLink>
          ))}
        </nav>
        <NavLink to="/" className="text-sm text-gray-400 mb-2">← View website</NavLink>
        <button onClick={logout} className="text-left text-sm text-red-400">Logout</button>
      </aside>

      <main className="flex-1 min-w-0 p-4 md:p-6"><Outlet /></main>
    </div>
  )
}