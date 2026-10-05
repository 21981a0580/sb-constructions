import CrudPage from '../components/CrudPage'
import { useData } from '../context/DataContext'

const fields = [{ name: 'name' }, { name: 'info', label: 'Project info' }, { name: 'message' }]

export default function Testimonials() {
  const { testimonials, saveTestimonial, deleteTestimonial } = useData()
  return <CrudPage title="Testimonials" items={testimonials} fields={fields}
    columns={['name', 'info', 'message']} onSave={saveTestimonial} onDelete={deleteTestimonial} />
}
