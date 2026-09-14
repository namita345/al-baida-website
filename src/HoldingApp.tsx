import { FormEvent, useEffect, useMemo, useState } from 'react'
import {
  ArrowRight, Building2, Check, ChevronDown, ChevronRight, CircleDot, Facebook, Factory,
  FlaskConical, GraduationCap, Handshake, HardHat, HeartHandshake, Leaf, Linkedin, Mail,
  MapPin, Menu, Network, Phone, Quote, Send, ShieldCheck, Ship, Sprout, Target, Truck,
  UploadCloud, Users, Warehouse, Wrench, X, type LucideIcon,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { affiliates, clients, consultingCategories, coreDivisions, divisions, legacy, partners, projects, strategicPartners, subsidiaries } from './data'
import './site.css'

const iconMap: Record<string, LucideIcon> = { HardHat, Building2, Sprout, Leaf, Warehouse, Wrench, Users, Truck, FlaskConical, Ship, ShieldCheck, GraduationCap, Network, Factory }

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: .65, delay, ease: 'easeOut' }}>{children}</motion.div>
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className="brand">
      <span className={`brand-mark ${compact ? 'compact' : ''}`} aria-hidden="true">
        <img
          src="/images/al-baida-logo-transparent.png"
          alt="Al Baida Holding"
        />
      </span>
    </span>
  );
}

function ScrollManager() {
  const location = useLocation()
  useEffect(() => {
    if (location.hash) window.setTimeout(() => document.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth' }), 80)
    else window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname, location.hash])
  return null
}

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 24); onScroll(); window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll) }, [])
  useEffect(() => setOpen(false), [location.pathname, location.hash])
  const menu = [
    ['Home', '/'], ['About Us', '/about/'], ['Subsidiaries & Affiliated Companies', '/subsidiaries/'],
    ['Our Core Divisions', '/divisions/'], ['News and Events', '/news-events/'], ['Contact us', '/contact/'],
  ]
  return <header className={`site-header ${scrolled || location.pathname !== '/' || open ? 'solid' : ''}`}>
    <div className={`topbar ${scrolled ? 'collapsed' : ''}`}><div className="shell topbar-inner"><div className="topbar-contact"><a href="tel:+97444128899"><Phone size={13}/> +974 4412 8899</a><a href="mailto:Info@albaidaholding.com"><Mail size={13}/> Info@albaidaholding.com</a><span><MapPin size={13}/> P.O. Box 37772, Doha — Qatar</span></div><div className="topbar-meta"><span>ISO 9001 · 14001 · 45001</span><b>EST. 1970</b></div></div></div>
    <div className="nav-wrap"><div className="shell nav-main"><Link to="/" aria-label="Al Baida Holding home"><Brand compact/></Link><div className="nav-actions"><a className="header-phone" href="tel:+97444128899"><Phone size={15}/> +974 4412 8899</a><Link className="gold-button header-cta" to="/contact/?subject=Project enquiry">Start a project <ArrowRight size={16}/></Link><button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X/> : <Menu/>}</button></div></div>
      <nav className="desktop-nav"><div className="shell desktop-nav-inner">{menu.map(([label, to]) => label === 'Subsidiaries & Affiliated Companies' ? <div className="nav-parent" key={label}><Link className="nav-link" to={to}>{label}<ChevronDown size={13}/></Link><div className="about-dropdown subsidiaries-dropdown"><span className="dropdown-kicker">Al Baida Group Network</span><div className="dropdown-grid"><Link to="/strategic-partners/"><span>01</span>Strategic Partners<ChevronRight size={15}/></Link></div></div></div> : <NavLink key={label} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to={to}>{label}</NavLink>)}</div></nav>
      <div className={`mobile-nav ${open ? 'open' : ''}`}><div className="mobile-nav-list">{menu.map(([label, to]) => <Link key={label} to={to}>{label}<ChevronRight size={16}/></Link>)}<div className="mobile-subnav"><Link to="/strategic-partners/">Strategic Partners</Link></div><a className="mobile-contact" href="tel:+97444128899"><Phone size={16}/> +974 4412 8899</a></div></div>
    </div>
  </header>
}

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) { return <div className={`eyebrow ${dark ? 'dark' : ''}`}><span/>{children}</div> }
function SectionHeading({ eyebrow, children, text, dark = false, center = false }: { eyebrow: string; children: React.ReactNode; text?: string; dark?: boolean; center?: boolean }) {
  return <Reveal className={`section-heading ${center ? 'center' : ''} ${dark ? 'heading-dark' : ''}`}><Eyebrow dark={dark}>{eyebrow}</Eyebrow><h2>{children}</h2>{text && <p>{text}</p>}</Reveal>
}
function PageHero({ eyebrow, title, text, image }: { eyebrow: string; title: string; text: string; image: string }) {
  return <section className="page-hero"><img src={image} alt=""/><div className="page-hero-wash"/><div className="pattern-dots"/><motion.div className="shell page-hero-content" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}><div className="crumbs"><Link to="/">Home</Link><ChevronRight size={13}/><span>{eyebrow}</span></div><Eyebrow dark>{eyebrow}</Eyebrow><h1>{title}</h1><p>{text}</p></motion.div></section>
}
function Stats() {
  return <div className="stats-strip">{[['200+', 'Projects completed'], ['4,000+', 'Professionals'], ['25+', 'Ongoing projects'], ['50+', 'Years of experience'], ['5+', 'Specialized subsidiaries']].map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
}

function DivisionCard({ item, index }: { item: typeof divisions[number]; index: number }) {
  const Icon = iconMap[item.icon]
  return <article className="division-card"><img src={item.image} alt={item.title}/><div className="division-card-wash"/><span className="division-number">{String(index + 1).padStart(2, '0')}</span><span className="division-icon"><Icon size={20}/></span><div><h3>{item.title}</h3><p>{item.short}</p><span className="discover">Discover <ArrowRight size={15}/></span></div></article>
}

function Home() {
  return <>
    <section className="home-hero reference-hero"><img src="/images/al-baida-twilight-hero.jpg" alt="Al Baida Holding architectural setting overlooking Doha skyline"/><div className="home-hero-wash"/><div className="hero-wall-callout"><span>PEOPLE</span><span>PARTNERSHIPS</span><span>PROGRESS</span></div><div className="shell home-hero-content"><motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }}><div className="hero-tagline">A QATARI HOLDING GROUP</div><h1>Integrated<br/>For A Stronger<br/><em>Tomorrow.</em></h1><p>Delivering integrated solutions across diverse sectors to create long-term value for Qatar and beyond.</p><div className="hero-actions"><Link className="gold-button" to="/divisions/">Explore Our Divisions <ArrowRight size={17}/></Link></div></motion.div><motion.div className="hero-stat-row" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .2 }}>{[['1970', 'Founded in Qatar'], ['4,000+', 'Professionals'], ['200+', 'Projects completed'], ['ISO', 'Certified operations']].map(([v, l]) => <div key={l}><strong>{v}</strong><span>{l}</span></div>)}<div className="hero-stat-tagline">CREATING VALUE<br/>ACROSS GENERATIONS</div></motion.div></div></section>

    <section id="overview" className="section cream-section overview-section"><div className="shell overview-grid"><Reveal className="overview-visual"><img src="/images/hero-doha.jpg" alt="Al Baida Holding project team"/><div className="experience-card"><strong>50+</strong><span>Years shaping progress</span></div><div className="visual-frame"/></Reveal><div><SectionHeading eyebrow="Meet Al Baida Holding" text="Founded in 1970, Al Baida Holding is a Qatari-owned multi-sector conglomerate built on reliability, operational excellence, and innovation.">Built in Qatar.<br/><em>Ready for what’s next.</em></SectionHeading><Reveal className="overview-copy" delay={.08}><p>With over <strong>4,000 professionals</strong>, more than five decades of industry experience, and a portfolio of ISO-certified operations, we deliver high-value services to government entities, public institutions, and leading private-sector organizations.</p><p>Our deep local insight connects engineering, infrastructure, agriculture, facilities management, HR, logistics, energy support, marine operations, environmental services, IT, and education.</p><Link className="text-link" to="/divisions/">Discover our capabilities <ArrowRight size={16}/></Link></Reveal></div></div></section>

    <section id="vision" className="section dark-section pattern-grid-bg"><div className="shell"><SectionHeading dark eyebrow="Our Direction" center text="A clear purpose guides how we grow, partner, and perform.">Ambition with <em>accountability.</em></SectionHeading><div className="purpose-grid">{[
      ['Vision', 'To lead regional industrial transformation through innovation, performance, and sustainable growth.', Target],
      ['Mission', 'To deliver high-value services across core sectors, empowering national and regional development.', CircleDot],
      ['Values', 'Integrity, excellence, innovation, client-centricity, sustainability, and people first.', HeartHandshake],
    ].map(([title, text, Icon], i) => { const I = Icon as LucideIcon; return <Reveal key={title as string} className="purpose-card" delay={i * .08}><span><I/></span><h3>{title as string}</h3><p>{text as string}</p></Reveal> })}</div></div></section>

    <section id="chairman" className="section cream-section chairman-section"><div className="shell chairman-grid"><Reveal className="chairman-photo"><img src="/images/chairman.jpg" alt="H.E. Eng. Ali Bin Abdulatif Al Mesned"/><div><b>H.E. Eng. Ali Bin Abdulatif Al Mesned</b><span>Chairman, Al Baida Holding</span></div></Reveal><Reveal className="chairman-message" delay={.08}><Quote size={38}/><Eyebrow>Chairman’s Message</Eyebrow><h2>“Our journey has been defined by quality, reliability, and a commitment to innovation.”</h2><p>As we continue to expand into new sectors, our focus remains on trusted partnerships, sustainable practices, and high operational efficiency. We are committed not only to business growth, but also to our social, environmental, and economic responsibilities.</p><p className="signature">Leading progress with purpose.</p></Reveal></div></section>

    <section id="legacy" className="section sand-section legacy-section"><div className="shell"><SectionHeading eyebrow="Our Legacy" text="Our growth mirrors Qatar’s transformation — capabilities built ahead of national need.">Five decades of <em>progress.</em></SectionHeading><div className="timeline">{legacy.map(([year, title, text], i) => <Reveal key={year} className="timeline-item" delay={i * .05}><span>{String(i + 1).padStart(2, '0')}</span><div><b>{year}</b><h3>{title}</h3><p>{text}</p></div></Reveal>)}</div></div></section>

    <section className="section cream-section home-divisions"><div className="shell"><div className="heading-row"><SectionHeading eyebrow="Seamless Services" text="Specialized divisions. Shared standards. One dependable holding.">Capability, <em>connected.</em></SectionHeading><Link className="dark-button" to="/divisions/">View all divisions <ArrowRight size={16}/></Link></div><div className="division-preview-grid">{divisions.slice(0, 6).map((item, i) => <Reveal key={item.title} delay={(i % 3) * .06}><DivisionCard item={item} index={i}/></Reveal>)}</div></div></section>

    <section className="simop-banner"><div className="pattern-dots"/><div className="shell simop-banner-grid"><Reveal><Eyebrow dark>Consulting Spotlight</Eyebrow><h2>SIMOP / SIMOPS,<br/><em>under control.</em></h2><p>Structured simultaneous operations management for complex interfaces across operating plants, shutdowns, construction, commissioning, marine, and offshore environments.</p><Link className="gold-button" to="/consulting-services/#simop">Explore SIMOP expertise <ArrowRight size={17}/></Link></Reveal><Reveal className="simop-map" delay={.08}><div className="simop-center">SIMOP<span>CONTROL</span></div>{['Interface register', 'PTW alignment', 'Risk workshops', 'Field coordination'].map((x, i) => <span key={x} className={`simop-node node-${i + 1}`}><Check size={14}/>{x}</span>)}</Reveal></div></section>

    <section id="clients" className="section cream-section clients-section"><div className="shell"><SectionHeading center eyebrow="Our Clients" text="Trusted across government, public institutions, and industry.">Relationships built on <em>delivery.</em></SectionHeading><div className="name-grid">{clients.map(name => <div key={name}>{name}</div>)}</div></div></section>
    <section id="partners" className="section dark-section partners-section"><div className="shell partners-grid"><div><Eyebrow dark>Our Partners</Eyebrow><h2>Global expertise.<br/><em>Local execution.</em></h2><p>We work alongside leading business partners and maintain accredited management systems that reinforce quality, safety, sustainability, and collaboration.</p></div><div className="partner-list">{partners.map(name => <span key={name}>{name}</span>)}</div></div><div className="shell certification-row">{[['ISO 9001', 'Quality'], ['ISO 41001', 'Facilities'], ['ISO 14001', 'Environment'], ['ISO 45001', 'Safety'], ['ISO 44001', 'Partnerships']].map(([code, name]) => <div key={code}><ShieldCheck/><strong>{code}</strong><span>{name}</span></div>)}</div></section>
    <section className="project-cta"><div className="shell"><div><span>Have a project in mind?</span><h2>Let’s build what’s next.</h2></div><Link className="gold-button" to="/contact/">Talk to our team <ArrowRight size={17}/></Link></div></section>
  </>
}

function About() {
  return <><PageHero eyebrow="About Us" title="A Qatari group built for lasting value." text="Five decades of experience, trusted partnerships, and integrated capability across Qatar and the region." image="/images/about.jpg"/>
    <section className="section cream-section"><div className="shell about-intro-grid"><Reveal><Eyebrow>A Legacy of Excellence Since 1970</Eyebrow><h2>Five decades of <em>progress.</em></h2><p>Since 1970, Al Baida Holding has grown from a Qatari enterprise into a diversified holding group with more than five decades of experience. Our businesses bring together specialist capability, practical local knowledge, and long-standing relationships to serve Qatar and the wider region.</p><p>With a workforce of more than 3,500 professionals and a growing network of companies and partners, the Group continues to invest in people, operational capability, technology, and sustainable practices that create long-term value.</p></Reveal><Reveal className="about-stat-card" delay={.08}><strong>1970</strong><span>Founded in Qatar</span><b>50+ years</b><span>of regional experience</span></Reveal></div></section>
    <section id="chairman" className="section sand-section"><div className="shell chairman-grid"><Reveal className="chairman-photo"><img src="/images/chairman.jpg" alt="H.E. Eng. Ali Bin Abdulatif Al Mesned"/><div><b>H.E. Eng. Ali Bin Abdulatif Al Mesned</b><span>Chairman, Al Baida Holding</span></div></Reveal><Reveal className="chairman-message" delay={.08}><Quote size={38}/><Eyebrow>Chairman’s Message</Eyebrow><h2>“Our journey has been defined by quality, reliability, and a commitment to innovation.”</h2><p>As we continue to expand into new sectors, our focus remains on trusted partnerships, sustainable practices, and high operational efficiency. We are committed not only to business growth, but also to our social, environmental, and economic responsibilities.</p><p className="signature">Leading progress with purpose.</p></Reveal></div></section>
    <section className="section dark-section"><div className="shell"><SectionHeading dark eyebrow="Leadership Perspective" text="Leadership focused on disciplined growth, strategic investment, and responsible operations.">Chairman Executive <em>Summary.</em></SectionHeading><div className="about-summary-grid"><div><strong>Strategic leadership</strong><p>Guiding diversified investments and partnerships with a clear focus on Qatar’s development priorities and long-term competitiveness.</p></div><div><strong>Sustainable practices</strong><p>Embedding quality, safety, environmental responsibility, and efficient operations across the Group’s companies and activities.</p></div><div><strong>People and capability</strong><p>Building strong teams and practical capabilities that support clients, partners, and the next generation of Qatar’s economy.</p></div></div></div></section>
    <section className="section cream-section"><div className="shell"><SectionHeading eyebrow="Who We Are & What We Do" text="A connected group of companies delivering integrated service capability. Why we work as one. We combine specialist businesses under a shared commitment to quality, reliability, and responsible growth.">One group.<br/><em>Integrated capability.</em></SectionHeading><div className="about-cards"><article><Building2/><h3>Who We Are</h3><p>A Qatari holding group with diversified businesses, strategic affiliations, and regional relationships.</p></article><article><Network/><h3>What We Do</h3><p>We connect contracting, engineering, facilities, logistics, technology, agriculture, education, workforce, and project capability.</p></article><article><Handshake/><h3>How We Partner</h3><p>We build dependable relationships with clients, affiliates, and strategic partners to deliver shared value.</p></article></div></div></section>
    <section className="section sand-section"><div className="shell"><div className="vision-mission-grid"><div><Eyebrow>Our Vision</Eyebrow><h2>Leading regional growth through <em>capability and trust.</em></h2></div><div><Eyebrow>Our Mission</Eyebrow><p>To deliver high-value services across core sectors, empower national and regional development, and build lasting value through people, partnerships, and progress.</p></div></div></div></section>
    <section className="section cream-section governance-section"><div className="shell"><SectionHeading center eyebrow="Governance" text="A strong governance structure supports accountable decision-making and sustainable growth.">Board of Directors & <em>Executive Management.</em></SectionHeading><div className="governance-placeholder"><span>BOARD OF DIRECTORS</span><span>EXECUTIVE MANAGEMENT</span></div></div></section>
  </>
}

function NetworkPage() {
  return <><PageHero eyebrow="Subsidiaries & Affiliated Companies" title="The group network behind integrated delivery." text="A diversified portfolio of companies and affiliations supporting capability, scale, and long-term growth." image="/images/factory.jpg"/><section className="section cream-section"><div className="shell"><SectionHeading eyebrow="Subsidiaries" text="18 entities across technical services, agriculture, logistics, consulting, energy, real estate, and specialist operations.">Our <em>subsidiaries.</em></SectionHeading><div className="entity-grid">{subsidiaries.map((company, i) => (
  <article key={company.name}>
    <span>{String(i + 1).padStart(2, '0')}</span>
    <Building2/>
    <h3>{company.name}</h3>
    <p>{company.description}</p>
  </article>
))}</div></div></section><section className="section dark-section"><div className="shell"><SectionHeading dark eyebrow="Affiliates" text="10 affiliated businesses extending specialist reach and international relationships.">Our <em>affiliates.</em></SectionHeading><div className="entity-grid dark-entity-grid">{affiliates.map((company, i) => (
  <article key={company.name}>
    <span>{String(i + 1).padStart(2, '0')}</span>
    <Handshake/>
    <h3>{company.name}</h3>
    <p>{company.description}</p>
  </article>
))}</div></div></section></>
}

function StrategicPartners() {
  return <><PageHero eyebrow="Strategic Partners" title="Partners that extend what we can deliver." text="Eight strategic relationships supporting technology, engineering, industrial capability, mapping, environmental solutions, and specialist expertise." image="/images/engineering.jpg"/><section className="section cream-section"><div className="shell"><SectionHeading center eyebrow="Strategic Partners" text="A focused network of specialist partners aligned around capability and results.">Global expertise.<br/><em>Local execution.</em></SectionHeading><div className="strategic-grid">{strategicPartners.map((company, i) => <Reveal key={company.name} delay={(i % 4) * .05}><article><span>{String(i + 1).padStart(2, '0')}</span><Handshake/><h3>{company.name}</h3><p>{company.description}</p></article></Reveal>)}</div></div></section></>
}

function Divisions() {
  return <><PageHero eyebrow="Our Core Divisions" title="15 divisions. One connected standard." text="Integrated operational capability across contracting, infrastructure, engineering, technology, people, logistics, facilities, and construction." image="/images/engineering.jpg"/><section className="section cream-section"><div className="shell"><SectionHeading eyebrow="Integrated Capability" text="Each division brings specialist teams and practical service depth under one Qatari holding group.">Core divisions.<br/><em>Connected capability.</em></SectionHeading><div className="core-division-list">{coreDivisions.map((item, i) => <Reveal key={item.title} className="core-division-card" delay={(i % 3) * .04}><div className="core-division-index">{String(i + 1).padStart(2, '0')}</div><div><Eyebrow>{item.title}</Eyebrow><h2>{item.title}</h2><p>{item.description}</p><div className="core-service-list">{item.services.map(service => <span key={service}><Check size={15}/>{service}</span>)}</div></div></Reveal>)}</div></div></section></>
}

function Consulting() {
  const [active, setActive] = useState(0)
  const current = consultingCategories[active]
  return <><PageHero eyebrow="Consulting Services" title="Complex operations. Clear, controlled outcomes." text="Specialist HSEQ, process safety, risk, training, management systems, and digital solutions for high-consequence environments." image="/images/about.jpg"/>
    <section id="simop" className="simop-feature"><div className="pattern-grid-bg"/><div className="shell simop-feature-grid"><Reveal><span className="feature-tag">SIMOP / SIMOPS SPECIALIST CAPABILITY</span><h2>Simultaneous operations,<br/><em>made safe and manageable.</em></h2><p>Al Baida Holding brings SIMOP planning into one coordinated control framework — integrating people, permits, isolations, work fronts, equipment movements, and emergency arrangements before activities interact in the field.</p><div className="simop-checks">{['SIMOP philosophy and procedure development', 'Interface identification and risk workshops', 'SIMOP matrices, registers, and control plans', 'PTW, LOTO, and isolation coordination', 'Daily coordination and field assurance', 'Marine, offshore, shutdown, and commissioning SIMOPS'].map(item => <span key={item}><Check size={16}/>{item}</span>)}</div><Link className="gold-button" to="/contact/?subject=SIMOP consultation">Request a SIMOP review <ArrowRight size={17}/></Link></Reveal><Reveal className="simop-framework" delay={.1}><span className="framework-label">SIMOP CONTROL FRAMEWORK</span>{[['01', 'Identify', 'Map concurrent work fronts and interfaces.'], ['02', 'Assess', 'Facilitate HAZID, risk ranking, and bow-tie review.'], ['03', 'Control', 'Align permits, isolations, zones, and communication.'], ['04', 'Assure', 'Verify readiness, monitor changes, and close actions.']].map(([n, title, text]) => <div key={n}><b>{n}</b><span><strong>{title}</strong><small>{text}</small></span></div>)}</Reveal></div></section>
    <section className="section cream-section consulting-catalogue"><div className="shell"><SectionHeading eyebrow="Consulting Catalogue" text="The complete consulting services structure, enhanced with dedicated SIMOP expertise.">Expertise for every<br/><em>critical interface.</em></SectionHeading><div className="catalogue-layout"><div className="catalogue-tabs">{consultingCategories.map((cat, i) => <button key={cat.title} className={active === i ? 'active' : ''} onClick={() => setActive(i)}><span>{cat.number}</span><b>{cat.title}</b><small>{cat.services.length} services</small><ChevronRight size={18}/></button>)}</div><motion.div key={active} className="service-panel" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}><span className="panel-number">{current.number}</span><h2>{current.title}</h2><p>{current.services.length} specialist services</p><div className="service-list">{current.services.map(service => <span key={service} className={service.includes('SIMOP') ? 'simop-service' : ''}><Check size={15}/>{service}{service.includes('SIMOP') && <b>CORE</b>}</span>)}</div></motion.div></div></div></section>
    <section className="consulting-cta"><div className="shell"><div><Eyebrow dark>Start with clarity</Eyebrow><h2>Every engagement begins with a structured scoping conversation.</h2></div><Link className="gold-button" to="/contact/?subject=Consulting enquiry">Book a consultation <ArrowRight size={17}/></Link></div></section>
  </>
}

function Projects() {
  const [filter, setFilter] = useState('All')
  const [showAll, setShowAll] = useState(false)
  const filtered = useMemo(() => projects.filter(project => filter === 'All' || project[1] === filter), [filter])
  const visible = showAll ? filtered : filtered.slice(0, 12)
  return <><PageHero eyebrow="Our Projects" title="Work that moves Qatar forward." text="A portfolio spanning government, industrial, marine, logistics, education, facilities, manpower, and infrastructure services." image="/images/project-cooec.jpg"/><section className="section cream-section"><div className="shell"><div className="heading-row project-heading"><SectionHeading eyebrow="Our Works" text="Strategic projects delivered across Qatar’s vital sectors for more than five decades.">Recent <em>projects.</em></SectionHeading><div className="filters">{['All', 'Ongoing', 'Completed'].map(x => <button key={x} className={filter === x ? 'active' : ''} onClick={() => { setFilter(x); setShowAll(false) }}>{x}</button>)}</div></div><div className="projects-grid">{visible.map((project, i) => <motion.article layout key={project[0]} className="project-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: Math.min(i, 8) * .03 }}><img src={project[2]} alt={project[0]}/><div className="project-card-wash"/><span className={project[1].toLowerCase()}>{project[1]}</span><div><small>PROJECT {String(projects.indexOf(project) + 1).padStart(2, '0')}</small><h3>{project[0]}</h3></div></motion.article>)}</div>{!showAll && filtered.length > 12 && <button className="load-more" onClick={() => setShowAll(true)}>Load more projects <ChevronDown size={17}/></button>}</div></section></>
}

function News() {
  return <><PageHero eyebrow="News & Events" title="Progress, partnerships, and perspectives." text="Updates from Al Baida Holding and the sectors we serve." image="/images/news.jpg"/><section className="section cream-section"><div className="shell news-layout"><SectionHeading eyebrow="Latest News" text="Holding news, agreements, and important moments.">What’s happening at<br/><em>Al Baida Holding.</em></SectionHeading><Reveal className="featured-news"><img src="/images/news.jpg" alt="Doha infrastructure"/><div><span>AL BAIDA HOLDING NEWS</span><h2>Al Baida Holding boosts Qatar–Saudi cooperation with new agreement</h2><p>A new milestone in regional cooperation, extending the holding’s commitment to high-value partnerships and sustainable growth.</p><Link to="/contact/?subject=Media enquiry">Media enquiries <ArrowRight size={16}/></Link></div></Reveal></div></section></>
}

function Careers() {
  const [file, setFile] = useState('')
  const [sent, setSent] = useState(false)
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true) }
  return <><PageHero eyebrow="Careers" title="Build your future with us." text="Bring your expertise, ambition, and ideas to a holding built by people who care about lasting impact." image="/images/hr.jpg"/><section className="section cream-section"><div className="shell careers-layout"><div><SectionHeading eyebrow="Join Our Team" text="We welcome professionals who share our commitment to integrity, excellence, innovation, and people first.">Your next chapter<br/><em>starts here.</em></SectionHeading><div className="career-values">{[['Purposeful work', 'Contribute to the industries that keep Qatar moving.', Target], ['Growth culture', 'Learn across sectors, disciplines, and major assignments.', GraduationCap], ['People first', 'Join a diverse team grounded in safety and mutual respect.', Users]].map(([title, text, Icon]) => { const I = Icon as LucideIcon; return <div key={title as string}><I/><span><b>{title as string}</b><small>{text as string}</small></span></div> })}</div></div><Reveal className="application-card" delay={.08}>{sent ? <Success onReset={() => setSent(false)} title="Application received." text="Thank you for your interest in Al Baida Holding. Our HR team will review your details."/> : <form onSubmit={submit}><span className="form-kicker">OPEN APPLICATION</span><h2>Tell us about yourself.</h2><div className="field-grid"><label>Full name<input required placeholder="Your name"/></label><label>Email address<input required type="email" placeholder="you@email.com"/></label></div><label>Area of expertise<select required defaultValue=""><option value="" disabled>Choose a division</option>{divisions.map(item => <option key={item.title}>{item.title}</option>)}</select></label><label className="upload-field"><input required type="file" accept=".pdf,.doc,.docx" onChange={e => setFile(e.target.files?.[0]?.name || '')}/><UploadCloud/><span><b>{file || 'Upload your CV'}</b><small>PDF, DOC, or DOCX</small></span></label><label>Message<textarea rows={4} placeholder="Tell us about your experience and interests"/></label><button className="gold-button" type="submit">Submit application <Send size={16}/></button></form>}</Reveal></div></section><Stats/></>
}

function Success({ onReset, title, text }: { onReset: () => void; title: string; text: string }) { return <div className="success-state"><span><Check/></span><h2>{title}</h2><p>{text}</p><button onClick={onReset}>Submit another response</button></div> }
function Contact() {
  const [sent, setSent] = useState(false)
  const location = useLocation()
  const defaultSubject = new URLSearchParams(location.search).get('subject') || 'General enquiry'
  const submit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault()
  const form = event.currentTarget
  const response = await fetch('https://formspree.io/f/xoeqobdr', {
    method: 'POST',
    body: new FormData(form),
    headers: { Accept: 'application/json' },
  })
  if (response.ok) {
    setSent(true)
    form.reset()
  } else {
    alert('Something went wrong. Please try again.')
  }
}
  return <><PageHero eyebrow="Contact Us" title="Let’s talk about what comes next." text="Whether you have a project, partnership, career, or consulting enquiry, the right team is ready to help." image="/images/hero-doha.jpg"/><section className="section cream-section"><div className="shell contact-layout"><div><SectionHeading eyebrow="Get in Touch" text="Trusted since 1970, we power progress across Qatar’s vital industries.">We’d love to<br/><em>hear from you.</em></SectionHeading><div className="contact-cards"><a href="tel:+97444128899"><span><Phone/></span><div><small>CALL US</small><b>+974 4412 8899</b></div></a><a href="mailto:info@albaidagroup.com"><span><Mail/></span><div><small>EMAIL US</small><b>Info@albaidaholding.com</b></div></a><div><span><MapPin/></span><div><small>VISIT US</small><b>P.O. Box 37772, Doha, Qatar</b></div></div></div><div className="map-card"><div className="pattern-dots"/><MapPin/><span>DOHA · QATAR</span><small>25.2854° N · 51.5310° E</small></div></div><Reveal className="contact-form-card" delay={.08}>{sent ? <Success onReset={() => setSent(false)} title="Message sent." text="Thank you. Our team will route your enquiry to the right division."/> : <form onSubmit={submit}><span className="form-kicker">SEND A MESSAGE</span><h2>How can we help?</h2><div className="field-grid"><label>Full name<input name="name" required placeholder="Your name"/></label><label>Work email<input name="email" required type="email" placeholder="you@company.com"/></label></div><div className="field-grid"><label>Phone number<input name="phone" type="tel" placeholder="+974"/></label><label>Subject<select name="subject" defaultValue={defaultSubject}><option>General enquiry</option><option>Project enquiry</option><option>SIMOP consultation</option><option>Consulting enquiry</option><option>Division enquiry</option><option>Media enquiry</option><option>Partnership enquiry</option></select></label></div><label>Interested service<select name="service" defaultValue=""><option value="">Choose from list</option>{divisions.map(item => <option key={item.title}>{item.title}</option>)}<option>Consulting Services</option><option>SIMOP / SIMOPS Services</option></select></label><label>Your message<textarea name="message" required rows={6} placeholder="Tell us about your requirement"/></label><button className="gold-button" type="submit">Send message <Send size={16}/></button></form>}</Reveal></div></section></>
}

function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const subscribe = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); if (email.includes('@')) setSubscribed(true) }
  return <footer className="footer"><div className="pattern-grid-bg"/><div className="shell footer-grid"><div className="footer-brand"><Brand/><p>Integrated capability across engineering, infrastructure, energy support, equipment, logistics, environmental services, and people.</p><div>{['ISO 9001', 'ISO 14001', 'ISO 45001'].map(x => <span key={x}>{x}</span>)}</div></div><div><h4>Quick Links</h4><ul>{[['Home', '/'], ['About Us', '/about/'], ['Subsidiaries & Affiliates', '/subsidiaries/'], ['Strategic Partners', '/strategic-partners/'], ['Our Core Divisions', '/divisions/'], ['News and Events', '/news-events/'], ['Contact us', '/contact/']].map(([x, to]) => <li key={x}><Link to={to}>{x}</Link></li>)}</ul></div><div><h4>About</h4><ul>{[['Overview', '/about/'], ['Chairman’s Message', '/about/#chairman'], ['Subsidiaries', '/subsidiaries/'], ['Strategic Partners', '/strategic-partners/'], ['Our Core Divisions', '/divisions/'], ['Contact us', '/contact/']].map(([x, to]) => <li key={x}><Link to={to}>{x}</Link></li>)}</ul></div><div className="footer-contact"><h4>Get in Touch</h4><p><MapPin/> P.O. Box 37772<br/>Doha, Qatar</p><a href="mailto:Info@albaidaholding.com"><Mail/>Info@albaidaholding.com</a><a href="tel:+97444128899"><Phone/>+974 4412 8899</a><div className="socials"><a aria-label="Facebook" href="https://www.facebook.com/Al-Baida-Group-226931370845105"><Facebook/></a><a aria-label="LinkedIn" href="https://www.linkedin.com/company/albaida-group"><Linkedin/></a></div></div><div className="newsletter"><h4>Stay Informed</h4><p>Receive holding news and updates.</p>{subscribed ? <span className="subscribed"><Check/> You’re subscribed.</span> : <form onSubmit={subscribe}><input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Work email"/><button aria-label="Subscribe"><ArrowRight/></button></form>}</div></div><div className="shell footer-bottom"><span>© 2026 Al Baida Holding. All rights reserved. Qatar.</span><span>ISO 9001 · ISO 14001 · ISO 45001 · ISO 44001 · ISO 41001</span></div></footer>
}
function NotFound() { return <section className="not-found"><div className="pattern-grid-bg"/><div><Building2/><span>404</span><h1>This page is still being built.</h1><p>The destination you’re looking for does not exist.</p><Link className="gold-button" to="/">Back to home <ArrowRight size={17}/></Link></div></section> }

export default function HoldingApp() {
  return <BrowserRouter><ScrollManager/><Header/><main><Routes><Route path="/" element={<Home/>}/><Route path="/about/" element={<About/>}/><Route path="/subsidiaries/" element={<NetworkPage/>}/><Route path="/strategic-partners/" element={<StrategicPartners/>}/><Route path="/divisions/" element={<Divisions/>}/><Route path="/consulting-services/" element={<Consulting/>}/><Route path="/projects/" element={<Projects/>}/><Route path="/news-events/" element={<News/>}/><Route path="/careers/" element={<Careers/>}/><Route path="/contact/" element={<Contact/>}/><Route path="*" element={<NotFound/>}/></Routes></main><Footer/></BrowserRouter>
}
