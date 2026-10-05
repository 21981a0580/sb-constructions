import CrudPage from '../components/CrudPage'
import { useData } from '../context/DataContext'

const fields = [
  { name: 'image', label: 'Cover image', type: 'image' },
  { name: 'title' }, { name: 'location' },
  { name: 'category', type: 'select', options: ['Residential', 'Commercial'] },
  { name: 'status', type: 'select', options: ['Ongoing', 'Completed', 'On Hold'] },
  { name: 'progress', label: 'Progress %', type: 'number' },
  { name: 'budget', type: 'number' },
  { name: 'endDate', label: 'End date', type: 'date' },
]

export default function Projects() {
  const { projects, saveProject, deleteProject } = useData()
  return <CrudPage title="Projects" items={projects} fields={fields}
    columns={['image', 'title', 'location', 'category', 'status', 'progress']}
    onSave={saveProject} onDelete={deleteProject} />
}