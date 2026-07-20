import { useEffect, useRef, useState } from 'react';
import { Instagram, Heart, ChevronDown } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import grapeHarvest from '../assets/grape-harvest.jpg';
import kidsFarmExperience from '../assets/kids-farm-experience.jpg';
import unmannedStandExterior from '../assets/unmanned-stand-exterior.jpg';
import unmannedStandShelf from '../assets/unmanned-stand-shelf.jpg';
import suzukiMountain from '../assets/suzuki-mountain.jpg';
import suzukiFutsal from '../assets/suzuki-futsal.jpg';
import suzukiTrailrunForest from '../assets/suzuki-trailrun-forest.jpg';
import suzukiTrailrun from '../assets/suzuki-trailrun.jpg';
import veggieLogo from 'figma:asset/608864b4edd7bec5e6b171c58f15ff6ee71db487.png';
import takaoImage from '../assets/takao.jpg';

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
    <div className="relative min-h-screen bg-[#faf8f3]" style={{ fontFamily: '"Shippori Mincho", serif' }}>
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 bg-[#f5ede4] border-b border-[#d4c4b0] z-50 shadow-sm transition-transform duration-300 ${headerVisible || isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex md:flex-row flex-col md:items-center items-center justify-between gap-3">
          <div className="flex md:flex-row flex-col items-center md:gap-3 gap-2">
            <img src={veggieLogo} alt="鈴木農園ロゴ" className="h-12 w-12" style={{ mixBlendMode: 'multiply' }} />
            <h1 className="text-3xl tracking-wide text-[#8b7355]" style={{ fontFamily: '"Zen Antique", serif' }}>
              鈴木農園
            </h1>
          </div>
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('top')}
              className={`nav-link text-[#6b5544] hover:text-[#8b7355] transition-colors ${activeCategory === 'top' ? 'active-link text-[#8b7355]' : ''}`}
            >
              トップ
            </button>
            <div className="relative group">
              <button className={`nav-link text-[#6b5544] hover:text-[#8b7355] transition-colors ${activeCategory === 'about' ? 'active-link text-[#8b7355]' : ''}`}>
                私たちについて
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible -translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 transition-all duration-200">
                <div className="bg-[#f5ede4] border border-[#d4c4b0] rounded-sm shadow-lg py-2 min-w-[160px]">
                  <button onClick={() => scrollToSection('concept')} className="block w-full text-left px-4 py-2 text-sm text-[#5a4a3a] hover:text-[#8b7355] hover:bg-[#e8dfd1] transition-colors">
                    コンセプト
                  </button>
                  <button onClick={() => scrollToSection('about')} className="block w-full text-left px-4 py-2 text-sm text-[#5a4a3a] hover:text-[#8b7355] hover:bg-[#e8dfd1] transition-colors">
                    自己紹介
                  </button>
                </div>
              </div>
            </div>
            <div className="relative group">
              <button className={`nav-link text-[#6b5544] hover:text-[#8b7355] transition-colors ${activeCategory === 'activities' ? 'active-link text-[#8b7355]' : ''}`}>
                活動内容
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible -translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 transition-all duration-200">
                <div className="bg-[#f5ede4] border border-[#d4c4b0] rounded-sm shadow-lg py-2 min-w-[160px]">
                  <button onClick={() => scrollToSection('activity-intro')} className="block w-full text-left px-4 py-2 text-sm text-[#5a4a3a] hover:text-[#8b7355] hover:bg-[#e8dfd1] transition-colors">
                    活動紹介
                  </button>
                  <button onClick={() => scrollToSection('activity-blog')} className="block w-full text-left px-4 py-2 text-sm text-[#5a4a3a] hover:text-[#8b7355] hover:bg-[#e8dfd1] transition-colors">
                    活動報告
                  </button>
                </div>
              </div>
            </div>
            <div className="relative group">
              <button className={`nav-link text-[#6b5544] hover:text-[#8b7355] transition-colors ${activeCategory === 'info' ? 'active-link text-[#8b7355]' : ''}`}>
                ご利用案内
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible -translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 transition-all duration-200">
                <div className="bg-[#f5ede4] border border-[#d4c4b0] rounded-sm shadow-lg py-2 min-w-[160px]">
                  <button onClick={() => scrollToSection('hours')} className="block w-full text-left px-4 py-2 text-sm text-[#5a4a3a] hover:text-[#8b7355] hover:bg-[#e8dfd1] transition-colors">
                    営業時間
                  </button>
                  <button onClick={() => scrollToSection('access')} className="block w-full text-left px-4 py-2 text-sm text-[#5a4a3a] hover:text-[#8b7355] hover:bg-[#e8dfd1] transition-colors">
                    アクセス
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={() => scrollToSection('contact')}
              className={`nav-link text-[#6b5544] hover:text-[#8b7355] transition-colors ${activeCategory === 'contact' ? 'active-link text-[#8b7355]' : ''}`}
            >
              お問い合わせ
            </button>
          </nav>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="メニューを開閉する"
            aria-expanded={isMenuOpen}
            className="p-2 hover:bg-[#e8dfd1] rounded transition-colors md:hidden absolute right-6 top-4 text-[#8b7355]"
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
          <nav className="md:hidden bg-[#f5ede4] border-t border-[#d4c4b0]">
            <ul className="max-w-7xl mx-auto px-6 py-4 space-y-2">
              <li>
                <button onClick={() => scrollToSection('top')} className={`block w-full text-left md:text-center py-2 text-[#6b5544] hover:text-[#8b7355] transition-colors ${activeCategory === 'top' ? 'text-[#8b7355]' : ''}`}>
                  トップ
                </button>
              </li>
              
              {/* 私たちについて */}
              <li>
                <button 
                  onClick={() => toggleSubmenu('about')}
                  className={`flex items-center justify-between md:justify-center w-full text-left md:text-center py-2 text-[#6b5544] hover:text-[#8b7355] transition-colors ${activeCategory === 'about' ? 'text-[#8b7355]' : ''}`}
                >
                  <span>私たちについて</span>
                  <ChevronDown size={20} className={`transition-transform duration-300 ${expandedMenu === 'about' ? 'rotate-180' : ''}`} />
                </button>
                {expandedMenu === 'about' && (
                  <ul className="ml-4 md:ml-0 mt-2 space-y-2 border-l-2 md:border-l-0 border-[#a67c52] pl-4 md:pl-0">
                    <li>
                      <button onClick={() => scrollToSection('concept')} className="block w-full text-left md:text-center py-1 text-sm text-[#5a4a3a] hover:text-[#8b7355] transition-colors">
                        コンセプト
                      </button>
                    </li>
                    <li>
                      <button onClick={() => scrollToSection('about')} className="block w-full text-left md:text-center py-1 text-sm text-[#5a4a3a] hover:text-[#8b7355] transition-colors">
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
                  className={`flex items-center justify-between md:justify-center w-full text-left md:text-center py-2 text-[#6b5544] hover:text-[#8b7355] transition-colors ${activeCategory === 'activities' ? 'text-[#8b7355]' : ''}`}
                >
                  <span>活動内容</span>
                  <ChevronDown size={20} className={`transition-transform duration-300 ${expandedMenu === 'activities' ? 'rotate-180' : ''}`} />
                </button>
                {expandedMenu === 'activities' && (
                  <ul className="ml-4 md:ml-0 mt-2 space-y-2 border-l-2 md:border-l-0 border-[#a67c52] pl-4 md:pl-0">
                    <li>
                      <button onClick={() => scrollToSection('activity-intro')} className="block w-full text-left md:text-center py-1 text-sm text-[#5a4a3a] hover:text-[#8b7355] transition-colors">
                        活動紹介
                      </button>
                    </li>
                    <li>
                      <button onClick={() => scrollToSection('activity-blog')} className="block w-full text-left md:text-center py-1 text-sm text-[#5a4a3a] hover:text-[#8b7355] transition-colors">
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
                  className={`flex items-center justify-between md:justify-center w-full text-left md:text-center py-2 text-[#6b5544] hover:text-[#8b7355] transition-colors ${activeCategory === 'info' ? 'text-[#8b7355]' : ''}`}
                >
                  <span>ご利用案内</span>
                  <ChevronDown size={20} className={`transition-transform duration-300 ${expandedMenu === 'info' ? 'rotate-180' : ''}`} />
                </button>
                {expandedMenu === 'info' && (
                  <ul className="ml-4 md:ml-0 mt-2 space-y-2 border-l-2 md:border-l-0 border-[#a67c52] pl-4 md:pl-0">
                    <li>
                      <button onClick={() => scrollToSection('hours')} className="block w-full text-left md:text-center py-1 text-sm text-[#5a4a3a] hover:text-[#8b7355] transition-colors">
                        営業時間
                      </button>
                    </li>
                    <li>
                      <button onClick={() => scrollToSection('access')} className="block w-full text-left md:text-center py-1 text-sm text-[#5a4a3a] hover:text-[#8b7355] transition-colors">
                        アクセス
                      </button>
                    </li>
                  </ul>
                )}
              </li>

              <li>
                <button onClick={() => scrollToSection('contact')} className={`block w-full text-left md:text-center py-2 text-[#6b5544] hover:text-[#8b7355] transition-colors ${activeCategory === 'contact' ? 'text-[#8b7355]' : ''}`}>
                  お問い合わせ
                </button>
              </li>
            </ul>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section id="top" className="pt-20 scroll-mt-20">
        <div className="relative h-[420px] md:h-[650px]">
          <ImageWithFallback
            src={unmannedStandExterior}
            alt="鈴木農園の風景"
            className="w-full h-full object-cover opacity-90 kenburns"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#6b5544]/20 to-[#6b5544]/60 flex items-end">
            <div className="max-w-7xl mx-auto px-6 pb-16 text-white hero-fade-in">
              <div className="flex md:flex-row flex-col items-center md:items-start gap-4 mb-6">
                <img src={veggieLogo} alt="鈴木農園ロゴ" className="h-24 w-24" />
                <h2 className="text-4xl md:text-7xl text-center md:text-left" style={{ fontFamily: '"Zen Antique", serif' }}>
                  鈴木農園
                </h2>
              </div>
              <p className="text-2xl mb-3 opacity-95 text-center md:text-left">心を込めて育てる、土の恵み</p>
              <p className="text-xl opacity-95 text-center md:text-left">東京都世田谷区等々力</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Introduction */}
      <section className="py-20 bg-[#f5ede4]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-2xl text-[#6b5544] leading-relaxed mb-6">
            都会の喧騒の中に佇む小さな農園。<br />
            ここには、人と自然をつなぐ物語があります。
          </p>
          <div className="flex justify-center">
            <Heart className="w-12 h-12 text-[#a67c52]" />
          </div>
        </div>
      </section>

      {/* Concept Section */}
      <section id="concept" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl text-[#6b5544] mb-6" style={{ fontFamily: '"Zen Antique", serif' }}>
              コンセプト
            </h2>
            <div className="reveal underline-grow w-16 h-0.5 bg-[#a67c52] mx-auto mb-8"></div>
          </div>
          
          <div className="reveal grid md:grid-cols-2 gap-16 items-center">
            <div className="relative h-[300px] md:h-[450px] rounded-sm overflow-hidden shadow-md">
              <ImageWithFallback
                loading="lazy"
                src={grapeHarvest}
                alt="ブドウ"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-4xl text-[#6b5544] mb-8 leading-relaxed">
                ブドウと季節の野菜を<br />販売しています
              </h3>
              <div className="space-y-6 text-lg text-[#5a4a3a] leading-relaxed">
                <p>
                  一粒一粒、丁寧に育てたブドウ。<br />
                  季節の移ろいとともに実る、新鮮な野菜たち。
                </p>
                <p>
                  この土地で、この手で、<br />
                  真心を込めて育てています。
                </p>
                <p>
                  かつてはフットサルのコートを駆け回っていた私が、<br />
                  今は畑で汗を流す日々。
                </p>
                <p>
                  スポーツも農業も、<br />
                  一つ一つの積み重ねが実を結ぶのです。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-[#faf8f3] scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl text-[#6b5544] mb-6" style={{ fontFamily: '"Zen Antique", serif' }}>
              自己紹介
            </h2>
            <div className="reveal underline-grow w-16 h-0.5 bg-[#a67c52] mx-auto mb-8"></div>
          </div>
          
          {/* 鈴木紳一郎 */}
          <div className="reveal grid md:grid-cols-2 gap-16 items-center mb-20">
            <div className="order-2 md:order-1">
              <h3 className="text-4xl text-[#6b5544] mb-6">
                <span className="md:inline block text-center md:text-left">鈴木紳一郎</span>
                <span className="md:inline block text-center md:text-left">（農園主）</span>
              </h3>
              <div className="space-y-5 text-lg text-[#5a4a3a] leading-relaxed">
                <p>プロフットサル選手として、<br />ペスカドーラ町田→ヴォルクスオーレ仙台のゴレイロで一生懸命身体を張っていた日々。</p>
                <p>引退後、実家の農家を継いだ形になります。<br /></p>
                <p>
                  土の匂い、汗を流す喜び、<br />
                  収穫の達成感。
                </p>
                <p>
                  フットサルで学んだ努力の大切さを胸に、<br />
                  今日も畑に立っています。
                </p>
                <p>
                  人と人、人と自然をつなぐ農園でありたい。<br />
                  それが、私の願いです。
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2 relative h-[350px] md:h-[550px] rounded-sm overflow-hidden shadow-md">
              <ImageWithFallback
                loading="lazy"
                src={suzukiMountain}
                alt="鈴木紳一郎"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="reveal mb-20">
            <p className="text-sm text-[#8b7355] mb-6 text-center">スポーツ歴</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <div className="rounded-sm overflow-hidden shadow-sm bg-white">
                <div className="h-40 md:h-48">
                  <img src={suzukiFutsal} alt="フットサル" className="w-full h-full object-cover object-top" loading="lazy" />
                </div>
                <p className="text-sm text-[#5a4a3a] text-center py-2">フットサル</p>
              </div>
              <div className="rounded-sm overflow-hidden shadow-sm bg-white">
                <div className="h-40 md:h-48">
                  <img src={suzukiTrailrunForest} alt="トレイルランニング" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <p className="text-sm text-[#5a4a3a] text-center py-2">トレイルランニング</p>
              </div>
              <div className="rounded-sm overflow-hidden shadow-sm bg-white">
                <div className="h-40 md:h-48">
                  <img src={suzukiTrailrun} alt="トレイルランニング ゴール" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <p className="text-sm text-[#5a4a3a] text-center py-2">トレイルランニング(ゴール)</p>
              </div>
            </div>
          </div>

          {/* 高尾一輝 */}
          <div className="reveal grid md:grid-cols-2 gap-16 items-center">
            <div className="relative h-[350px] md:h-[550px] rounded-sm overflow-hidden shadow-md">
              <img
                loading="lazy"
                src={takaoImage}
                alt="高尾一輝"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-4xl text-[#6b5544] mb-6">
                <span className="md:inline block text-center md:text-left">高尾 一輝</span>
                <span className="md:inline block text-center md:text-left">(Webデザイナー)</span>
              </h3>
              <div className="space-y-5 text-lg text-[#5a4a3a] leading-relaxed">
                <p>ペスカドーラ町田のユースで1年プレー。</p>
                <p>
                  その後社会人サッカーを経て、現在はIT業界への再就職を目指しながら若者支援のNPO団体サンカクシャのフットサル部が始動し、副部長として携わっている。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl text-[#6b5544] mb-6" style={{ fontFamily: '"Zen Antique", serif' }}>活動内容</h2>
            <div className="reveal underline-grow w-16 h-0.5 bg-[#a67c52] mx-auto mb-8"></div>
          </div>

          {/* 活動紹介 */}
          <div id="activity-intro" className="mb-20 scroll-mt-20">
            <h3 className="text-4xl text-[#6b5544] mb-12 text-center">活動紹介</h3>

            <div className="reveal mb-20">
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="relative h-[280px] md:h-[400px] rounded-sm overflow-hidden shadow-md">
                  <ImageWithFallback
                    loading="lazy"
                    src={kidsFarmExperience}
                    alt="子どもたちとの体験"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-3xl text-[#6b5544] mb-6">
                    子どもたちと育む未来
                  </h4>
                  <div className="space-y-5 text-lg text-[#5a4a3a] leading-relaxed">
                    <p>
                      近隣の小学校の子どもたち、<br />
                      放課後デイサービスに通う子どもたち、<br />
                      障害者施設の皆さん。
                    </p>
                    <p>
                      多くの方々が、この農園で<br />
                      土に触れ、野菜を収穫し、<br />
                      笑顔になってくれます。
                    </p>
                    <p>
                      「ありがとう」「楽しかった」<br />
                      その言葉が、私の原動力です。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal">
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="order-2 md:order-1">
                  <h4 className="text-3xl text-[#6b5544] mb-6">
                    地域とつながる販売活動
                  </h4>
                  <div className="space-y-5 text-lg text-[#5a4a3a] leading-relaxed">
                    <p>
                      週末の朝市では、<br />
                      お客様と直接言葉を交わします。
                    </p>
                    <p>
                      「美味しかったよ」<br />
                      「また来るね」
                    </p>
                    <p>
                      そんな会話が、何よりの喜びです。
                    </p>
                    <p>
                      無人直売所も、地域の皆様に<br />
                      気軽に立ち寄っていただける<br />
                      場所でありたいと思っています。
                    </p>
                  </div>
                </div>
                <div className="order-1 md:order-2 relative h-[280px] md:h-[400px] rounded-sm overflow-hidden shadow-md">
                  <ImageWithFallback
                    loading="lazy"
                    src={unmannedStandExterior}
                    alt="朝市"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 活動報告 */}
          <div id="activity-blog" className="scroll-mt-20">
            <h3 className="text-4xl text-[#6b5544] mb-12 text-center">活動報告</h3>
            <div className="space-y-12 max-w-5xl mx-auto">
              {/* Blog Post 1 */}
              <article className="reveal bg-[#f5ede4] border border-[#d4c4b0] rounded-sm overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="relative h-64 md:h-full">
                    <ImageWithFallback
                      loading="lazy"
                      src={kidsFarmExperience}
                      alt="子どもたちとの体験活動"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:col-span-2 p-8">
                    <div className="text-sm text-[#8b7355] mb-3">2026年7月8日</div>
                    <h4 className="text-3xl text-[#6b5544] mb-4">小学生の農業体験を実施しました</h4>
                    <p className="text-[#5a4a3a] leading-relaxed mb-4 text-lg">
                      本日、近隣の小学校から30名の子どもたちが農園を訪れ、野菜の収穫体験を行いました。
                      初めて土に触れる子も多く、最初は戸惑っていましたが、収穫の楽しさを実感するにつれ、
                      みんな笑顔になっていました。
                    </p>
                    <p className="text-[#5a4a3a] leading-relaxed text-lg">
                      「野菜ってこうやってできるんだ！」という子どもたちの声が印象的でした。
                    </p>
                  </div>
                </div>
              </article>

              {/* Blog Post 2 */}
              <article className="reveal bg-[#f5ede4] border border-[#d4c4b0] rounded-sm overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="relative h-64 md:h-full">
                    <ImageWithFallback
                      loading="lazy"
                      src={unmannedStandExterior}
                      alt="週末の朝市"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:col-span-2 p-8">
                    <div className="text-sm text-[#8b7355] mb-3">2026年7月4日</div>
                    <h4 className="text-3xl text-[#6b5544] mb-4">週末の朝市、大盛況でした!</h4>
                    <p className="text-[#5a4a3a] leading-relaxed mb-4 text-lg">
                      今週末の朝市では、旬の春野菜とブドウを販売しました。
                      常連のお客様から「今年のブドウは特に甘いね」とお褒めの言葉をいただき、
                      とても嬉しかったです。
                    </p>
                    <p className="text-[#5a4a3a] leading-relaxed text-lg">
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
      <section id="hours" className="py-24 bg-[#f5ede4] scroll-mt-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl text-[#6b5544] mb-6" style={{ fontFamily: '"Zen Antique", serif' }}>
            無人直売所の営業時間
          </h2>
          <div className="reveal underline-grow w-16 h-0.5 bg-[#a67c52] mx-auto mb-12"></div>
          <div className="reveal rounded-sm overflow-hidden shadow-sm mb-8">
            <img src={unmannedStandShelf} alt="無人直売所の様子" className="w-full h-64 object-cover" loading="lazy" />
          </div>
          <div className="reveal bg-white rounded-sm p-12 shadow-sm">
            <p className="text-3xl text-[#6b5544] mb-6">営業日：不定休</p>
            <div className="space-y-4 text-lg text-[#5a4a3a] leading-relaxed">
              <p>
                収穫の状況により、<br />
                営業時間は日々変わります。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Access Section */}
      <section id="access" className="py-24 bg-[#faf8f3] scroll-mt-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-5xl text-[#6b5544] mb-6" style={{ fontFamily: '"Zen Antique", serif' }}>
              アクセス
            </h2>
            <div className="reveal underline-grow w-16 h-0.5 bg-[#a67c52] mx-auto mb-8"></div>
          </div>
          <div className="reveal bg-white rounded-sm p-12 shadow-sm text-center">
            <p className="text-xl text-[#5a4a3a] mb-3">〒158-0082</p>
            <p className="text-3xl text-[#6b5544] mb-8 leading-relaxed">
              東京都世田谷区等々力7-13-9
            </p>
            <p className="text-xl text-[#5a4a3a] leading-relaxed">
              東急大井町線「等々力駅」より<br />
              徒歩約8分
            </p>
            <div className="mt-8 pt-8 border-t border-[#d4c4b0] mb-8">
              <p className="text-lg text-[#5a4a3a] leading-relaxed">
                緑に囲まれた静かな場所です。<br />
                ゆっくりとお越しください。
              </p>
            </div>
            <div className="rounded-sm overflow-hidden shadow-md">
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
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl text-[#6b5544] mb-6" style={{ fontFamily: '"Zen Antique", serif' }}>
            お問い合わせ
          </h2>
          <div className="reveal underline-grow w-16 h-0.5 bg-[#a67c52] mx-auto mb-12"></div>
          <div className="reveal bg-[#f5ede4] rounded-sm p-12 shadow-sm">
            <Instagram className="w-16 h-16 mx-auto mb-6 text-[#a67c52]" />
            <div className="space-y-6 text-lg text-[#5a4a3a] leading-relaxed mb-8">
              <p>
                ご質問やお問い合わせは、<br />
                Instagramにてお気軽にどうぞ。
              </p>
              <p>
                農園の日々の様子も<br />
                投稿しています。
              </p>
            </div>
            <a
              href="https://www.instagram.com/suzukibudounouen/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#a67c52] text-white px-8 py-3 rounded-full hover:bg-[#8b6541] transition-colors"
            >
              <Instagram size={20} />
              Instagramを見る
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer ref={footerRef} className="bg-[#6b5544] text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-3">
              <img src={veggieLogo} alt="鈴木農園ロゴ" className="h-12 w-12" />
              <p className="text-3xl" style={{ fontFamily: '"Zen Antique", serif' }}>
                鈴木農園
              </p>
            </div>
            <p className="opacity-95 text-lg">心を込めて、土の恵みを</p>
          </div>
          <div className="text-center opacity-95 text-sm">
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
        className={`${ctaTop === null ? 'fixed bottom-8' : ''} right-6 md:right-8 z-40 inline-flex items-center gap-2 bg-[#a67c52] text-white px-5 py-3 rounded-full shadow-lg hover:bg-[#8b6541] transition-all duration-300 ${showFloatingCta ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <Instagram size={18} />
        <span className="hidden sm:inline text-sm">Instagramへ</span>
      </a>
    </div>
  );
}