import { useEffect, useRef, useState } from 'react';
import { Instagram, MapPin, Clock, Users, Leaf, ChevronDown } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import kidsFarmExperience from '../assets/kids-farm-experience.jpg';
import unmannedStandExterior from '../assets/unmanned-stand-exterior.jpg';
import unmannedStandShelf from '../assets/unmanned-stand-shelf.jpg';
import suzukiTrailrun from '../assets/suzuki-trailrun.jpg';
import suzukiTrailrunForest from '../assets/suzuki-trailrun-forest.jpg';
import suzukiFutsal from '../assets/suzuki-futsal.jpg';
import suzukiMountain from '../assets/suzuki-mountain.jpg';
import veggieLogo from 'figma:asset/608864b4edd7bec5e6b171c58f15ff6ee71db487.png';
import takaoPhoto from '../assets/takao.jpg';

const sectionCategory: Record<string, string> = {
  top: 'top',
  concept: 'about',
  about: 'about',
  'activity-intro': 'activities',
  'activity-blog': 'activities',
  hours: 'info',
  access: 'info',
  contact: 'contact',
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('top');
  const [headerVisible, setHeaderVisible] = useState(true);
  const [showFloatingCta, setShowFloatingCta] = useState(false);
  const [ctaTop, setCtaTop] = useState<number | null>(null);
  const footerRef = useRef<HTMLElement>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
      setExpandedMenu(null);
    }
  };

  const toggleSubmenu = (menu: string) => {
    setExpandedMenu(expandedMenu === menu ? null : menu);
  };

  const activeCategory = sectionCategory[activeSection] ?? 'top';

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    Object.keys(sectionCategory).forEach((id) => {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });
    return () => sectionObserver.disconnect();
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setHeaderVisible(currentScrollY < lastScrollY || currentScrollY < 80);
      lastScrollY = currentScrollY;

      setShowFloatingCta(currentScrollY > 600);
      if (footerRef.current) {
        const footerRect = footerRef.current.getBoundingClientRect();
        if (footerRect.top < window.innerHeight) {
          setCtaTop(footerRef.current.offsetTop - 72);
        } else {
          setCtaTop(null);
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-white" style={{ fontFamily: '"Noto Serif JP", serif' }}>
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 shadow-sm transition-transform duration-300 ${headerVisible || isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex md:flex-row flex-col md:items-center items-center justify-between gap-3">
          <div className="flex md:flex-row flex-col items-center md:gap-3 gap-2">
            <img src={veggieLogo} alt="鈴木農園ロゴ" className="h-12 w-12" style={{ mixBlendMode: 'multiply' }} />
            <h1 className="text-2xl font-semibold tracking-wide text-[#4a7c2f]">鈴木農園</h1>
          </div>
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('top')}
              className={`nav-link text-gray-800 hover:text-[#4a7c24] transition-colors ${activeCategory === 'top' ? 'active-link text-[#4a7c24]' : ''}`}
            >
              トップ
            </button>
            <div className="relative group">
              <button className={`nav-link text-gray-800 hover:text-[#4a7c24] transition-colors ${activeCategory === 'about' ? 'active-link text-[#4a7c24]' : ''}`}>
                私たちについて
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible -translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 transition-all duration-200">
                <div className="bg-white border border-gray-200 rounded shadow-lg py-2 min-w-[160px]">
                  <button onClick={() => scrollToSection('concept')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-[#4a7c24] hover:bg-[#f8faf6] transition-colors">
                    コンセプト
                  </button>
                  <button onClick={() => scrollToSection('about')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-[#4a7c24] hover:bg-[#f8faf6] transition-colors">
                    自己紹介
                  </button>
                </div>
              </div>
            </div>
            <div className="relative group">
              <button className={`nav-link text-gray-800 hover:text-[#4a7c24] transition-colors ${activeCategory === 'activities' ? 'active-link text-[#4a7c24]' : ''}`}>
                活動内容
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible -translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 transition-all duration-200">
                <div className="bg-white border border-gray-200 rounded shadow-lg py-2 min-w-[160px]">
                  <button onClick={() => scrollToSection('activity-intro')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-[#4a7c24] hover:bg-[#f8faf6] transition-colors">
                    活動紹介
                  </button>
                  <button onClick={() => scrollToSection('activity-blog')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-[#4a7c24] hover:bg-[#f8faf6] transition-colors">
                    活動報告
                  </button>
                </div>
              </div>
            </div>
            <div className="relative group">
              <button className={`nav-link text-gray-800 hover:text-[#4a7c24] transition-colors ${activeCategory === 'info' ? 'active-link text-[#4a7c24]' : ''}`}>
                ご利用案内
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible -translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 transition-all duration-200">
                <div className="bg-white border border-gray-200 rounded shadow-lg py-2 min-w-[160px]">
                  <button onClick={() => scrollToSection('hours')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-[#4a7c24] hover:bg-[#f8faf6] transition-colors">
                    営業時間
                  </button>
                  <button onClick={() => scrollToSection('access')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-[#4a7c24] hover:bg-[#f8faf6] transition-colors">
                    アクセス
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={() => scrollToSection('contact')}
              className={`nav-link text-gray-800 hover:text-[#4a7c24] transition-colors ${activeCategory === 'contact' ? 'active-link text-[#4a7c24]' : ''}`}
            >
              お問い合わせ
            </button>
          </nav>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="メニューを開閉する"
            aria-expanded={isMenuOpen}
            className="p-2 hover:bg-gray-100 rounded transition-colors md:hidden absolute right-6 top-4 text-[#4a7c2f]"
          >
            <span className={`hamburger-btn ${isMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden bg-[#f8faf6] border-t border-gray-200">
            <ul className="max-w-7xl mx-auto px-6 py-4 space-y-2">
              <li>
                <button onClick={() => scrollToSection('top')} className={`block w-full text-left md:text-center py-2 text-gray-800 hover:text-[#4a7c24] transition-colors ${activeCategory === 'top' ? 'text-[#4a7c24]' : ''}`}>
                  トップ
                </button>
              </li>
              
              {/* 私たちについて */}
              <li>
                <button 
                  onClick={() => toggleSubmenu('about')}
                  className={`flex items-center justify-between md:justify-center w-full text-left md:text-center py-2 text-gray-800 hover:text-[#4a7c24] transition-colors ${activeCategory === 'about' ? 'text-[#4a7c24]' : ''}`}
                >
                  <span>私たちについて</span>
                  <ChevronDown size={20} className={`transition-transform duration-300 ${expandedMenu === 'about' ? 'rotate-180' : ''}`} />
                </button>
                {expandedMenu === 'about' && (
                  <ul className="ml-4 md:ml-0 mt-2 space-y-2 border-l-2 md:border-l-0 border-[#4a7c24] pl-4 md:pl-0">
                    <li>
                      <button onClick={() => scrollToSection('concept')} className="block w-full text-left md:text-center py-1 text-sm text-gray-700 hover:text-[#4a7c24] transition-colors">
                        コンセプト
                      </button>
                    </li>
                    <li>
                      <button onClick={() => scrollToSection('about')} className="block w-full text-left md:text-center py-1 text-sm text-gray-700 hover:text-[#4a7c24] transition-colors">
                        自己紹介
                      </button>
                    </li>
                  </ul>
                )}
              </li>

              {/* 活動内容 */}
              <li>
                <button 
                  onClick={() => toggleSubmenu('activities')}
                  className={`flex items-center justify-between md:justify-center w-full text-left md:text-center py-2 text-gray-800 hover:text-[#4a7c24] transition-colors ${activeCategory === 'activities' ? 'text-[#4a7c24]' : ''}`}
                >
                  <span>活動内容</span>
                  <ChevronDown size={20} className={`transition-transform duration-300 ${expandedMenu === 'activities' ? 'rotate-180' : ''}`} />
                </button>
                {expandedMenu === 'activities' && (
                  <ul className="ml-4 md:ml-0 mt-2 space-y-2 border-l-2 md:border-l-0 border-[#4a7c24] pl-4 md:pl-0">
                    <li>
                      <button onClick={() => scrollToSection('activity-intro')} className="block w-full text-left md:text-center py-1 text-sm text-gray-700 hover:text-[#4a7c24] transition-colors">
                        活動紹介
                      </button>
                    </li>
                    <li>
                      <button onClick={() => scrollToSection('activity-blog')} className="block w-full text-left md:text-center py-1 text-sm text-gray-700 hover:text-[#4a7c24] transition-colors">
                        活動報告
                      </button>
                    </li>
                  </ul>
                )}
              </li>

              {/* ご利用案内 */}
              <li>
                <button 
                  onClick={() => toggleSubmenu('info')}
                  className={`flex items-center justify-between md:justify-center w-full text-left md:text-center py-2 text-gray-800 hover:text-[#4a7c24] transition-colors ${activeCategory === 'info' ? 'text-[#4a7c24]' : ''}`}
                >
                  <span>ご利用案内</span>
                  <ChevronDown size={20} className={`transition-transform duration-300 ${expandedMenu === 'info' ? 'rotate-180' : ''}`} />
                </button>
                {expandedMenu === 'info' && (
                  <ul className="ml-4 md:ml-0 mt-2 space-y-2 border-l-2 md:border-l-0 border-[#4a7c24] pl-4 md:pl-0">
                    <li>
                      <button onClick={() => scrollToSection('hours')} className="block w-full text-left md:text-center py-1 text-sm text-gray-700 hover:text-[#4a7c24] transition-colors">
                        営業時間
                      </button>
                    </li>
                    <li>
                      <button onClick={() => scrollToSection('access')} className="block w-full text-left md:text-center py-1 text-sm text-gray-700 hover:text-[#4a7c24] transition-colors">
                        アクセス
                      </button>
                    </li>
                  </ul>
                )}
              </li>

              <li>
                <button onClick={() => scrollToSection('contact')} className={`block w-full text-left md:text-center py-2 text-gray-800 hover:text-[#4a7c24] transition-colors ${activeCategory === 'contact' ? 'text-[#4a7c24]' : ''}`}>
                  お問い合わせ
                </button>
              </li>
            </ul>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section id="top" className="pt-20 scroll-mt-20">
        <div className="relative h-[600px]">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1638402268441-9368026c1d45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMGZhcm0lMjB2ZWdldGFibGVzfGVufDF8fHx8MTc3MzY1Mzc5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="鈴木農園"
            className="w-full h-full object-cover kenburns"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 flex items-center">
            <div className="max-w-7xl mx-auto px-6 text-white">
              <div className="max-w-2xl hero-fade-in">
                <div className="flex md:flex-row flex-col items-center md:items-start gap-4 mb-6">
                  <img src={veggieLogo} alt="鈴木農園ロゴ" className="h-24 w-24" style={{ mixBlendMode: 'screen' }} />
                  <h2 className="text-6xl font-bold text-center md:text-left">鈴木農園</h2>
                </div>
                
                <p className="text-xl opacity-90 text-center md:text-left">東京都世田谷区等々力 | 都会の農園</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Concept Section */}
      <section id="concept" className="py-24 bg-[#f8faf6] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-[#2d5016] mb-4">コンセプト</h2>
            <div className="reveal underline-grow w-20 h-1 bg-[#4a7c24] mx-auto"></div>
          </div>
          
          <div className="reveal mb-16 text-center">
            <h3 className="text-4xl font-semibold text-[#2d5016] mb-8 leading-relaxed">ブドウと季節の野菜を販売</h3>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              新鮮で安全な農産物を、都会の中心からお届けします。<br />
              元プロフットサル選手の情熱が育む、こだわりの農園です。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="reveal bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <Leaf className="w-16 h-16 mx-auto mb-4 text-[#4a7c24]" />
              <h4 className="text-2xl font-semibold text-[#2d5016] mb-4">新鮮な野菜</h4>
              <p className="text-gray-700 leading-relaxed">
                季節ごとの旬の野菜を、丹精込めて育てています。
              </p>
            </div>
            <div className="reveal bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="text-6xl mb-4">🍇</div>
              <h4 className="text-2xl font-semibold text-[#2d5016] mb-4">自慢のブドウ</h4>
              <p className="text-gray-700 leading-relaxed">甘くて美味しいブドウを、こだわりの栽培方法で生産。</p>
            </div>
            <div className="reveal bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <Users className="w-16 h-16 mx-auto mb-4 text-[#4a7c24]" />
              <h4 className="text-2xl font-semibold text-[#2d5016] mb-4">地域密着</h4>
              <p className="text-gray-700 leading-relaxed">
                地域の皆様と共に歩む、信頼の農園です。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-[#2d5016] mb-4">自己紹介</h2>
            <div className="reveal underline-grow w-20 h-1 bg-[#4a7c24] mx-auto"></div>
          </div>
          
          {/* Owner Profile */}
          <div className="reveal grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 md:order-1">
              <h3 className="text-4xl font-semibold text-[#2d5016] mb-6">
                <span className="md:inline block text-center md:text-left">鈴木 太郎</span>
                <span className="md:inline block text-center md:text-left">（農園主）</span>
              </h3>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                元プロフットサル選手として、ペスカドーラ町田→ヴォルクスオーレ仙台のゴレイロで一生懸命身体を張っていた日々。キャリアを積んだ後、実家の農家を継いでいます。
              </p>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                現在はマラソンも趣味として楽しんでおり、体力づくりと健康管理を心がけています。
              </p>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                東京の都心で農業を営むことで、より多くの方々に
                新鮮な農産物を届けられることに喜びを感じています。
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                地域の子どもたちへの農業体験の提供など、
                地域貢献活動にも力を入れています。
              </p>
            </div>
            <div className="order-1 md:order-2 relative h-[500px] rounded-lg overflow-hidden shadow-lg">
              <ImageWithFallback
                loading="lazy"
                src={suzukiTrailrun}
                alt="鈴木太郎"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="reveal mb-16">
            <p className="text-sm text-gray-500 mb-6 text-center">スポーツ歴</p>
            <div className="relative pl-8 max-w-md mx-auto">
              <div className="timeline-track"></div>
              <div className="relative mb-8">
                <div className="timeline-dot"></div>
                <div className="flex items-center gap-4">
                  <img src={suzukiFutsal} alt="フットサル" className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg shadow-sm flex-shrink-0" loading="lazy" />
                  <p className="text-sm text-gray-600">フットサル</p>
                </div>
              </div>
              <div className="relative mb-8">
                <div className="timeline-dot"></div>
                <div className="flex items-center gap-4">
                  <img src={suzukiTrailrunForest} alt="トレイルランニング" className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg shadow-sm flex-shrink-0" loading="lazy" />
                  <p className="text-sm text-gray-600">トレイルランニング</p>
                </div>
              </div>
              <div className="relative">
                <div className="timeline-dot"></div>
                <div className="flex items-center gap-4">
                  <img src={suzukiMountain} alt="登山" className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg shadow-sm flex-shrink-0" loading="lazy" />
                  <p className="text-sm text-gray-600">登山</p>
                </div>
              </div>
            </div>
          </div>

          {/* Visitor Profile - Takao */}
          <div className="reveal grid md:grid-cols-2 gap-12 items-center bg-[#f8faf6] rounded-lg p-8">
            <div>
              <h3 className="text-4xl font-semibold text-[#2d5016] mb-6">
                <span className="md:inline block text-center md:text-left">高尾 一輝</span>
                <span className="md:inline block text-center md:text-left">(Webデザイナー)</span>
              </h3>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                ペスカドーラ町田のユースで1年プレー。
              </p>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                その後社会人サッカーを経て、現在はIT業界への再就職を目指しながら若者支援のNPO団体サンカクシャのフットサル部が始動し、副部長として携わっている。
              </p>
            </div>
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-lg">
              <img
                loading="lazy"
                src={takaoPhoto}
                alt="高尾一輝"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-24 bg-[#f8faf6]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-[#2d5016] mb-4">活動内容</h2>
            <div className="reveal underline-grow w-20 h-1 bg-[#4a7c24] mx-auto"></div>
          </div>

          {/* Activity Introduction */}
          <div id="activity-intro" className="mb-20 scroll-mt-20">
            <h3 className="text-4xl font-semibold text-[#2d5016] mb-12 text-center">活動紹介</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="reveal bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="relative h-80">
                  <ImageWithFallback
                    loading="lazy"
                    src={kidsFarmExperience}
                    alt="体験活動"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <h4 className="text-3xl font-semibold text-[#2d5016] mb-4">農業体験プログラム</h4>
                  <div className="space-y-3 text-gray-700">
                    <p className="leading-relaxed">
                      • 近隣小学校の農業体験学習
                    </p>
                    <p className="leading-relaxed">
                      • 放課後デイサービスでの収穫体験
                    </p>
                    <p className="leading-relaxed">
                      • 障害者施設の皆様との農作業
                    </p>
                    <p className="mt-4 leading-relaxed">
                      子どもたちに自然の大切さと、食べ物が作られる過程を
                      実際の体験を通じて学んでいただいています。
                    </p>
                  </div>
                </div>
              </div>

              <div className="reveal bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="relative h-80">
                  <ImageWithFallback
                    loading="lazy"
                    src={unmannedStandExterior}
                    alt="朝市での販売"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <h4 className="text-3xl font-semibold text-[#2d5016] mb-4">販売活動</h4>
                  <div className="space-y-3 text-gray-700">
                    <p className="leading-relaxed">
                      • 週末の地域朝市での直接販売
                    </p>
                    <p className="leading-relaxed">
                      • 卸売市場への定期出荷
                    </p>
                    <p className="leading-relaxed">
                      • 無人直売所での常時販売
                    </p>
                    <p className="mt-4 leading-relaxed">
                      お客様と直接お話しできる朝市では、
                      農産物の美味しい食べ方なども
                      お伝えしています。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Blog */}
          <div id="activity-blog" className="scroll-mt-20">
            <h3 className="text-4xl font-semibold text-[#2d5016] mb-12 text-center">活動報告</h3>
            <div className="space-y-8 max-w-5xl mx-auto">
              {/* Blog Post 1 */}
              <article className="reveal bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="relative h-64 md:h-full">
                    <ImageWithFallback
                      loading="lazy"
                      src={kidsFarmExperience}
                      alt="子どもたちとの体験活動"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:col-span-2 p-6">
                    <div className="text-sm text-[#4a7c24] font-semibold mb-2">2026年7月8日</div>
                    <h4 className="text-2xl font-semibold text-[#2d5016] mb-3">小学生の農業体験を実施しました</h4>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      本日、近隣の小学校から30名の子どもたちが農園を訪れ、野菜の収穫体験を行いました。
                      初めて土に触れる子も多く、最初は戸惑っていましたが、収穫の楽しさを実感するにつれ、
                      みんな笑顔になっていました。
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      「野菜ってこうやってできるんだ！」という子どもたちの声が印象的でした。
                    </p>
                  </div>
                </div>
              </article>

              {/* Blog Post 2 */}
              <article className="reveal bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="relative h-64 md:h-full">
                    <ImageWithFallback
                      loading="lazy"
                      src={unmannedStandExterior}
                      alt="週末の朝市"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:col-span-2 p-6">
                    <div className="text-sm text-[#4a7c24] font-semibold mb-2">2026年7月4日</div>
                    <h4 className="text-2xl font-semibold text-[#2d5016] mb-3">週末の朝市、大盛況でした！</h4>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      今週末の朝市では、旬の春野菜とブドウを販売しました。
                      常連のお客様から「今年のブドウは特に甘いね」とお褒めの言葉をいただき、
                      とても嬉しかったです。
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      直接お客様と会話できることが、朝市の一番の魅力です。
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Hours Section */}
      <section id="hours" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <Clock className="w-20 h-20 mx-auto mb-6 text-[#4a7c24]" />
            <h2 className="text-5xl font-bold text-[#2d5016] mb-4">無人直売所の営業時間</h2>
            <div className="reveal underline-grow w-20 h-1 bg-[#4a7c24] mx-auto"></div>
          </div>
          <div className="reveal rounded-lg overflow-hidden shadow-lg border border-gray-200 mb-8">
            <img src={unmannedStandShelf} alt="無人直売所の様子" className="w-full h-64 object-cover" loading="lazy" />
          </div>
          <div className="reveal bg-[#f8faf6] rounded-lg p-12 border border-gray-200 text-center">
            <p className="text-3xl font-semibold text-[#2d5016] mb-6">営業日：不定休</p>
            <p className="text-xl text-gray-700 leading-relaxed">営業時間は収穫状況により随時変更されます。<br /></p>
          </div>
        </div>
      </section>

      {/* Access Section */}
      <section id="access" className="py-24 bg-[#f8faf6] scroll-mt-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <MapPin className="w-20 h-20 mx-auto mb-6 text-[#4a7c24]" />
            <h2 className="text-5xl font-bold text-[#2d5016] mb-4">アクセス</h2>
            <div className="reveal underline-grow w-20 h-1 bg-[#4a7c24] mx-auto"></div>
          </div>
          <div className="reveal bg-white rounded-lg p-12 shadow-lg border border-gray-200">
            <div className="text-center mb-8">
              <p className="text-xl text-gray-600 mb-2">〒158-0082</p>
              <p className="text-3xl font-semibold text-[#2d5016]">
                東京都世田谷区等々力7-13-9
              </p>
            </div>
            <div className="border-t border-gray-200 pt-8 mb-8">
              <p className="text-xl text-gray-700 text-center">
                東急大井町線「等々力駅」より徒歩約8分
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6487.201175460779!2d139.65264407505745!3d35.6129178337249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018f4f9f4fa6489%3A0xb5ddf6c83f6eddfb!2z44CSMTU4LTAwODIg5p2x5Lqs6YO95LiW55Sw6LC35Yy6562J44CF5Yqb77yX5LiB55uu77yT4oiS77yZ!5e0!3m2!1sja!2sjp!4v1773668351006!5m2!1sja!2sjp"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="鈴木農園の地図"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <Instagram className="w-20 h-20 mx-auto mb-6 text-[#4a7c24]" />
            <h2 className="text-5xl font-bold text-[#2d5016] mb-4">お問い合わせ</h2>
            <div className="reveal underline-grow w-20 h-1 bg-[#4a7c24] mx-auto"></div>
          </div>
          <div className="reveal bg-[#f8faf6] rounded-lg p-12 border border-gray-200 text-center">
            <p className="text-2xl text-gray-700 mb-8 leading-relaxed">
              ご質問やお問い合わせは<br />
              Instagramのダイレクトメッセージにて承っております
            </p>
            <a
              href="https://www.instagram.com/suzukibudounouen/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#4a7c24] text-white px-8 py-3 rounded-full hover:bg-[#3d6a1e] transition-colors"
            >
              <Instagram size={20} />
              Instagramを見る
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer ref={footerRef} className="bg-[#2d5016] text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-2">
              <img src={veggieLogo} alt="鈴木農園ロゴ" className="h-12 w-12" style={{ mixBlendMode: 'screen' }} />
              <p className="text-2xl font-semibold">鈴木農園</p>
            </div>
            <p className="opacity-75">Fresh & Local Farm in Setagaya</p>
          </div>
          <div className="text-center opacity-75">
            <p>© 2026 Suzuki Farm. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating CTA */}
      <a
        href="https://www.instagram.com/suzukibudounouen/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagramへ移動"
        style={ctaTop !== null ? { position: 'absolute', top: ctaTop } : undefined}
        className={`${ctaTop === null ? 'fixed bottom-8' : ''} right-6 md:right-8 z-40 inline-flex items-center gap-2 bg-[#4a7c24] text-white px-5 py-3 rounded-full shadow-lg hover:bg-[#3d6a1e] transition-all duration-300 ${showFloatingCta ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <Instagram size={18} />
        <span className="hidden sm:inline text-sm">Instagramへ</span>
      </a>
    </div>
  );
}