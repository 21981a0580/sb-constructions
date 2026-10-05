import CrudPage from '../components/CrudPage'
import { useData } from '../context/DataContext'

const fields = [{ name: 'question' }, { name: 'answer' }]

export default function Faqs() {
  const { faqs, saveFaq, deleteFaq } = useData()
  return <CrudPage title="FAQ" items={faqs} fields={fields}
    columns={['question', 'answer']} onSave={saveFaq} onDelete={deleteFaq} />
}
