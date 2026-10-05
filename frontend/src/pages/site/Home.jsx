import { Link } from 'react-router-dom'
import { useData } from '../../context/DataContext'
import { ProjectsGrid } from './ProjectsPage'

const steps = [
  ['Consultation', 'Understand your needs'], ['Planning', 'Detailed planning & design'],
  ['Execution', 'Skilled construction & supervision'], ['Quality Check', 'Ensuring the highest standards'],
  ['Handover', 'On time delivery with transparency'],
]
const why = [
  ['🛡️', 'Quality Workmanship', 'Built to last'], ['👥', 'Experienced Team', 'Skilled & professional'],
  ['📄', 'Transparent Process', 'No hidden costs'], ['❤️', 'Client Satisfaction', 'Our top priority'],
]
const Label = ({ children }) => (
  <p className="text-xs tracking-widest text-gray-500 mb-1"><span className="inline-block w-8 h-0.5 bg-yellow-400 align-middle mr-2" />{children}</p>
)

export default function Home() {
  const { services, testimonials, settings } = useData()
  return (
    <>
      {/* Hero */}
<section className="relative bg-slate-900 text-white overflow-hidden">
  {/* Owner photo */}
  <div className="absolute inset-y-0 right-0 w-full md:w-3/5">
    <img
      src="/images/owner.jpg"
      alt="Owner of SB Constructions"
      className="h-full w-full object-cover object-[50%_12%]"
    />
    {/* darker overlay on phones so the text stays readable */}
    <div className="absolute inset-0 bg-slate-900/65 md:hidden" />
    {/* fade into the dark background on desktop */}
    <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent" />
  </div>

  <div className="relative max-w-6xl mx-auto px-4 py-24 md:py-32 md:min-h-[600px] flex items-center">
    <div>
      <Label>SB CONSTRUCTIONS</Label>
      <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
        BUILDING WHAT<br />MATTERS<span className="text-yellow-400">.</span>
      </h1>
      <p className="mt-4 max-w-md text-lg">
        Complete construction solutions for residential and commercial projects across India.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/projects" className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded">View Our Projects →</Link>
        <Link to="/contact" className="border border-white px-6 py-3 rounded">Get a Quote</Link>
      </div>
    </div>
  </div>
</section>

      {/* About */}
      <section id="about" className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-2 gap-10 items-center">
        <img src="https://picsum.photos/seed/sbabout/700/450" alt="About" className="rounded shadow" />
        <div>
          <Label>ABOUT SB CONSTRUCTIONS</Label>
          <h2 className="text-3xl font-bold">Building With Purpose</h2>
          <p className="text-gray-600 mt-3">SB Constructions is a trusted construction company committed to delivering high-quality, durable and innovative spaces. We specialize in residential, commercial and building construction, offering end-to-end solutions from planning to handover.</p>
          <div className="grid grid-cols-3 gap-3 mt-6 text-sm">
            <div><b>Location</b><p className="text-gray-600">{settings.address}</p></div>
            <div><b>Service Areas</b><p className="text-gray-600">Across India</p></div>
            <div><b>Call Us</b><p className="text-gray-600">{settings.phone}</p></div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-gray-50 py-14">
        <div className="max-w-6xl mx-auto px-4">
          <Label>OUR SERVICES</Label>
          <h2 className="text-3xl font-bold mb-6">Complete Construction Solutions</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {services.map((s) => (
              <div key={s.id} className="bg-white rounded shadow p-5 text-center">
                <div className="text-4xl">{s.icon}</div>
                <p className="font-semibold mt-3">{s.title}</p>
                <p className="text-sm text-gray-500 mt-1">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <Label>FEATURED PROJECTS</Label>
        <h2 className="text-3xl font-bold mb-6">Our Projects</h2>
        <ProjectsGrid limit={4} />
        <Link to="/projects" className="inline-block mt-6 text-sm font-semibold">View All Projects →</Link>
      </section>

      {/* Process */}
      <section id="process" className="bg-gray-50 py-14">
        <div className="max-w-6xl mx-auto px-4">
          <Label>OUR PROCESS</Label>
          <h2 className="text-3xl font-bold mb-8">How We Work</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map(([t, d], i) => (
              <div key={t}>
                <span className="w-9 h-9 rounded-full border-2 border-yellow-400 flex items-center justify-center font-bold">{i + 1}</span>
                <p className="font-semibold mt-3">{t}</p><p className="text-sm text-gray-500">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us + testimonials */}
      <section id="testimonials" className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-2 gap-10">
        <div>
          <Label>WHY CHOOSE SB CONSTRUCTIONS</Label>
          <h2 className="text-2xl font-bold mb-5">Your Vision, Our Commitment</h2>
          <div className="grid grid-cols-2 gap-5">
            {why.map(([i, t, d]) => (
              <div key={t}><span className="text-2xl">{i}</span><p className="font-semibold text-sm mt-1">{t}</p><p className="text-xs text-gray-500">{d}</p></div>
            ))}
          </div>
        </div>
        <div>
          <Label>WHAT OUR CLIENTS SAY</Label>
          <h2 className="text-2xl font-bold mb-5">Trusted by Homeowners & Businesses</h2>
          {testimonials.map((t) => (
            <div key={t.id} className="bg-gray-50 rounded p-5 mb-3 text-sm">
              <p className="italic text-gray-700">"{t.message}"</p>
              <p className="font-semibold mt-3">{t.name}</p><p className="text-gray-500">{t.info}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap gap-4 items-center justify-between">
          <div>
            <p className="text-xs tracking-widest text-yellow-400">READY TO START YOUR PROJECT?</p>
            <h2 className="text-2xl font-bold">Let's Build Something Great Together.</h2>
            <p className="text-sm text-gray-300">Get in touch with us for a free consultation and quote.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/contact" className="bg-yellow-400 text-black font-semibold px-5 py-2.5 rounded">Request a Quote →</Link>
            <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="border border-white px-5 py-2.5 rounded">Call Us {settings.phone}</a>
          </div>
        </div>
      </section>
    </>
  )
}