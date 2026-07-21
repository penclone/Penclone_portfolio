
const { useState, useEffect, useRef } = React;

const CALENDAR_URL = "https://calendar.app.google/DZDchYJaZj3jxv419";
const WHATSAPP_URL = "https://wa.me/2349077911677?text=" + encodeURIComponent("Hi! I found your portfolio and I'd like to talk about a voice agent for my business.");

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

const STATS = [
  "24/7 Availability", "Sub-2s Response Time", "0 Missed Calls", "100% CRM-Logged",
  "7 Industries Served", "4+ Years Building Voice AI", "Human Handoff Ready",
];

const INDUSTRIES = [
  { name: "Healthcare", pain: "Patients hang up when the front desk is on hold.", fix: "An AI receptionist answers instantly, verifies insurance basics, and books or reschedules appointments straight into your calendar — HIPAA-aware conversation flows included." },
  { name: "Law Firms", pain: "After-hours calls from potential clients go to voicemail and never call back.", fix: "A 24/7 intake agent qualifies leads by case type, captures the details your team needs, and routes urgent matters to an attorney immediately." },
  { name: "Real Estate", pain: "Listing calls spike the moment a sign goes up — and agents are already on a showing.", fix: "The agent answers property questions instantly, books showings, and texts the lead's details to you before you're even out of the car." },
  { name: "Insurance", pain: "Renewal and claims calls pile up faster than agents can return them.", fix: "Voice agents triage claims vs. quotes vs. renewals, collect policy numbers, and hand off complex cases with full context attached." },
  { name: "Hospitality", pain: "Reservation calls compete with guests standing at the front desk.", fix: "Reservations, modifications, and FAQs are handled by voice while your staff stays focused on the guest in front of them." },
  { name: "Roofing", pain: "Storm season floods the phone lines right when speed-to-lead matters most.", fix: "Every inbound call is answered on the first ring, qualified for damage type and urgency, and booked for a free inspection automatically." },
  { name: "Home Services", pain: "Techs in the field can't stop to answer the phone — so bookings are lost.", fix: "Dispatch-aware voice agents book jobs, send confirmations, and follow up on quotes without pulling anyone off a job site." },
];

const SERVICES = [
  { title: "Inbound Voice Agents", desc: "Always-on AI that answers, qualifies, and books — so no call ever hits voicemail again.", tag: "01" },
  { title: "Outbound & Follow-Up", desc: "Automated re-engagement for cold leads, missed calls, and no-shows, at a volume no human team could match.", tag: "02" },
  { title: "Workflow Automation", desc: "Make.com and n8n pipelines that connect every call to your CRM, calendar, and team inbox in real time.", tag: "03" },
  { title: "Voice & Personality Design", desc: "A custom-built voice and script that sounds like your brand, powered by ElevenLabs and Cartesia.", tag: "04" },
  { title: "Integration & Live Handoff", desc: "Twilio and GoHighLevel wiring with clean escalation to a human whenever a call needs one.", tag: "05" },
  { title: "Optimization & Reporting", desc: "Ongoing call review, prompt tuning, and a monthly report on what the agent booked, saved, and caught.", tag: "06" },
];

const CASES = [
  { client: "Regional Roofing Company", industry: "Roofing", summary: "Storm-season call volume was overwhelming a two-person office line.",
    approach: "Deployed an inbound agent that answers on the first ring, qualifies storm damage vs. routine repair, and books free inspections directly into the crew's calendar.",
    metrics: [ ["Missed calls", "→ near zero"], ["Avg. answer time", "< 2 sec"], ["Inspections booked", "24/7 coverage"] ] },
  { client: "Multi-Location Dental Group", industry: "Healthcare", summary: "Reception staff were spending most of their day on the phone instead of with patients.",
    approach: "Built a scheduling agent that handles reschedules, cancellations, and new-patient intake, escalating anything clinical to a human instantly.",
    metrics: [ ["Front-desk call load", "cut sharply"], ["After-hours bookings", "captured 24/7"], ["Patient wait on hold", "eliminated"] ] },
  { client: "Boutique Personal Injury Firm", industry: "Law", summary: "Every unanswered after-hours call was a potential case going to a competitor.",
    approach: "An intake agent qualifies case type and urgency, gathers incident details, and alerts the on-call attorney for anything time-sensitive.",
    metrics: [ ["After-hours intake", "always on"], ["Lead detail capture", "structured & complete"], ["Response to urgent cases", "immediate"] ] },
];

const TESTIMONIALS = [
  { quote: "Calls stopped falling through the cracks the week this went live. It books appointments better than some of the people we've hired.", name: "Operations Lead", role: "Home Services client" },
  { quote: "It sounds like one of our staff, not a robot. Patients don't even realize half the time.", name: "Practice Manager", role: "Healthcare client" },
  { quote: "We used to lose after-hours leads to whoever called back first. Now we're always the ones who call back — because we never stopped answering.", name: "Managing Partner", role: "Law firm client" },
];

const PRICING = [
  { name: "Starter", price: "$1.5k+", period: "one-time build", desc: "A single voice agent for one core workflow — inbound answering or intake.", features: ["1 inbound voice agent", "Core CRM/calendar integration", "Custom voice & script", "2 weeks of tuning"], cta: "Start here" },
  { name: "Growth", price: "$4k+", period: "one-time build", desc: "Multi-workflow automation for a business ready to scale beyond the front desk.", features: ["Inbound + outbound agents", "Full Make.com/n8n automation", "GoHighLevel or CRM sync", "Live human handoff", "30 days of tuning"], cta: "Most popular", highlight: true },
  { name: "Enterprise", price: "Custom", period: "scoped project", desc: "Multi-location or multi-agent systems with ongoing optimization built in.", features: ["Unlimited agent workflows", "Custom integrations", "Dedicated reporting", "Ongoing monthly optimization"], cta: "Let's talk" },
];

function useReveal(){
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if(!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); obs.unobserve(e.target); } });
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, className = "", delay = 0 }){
  const ref = useReveal();
  return (
    <div ref={ref} className={"reveal " + className} style={{ transitionDelay: delay + "ms" }}>
      {children}
    </div>
  );
}

function Eyebrow({ children }){
  return (
    <div className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.25em] uppercase text-emerald-300/80 mb-4">
      <span className="w-6 h-px bg-emerald-400/60"></span>{children}
    </div>
  );
}

function Nav(){
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header className={"fixed top-0 inset-x-0 z-50 transition-all duration-300 " + (scrolled ? "py-3" : "py-5")}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={"glass rounded-2xl px-5 py-3 flex items-center justify-between " + (scrolled ? "shadow-xl" : "")}>
          <a href="#top" className="font-display font-semibold text-lg tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full pulse-dot" style={{background:'var(--emerald)'}}></span>
            Penclone
          </a>
          <nav className="hidden md:flex items-center gap-8 font-mono text-[13px]">
            {NAV_LINKS.map(l => <a key={l.href} href={l.href} className="nav-link">{l.label}</a>)}
          </nav>
          <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" className="hidden md:inline-flex btn-primary rounded-full px-5 py-2 text-sm">Book a Call</a>
          <button className="md:hidden text-text" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            <div className="w-6 flex flex-col gap-1.5">
              <span className="h-px bg-white block"></span>
              <span className="h-px bg-white block"></span>
            </div>
          </button>
        </div>
        {open && (
          <div className="glass rounded-2xl mt-2 p-5 flex flex-col gap-4 md:hidden font-mono text-sm">
            {NAV_LINKS.map(l => <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="nav-link">{l.label}</a>)}
            <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="btn-primary rounded-full px-5 py-2 text-center">Book a Call</a>
          </div>
        )}
      </div>
    </header>
  );
}

const TRANSCRIPT = [
  { who: "sys", text: "Incoming call · Riverside Roofing" },
  { who: "ai", text: "Thanks for calling Riverside Roofing, this is Ava. How can I help?" },
  { who: "caller", text: "Hi, I've got some shingles missing after last night's storm." },
  { who: "ai", text: "Sorry to hear that — I can get someone out for a free inspection. Does tomorrow at 10am work?" },
  { who: "caller", text: "Yes, that works." },
  { who: "sys", text: "✓ Inspection booked · Lead synced to CRM · SMS confirmation sent" },
];

function HeroDemo(){
  const [lines, setLines] = useState([]);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    setLines([]);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setLines(TRANSCRIPT.slice(0, i));
      if(i >= TRANSCRIPT.length){
        clearInterval(interval);
        setTimeout(() => setCycle(c => c + 1), 2600);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [cycle]);

  return (
    <div className="glass-strong liquid-sheen hud-corners rounded-3xl p-5 sm:p-6 w-full max-w-md mx-auto" style={{position:'relative'}}>
      <div className="scanline rounded-3xl"></div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full pulse-dot" style={{background:'var(--emerald)'}}></span>
          <span className="font-mono text-[11px] tracking-widest uppercase text-emerald-300/90">Live agent · Ava</span>
        </div>
        <div className="flex items-end gap-[3px] h-6">
          {[0,1,2,3,4].map(i => (
            <span key={i} className="wave-bar" style={{ animationDelay: (i*0.12)+"s" }}></span>
          ))}
        </div>
      </div>
      <div className="space-y-3 min-h-[220px] font-mono text-[13px] leading-relaxed">
        {lines.map((l, idx) => {
          if(l.who === "sys"){
            return <div key={idx} className="text-emerald-300/70 text-xs">{l.text}</div>;
          }
          const isAi = l.who === "ai";
          return (
            <div key={idx} className={"flex " + (isAi ? "justify-start" : "justify-end")}>
              <div className={"max-w-[85%] rounded-xl px-3 py-2 " + (isAi ? "bg-emerald-400/10 border border-emerald-400/20 text-emerald-50" : "bg-white/5 border border-white/10 text-slate-200")}>
                <div className="text-[10px] uppercase tracking-wider opacity-60 mb-0.5">{isAi ? "Ava (AI)" : "Caller"}</div>
                {l.text}
              </div>
            </div>
          );
        })}
        {lines.length === TRANSCRIPT.length && <span className="cursor-blink"></span>}
      </div>
    </div>
  );
}

function Hero(){
  return (
    <section id="top" className="relative pt-40 pb-28 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <Eyebrow>AI Voice &amp; Automation Engineer</Eyebrow>
          <h1 className="font-display text-5xl sm:text-6xl font-semibold leading-[1.05] tracking-tight">
            Your front desk,<br/>
            <span className="grad-text">reinvented.</span>
          </h1>
          <p className="mt-6 text-lg max-w-lg" style={{color:'var(--text-dim)'}}>
            Penclone builds AI voice employees that answer every call, book every appointment,
            and follow up while you sleep — never missing a call, never forgetting a task.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" className="btn-primary rounded-full px-7 py-3.5">Book a Strategy Call</a>
            <a href="#work" className="btn-ghost rounded-full px-7 py-3.5 glass">See it answer a call ↓</a>
          </div>
          <div className="mt-10 flex items-center gap-6 font-mono text-xs" style={{color:'var(--text-dim)'}}>
            <span>Vapi</span><span className="opacity-30">·</span>
            <span>Retell AI</span><span className="opacity-30">·</span>
            <span>ElevenLabs</span><span className="opacity-30">·</span>
            <span>Make.com</span><span className="opacity-30">·</span>
            <span>Twilio</span>
          </div>
        </div>
        <HeroDemo />
      </div>
    </section>
  );
}

function Marquee(){
  const items = [...STATS, ...STATS];
  return (
    <div className="border-y border-white/10 py-5 overflow-hidden bg-white/[0.02]">
      <div className="marquee-track">
        {items.map((s, i) => (
          <div key={i} className="flex items-center gap-3 mx-8 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full" style={{background:'var(--amber)'}}></span>
            <span className="font-mono text-sm whitespace-nowrap" style={{color:'var(--text-dim)'}}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function IndustryRow({ item, isOpen, onClick }){
  return (
    <div className="border-b border-white/10">
      <button onClick={onClick} className="w-full py-6 flex items-center justify-between text-left group">
        <span className="font-display text-xl sm:text-2xl font-medium group-hover:text-emerald-300 transition-colors">{item.name}</span>
        <span className={"font-mono text-xl transition-transform duration-300 " + (isOpen ? "rotate-45" : "")} style={{color:'var(--emerald)'}}>+</span>
      </button>
      <div className="grid transition-all duration-300 ease-in-out" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
        <div className="overflow-hidden">
          <div className="pb-6 grid sm:grid-cols-2 gap-4 max-w-3xl">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-amber-400/80 mb-1">The problem</div>
              <p style={{color:'var(--text-dim)'}}>{item.pain}</p>
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-emerald-300/80 mb-1">What Penclone builds</div>
              <p>{item.fix}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Industries(){
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <section id="industries" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <Eyebrow>Industries</Eyebrow>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-4">Built for the calls that matter most.</h2>
          <p className="max-w-xl mb-4" style={{color:'var(--text-dim)'}}>Every industry loses business the same way — a phone that isn't answered fast enough. Here's how Penclone fixes it, sector by sector.</p>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-8">
            {INDUSTRIES.map((item, idx) => (
              <IndustryRow key={item.name} item={item} isOpen={openIdx === idx} onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Services(){
  return (
    <section id="services" className="py-28 px-6 bg-white/[0.015] border-y border-white/10">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <Eyebrow>Services</Eyebrow>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-4 max-w-2xl">Everything it takes to turn your phone line into a full-time employee.</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <div className="glass liquid-sheen tilt-card hud-corners rounded-2xl p-7 h-full">
                <div className="font-mono text-xs text-amber-400/80 mb-6">{s.tag}</div>
                <h3 className="font-display text-xl font-medium mb-3">{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{color:'var(--text-dim)'}}>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseCard({ c }){
  const [open, setOpen] = useState(false);
  return (
    <div className="glass rounded-2xl overflow-hidden tilt-card hud-corners">
      <button onClick={() => setOpen(!open)} className="w-full text-left p-7">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-[11px] uppercase tracking-widest text-emerald-300/80">{c.industry}</span>
          <span className="font-mono text-lg" style={{color:'var(--emerald)'}}>{open ? "–" : "+"}</span>
        </div>
        <h3 className="font-display text-xl font-medium mb-2">{c.client}</h3>
        <p className="text-sm" style={{color:'var(--text-dim)'}}>{c.summary}</p>
      </button>
      <div className="grid transition-all duration-300" style={{ gridTemplateRows: open ? '1fr' : '0fr' }}>
        <div className="overflow-hidden">
          <div className="px-7 pb-7 border-t border-white/10 pt-5">
            <p className="text-sm mb-5">{c.approach}</p>
            <div className="grid grid-cols-3 gap-3">
              {c.metrics.map(([label, val]) => (
                <div key={label} className="bg-white/5 rounded-xl p-3 text-center">
                  <div className="font-display text-sm sm:text-base font-semibold grad-text">{val}</div>
                  <div className="font-mono text-[10px] uppercase tracking-wider mt-1" style={{color:'var(--text-dim)'}}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Work(){
  return (
    <section id="work" className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <Eyebrow>Case Studies</Eyebrow>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-3 max-w-2xl">Real workflows, rebuilt around a voice that never clocks out.</h2>
          <p className="text-sm mb-12" style={{color:'var(--text-dim)'}}>Illustrative results based on typical engagements — tap a card to expand. Swap in your own client data anytime.</p>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-5">
          {CASES.map((c, i) => (
            <Reveal key={c.client} delay={i * 100}><CaseCard c={c} /></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials(){
  return (
    <section className="py-28 px-6 bg-white/[0.015] border-y border-white/10">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <Eyebrow>Testimonials</Eyebrow>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-12 max-w-2xl">What it's like once the calls stop getting missed.</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <div className="glass rounded-2xl p-7 h-full flex flex-col">
                <div className="font-display text-3xl grad-text mb-3">"</div>
                <p className="text-sm leading-relaxed flex-1">{t.quote}</p>
                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className="font-medium text-sm">{t.name}</div>
                  <div className="font-mono text-[11px]" style={{color:'var(--text-dim)'}}>{t.role}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing(){
  return (
    <section id="pricing" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <Eyebrow>Pricing</Eyebrow>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-3 max-w-2xl">Scoped to what your phone line actually needs.</h2>
          <p className="text-sm mb-12" style={{color:'var(--text-dim)'}}>Starting prices shown — every engagement is scoped on a call first. Update these to match your real packages.</p>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-5">
          {PRICING.map((p, i) => (
            <Reveal key={p.name} delay={i * 100}>
              <div className={"rounded-2xl p-8 h-full flex flex-col " + (p.highlight ? "glass-strong border-2" : "glass")} style={p.highlight ? { borderColor: 'var(--emerald)' } : {}}>
                {p.highlight && <div className="font-mono text-[10px] uppercase tracking-widest text-emerald-300 mb-3">{p.cta}</div>}
                <h3 className="font-display text-xl font-medium">{p.name}</h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-semibold">{p.price}</span>
                </div>
                <div className="font-mono text-xs mb-5" style={{color:'var(--text-dim)'}}>{p.period}</div>
                <p className="text-sm mb-6" style={{color:'var(--text-dim)'}}>{p.desc}</p>
                <ul className="space-y-2.5 text-sm mb-8 flex-1">
                  {p.features.map(f => (
                    <li key={f} className="flex items-start gap-2">
                      <span style={{color:'var(--emerald)'}}>✓</span><span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" className={"rounded-full px-5 py-3 text-center text-sm " + (p.highlight ? "btn-primary" : "btn-ghost")}>
                  {p.highlight ? "Get started" : p.cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const BUDGETS = ["Under $1.5k", "$1.5k – $4k", "$4k – $10k", "$10k+"];

function Contact(){
  const [budgetIdx, setBudgetIdx] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <Eyebrow>Contact</Eyebrow>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-3">Let's put your phone line to work.</h2>
            <p style={{color:'var(--text-dim)'}}>Tell me about your business and I'll follow up within one business day.</p>
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" className="btn-primary rounded-full px-6 py-3 text-sm">Book directly on my calendar</a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost glass rounded-full px-6 py-3 text-sm flex items-center gap-2">
                <WhatsAppIcon /> Message on WhatsApp
              </a>
            </div>
            <div className="font-mono text-[11px] mt-4" style={{color:'var(--text-dim)'}}>or fill out the form below<span className="cursor-blink"></span></div>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="glass-strong rounded-3xl p-8 sm:p-10">
            {submitted ? (
              <div className="text-center py-10">
                <div className="font-display text-2xl mb-2 grad-text">Message received.</div>
                <p style={{color:'var(--text-dim)'}}>I'll be in touch within one business day — thanks for reaching out.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-mono text-xs uppercase tracking-wider block mb-2" style={{color:'var(--text-dim)'}}>Name</label>
                    <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-emerald-400/50 transition-colors" placeholder="Jane Smith" />
                  </div>
                  <div>
                    <label className="font-mono text-xs uppercase tracking-wider block mb-2" style={{color:'var(--text-dim)'}}>Email</label>
                    <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-emerald-400/50 transition-colors" placeholder="jane@business.com" />
                  </div>
                </div>
                <div>
                  <label className="font-mono text-xs uppercase tracking-wider block mb-2" style={{color:'var(--text-dim)'}}>Business name</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-emerald-400/50 transition-colors" placeholder="Riverside Roofing" />
                </div>
                <div>
                  <label className="font-mono text-xs uppercase tracking-wider block mb-3" style={{color:'var(--text-dim)'}}>
                    Estimated budget — <span style={{color:'var(--emerald)'}}>{BUDGETS[budgetIdx]}</span>
                  </label>
                  <input type="range" min="0" max="3" value={budgetIdx} onChange={(e) => setBudgetIdx(Number(e.target.value))} className="w-full" />
                  <div className="flex justify-between font-mono text-[10px] mt-2" style={{color:'var(--text-dim)'}}>
                    {BUDGETS.map(b => <span key={b}>{b}</span>)}
                  </div>
                </div>
                <div>
                  <label className="font-mono text-xs uppercase tracking-wider block mb-2" style={{color:'var(--text-dim)'}}>What's going on with your phone line?</label>
                  <textarea rows="4" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-emerald-400/50 transition-colors resize-none" placeholder="e.g. We're missing calls during peak hours and losing leads to competitors..."></textarea>
                </div>
                <button type="submit" className="btn-primary rounded-full px-7 py-3.5 w-full sm:w-auto">Book a Strategy Call</button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function WhatsAppIcon({ size = 18 }){
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.02 3C9.4 3 4 8.4 4 15.02c0 2.22.6 4.3 1.65 6.09L3 29l8.08-2.6a12.9 12.9 0 0 0 4.94.98h.01c6.62 0 12.02-5.4 12.02-12.02C28.05 8.4 22.65 3 16.02 3zm0 21.9h-.01a10.8 10.8 0 0 1-5.53-1.52l-.4-.24-4.8 1.54 1.57-4.68-.26-.42a10.86 10.86 0 0 1-1.66-5.76c0-6 4.89-10.88 10.9-10.88 2.91 0 5.65 1.13 7.7 3.19a10.82 10.82 0 0 1 3.19 7.7c0 6.01-4.89 10.87-10.7 10.87zm5.96-8.14c-.33-.16-1.93-.95-2.23-1.06-.3-.11-.51-.16-.73.16-.22.33-.84 1.06-1.03 1.27-.19.22-.38.24-.7.08-.33-.16-1.37-.5-2.61-1.6-.97-.86-1.62-1.92-1.81-2.24-.19-.33-.02-.5.14-.67.14-.14.33-.38.49-.57.16-.19.22-.33.33-.54.11-.22.05-.41-.03-.57-.08-.16-.73-1.75-1-2.4-.26-.62-.53-.54-.73-.55h-.62c-.22 0-.57.08-.87.41-.3.33-1.14 1.11-1.14 2.7 0 1.59 1.17 3.13 1.33 3.34.16.22 2.3 3.51 5.58 4.92.78.34 1.39.54 1.87.69.78.25 1.5.21 2.06.13.63-.09 1.93-.79 2.2-1.55.27-.76.27-1.41.19-1.55-.08-.14-.3-.22-.62-.38z"/>
    </svg>
  );
}

function FloatingWhatsApp(){
  return (
    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
       className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center glass-strong hud-corners liquid-sheen"
       style={{ boxShadow: '0 10px 30px -8px rgba(52,211,153,0.45)' }} aria-label="Chat on WhatsApp">
      <span className="pulse-dot absolute" style={{ width: 4, height: 4, top: 10, right: 12, background: 'var(--emerald)', borderRadius: '9999px' }}></span>
      <span style={{ color: '#25D366' }}><WhatsAppIcon size={26} /></span>
    </a>
  );
}

function Footer(){
  return (
    <footer className="border-t border-white/10 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="font-display font-semibold text-lg flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{background:'var(--emerald)'}}></span>
          Penclone
        </div>
        <nav className="flex flex-wrap gap-6 font-mono text-xs" style={{color:'var(--text-dim)'}}>
          {NAV_LINKS.map(l => <a key={l.href} href={l.href} className="hover:text-white transition-colors">{l.label}</a>)}
        </nav>
        <div className="font-mono text-xs" style={{color:'var(--text-dim)'}}>© 2026 Penclone · AI Voice &amp; Automation</div>
      </div>
    </footer>
  );
}

function App(){
  return (
    <div className="relative">
      <div className="bg-glow"></div>
      <div className="grain"></div>
      <div className="relative z-10">
        <Nav />
        <Hero />
        <Marquee />
        <Industries />
        <Services />
        <Work />
        <Testimonials />
        <Pricing />
        <Contact />
        <Footer />
        <FloatingWhatsApp />
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
