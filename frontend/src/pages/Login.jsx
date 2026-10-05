import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'

export default function Login() {
  const { login } = useData()
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = (e) => {
    e.preventDefault()
    login(email, password) ? nav('/admin') : setError('Invalid email or password')
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <form onSubmit={submit} className="bg-white rounded p-8 w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold">SB <span className="text-yellow-500">Admin</span></h1>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2" />
        <input required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded px-3 py-2" />
        <button className="w-full bg-yellow-400 font-semibold py-2 rounded">Login</button>
        <p className="text-xs text-gray-400">Demo: admin@sb.in / admin123</p>
      </form>
    </div>
  )
}