import { useEffect, useRef, useState } from 'react';
import { Instagram, ChevronDown } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import grapeHarvest from '../assets/grape-harvest.jpg';
import kidsFarmExperience from '../assets/kids-farm-experience.jpg';
import unmannedStandExterior from '../assets/unmanned-stand-exterior.jpg';
import unmannedStandShelf from '../assets/unmanned-stand-shelf.jpg';
import suzukiFutsal from '../assets/suzuki-futsal.jpg';
import suzukiTrailrunForest from '../assets/suzuki-trailrun-forest.jpg';
import suzukiTrailrun from '../assets/suzuki-trailrun.jpg';
import suzukiMountain from '../assets/suzuki-mountain.jpg';
import treeLogo from 'figma:asset/943be725cd3b0cff2add01fa5d6079798e13ad05.png';
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
    <div className="relative min-h-screen bg-[#f5f1e8]" style={{ fontFamily: '"Noto Serif JP", serif' }}>
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 bg-[#a0876f] text-white z-50 shadow-md transition-transform duration-300 ${headerVisible || isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={treeLogo} alt="鈴木農園ロゴ" className="h-12 w-12" style={{ mixBlendMode: 'multiply' }} />
            <h1 className="text-2xl font-semibold tracking-wide">鈴木農園</h1>
          </div>
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('top')}
              className={`nav-link hover:text-[#d4a574] transition-colors ${activeCategory === 'top' ? 'active-link text-[#d4a574]' : ''}`}
            >
              トップ
            </button>
            <div className="relative group">
              <button className={`nav-link hover:text-[#d4a574] transition-colors ${activeCategory === 'about' ? 'active-link text-[#d4a574]' : ''}`}>
                私たちについて
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible -translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 transition-all duration-200">
                <div className="bg-[#6d5a4a] rounded shadow-lg py-2 min-w-[160px]">
                  <button onClick={() => scrollToSection('concept')} className="block w-full text-left px-4 py-2 text-sm hover:text-[#d4a574] hover:bg-[#7d6a5a] transition-colors">
                    コンセプト
                  </button>
                  <button onClick={() => scrollToSection('about')} className="block w-full text-left px-4 py-2 text-sm hover:text-[#d4a574] hover:bg-[#7d6a5a] transition-colors">
                    自己紹介
                  </button>
                </div>
              </div>
            </div>
            <div className="relative group">
              <button className={`nav-link hover:text-[#d4a574] transition-colors ${activeCategory === 'activities' ? 'active-link text-[#d4a574]' : ''}`}>
                活動内容
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible -translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 transition-all duration-200">
                <div className="bg-[#6d5a4a] rounded shadow-lg py-2 min-w-[160px]">
                  <button onClick={() => scrollToSection('activity-intro')} className="block w-full text-left px-4 py-2 text-sm hover:text-[#d4a574] hover:bg-[#7d6a5a] transition-colors">
                    活動紹介
                  </button>
                  <button onClick={() => scrollToSection('activity-blog')} className="block w-full text-left px-4 py-2 text-sm hover:text-[#d4a574] hover:bg-[#7d6a5a] transition-colors">
                    活動報告
                  </button>
                </div>
              </div>
            </div>
            <div className="relative group">
              <button className={`nav-link hover:text-[#d4a574] transition-colors ${activeCategory === 'info' ? 'active-link text-[#d4a574]' : ''}`}>
                ご利用案内
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible -translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 transition-all duration-200">
                <div className="bg-[#6d5a4a] rounded shadow-lg py-2 min-w-[160px]">
                  <button onClick={() => scrollToSection('hours')} className="block w-full text-left px-4 py-2 text-sm hover:text-[#d4a574] hover:bg-[#7d6a5a] transition-colors">
                    営業時間
                  </button>
                  <button onClick={() => scrollToSection('access')} className="block w-full text-left px-4 py-2 text-sm hover:text-[#d4a574] hover:bg-[#7d6a5a] transition-colors">
                    アクセス
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={() => scrollToSection('contact')}
              className={`nav-link hover:text-[#d4a574] transition-colors ${activeCategory === 'contact' ? 'active-link text-[#d4a574]' : ''}`}
            >
              お問い合わせ
            </button>
          </nav>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="メニューを開閉する"
            aria-expanded={isMenuOpen}
            className="p-2 hover:bg-[#b39580] rounded transition-colors md:hidden"
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
          <nav className="md:hidden bg-[#6d5a4a] border-t border-[#7d6a5a]">
            <ul className="max-w-7xl mx-auto px-6 py-4 space-y-2">
              <li>
                <button onClick={() => scrollToSection('top')} className={`block w-full text-left md:text-center py-2 hover:text-[#d4a574] transition-colors ${activeCategory === 'top' ? 'text-[#d4a574]' : ''}`}>
                  トップ
                </button>
              </li>
              
              {/* 私たちについて */}
              <li>
                <button 
                  onClick={() => toggleSubmenu('about')}
                  className={`flex items-center justify-between md:justify-center w-full text-left md:text-center py-2 hover:text-[#d4a574] transition-colors ${activeCategory === 'about' ? 'text-[#d4a574]' : ''}`}
                >
                  <span>私たちについて</span>
                  <ChevronDown size={20} className={`transition-transform duration-300 ${expandedMenu === 'about' ? 'rotate-180' : ''}`} />
                </button>
                {expandedMenu === 'about' && (
                  <ul className="ml-4 md:ml-0 mt-2 space-y-2 border-l-2 md:border-l-0 border-[#d4a574] pl-4 md:pl-0">
                    <li>
                      <button onClick={() => scrollToSection('concept')} className="block w-full text-left md:text-center py-1 text-sm hover:text-[#d4a574] transition-colors">
                        コンセプト
                      </button>
                    </li>
                    <li>
                      <button onClick={() => scrollToSection('about')} className="block w-full text-left md:text-center py-1 text-sm hover:text-[#d4a574] transition-colors">
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
                  className={`flex items-center justify-between md:justify-center w-full text-left md:text-center py-2 hover:text-[#d4a574] transition-colors ${activeCategory === 'activities' ? 'text-[#d4a574]' : ''}`}
                >
                  <span>活動内容</span>
                  <ChevronDown size={20} className={`transition-transform duration-300 ${expandedMenu === 'activities' ? 'rotate-180' : ''}`} />
                </button>
                {expandedMenu === 'activities' && (
                  <ul className="ml-4 md:ml-0 mt-2 space-y-2 border-l-2 md:border-l-0 border-[#d4a574] pl-4 md:pl-0">
                    <li>
                      <button onClick={() => scrollToSection('activity-intro')} className="block w-full text-left md:text-center py-1 text-sm hover:text-[#d4a574] transition-colors">
                        活動紹介
                      </button>
                    </li>
                    <li>
                      <button onClick={() => scrollToSection('activity-blog')} className="block w-full text-left md:text-center py-1 text-sm hover:text-[#d4a574] transition-colors">
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
                  className={`flex items-center justify-between md:justify-center w-full text-left md:text-center py-2 hover:text-[#d4a574] transition-colors ${activeCategory === 'info' ? 'text-[#d4a574]' : ''}`}
                >
                  <span>ご利用案内</span>
                  <ChevronDown size={20} className={`transition-transform duration-300 ${expandedMenu === 'info' ? 'rotate-180' : ''}`} />
                </button>
                {expandedMenu === 'info' && (
                  <ul className="ml-4 md:ml-0 mt-2 space-y-2 border-l-2 md:border-l-0 border-[#d4a574] pl-4 md:pl-0">
                    <li>
                      <button onClick={() => scrollToSection('hours')} className="block w-full text-left md:text-center py-1 text-sm hover:text-[#d4a574] transition-colors">
                        営業時間
                      </button>
                    </li>
                    <li>
                      <button onClick={() => scrollToSection('access')} className="block w-full text-left md:text-center py-1 text-sm hover:text-[#d4a574] transition-colors">
                        アクセス
                      </button>
                    </li>
                  </ul>
                )}
              </li>

              <li>
                <button onClick={() => scrollToSection('contact')} className={`block w-full text-left md:text-center py-2 hover:text-[#d4a574] transition-colors ${activeCategory === 'contact' ? 'text-[#d4a574]' : ''}`}>
                  お問い合わせ
                </button>
              </li>
            </ul>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section id="top" className="pt-20 bg-[#a0876f] text-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="hero-fade-in">
              <div className="flex items-center gap-4 mb-6">
                <img src={treeLogo} alt="鈴木農園ロゴ" className="h-20 w-20" style={{ mixBlendMode: 'multiply' }} />
                <h2 className="text-5xl font-bold leading-relaxed">鈴木農園</h2>
              </div>
              <p className="text-xl mb-4">東京都世田谷区等々力</p>
              <p className="text-lg leading-relaxed opacity-95">
                都会の真ん中で育む、自然の恵み。<br />
                元フットサル選手が営む、信頼と実績の農園です。
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-2xl">
              <ImageWithFallback
                src={unmannedStandExterior}
                alt="鈴木農園の風景"
                className="w-full h-full object-cover kenburns"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Concept Section */}
      <section id="concept" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#5d4a3a] mb-6">コンセプト</h2>
            <div className="reveal underline-grow w-24 h-1 bg-[#d4a574] mx-auto mb-8"></div>
          </div>
          <div className="reveal grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <ImageWithFallback
                loading="lazy"
                src={grapeHarvest}
                alt="ブドウ"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-3xl font-semibold text-[#5d4a3a] mb-6">ブドウと季節の野菜を販売</h3>
              <p className="text-lg leading-relaxed text-gray-700 mb-4">
                当農園では、丹精込めて育てたブドウと、四季折々の新鮮な野菜をお届けしています。
              </p>
              <p className="text-lg leading-relaxed text-gray-700 mb-4">
                東京の都心、世田谷区等々力という立地でありながら、土づくりにこだわり、
                安心・安全な農産物の生産を心がけています。
              </p>
              <p className="text-lg leading-relaxed text-gray-700">
                元プロフットサル選手としての体力と情熱を農業に注ぎ、
                地域の皆様に愛される農園を目指しています。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-[#f5f1e8] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#5d4a3a] mb-6">私たちについて</h2>
            <div className="reveal underline-grow w-24 h-1 bg-[#d4a574] mx-auto mb-8"></div>
          </div>
          
          {/* Self Introduction Subsection */}
          <div>
            <h3 className="text-3xl font-semibold text-[#5d4a3a] mb-8 text-center">自己紹介</h3>
            
            {/* Owner Profile */}
            <div className="reveal bg-white rounded-lg shadow-lg p-8 mb-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative h-96 rounded-lg overflow-hidden">
                  <ImageWithFallback
                    loading="lazy"
                    src={suzukiFutsal}
                    alt="鈴木さん"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <h4 className="text-3xl font-semibold text-[#5d4a3a] mb-4">
                    <span className="md:inline block text-center md:text-left">鈴木紳一郎</span>
                    <span className="md:inline block text-center md:text-left">（農園主）</span>
                  </h4>
                  <p className="text-lg leading-relaxed text-gray-700 mb-4">元プロフットサル選手として、ペスカドーラ町田→ヴォルクスオーレ仙台のゴレイロで一生懸命身体を張っていた日々。キャリアを積んだ後、実家の農家を継いで家族で営んでいます。</p>
                  <p className="text-lg leading-relaxed text-gray-700 mb-4">
                    フットサルで培った体力と精神力を活かし、日々農園での作業に励んでいます。
                  </p>
                  <p className="text-lg leading-relaxed text-gray-700 mb-4">
                    「スポーツも農業も、努力と情熱が実を結ぶ」という信念のもと、
                    お客様に喜んでいただける農産物を作り続けています。
                  </p>
                  <p className="text-lg leading-relaxed text-gray-700">
                    地域の子どもたちに農業の楽しさを伝える活動も積極的に行っています。
                  </p>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-6 text-center md:text-left">スポーツ歴</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="rounded-lg overflow-hidden shadow-sm bg-white">
                    <div className="h-40 md:h-48">
                      <img src={suzukiTrailrunForest} alt="トレイルランニング" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <p className="text-sm text-gray-600 text-center py-2">トレイルランニング</p>
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-sm bg-white">
                    <div className="h-40 md:h-48">
                      <img src={suzukiTrailrun} alt="トレイルランニング ゴール" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <p className="text-sm text-gray-600 text-center py-2">トレイルランニング(ゴール)</p>
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-sm bg-white">
                    <div className="h-40 md:h-48">
                      <img src={suzukiMountain} alt="登山" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <p className="text-sm text-gray-600 text-center py-2">登山</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visitor Profile */}
            <div className="reveal bg-white rounded-lg shadow-lg p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h4 className="text-3xl font-semibold text-[#5d4a3a] mb-4">
                    <span className="md:inline block text-center md:text-left">高尾 一輝</span>
                    <span className="md:inline block text-center md:text-left">(Webデザイナー)</span>
                  </h4>
                  <p className="text-lg leading-relaxed text-gray-700 mb-4">
                    ペスカドーラ町田のユースで1年プレー。
                  </p>
                  <p className="text-lg leading-relaxed text-gray-700 mb-4">
                    その後社会人サッカーを経て、現在はIT業界への再就職を目指しながら若者支援のNPO団体サンカクシャのフットサル部が始動し、副部長として携わっている。
                  </p>
                </div>
                <div className="relative h-96 rounded-lg overflow-hidden">
                  <img
                    loading="lazy"
                    src={takaoPhoto}
                    alt="高尾一輝"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#5d4a3a] mb-6">活動内容</h2>
            <div className="reveal underline-grow w-24 h-1 bg-[#d4a574] mx-auto mb-8"></div>
          </div>

          {/* Activity Introduction */}
          <div id="activity-intro" className="mb-20 scroll-mt-20">
            <h3 className="text-3xl font-semibold text-[#5d4a3a] mb-8 text-center">活動紹介</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Farm Experience */}
              <div className="reveal bg-[#f5f1e8] rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="relative h-64">
                  <ImageWithFallback
                    loading="lazy"
                    src={kidsFarmExperience}
                    alt="体験活動"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-2xl font-semibold text-[#5d4a3a] mb-4">農業体験の受け入れ</h4>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    近隣の小学校、放課後デイサービス、障害者施設の子どもたちを対象に、
                    定期的に農業体験を実施しています。
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    野菜の収穫やブドウの手入れなど、実際の農作業を通じて
                    自然の大切さを学んでいただいています。
                  </p>
                </div>
              </div>

              {/* Market Activities */}
              <div className="reveal bg-[#f5f1e8] rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="relative h-64">
                  <ImageWithFallback
                    loading="lazy"
                    src={unmannedStandExterior}
                    alt="朝市"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-2xl font-semibold text-[#5d4a3a] mb-4">朝市・卸売市への出荷</h4>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    週末を中心に地域の朝市に出店し、
                    直接お客様とお話ししながら新鮮な野菜とブドウを販売しています。
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    また、卸売市場への出荷も行い、より多くの方々に
                    当農園の農産物をお届けしています。
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Blog */}
          <div id="activity-blog" className="scroll-mt-20">
            <h3 className="text-3xl font-semibold text-[#5d4a3a] mb-8 text-center">活動報告</h3>
            <div className="space-y-8 max-w-4xl mx-auto">
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
                    <div className="text-sm text-gray-500 mb-2">2026年7月8日</div>
                    <h4 className="text-2xl font-semibold text-[#5d4a3a] mb-3">小学生の農業体験を実施しました</h4>
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
                    <div className="text-sm text-gray-500 mb-2">2026年7月4日</div>
                    <h4 className="text-2xl font-semibold text-[#5d4a3a] mb-3">週末の朝市、大盛況でした！</h4>
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
      <section id="hours" className="py-20 bg-[#a0876f] text-white scroll-mt-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">無人直売所の営業時間</h2>
          <div className="reveal underline-grow w-24 h-1 bg-[#d4a574] mx-auto mb-8"></div>
          <div className="rounded-lg overflow-hidden shadow-lg mb-8">
            <img src={unmannedStandShelf} alt="無人直売所の様子" className="w-full h-64 object-cover" loading="lazy" />
          </div>
          <div className="reveal bg-black/15 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-white/20">
            <p className="text-2xl mb-4">営業日：不定休</p>
            <p className="text-lg">※ 営業時間は随時更新されます。<br /></p>
          </div>
        </div>
      </section>

      {/* Access Section */}
      <section id="access" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#5d4a3a] mb-6">アクセス</h2>
            <div className="reveal underline-grow w-24 h-1 bg-[#d4a574] mx-auto mb-8"></div>
          </div>
          <div className="reveal bg-[#f5f1e8] rounded-lg p-8 shadow-lg mb-8">
            <p className="text-2xl text-[#5d4a3a] mb-4 text-center">〒158-0082</p>
            <p className="text-3xl font-semibold text-[#5d4a3a] mb-6 text-center">
              東京都世田谷区等々力7-13-9
            </p>
            <p className="text-lg text-gray-700 text-center mb-6">
              東急大井町線「等々力駅」より徒歩約8分
            </p>
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
      <section id="contact" className="py-20 bg-[#f5f1e8] scroll-mt-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-[#5d4a3a] mb-6">お問い合わせ</h2>
          <div className="reveal underline-grow w-24 h-1 bg-[#d4a574] mx-auto mb-8"></div>
          <div className="reveal bg-white rounded-lg p-8 shadow-lg">
            <Instagram className="w-16 h-16 mx-auto mb-6 text-[#5d4a3a]" />
            <p className="text-xl text-gray-700 mb-6">
              お問い合わせ・ご質問は<br />
              Instagramよりお願いいたします
            </p>
            <a
              href="https://www.instagram.com/suzukibudounouen/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#a0876f] text-white px-8 py-3 rounded-full hover:bg-[#8f7660] transition-colors"
            >
              <Instagram size={20} />
              Instagramを見る
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer ref={footerRef} className="bg-[#a0876f] text-white py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src={treeLogo} alt="鈴木農園ロゴ" className="h-12 w-12" style={{ mixBlendMode: 'multiply' }} />
            <p className="text-lg">鈴木農園</p>
          </div>
          <p className="opacity-95 text-sm">© 2026 Suzuki Farm. All rights reserved.</p>
        </div>
      </footer>

      {/* Floating CTA */}
      <a
        href="https://www.instagram.com/suzukibudounouen/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagramへ移動"
        style={ctaTop !== null ? { position: 'absolute', top: ctaTop } : undefined}
        className={`${ctaTop === null ? 'fixed bottom-8' : ''} right-6 md:right-8 z-40 inline-flex items-center gap-2 bg-[#a0876f] text-white px-5 py-3 rounded-full shadow-lg hover:bg-[#8f7660] transition-all duration-300 ${showFloatingCta ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <Instagram size={18} />
        <span className="hidden sm:inline text-sm">Instagramへ</span>
      </a>
    </div>
  );
}