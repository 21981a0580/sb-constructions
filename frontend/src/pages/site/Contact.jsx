import { useState } from 'react'
import { useData } from '../../context/DataContext'

export default function Contact() {
  const { services, settings, addQuote } = useData()
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', message: '' })
  const [sent, setSent] = useState(false)
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })
  const submit = (e) => { e.preventDefault(); addQuote(form); setSent(true) }
  const input = 'w-full border rounded px-3 py-2 mt-1'

  return (
    <section className="max-w-5xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10">
      <div>
        <h1 className="text-3xl font-bold">Get a Free Quote</h1>
        <p className="text-gray-600 mt-3">Tell us about your project and we'll get back to you with a free consultation.</p>
        <div className="mt-6 space-y-2 text-sm">
          <p>📞 {settings.phone}</p><p>📍 {settings.address}</p><p>✉️ {settings.email}</p>
        </div>
      </div>
      {sent ? (
        <div className="bg-green-50 text-green-800 rounded p-6 self-start">Thank you! We have received your request and will contact you soon.</div>
      ) : (
        <form onSubmit={submit} className="space-y-3 text-sm">
          <label className="block">Name<input required className={input} value={form.name} onChange={set('name')} /></label>
          <label className="block">Phone<input required className={input} value={form.phone} onChange={set('phone')} /></label>
          <label className="block">Email<input type="email" className={input} value={form.email} onChange={set('email')} /></label>
          <label className="block">Service
            <select required className={input} value={form.service} onChange={set('service')}>
              <option value="">Select</option>
              {services.map((s) => <option key={s.id}>{s.title}</option>)}
            </select>
          </label>
          <label className="block">Message<textarea rows={4} className={input} value={form.message} onChange={set('message')} /></label>
          <button className="bg-yellow-400 font-semibold px-6 py-2 rounded">Request a Quote</button>
        </form>
      )}
    </section>
  )
}