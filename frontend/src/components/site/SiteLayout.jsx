import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useData } from '../../context/DataContext'

export default function SiteLayout() {
  const { settings } = useData()
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <div className="bg-white">
      <header className="bg-slate-900 text-white sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold">SB <span className="text-yellow-400">CONSTRUCTIONS</span></Link>

          <nav className="hidden md:flex gap-6 text-sm">
            <Link to="/">Home</Link>
            <a href="/#about">About</a>
            <a href="/#services">Services</a>
            <Link to="/projects">Projects</Link>
            <a href="/#process">Our Process</a>
            <a href="/#testimonials">Testimonials</a>
            <Link to="/contact">Contact</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/contact" className="hidden sm:block bg-yellow-400 text-black font-semibold px-4 py-2 rounded text-sm">Get a Quote</Link>
            <button onClick={() => setOpen(!open)} aria-label="Menu" className="md:hidden text-2xl w-10 h-10">
              {open ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {open && (
          <nav className="md:hidden bg-slate-800 px-4 py-3 flex flex-col gap-3 text-sm">
            <Link onClick={close} to="/">Home</Link>
            <a onClick={close} href="/#about">About</a>
            <a onClick={close} href="/#services">Services</a>
            <Link onClick={close} to="/projects">Projects</Link>
            <a onClick={close} href="/#process">Our Process</a>
            <a onClick={close} href="/#testimonials">Testimonials</a>
            <Link onClick={close} to="/contact">Contact</Link>
            <Link onClick={close} to="/contact" className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded text-center">Get a Quote</Link>
          </nav>
        )}
      </header>

      <Outlet />

      <footer className="bg-slate-950 text-gray-300 text-sm">
        <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
          <div>
            <p className="text-white text-lg font-bold">SB <span className="text-yellow-400">CONSTRUCTIONS</span></p>
            <p className="mt-2">Complete construction solutions for residential and commercial projects across India.</p>
          </div>
          <div className="space-y-1">
            <p className="text-white font-semibold mb-2">Quick Links</p>
            <Link className="block" to="/">Home</Link>
            <Link className="block" to="/projects">Projects</Link>
            <Link className="block" to="/contact">Contact</Link>
          </div>
          <div className="space-y-1">
            <p className="text-white font-semibold mb-2">Contact Us</p>
            <p>📞 {settings.phone}</p><p>📍 {settings.address}</p><p>✉️ {settings.email}</p>
          </div>
        </div>
        <p className="text-center text-xs py-4 border-t border-slate-800">© 2026 SB Constructions. All rights reserved.</p>
      </footer>
    </div>
  )
}