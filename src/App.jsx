import { useMemo, useState } from 'react'
import './App.css'

const publicImage = (filename) => `${import.meta.env.BASE_URL}images/${filename}`

const vehicles = [
  { id: 1, title: 'Honda Civic 2022 Oriel', price: 'PKR 78.5 lacs', city: 'Lahore', mileage: '32,000 km', fuel: 'Petrol', transmission: 'Automatic', category: 'Cars', image: publicImage('civic.jpg'), featured: true },
  { id: 2, title: 'Toyota Corolla 2020 Altis Grande', price: 'PKR 62 lacs', city: 'Karachi', mileage: '58,000 km', fuel: 'Petrol', transmission: 'Automatic', category: 'Cars', image: publicImage('corolla.jpg'), featured: true },
  { id: 3, title: 'Suzuki Alto 2023 VXL AGS', price: 'PKR 31 lacs', city: 'Islamabad', mileage: '12,000 km', fuel: 'Petrol', transmission: 'Automatic', category: 'Cars', image: publicImage('alto.jpg') },
  { id: 4, title: 'Toyota Fortuner 2024 Legender', price: 'PKR 1.95 crore', city: 'Islamabad', mileage: '9,000 km', fuel: 'Diesel', transmission: 'Automatic', category: 'Cars', image: publicImage('fortuner.jpg'), featured: true },
  { id: 5, title: 'Honda CG 125 2024', price: 'PKR 2.6 lacs', city: 'Rawalpindi', mileage: '3,000 km', fuel: 'Petrol', transmission: 'Manual', category: 'Bikes', image: publicImage('cg125.jpg') },
  { id: 6, title: 'Yamaha YBR 125G 2023', price: 'PKR 4.8 lacs', city: 'Lahore', mileage: '8,000 km', fuel: 'Petrol', transmission: 'Manual', category: 'Bikes', image: publicImage('ybr.jpg'), featured: true },
  { id: 7, title: 'Hino 500 Series 2019', price: 'PKR 1.25 crore', city: 'Faisalabad', mileage: '140,000 km', fuel: 'Diesel', transmission: 'Manual', category: 'Trucks & Vans', image: publicImage('hino.jpg') },
  { id: 8, title: 'Suzuki Bolan Van 2022', price: 'PKR 19.5 lacs', city: 'Multan', mileage: '25,000 km', fuel: 'Petrol', transmission: 'Manual', category: 'Trucks & Vans', image: publicImage('bolan.jpg') },
]

const cities = ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta', 'Sialkot', 'Hyderabad']

function Icon({ name, size = 20 }) {
  const drawings = {
    car: <><path d="m5 11 1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11" /><path d="M3 11h18v7h-2v2h-2v-2H7v2H5v-2H3z" /><path d="M6 14h.01M18 14h.01" /></>,
    bike: <><circle cx="6" cy="17" r="3" /><circle cx="18" cy="17" r="3" /><path d="m6 17 4-7h4l4 7m-8-7 3 7h5m-8-11h2" /></>,
    truck: <><path d="M3 6h12v12H3zM15 10h4l3 4v4h-7z" /><circle cx="7.5" cy="18" r="2" /><circle cx="18.5" cy="18" r="2" /></>,
    search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    location: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    gauge: <><path d="M4 19a9 9 0 1 1 16 0" /><path d="m12 13 4-4M7 19h10" /></>,
    fuel: <><path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M3 21h14" /><path d="M7 7h6v5H7zM16 8h2l3 3v6a2 2 0 0 1-4 0v-4" /></>,
    gear: <><circle cx="12" cy="12" r="3" /><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.7a8 8 0 0 1-1.7 1l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.7-1l-1.7.7-1.4-2.4 1.4-1.1a7 7 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.7a8 8 0 0 1 1.7-1l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.7 1l1.7-.7 1.4 2.4-1.4 1.1a7 7 0 0 1 0 2Z" /></>,
    chat: <><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-4-.9L3 21l1.8-4.6a8 8 0 1 1 16.2-4.9Z" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" /></>,
  }
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{drawings[name]}</svg>
}

function VehicleCard({ vehicle }) {
  return (
    <article className="vehicle-card">
      <div className="vehicle-image">
        <img src={vehicle.image} alt={vehicle.title} loading="lazy" />
        {vehicle.featured && <span className="featured-badge">Featured</span>}
      </div>
      <div className="vehicle-info">
        <h3 title={vehicle.title}>{vehicle.title}</h3>
        <p className="vehicle-price">{vehicle.price}</p>
        <div className="vehicle-meta">
          <span><Icon name="location" size={15} />{vehicle.city}</span>
          <span><Icon name="gauge" size={15} />{vehicle.mileage}</span>
          <span><Icon name="fuel" size={15} />{vehicle.fuel}</span>
          <span><Icon name="gear" size={15} />{vehicle.transmission}</span>
        </div>
      </div>
    </article>
  )
}

function App() {
  const [query, setQuery] = useState('')
  const [city, setCity] = useState('')
  const [category, setCategory] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [adSent, setAdSent] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [language, setLanguage] = useState('اردو')

  const results = useMemo(() => vehicles.filter((vehicle) => {
    const matchesQuery = `${vehicle.title} ${vehicle.category} ${vehicle.city}`.toLowerCase().includes(query.trim().toLowerCase())
    return matchesQuery && (!city || vehicle.city === city) && (!category || vehicle.category === category)
  }), [query, city, category])
  const filtersActive = Boolean(query.trim() || city || category)

  const openAdForm = () => {
    setAdSent(false)
    setModalOpen(true)
  }

  const resetFilters = () => {
    setCategory('')
    setQuery('')
    setCity('')
  }

  return (
    <>
      <header className="site-header">
        <div className="nav-wrap">
          <a className="brand" href="#home" onClick={resetFilters}><span className="brand-mark"><Icon name="car" size={21} /></span><span>Lari</span></a>
          <nav className="main-nav" aria-label="Main navigation">
            {['Cars', 'Bikes', 'Trucks & Vans'].map((item) => (
              <button key={item} className={category === item ? 'nav-link active' : 'nav-link'} onClick={() => { setCategory(item); document.querySelector('#latest')?.scrollIntoView({ behavior: 'smooth' }) }}>{item}</button>
            ))}
            <a className="nav-link" href="#about">About</a>
          </nav>
          <div className="nav-actions">
            <button className="language-button" onClick={() => setLanguage(language === 'اردو' ? 'English' : 'اردو')} aria-label="Toggle language"><Icon name="globe" size={16} /><span>{language}</span></button>
            <button className="sign-in" onClick={() => setChatOpen(true)}>Sign in</button>
            <button className="button button-primary header-ad" onClick={openAdForm}><Icon name="plus" size={17} />Post an Ad</button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <img className="hero-image" src={publicImage('hero.jpg')} alt="" />
          <div className="hero-shade" />
          <div className="hero-inner">
            <h1>Buy &amp; sell vehicles<br />across Pakistan</h1>
            <p>Cars, bikes, trucks and vans — find your next ride or sell yours in minutes.</p>
            <form className="search-bar" onSubmit={(event) => { event.preventDefault(); document.querySelector('#latest')?.scrollIntoView({ behavior: 'smooth' }) }}>
              <label className="sr-only" htmlFor="vehicle-search">Search vehicles</label>
              <input id="vehicle-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="e.g. Honda Civic" />
              <label className="sr-only" htmlFor="city-select">Choose a city</label>
              <select id="city-select" value={city} onChange={(event) => setCity(event.target.value)}>
                <option value="">All cities</option>
                {cities.map((cityName) => <option key={cityName} value={cityName}>{cityName}</option>)}
              </select>
              <button className="button button-primary search-button" type="submit"><Icon name="search" size={17} />Search</button>
            </form>
          </div>
        </section>

        <section className="category-wrap" aria-label="Shop by category">
          {[
            { name: 'Cars', icon: 'car' },
            { name: 'Bikes', icon: 'bike' },
            { name: 'Trucks & Vans', icon: 'truck' },
          ].map((item) => (
            <button className={`category-card${category === item.name ? ' selected' : ''}`} key={item.name} onClick={() => { setCategory(category === item.name ? '' : item.name); document.querySelector('#latest')?.scrollIntoView({ behavior: 'smooth' }) }}>
              <Icon name={item.icon} size={29} /><span>{item.name}</span>
            </button>
          ))}
        </section>

        <div className="content-wrap">
          {!filtersActive && <section className="listings-section featured-section">
            <div className="section-heading"><h2>Featured</h2></div>
            <div className="vehicle-grid featured-grid">
              {vehicles.filter((vehicle) => vehicle.featured).slice(0, 4).map((vehicle) => <VehicleCard key={vehicle.id} vehicle={vehicle} />)}
            </div>
          </section>}

          <section className="listings-section latest-section" id="latest">
            <div className="section-heading">
              <h2>{category ? `${category} listings` : 'Latest listings'}</h2>
              {(category || query || city) && <button className="clear-filters" onClick={resetFilters}>Clear filters</button>}
              {!category && !query && !city && <a className="view-all" href="#latest">View all <Icon name="arrow" size={15} /></a>}
            </div>
            {results.length > 0 ? (
              <div className="vehicle-grid">
                {results.map((vehicle) => <VehicleCard key={vehicle.id} vehicle={vehicle} />)}
              </div>
            ) : (
              <div className="empty-results"><h3>No vehicles found</h3><p>Try changing your search or city to see more listings.</p><button className="button button-primary" onClick={resetFilters}>Show all listings</button></div>
            )}
          </section>

          <section className="sell-banner">
            <div><h2>Sell your vehicle fast</h2><p>Post a free ad and reach thousands of buyers.</p></div>
            <button className="button button-primary" onClick={openAdForm}>Post an Ad <Icon name="arrow" size={16} /></button>
          </section>
        </div>
      </main>

      <footer className="site-footer" id="about">
        <div className="footer-inner">
          <div><a className="footer-brand" href="#home">Lari</a><p>Pakistan’s trusted marketplace for buying and selling vehicles.</p></div>
          <div className="leadership"><strong>Leadership</strong><span>Khuram Shehzad Baig — CEO</span><span>Azmat Baig — Co-founder</span></div>
          <p className="copyright">© 2026 Lari</p>
        </div>
      </footer>

      <button className="chat-launcher" onClick={() => setChatOpen(!chatOpen)}><Icon name={chatOpen ? 'close' : 'chat'} size={20} />Lari Assistant</button>
      {chatOpen && <aside className="chat-panel" aria-label="Lari Assistant chat"><div className="chat-heading"><span><span className="online-dot" />Lari Assistant</span><button aria-label="Close chat" onClick={() => setChatOpen(false)}><Icon name="close" size={18} /></button></div><div className="chat-body"><div className="chat-message">Hi there! Looking for a vehicle or need help selling yours?</div><button className="chat-reply" onClick={() => { setChatOpen(false); openAdForm() }}>I want to sell my vehicle</button><button className="chat-reply" onClick={() => { setChatOpen(false); document.querySelector('#latest')?.scrollIntoView({ behavior: 'smooth' }) }}>Browse latest listings</button></div></aside>}

      {modalOpen && <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setModalOpen(false) }}>
        <section className="ad-modal" role="dialog" aria-modal="true" aria-labelledby="ad-modal-title">
          <button className="modal-close" aria-label="Close" onClick={() => setModalOpen(false)}><Icon name="close" size={20} /></button>
          {adSent ? <div className="success-state"><span className="success-icon">✓</span><h2>You're ready to get started</h2><p>Your vehicle details have been saved in this demo. Sign in to publish your ad.</p><button className="button button-primary" onClick={() => setModalOpen(false)}>Done</button></div> : <>
            <span className="modal-eyebrow">SELL ON LARI</span><h2 id="ad-modal-title">Post your vehicle ad</h2><p className="modal-description">Tell buyers a little about your vehicle to get started.</p>
            <form className="ad-form" onSubmit={(event) => { event.preventDefault(); setAdSent(true) }}>
              <label>Vehicle name<input required placeholder="e.g. Honda Civic 2022" /></label>
              <div className="form-row"><label>Category<select defaultValue="Cars"><option>Cars</option><option>Bikes</option><option>Trucks & Vans</option></select></label><label>City<select defaultValue=""><option value="" disabled>Select city</option>{cities.map((cityName) => <option key={cityName}>{cityName}</option>)}</select></label></div>
              <label>Asking price<input required placeholder="e.g. PKR 45 lacs" /></label>
              <button className="button button-primary form-submit" type="submit">Continue <Icon name="arrow" size={17} /></button>
              <p className="demo-note">Demo form — no information is sent to a server.</p>
            </form>
          </>}
        </section>
      </div>}
    </>
  )
}

export default App
