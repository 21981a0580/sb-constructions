import { useData } from '../context/DataContext'

export default function Quotes() {
  const { quotes, updateQuote, deleteQuote } = useData()
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Quote Requests</h1>
      <table className="w-full bg-white rounded shadow text-sm">
        <thead className="bg-gray-50 text-left">
          <tr>{['Date', 'Name', 'Phone', 'Service', 'Message', 'Status', ''].map((h) => <th key={h} className="p-3">{h}</th>)}</tr>
        </thead>
        <tbody>
          {quotes.map((q) => (
            <tr key={q.id} className="border-t align-top">
              <td className="p-3">{q.createdAt}</td>
              <td className="p-3">{q.name}<br /><span className="text-gray-400">{q.email}</span></td>
              <td className="p-3">{q.phone}</td>
              <td className="p-3">{q.service}</td>
              <td className="p-3 max-w-xs">{q.message}</td>
              <td className="p-3">
                <select value={q.status} onChange={(e) => updateQuote(q.id, { status: e.target.value })}
                  className="border rounded px-2 py-1">
                  {['New', 'Contacted', 'Closed'].map((s) => <option key={s}>{s}</option>)}
                </select>
              </td>
              <td className="p-3">
                <button onClick={() => window.confirm('Delete?') && deleteQuote(q.id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
          {!quotes.length && <tr><td colSpan={7} className="p-6 text-center text-gray-400">No quote requests yet</td></tr>}
        </tbody>
      </table>
    </div>
  )
}