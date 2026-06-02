import { useEffect, useState, useRef } from 'react';
import { Shield, MessageCircle, ChevronUp, Menu, X } from 'lucide-react';

const DISCORD_URL = 'https://discord.gg/GPzfa4q22';
const LOGO = '/Screenshot_2026-06-02_111830.png';

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      dir="rtl"
      className={`fixed top-0 w-full z-50 nav-blur transition-all duration-300 ${
        scrolled ? 'bg-[#020817]/90 border-b border-white/5 shadow-lg shadow-black/20' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <img src={LOGO} alt="NEW LIFE RP" className="w-8 h-8 rounded-lg" />
          <div>
            <span className="font-bold text-lg tracking-wide">
              <span className="text-white">NEW LIFE </span>
              <span className="text-cyan-400 text-glow-cyan">RP</span>
            </span>
          </div>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          <a href="/" className="text-sm text-gray-300 hover:text-cyan-400 transition-colors duration-200 font-medium">
            الرئيسية
          </a>
          <a href="/rules" className="text-sm text-gray-300 hover:text-cyan-400 transition-colors duration-200 font-medium">
            القوانين
          </a>
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
          onClick={() => setMenuOpen((v: boolean) => !v)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#020817]/95 nav-blur border-t border-white/5 px-4 py-4 flex flex-col gap-3">
          <a href="/" className="text-gray-300 hover:text-cyan-400 transition-colors py-1 font-medium">
            الرئيسية
          </a>
          <a href="/rules" className="text-gray-300 hover:text-cyan-400 transition-colors py-1 font-medium">
            القوانين
          </a>
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

// ─── Reveal wrapper ───────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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



// ─── Rules Page ───────────────────────────────────────────────────────────────
const RULES = [
  {
    category: 'قوانين عامة',
    rules: [
      'الاحترام المتبادل بين جميع اللاعبين إجباري — عدم الإساءة أو السب',
      'ممنوع التحرش أو إحراج الآخرين بأي طريقة كانت',
      'ممنوع نهائياً استخدام اللغات العنصرية أو التمييزية',
      'اتبع التعليمات المُدراء والموظفين دون جدال',
      'ممنوع البيع/الشراء الحقيقي داخل السيرفر',
    ],
  },
  {
    category: 'قوانين اللعب',
    rules: [
      'ممنوع ديس آرم (DM) — لا تبدأ قتال بدون سبب روليبلاي',
      'ممنوع طرد اللاعبين من السيارات بدون سبب',
      'ممنوع استخدام جلافتين أو ايزي أنتي تشيت (AC)',
      'ممنوع التعديل على ملفات اللعبة غير المصرح به',
      'ممنوع الإفساد في الروليبلاي (PG) — حافظ على الشخصية',
    ],
  },
  {
    category: 'قوانين الاقتصاد',
    rules: [
      'ممنوع غسيل الأموال أو الاحتيال المالي',
      'جميع التجارات يجب أن تكون شرعية ومسجلة',
      'ممنوع السرقة من البنك أو المحلات بدون فريق منسق',
      'يجب الالتزام بأسعار السيرفر — لا تقدم عروض متطرفة',
      'الفائدة على القروض يجب أن تكون معقولة',
    ],
  },
  {
    category: 'قوانين الفصائل',
    rules: [
      'ممنوع الانضمام لفصيلتين في نفس الوقت',
      'قادة الفصائل مسؤولون عن سلوك أعضائهم',
      'ممنوع حل الفصيلة بدون موافقة الإدارة',
      'الحروب بين الفصائل يجب أن تُبلغ عنها مسبقاً',
      'ممنوع تعطيل خادم الفصيلة أو قاعدتهم',
    ],
  },
  {
    category: 'قوانين المدن والعقارات',
    rules: [
      'ممنوع دخول منزل الآخرين بدون إذن',
      'أصحاب البيوت مسؤولون عن حماية ممتلكاتهم',
      'ممنوع وضع أشياء غير قانونية في بيتك العام',
      'جميع المدن لها قوانينها الخاصة — اتبعها',
      'ممنوع الإضرار بالممتلكات العامة',
    ],
  },
  {
    category: 'العقوبات',
    rules: [
      'التحذير الأول: إنذار شفوي',
      'التحذير الثاني: حظر مؤقت 24 ساعة',
      'التحذير الثالث: حظر مؤقت 7 أيام',
      'التحذير الرابع: حظر دائم من السيرفر',
      'الانتهاكات الخطيرة قد تؤدي لحظر فوري',
    ],
  },
];

export function RulesPage() {
  return (
    <div className="min-h-screen bg-[#020817] text-white">
      <Navbar />

      <section dir="rtl" className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <Reveal className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield size={36} className="text-cyan-400" />
              <h1 className="text-5xl sm:text-6xl font-black">
                <span className="text-white">قوانين </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">السيرفر</span>
              </h1>
            </div>
            <p className="text-gray-400 text-lg">اقرأ القوانين بعناية — الالتزام بها إجباري لجميع اللاعبين</p>
          </Reveal>

          {/* Rules Grid */}
          <div className="space-y-6">
            {RULES.map((section, idx) => (
              <Reveal key={section.category} delay={idx * 100}>
                <div className="faction-card rounded-2xl p-6 sm:p-8 border border-white/10">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-gradient-to-b from-cyan-400 to-blue-400 rounded" />
                    {section.category}
                  </h2>
                  <ul className="space-y-3">
                    {section.rules.map((rule, i) => (
                      <li key={i} className="flex gap-3 text-gray-300 text-sm leading-relaxed">
                        <span className="text-cyan-400 font-bold flex-shrink-0 mt-1">•</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Important Note */}
          <Reveal delay={RULES.length * 100} className="mt-12">
            <div className="bg-gradient-to-r from-amber-500/10 to-red-500/10 border border-amber-500/30 rounded-2xl p-8 text-center">
              <p className="text-amber-200 font-semibold text-lg mb-2">تنبيه مهم</p>
              <p className="text-gray-300">
                عدم الالتزام بهذه القوانين قد يؤدي لحظر حسابك من السيرفر. تأكد من فهمك التام لجميع القوانين قبل اللعب.
              </p>
            </div>
          </Reveal>

          {/* Back & Discord */}
          <Reveal delay={(RULES.length + 1) * 100} className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <a
              href="/"
              className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-200 hover:scale-105"
            >
              <ChevronUp size={18} className="rotate-90" />
              العودة للرئيسية
            </a>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#5865F2] hover:bg-[#4752c4] text-white font-bold px-8 py-4 rounded-2xl transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-[#5865F2]/30"
            >
              <MessageCircle size={18} />
              انضم للديسكورد
            </a>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer dir="rtl" className="border-t border-white/5 py-6 px-4">
        <div className="max-w-6xl mx-auto text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} NEW LIFE RP — جميع الحقوق محفوظة
        </div>
      </footer>
    </div>
  );
}
