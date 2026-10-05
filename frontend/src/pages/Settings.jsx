import { useState } from 'react'
import { useData } from '../context/DataContext'

export default function Settings() {
  const { settings, updateSettings } = useData()
  const [form, setForm] = useState(settings)
  const [saved, setSaved] = useState(false)

  const submit = (e) => { e.preventDefault(); updateSettings(form); setSaved(true); setTimeout(() => setSaved(false), 2000) }

  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-bold mb-4">Site Settings</h1>
      <form onSubmit={submit} className="bg-white rounded shadow p-6 space-y-3 text-sm">
        {[['phone', 'Phone'], ['address', 'Address'], ['email', 'Email']].map(([k, label]) => (
          <label key={k} className="block">{label}
            <input required value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })}
              className="w-full border rounded px-3 py-2 mt-1" />
          </label>
        ))}
        <button className="bg-yellow-400 font-semibold px-5 py-2 rounded">Save</button>
        {saved && <span className="text-green-600 ml-3">Saved ✓</span>}
      </form>
    </div>
  )
}
