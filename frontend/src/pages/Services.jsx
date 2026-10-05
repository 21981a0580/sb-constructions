

import CrudPage from '../components/CrudPage'
import { useData } from '../context/DataContext'

const fields = [
  { name: 'icon', label: 'Icon (emoji)' },
  { name: 'title' },
  { name: 'desc', label: 'Description' },
]

export default function Services() {
  const { services, saveService, deleteService } = useData()
  return (
    <CrudPage
      title="Services"
      items={services}
      fields={fields}
      columns={['icon', 'title', 'desc']}
      onSave={saveService}
      onDelete={deleteService}
    />
  )
}