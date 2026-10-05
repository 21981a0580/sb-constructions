import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useData } from '../context/DataContext'

const COLORS = { Ongoing: '#facc15', Completed: '#22c55e', 'On Hold': '#ef4444' }

export default function Dashboard() {
  const { projects, employees } = useData()
  const count = (s) => projects.filter((p) => p.status === s).length
  const stats = [
    ['Total Projects', projects.length], ['Ongoing', count('Ongoing')],
    ['Completed', count('Completed')], ['Employees', employees.length],
  ]
  const chart = ['Ongoing', 'Completed', 'On Hold'].map((s) => ({ name: s, value: count(s) }))
  const ongoing = projects.filter((p) => p.status === 'Ongoing')

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(([label, value]) => (
          <div key={label} className="bg-white rounded shadow p-5">
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-3xl font-bold">{value}</p>
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded shadow p-5 h-80">
          <h2 className="font-semibold mb-2">Project Status</h2>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={chart} dataKey="value" nameKey="name" outerRadius={90}>
                {chart.map((d) => <Cell key={d.name} fill={COLORS[d.name]} />)}
              </Pie>
              <Tooltip /><Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded shadow p-5">
          <h2 className="font-semibold mb-3">Ongoing Projects</h2>
          {ongoing.map((p) => (
            <div key={p.id} className="mb-4">
              <div className="flex justify-between text-sm"><span>{p.title} ({p.location})</span><span>{p.progress}%</span></div>
              <div className="h-2 bg-gray-200 rounded"><div className="h-2 bg-yellow-400 rounded" style={{ width: `${p.progress}%` }} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}