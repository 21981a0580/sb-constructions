import { useState } from 'react'
import { imgUrl } from '../api'

export default function CrudPage({ title, items, columns, fields, onSave, onDelete }) {
  const [editing, setEditing] = useState(null)
  const [q, setQ] = useState('')
  const [uploading, setUploading] = useState(false)

  const shown = items.filter((i) =>
    JSON.stringify({ ...i, image: '' }).toLowerCase().includes(q.toLowerCase()))
  const isImage = (c) => fields.find((f) => f.name === c)?.type === 'image'

  const submit = (e) => {
    e.preventDefault()
    if (uploading) return alert('Please wait, the image is still uploading')
    onSave(editing)
    setEditing(null)
  }

  // functional update so an upload that finishes later never overwrites other fields
  const change = (f, v) =>
    setEditing((prev) => ({ ...prev, [f.name]: f.type === 'number' ? Number(v) : v }))

  // uploads straight to Cloudinary and stores the full https URL
  const pickImage = async (f, file) => {
    if (!file) return
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type))
      return alert('Only JPG, PNG or WEBP images are allowed')
    if (file.size > 5 * 1024 * 1024) return alert('Image must be under 5 MB')

    const body = new FormData()
    body.append('file', file)
    body.append('upload_preset', import.meta.env.VITE_CLOUDINARY_PRESET)
    setUploading(true)
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD}/image/upload`,
        { method: 'POST', body })
      const data = await res.json()
      if (!data.secure_url) throw new Error(data.error?.message || 'Upload failed')
      change(f, data.secure_url)
    } catch (e) {
      alert('Upload failed: ' + e.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3 justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="flex gap-2 w-full sm:w-auto">
          <input placeholder="Search..." value={q} onChange={(e) => setQ(e.target.value)}
            className="border rounded px-3 py-2 bg-white flex-1 min-w-0 sm:flex-none" />
          <button onClick={() => setEditing({})}
            className="bg-yellow-400 font-semibold px-4 py-2 rounded whitespace-nowrap">+ Add</button>
        </div>
      </div>

      {/* scrolls sideways on small screens instead of breaking the page */}
      <div className="overflow-x-auto rounded shadow">
        <table className="w-full bg-white text-sm min-w-[600px]">
          <thead className="bg-gray-50 text-left">
            <tr>{columns.map((c) => <th key={c} className="p-3 capitalize">{c}</th>)}<th className="p-3">Actions</th></tr>
          </thead>
          <tbody>
            {shown.map((row) => (
              <tr key={row.id} className="border-t">
                {columns.map((c) => (
                  <td key={c} className="p-3">
                    {isImage(c)
                      ? (row[c]
                          ? <img src={imgUrl(row[c])} alt="" className="h-12 w-16 object-cover rounded" />
                          : <span className="text-gray-300">No image</span>)
                      : row[c]}
                  </td>
                ))}
                <td className="p-3 space-x-3 whitespace-nowrap">
                  <button onClick={() => setEditing(row)} className="text-blue-600">Edit</button>
                  <button onClick={() => window.confirm('Delete this item?') && onDelete(row.id)}
                    className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
            {!shown.length && <tr><td className="p-6 text-center text-gray-400" colSpan={columns.length + 1}>No records</td></tr>}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <form onSubmit={submit} className="bg-white rounded p-6 w-full max-w-md space-y-3 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold">{editing.id ? 'Edit' : 'Add'} {title}</h2>
            {fields.map((f) => (
              <label key={f.name} className="block text-sm">
                <span className="capitalize">{f.label || f.name}</span>

                {f.type === 'image' ? (
                  <div className="mt-1">
                    {editing[f.name] && (
                      <div className="mb-2">
                        <img src={imgUrl(editing[f.name])} alt="Preview" className="h-32 w-full object-cover rounded" />
                        <button type="button" onClick={() => change(f, '')}
                          className="text-red-600 text-xs mt-1">Remove image</button>
                      </div>
                    )}
                    <input type="file" accept="image/jpeg,image/png,image/webp"
                      onChange={(e) => pickImage(f, e.target.files[0])}
                      className="w-full text-sm file:mr-3 file:px-3 file:py-1.5 file:rounded file:border-0 file:bg-yellow-400 file:font-semibold" />
                    {uploading && <p className="text-xs text-gray-500 mt-1">Uploading...</p>}
                  </div>
                ) : f.type === 'select' ? (
                  <select required value={editing[f.name] ?? ''} onChange={(e) => change(f, e.target.value)}
                    className="w-full border rounded px-3 py-2 mt-1">
                    <option value="" disabled>Select</option>
                    {f.options.map((o) => <option key={o}>{o}</option>)}
                  </select>
                ) : (
                  <input required type={f.type || 'text'} value={editing[f.name] ?? ''}
                    onChange={(e) => change(f, e.target.value)}
                    className="w-full border rounded px-3 py-2 mt-1" />
                )}
              </label>
            ))}
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setEditing(null)} className="px-4 py-2">Cancel</button>
              <button disabled={uploading} className="bg-yellow-400 font-semibold px-4 py-2 rounded disabled:opacity-50">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}