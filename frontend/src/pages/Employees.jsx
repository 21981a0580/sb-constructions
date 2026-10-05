import CrudPage from '../components/CrudPage'
import { useData } from '../context/DataContext'

const fields = [
  { name: 'name' }, { name: 'designation' }, { name: 'phone' },
  { name: 'email', type: 'email' }, { name: 'salary', type: 'number' },
  { name: 'status', type: 'select', options: ['Active', 'On Leave', 'Inactive'] },
]

export default function Employees() {
  const { employees, saveEmployee, deleteEmployee } = useData()
  return <CrudPage title="Employees" items={employees} fields={fields}
    columns={['name', 'designation', 'phone', 'salary', 'status']}
    onSave={saveEmployee} onDelete={deleteEmployee} />
}
