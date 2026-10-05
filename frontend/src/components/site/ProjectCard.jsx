import { imgUrl } from '../../api'

export default function ProjectCard({ p }) {
  const fallback = `https://picsum.photos/seed/sb${p.id}/600/400`
  const img = imgUrl(p.image) || fallback
  return (
    <div className="bg-white rounded shadow overflow-hidden">
      <div className="relative">
        <img src={img} alt={p.title}
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallback }}
          className="h-44 w-full object-cover" />
        <span className="absolute top-2 left-2 bg-slate-900 text-white text-xs px-2 py-1 rounded">{p.status}</span>
      </div>
      <div className="p-4 text-sm">
        <p className="font-semibold">{p.title}</p>
        <p className="text-gray-500">📍 {p.location}</p>
        <p className="text-gray-500">🏷️ {p.category}</p>
        {p.status === 'Ongoing' && (
          <div className="h-1.5 bg-gray-200 rounded mt-2"><div className="h-1.5 bg-yellow-400 rounded" style={{ width: `${p.progress}%` }} /></div>
        )}
      </div>
    </div>
  )
}