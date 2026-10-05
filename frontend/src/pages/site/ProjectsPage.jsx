import { useState } from 'react'
import { useData } from '../../context/DataContext'
import ProjectCard from '../../components/site/ProjectCard'

export function ProjectsGrid({ limit }) {
  const { projects } = useData()
  const [tab, setTab] = useState('All')
  const list = projects.filter((p) => tab === 'All' || p.status === tab).slice(0, limit)
  return (
    <>
      <div className="flex gap-2 mb-6">
        {['All', 'Ongoing', 'Completed'].map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-sm ${tab === t ? 'bg-yellow-400 font-semibold' : 'bg-gray-100'}`}>{t}</button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {list.map((p) => <ProjectCard key={p.id} p={p} />)}
      </div>
      {!list.length && <p className="text-gray-400">No projects found.</p>}
    </>
  )
}

export default function ProjectsPage() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Our Projects</h1>
      <ProjectsGrid />
    </section>
  )
}