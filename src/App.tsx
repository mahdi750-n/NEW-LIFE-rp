import { useEffect, useRef, useState } from 'react';
import {
  Shield, Ambulance, Wrench, Skull, Users, Clock, Cpu, Star,
  Smartphone, Car, Home, Briefcase, ChevronDown, ExternalLink,
  MessageCircle, Play, Menu, X, Activity, Globe, Zap, Award
} from 'lucide-react';

const SERVER_IP = '89.42.88.252:22091';
const DISCORD_URL = 'https://discord.gg/GPzfa4q22';
const DIRECT_CONNECT = `mtasa://${SERVER_IP}`;
const LOGO = '/Screenshot_2026-06-02_111830.png';

// ─── Particles ───────────────────────────────────────────────────────────────
function Stars() {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    size: Math.random() * 2.5 + 0.5,
    top: Math.random() * 100,
    left: Math.random() * 100,
    duration: Math.random() * 4 + 2,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.6 + 0.2,
  }));

  return (
    <div className="stars">
      {stars.map(s => (
        <div
          key={s.id}
          className="star"
          style={{
            width: s.size,
            height: s.size,
            top: `${s.top}%`,
            left: `${s.left}%`,
            opacity: s.opacity,
            '--duration': `${s.duration}s`,
            '--delay': `${s.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

// ─── Animated counter ────────────────────────────────────────────────────────
function Counter({ target, suffix = '', duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(ease * target));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Reveal wrapper ───────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#features', label: 'المميزات' },
    { href: '#factions', label: 'الفصائل' },
    { href: '#stats', label: 'إحصائيات' },
    { href: '#gallery', label: 'صور' },
    { href: '#server', label: 'السيرفر' },
    { href: '/rules', label: 'القوانين' },
  ];

  return (
    <nav
      dir="rtl"
      className={`fixed top-0 w-full z-50 nav-blur transition-all duration-300 ${
        scrolled ? 'bg-[#020817]/90 border-b border-white/5 shadow-lg shadow-black/20' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo & Brand */}
        <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img src={LOGO} alt="NEW LIFE RP" className="w-8 h-8 rounded-lg" />
          <span className="font-bold text-lg tracking-wide">
            <span className="text-white">NEW LIFE </span>
            <span className="text-cyan-400 text-glow-cyan">RP</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-gray-300 hover:text-cyan-400 transition-colors duration-200 font-medium"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Discord CTA - Single link */}
        <a
          href={DISCORD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 bg-[#5865F2] hover:bg-[#4752c4] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-[#5865F2]/30"
        >
          <MessageCircle size={15} />
          Discord
        </a>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setMenuOpen(v => !v)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#020817]/95 nav-blur border-t border-white/5 px-4 py-4 flex flex-col gap-3">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-gray-300 hover:text-cyan-400 transition-colors py-1 font-medium"
            >
              {l.label}
            </a>
          ))}
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#5865F2] text-white text-sm font-semibold px-4 py-2 rounded-lg w-fit mt-2"
          >
            <MessageCircle size={15} />
            Discord
          </a>
        </div>
      )}
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [playerCount, setPlayerCount] = useState(327);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlayerCount(p => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.min(500, Math.max(300, p + delta));
      });
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      dir="rtl"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 hero-gradient overflow-hidden"
    >
      <Stars />
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

      {/* Live badge */}
      <div
        className="relative z-10 flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-6 text-sm"
        style={{ animation: 'countUp 0.8s ease-out forwards' }}
      >
        <span className="status-dot w-2 h-2 rounded-full bg-green-400" />
        <span className="text-green-400 font-semibold">{playerCount} لاعب الآن</span>
        <span className="text-gray-400 mx-1">•</span>
        <span className="text-gray-300">السيرفر يعمل 24/7</span>
      </div>

      {/* Main title */}
      <h1
        className="relative z-10 font-black leading-none mb-4"
        style={{ fontSize: 'clamp(3rem, 10vw, 7rem)', animation: 'countUp 1s ease-out 0.2s both' }}
      >
        <span className="text-white">NEW </span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 text-glow-cyan">
          LIFE
        </span>
        <br />
        <span className="text-white text-[0.55em]">ROLEPLAY</span>
      </h1>

      {/* Subtitle */}
      <p
        className="relative z-10 text-gray-300 text-lg sm:text-xl max-w-xl mb-2 font-medium"
        style={{ animation: 'countUp 1s ease-out 0.4s both' }}
      >
        أفضل تجربة Roleplay عربية داخل MTA San Andreas
      </p>
      <p
        className="relative z-10 text-gray-500 text-sm mb-10 font-mono"
        style={{ animation: 'countUp 1s ease-out 0.5s both' }}
      >
        {SERVER_IP}
      </p>

      {/* CTA Buttons */}
      <div
        className="relative z-10 flex flex-wrap gap-4 justify-center"
        style={{ animation: 'countUp 1s ease-out 0.6s both' }}
      >
        <a
          href={DIRECT_CONNECT}
          className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/30 text-base"
        >
          <Play size={18} fill="white" />
          العب الآن
        </a>
        <a
          href={DISCORD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#5865F2] hover:bg-[#4752c4] text-white font-bold px-8 py-4 rounded-2xl transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-[#5865F2]/30 text-base"
        >
          <MessageCircle size={18} />
          انضم للديسكورد
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
        <span className="text-xs text-gray-400">اكتشف أكثر</span>
        <ChevronDown size={16} className="text-gray-400 animate-bounce" />
      </div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────
const FEATURES = [
  { icon: Smartphone, title: 'نظام الهاتف', desc: 'هاتف ذكي متكامل مع مكالمات، رسائل، ومنصات تواصل داخل اللعبة.', color: 'cyan' },
  { icon: Car, title: 'سيارات حصرية', desc: 'أكثر من 200 سيارة مخصصة بتفاصيل دقيقة وأنظمة قيادة واقعية.', color: 'blue' },
  { icon: Home, title: 'نظام المنازل', desc: 'امتلك منزلك الخاص وخصصه بالأثاث والتفاصيل التي تناسبك.', color: 'cyan' },
  { icon: Briefcase, title: 'وظائف متنوعة', desc: 'أكثر من 15 وظيفة قانونية وغير قانونية تنتظرك لتبدأ حياتك الجديدة.', color: 'blue' },
  { icon: Globe, title: 'اقتصاد حقيقي', desc: 'نظام اقتصادي متكامل مع بنوك، عقارات، وأسواق تجارية.', color: 'cyan' },
  { icon: Award, title: 'رولبلاي حقيقي', desc: 'قصص حقيقية ومواقف تجعلك تعيش تجربة لا مثيل لها.', color: 'blue' },
];

function Features() {
  return (
    <section id="features" dir="rtl" className="py-24 px-4 section-bg relative">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-16">
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3 block">ما يميزنا</span>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            مميزات <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">السيرفر</span>
          </h2>
          <div className="gradient-line w-32 mx-auto mt-4" />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 80}>
              <div className="faction-card rounded-2xl p-6 h-full card-glow group">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  f.color === 'cyan'
                    ? 'bg-cyan-500/10 group-hover:bg-cyan-500/20'
                    : 'bg-blue-500/10 group-hover:bg-blue-500/20'
                } transition-colors`}>
                  <f.icon
                    size={24}
                    className={f.color === 'cyan' ? 'text-cyan-400 icon-glow-cyan' : 'text-blue-400'}
                  />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Factions ─────────────────────────────────────────────────────────────────
const FACTIONS = [
  {
    icon: Shield,
    name: 'الشرطة',
    eng: 'LSPD',
    desc: 'حافظ على النظام وطارد المجرمين في شوارع المدينة.',
    color: 'from-blue-600/20 to-blue-900/20',
    border: 'border-blue-500/30',
    iconColor: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    icon: Ambulance,
    name: 'الإسعاف',
    eng: 'EMS',
    desc: 'أنقذ الأرواح وقدم الرعاية الطبية في أصعب المواقف.',
    color: 'from-red-600/20 to-red-900/20',
    border: 'border-red-500/30',
    iconColor: 'text-red-400',
    bg: 'bg-red-500/10',
  },
  {
    icon: Wrench,
    name: 'الميكانيك',
    eng: 'Mechanic',
    desc: 'أصلح السيارات وقدم خدمات الإنقاذ والسحب في المدينة.',
    color: 'from-amber-600/20 to-amber-900/20',
    border: 'border-amber-500/30',
    iconColor: 'text-amber-400',
    bg: 'bg-amber-500/10',
  },
  {
    icon: Skull,
    name: 'المافيا',
    eng: 'Mafia',
    desc: 'تحكم في الشوارع وابنِ إمبراطوريتك الجريمة السرية.',
    color: 'from-gray-600/20 to-gray-900/20',
    border: 'border-gray-500/30',
    iconColor: 'text-gray-300',
    bg: 'bg-gray-500/10',
  },
];

function Factions() {
  return (
    <section id="factions" dir="rtl" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-16">
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3 block">اختر دورك</span>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">الفصائل</span> والمجموعات
          </h2>
          <div className="gradient-line w-32 mx-auto mt-4" />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FACTIONS.map((f, i) => (
            <Reveal key={f.name} delay={i * 100}>
              <div className={`faction-card rounded-2xl p-6 h-full bg-gradient-to-b ${f.color} border ${f.border} group cursor-pointer`}>
                <div className={`w-14 h-14 rounded-xl ${f.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <f.icon size={28} className={f.iconColor} />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-white">{f.name}</h3>
                  <span className="text-xs text-gray-500 font-mono">{f.eng}</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Stats ────────────────────────────────────────────────────────────────────
const STATS = [
  { icon: Users, label: 'لاعبين', value: 100, suffix: '+', sub: 'يلعبون معنا يومياً' },
  { icon: Clock, label: 'أون لاين', value: 24, suffix: '/7', sub: 'بدون انقطاع' },
  { icon: Cpu, label: 'نظام', value: 30, suffix: '+', sub: 'نظام مخصص' },
  { icon: Star, label: 'رولبلاي', value: 100, suffix: '%', sub: 'تجربة حقيقية' },
];

function Stats() {
  return (
    <section id="stats" dir="rtl" className="py-24 px-4 section-bg relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

      <div className="max-w-5xl mx-auto relative z-10">
        <Reveal className="text-center mb-16">
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3 block">بالأرقام</span>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            إحصائيات <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">السيرفر</span>
          </h2>
          <div className="gradient-line w-32 mx-auto mt-4" />
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 100}>
              <div className="faction-card rounded-2xl p-6 text-center card-glow group">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-cyan-500/20 transition-colors">
                  <s.icon size={20} className="text-cyan-400" />
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white mb-1 text-glow-cyan">
                  <Counter target={s.value} suffix={s.suffix} />
                </div>
                <div className="text-cyan-400 font-bold text-sm mb-1">{s.label}</div>
                <div className="text-gray-500 text-xs">{s.sub}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Gallery ──────────────────────────────────────────────────────────────────
const GALLERY_IMAGES = [
  {
    <img src="Screenshot 2026-06-02 200703"></img>,
    label: 'Downtown',
  },
  {
    <img src="Screenshot 2026-06-02 200629"></img>,
    label: 'Night Race',
  },
  {
    <img src="Screenshot 2026-06-02 200559"></img>,
    label: 'Police Chase',
  },
  {
    <img src="Screenshot 2026-06-02 200733"></img>,
    label: 'City Life',
  },
  
];

function Gallery() {
  return (
    <section id="gallery" dir="rtl" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-16">
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3 block">لحظات من السيرفر</span>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            معرض <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">الصور</span>
          </h2>
          <div className="gradient-line w-32 mx-auto mt-4" />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GALLERY_IMAGES.map((img, i) => (
            <Reveal key={img.label} delay={i * 80}>
              <div className="relative overflow-hidden rounded-2xl group cursor-pointer h-56">
                <img
                  src={img.url}
                  alt={img.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute inset-0 border border-white/0 group-hover:border-cyan-400/30 rounded-2xl transition-all duration-300" />
                <span className="absolute bottom-3 right-4 text-white font-semibold text-sm opacity-80 group-hover:opacity-100 transition-opacity">
                  {img.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Server Status ────────────────────────────────────────────────────────────
function ServerStatus() {
  const [playerCount, setPlayerCount] = useState(327);
  const [uptime] = useState('99.9%');

  useEffect(() => {
    const interval = setInterval(() => {
      setPlayerCount(p => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.min(500, Math.max(300, p + delta));
      });
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="server" dir="rtl" className="py-24 px-4 section-bg">
      <div className="max-w-4xl mx-auto">
        <Reveal className="text-center mb-16">
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3 block">معلومات الاتصال</span>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            حالة <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">السيرفر</span>
          </h2>
          <div className="gradient-line w-32 mx-auto mt-4" />
        </Reveal>

        <Reveal>
          <div className="faction-card rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 rounded-3xl" style={{ background: 'radial-gradient(ellipse at center, rgba(34,211,238,0.05) 0%, transparent 70%)' }} />

            {/* Status badge */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <span className="status-dot w-3 h-3 rounded-full bg-green-400" />
              <span className="text-green-400 font-bold text-lg">السيرفر يعمل</span>
            </div>

            {/* IP */}
            <div className="mb-8">
              <p className="text-gray-400 text-sm mb-2">عنوان السيرفر</p>
              <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-6 py-3">
                <span className="font-mono text-xl font-bold text-cyan-400 tracking-wide">{SERVER_IP}</span>
              </div>
            </div>

            {/* Live counter */}
            <div className="grid grid-cols-3 gap-4 mb-10 max-w-md mx-auto">
              <div className="bg-white/3 rounded-xl p-4">
                <div className="text-2xl font-black text-white">{playerCount}</div>
                <div className="text-gray-400 text-xs mt-1">لاعبين</div>
              </div>
              <div className="bg-white/3 rounded-xl p-4">
                <div className="text-2xl font-black text-white">500</div>
                <div className="text-gray-400 text-xs mt-1">الحد الأقصى</div>
              </div>
              <div className="bg-white/3 rounded-xl p-4">
                <div className="text-2xl font-black text-white">{uptime}</div>
                <div className="text-gray-400 text-xs mt-1">Uptime</div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href={DIRECT_CONNECT}
                className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/30"
              >
                <Play size={18} fill="white" />
                اتصل مباشرة
              </a>
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#5865F2] hover:bg-[#4752c4] text-white font-bold px-8 py-4 rounded-2xl transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-[#5865F2]/30"
              >
                <MessageCircle size={18} />
                Discord
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer dir="rtl" className="border-t border-white/5 py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
            <Zap size={14} className="text-white" />
          </div>
          <span className="font-bold text-white">
            NEW LIFE <span className="text-cyan-400">RP</span>
          </span>
        </div>
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} NEW LIFE RP — جميع الحقوق محفوظة
        </p>
        <div className="flex items-center gap-3">
          <Activity size={14} className="text-green-400" />
          <span className="text-green-400 text-sm font-medium">السيرفر يعمل بكفاءة</span>
        </div>
      </div>
    </footer>
  );
}

// ─── Discord FAB ──────────────────────────────────────────────────────────────
// Removed - keeping only one Discord link in navbar

export default function App() {
  return (
    <div className="bg-[#020817] text-white min-h-screen font-cairo antialiased">
      <Navbar />
      <Hero />
      <Features />
      <Factions />
      <Stats />
      <Gallery />
      <ServerStatus />
      <Footer />
    </div>
  );
}
