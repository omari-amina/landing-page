import { Link } from 'react-router-dom'
import { WaslaLogo } from '../components/WaslaLogo'
import { InstagramIcon, FacebookIcon, WhatsAppIcon } from '../components/SocialIcons'
import {
  Play, Calendar, Sparkles,
  Smartphone, AlertOctagon, TrendingDown, Clock, Target, Bot,
  RefreshCw, Inbox, Tag, CheckCircle, BookOpen, ShoppingBag,
  Dumbbell, Palette
} from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="container navbar-content">
          <div className="logo">
            <WaslaLogo size={45} />
          </div>
          <div className="nav-buttons">
            <Link to="/demo" className="btn btn-secondary">جرّبي Demo</Link>
            <a href="#contact" className="btn btn-primary">
              <Calendar className="w-5 h-5" size={20} />
              احجزي استشارة
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-layout">
          <div className="hero-content">
            <h1 className="hero-title animate-slide-up">
              كل رسائل زبوناتك…
              <span className="hero-highlight">في مكان واحد</span>
              <span className="hero-subtitle-inline">بدون فوضى</span>
            </h1>
            <p className="hero-description animate-slide-up" style={{ animationDelay: '0.1s' }}>
              نظام ذكي يجمع رسائل Instagram وFacebook وWhatsApp ويحوّلها إلى طلبات منظمة.
            </p>
            <div className="hero-cta animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link to="/demo" className="btn btn-primary btn-lg">
                <Play className="icon-sm" size={24} />
                جرّبي Demo مجاناً
              </Link>
              <a href="#contact" className="btn btn-secondary btn-lg">
                <Calendar className="icon-sm" size={24} />
                احجزي استشارة
              </a>
            </div>
            <div className="hero-platforms animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="platform-badge">
                <InstagramIcon size={18} className="platform-icon" /> Instagram
              </div>
              <div className="platform-badge">
                <FacebookIcon size={18} className="platform-icon" /> Facebook
              </div>
              <div className="platform-badge">
                <WhatsAppIcon size={18} className="platform-icon" /> WhatsApp
              </div>
            </div>
          </div>

          <div className="hero-visual animate-fade-in">
            <div className="image-wrapper">
              <img src="/hero-image.png" alt="رائدة أعمال ناجحة تستخدم وصلة" className="hero-img" />
              <div className="visual-badge">
                <Sparkles size={20} className="badge-icon text-accent" />
                <span>نظمي وقتك</span>
              </div>
            </div>
          </div>
        </div>

        {/* Abstract Shapes (Subtle) */}
        <div className="shape shape-1"></div>
      </section>

      {/* Problem Section (Gray Background) */}
      <section className="section section-bg-subtle problem-section">
        <div className="container">
          <h2 className="section-title">😩 هل هذا يحصل معك؟</h2>
          <p className="section-subtitle">
            صاحبات المشاريع يعانين يوميًا من نفس المشاكل...
          </p>
          <div className="grid-4 problems-grid">
            <div className="card problem-card">
              <div className="problem-icon"><Smartphone strokeWidth={1.5} size={48} color="#be185d" /></div>
              <h3>كثرة الرسائل</h3>
              <p>رسائل من كل مكان... Instagram، Facebook، WhatsApp. مين تردي أولاً؟</p>
            </div>
            <div className="card problem-card">
              <div className="problem-icon"><AlertOctagon strokeWidth={1.5} size={48} color="#be185d" /></div>
              <h3>نسيان الرد</h3>
              <p>زبونة سألت عن المنتج ونسيتي تردي عليها... وراحت</p>
            </div>
            <div className="card problem-card">
              <div className="problem-icon"><TrendingDown strokeWidth={1.5} size={48} color="#be185d" /></div>
              <h3>ضياع زبونات</h3>
              <p>زبونات مهتمات ضاعوا بين الرسائل. فرص ضائعة كل يوم</p>
            </div>
            <div className="card problem-card">
              <div className="problem-icon"><Clock strokeWidth={1.5} size={48} color="#be185d" /></div>
              <h3>ضغط يومي</h3>
              <p>تحسي بالإرهاق من كثرة المتابعة. الشغل ما يخلص</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section (White Background) */}
      <section className="section solution-section">
        <div className="container">
          <h2 className="section-title">✨ الحل: نظام يشتغل لأجلك</h2>
          <p className="section-subtitle">
            كل شي منظم، كل شي واضح، وأنتِ مرتاحة
          </p>
          <div className="grid-2 solutions-grid">
            <div className="solution-visual">
              <img src="/features-illustration.png" alt="نظام الأتمتة الذكي" className="features-img animate-float" />
            </div>
            <div className="solutions-list">
              <div className="solution-item">
                <div className="solution-icon"><Target strokeWidth={1.5} size={40} color="#0d9488" /></div>
                <div className="solution-text">
                  <h3>CRM مخصص</h3>
                  <p>نظام مصمم خصيصًا لصاحبات المشاريع الصغيرة. بسيط وفعّال</p>
                </div>
              </div>
              <div className="solution-item">
                <div className="solution-icon"><Bot strokeWidth={1.5} size={40} color="#0d9488" /></div>
                <div className="solution-text">
                  <h3>أتمتة ذكية</h3>
                  <p>ردود تلقائية، تذكيرات، ومتابعة بدون تدخل منك</p>
                </div>
              </div>
              <div className="solution-item">
                <div className="solution-icon"><WhatsAppIcon size={40} /></div>
                <div className="solution-text">
                  <h3>WhatsApp متصل</h3>
                  <p>كل رسائل الواتساب تظهر في مكان واحد مع باقي المنصات</p>
                </div>
              </div>
              <div className="solution-item">
                <div className="solution-icon"><RefreshCw strokeWidth={1.5} size={40} color="#0d9488" /></div>
                <div className="solution-text">
                  <h3>Bots للرد والمتابعة</h3>
                  <p>بوتات ذكية ترد على الأسئلة المتكررة وتتابع الزبونات</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works (Gray Background) */}
      <section className="section section-bg-subtle steps-section">
        <div className="container">
          <h2 className="section-title">🔄 كيف يعمل النظام؟</h2>
          <p className="section-subtitle">
            أربع خطوات فقط من الرسالة إلى الطلب
          </p>
          <div className="steps-wrapper">
            <div className="steps-line"></div>
            <div className="grid-4 steps-grid">
              <div className="step-card">
                <div className="step-number">1</div>
                <div className="step-icon"><WhatsAppIcon size={48} /></div>
                <h3>رسالة من زبونة</h3>
                <p>زبونة تكتب لك في Instagram أو Facebook أو WhatsApp</p>
              </div>
              <div className="step-card">
                <div className="step-number">2</div>
                <div className="step-icon"><Inbox strokeWidth={1.5} size={48} color="#be185d" /></div>
                <h3>تُسجّل تلقائيًا</h3>
                <p>الرسالة تظهر فورًا في النظام مع كل التفاصيل</p>
              </div>
              <div className="step-card">
                <div className="step-number">3</div>
                <div className="step-icon"><Tag strokeWidth={1.5} size={48} color="#be185d" /></div>
                <h3>تصنيف + متابعة</h3>
                <p>النظام يصنف الرسالة (استفسار، طلب، شكوى) ويتابعها</p>
              </div>
              <div className="step-card">
                <div className="step-number">4</div>
                <div className="step-icon"><CheckCircle strokeWidth={1.5} size={48} color="#be185d" /></div>
                <h3>تحويلها إلى طلب</h3>
                <p>الزبونة تتحول إلى طلب مكتمل ومتابَع</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo CTA Section (White + Primary Accent) */}
      <section className="section demo-cta-section">
        <div className="container">
          <div className="demo-cta-box">
            <div className="demo-cta-content">
              <h2>🎬 شاهدي النظام وهو يعمل</h2>
              <p>
                جهّزنا لك Demo حقيقي تشوفين فيه كيف النظام يستقبل الرسائل ويحوّلها إلى طلبات.
                <br />
                <strong>لا تحتاجي تسجيل. مجاني 100%.</strong>
              </p>
              <Link to="/demo" className="btn btn-accent btn-lg">
                <Play size={24} fill="currentColor" />
                شاهدي Demo الآن
              </Link>
            </div>
            <div className="demo-cta-visual">
              <div className="demo-preview animate-pulse-glow">
                <div className="preview-play"><Play size={32} fill="currentColor" /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience (Gray) */}
      <section className="section section-bg-subtle audience-section">
        <div className="container">
          <h2 className="section-title">👩‍💼 لمن هذه الخدمة؟</h2>
          <p className="section-subtitle">
            إذا كنتِ تستقبلين طلبات عبر السوشيال ميديا، هذا النظام لك
          </p>
          <div className="grid-4 audience-grid">
            <div className="card audience-card">
              <div className="audience-icon"><BookOpen strokeWidth={1.5} size={48} color="#0d9488" /></div>
              <h3>مشاريع تعليمية</h3>
              <p>كورسات، دروس خصوصية، ورش عمل</p>
            </div>
            <div className="card audience-card">
              <div className="audience-icon"><ShoppingBag strokeWidth={1.5} size={48} color="#0d9488" /></div>
              <h3>متاجر صغيرة</h3>
              <p>ملابس، إكسسوارات، منتجات يدوية</p>
            </div>
            <div className="card audience-card">
              <div className="audience-icon"><Dumbbell strokeWidth={1.5} size={48} color="#0d9488" /></div>
              <h3>مدربات</h3>
              <p>تدريب رياضي، تغذية، تطوير ذات</p>
            </div>
            <div className="card audience-card">
              <div className="audience-icon"><Palette strokeWidth={1.5} size={48} color="#0d9488" /></div>
              <h3>صانعات محتوى</h3>
              <p>مؤثرات، مجالات متعددة، منتجات رقمية</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section final-cta-section" id="contact">
        <div className="container">
          <div className="final-cta-box">
            <h2>🚀 ابدئي الآن</h2>
            <p>
              لا تخلي الفوضى تضيّع عليك زبونات. جرّبي النظام أو احجزي استشارة مجانية
            </p>
            <div className="final-cta-buttons">
              <Link to="/demo" className="btn btn-primary btn-lg">
                <Play size={24} />
                جرّبي Demo
              </Link>
              <a href="https://wa.me/213000000000" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-lg">
                <Calendar size={24} />
                احجزي استشارة مجانية
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-brand">
            <WaslaLogo size={50} />
          </div>
          <p className="footer-text">نظام إدارة العملاء الذكي لصاحبات المشاريع</p>
          <p className="footer-copyright">© 2026 وصلة. جميع الحقوق محفوظة</p>
        </div>
      </footer>

      <style>{`
        /* Navbar - Light Glass */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid #f1f5f9;
          padding: var(--spacing-sm) 0;
          box-shadow: var(--shadow-sm);
        }
        
        .navbar-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .logo {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          font-size: var(--font-size-2xl); /* Increased font size */
          font-weight: 800;
          color: var(--color-primary);
        }
        
        .logo-img {
          height: 60px; /* Increased size */
          width: auto;
        }
        
        .nav-buttons {
          display: flex;
          gap: var(--spacing-md);
        }

        /* Hero */
        .hero {
          min-height: 90vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          padding-top: 100px;
          /* Abstract Luxury Background applied to Hero */
          background: url('/abstract-bg.png') no-repeat center center;
          background-size: cover;
        }
        
        .hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(255,255,255,0.95) 40%, rgba(255,255,255,0.7) 100%);
          z-index: 0;
        }

        .hero-layout {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: var(--spacing-2xl);
          align-items: center;
          position: relative;
          z-index: 2;
        }
        
        .hero-content {
          text-align: right;
        }
        
        .hero-title {
          font-size: var(--font-size-5xl);
          font-weight: 900;
          line-height: 1.2;
          margin-bottom: var(--spacing-lg);
          color: var(--color-text-primary);
        }
        
        .hero-highlight {
          display: block;
          color: var(--color-primary);
        }
        
        .hero-subtitle-inline {
          display: block;
          font-size: var(--font-size-2xl);
          color: var(--color-text-secondary);
          margin-top: var(--spacing-sm);
          font-weight: 500;
        }
        
        .hero-description {
          font-size: var(--font-size-xl);
          color: var(--color-text-secondary);
          max-width: 600px;
          margin-bottom: var(--spacing-xl);
          line-height: 1.6;
        }
        
        .hero-cta {
          display: flex;
          justify-content: flex-start;
          gap: var(--spacing-lg);
          margin-bottom: var(--spacing-2xl);
        }
        
        .hero-platforms {
          display: flex;
          justify-content: flex-start;
          gap: var(--spacing-lg);
        }
        
        /* Hero Visual */
        .hero-visual {
          position: relative;
          display: flex;
          justify-content: center;
        }
        
        .image-wrapper {
          position: relative;
          border-radius: 2rem; /* Modern rounded corners */
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(190, 24, 93, 0.15);
          border: 8px solid rgba(255, 255, 255, 0.5);
        }
        
        .hero-img {
          width: 100%;
          max-width: 500px;
          height: auto;
          display: block;
          transition: transform 0.5s ease;
        }
        
        .hero-img:hover {
          transform: scale(1.02);
        }
        
        .visual-badge {
          position: absolute;
          bottom: 20px;
          right: -20px;
          background: white;
          padding: 10px 20px;
          border-radius: var(--radius-full);
          box-shadow: var(--shadow-lg);
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 700;
          color: var(--color-primary);
          animation: float 3s ease-in-out infinite;
        }

        .platform-badge {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          padding: 8px 16px;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: var(--radius-full);
          font-size: var(--font-size-sm);
          box-shadow: var(--shadow-sm);
          color: var(--color-text-secondary);
          font-weight: 600;
        }

        /* Abstract Shapes */
        .shape {
          display: none; /* Removed for cleaner look with image */
        }
        
        /* Features Image */
        .features-img {
          width: 100%;
          max-width: 600px;
          filter: drop-shadow(0 10px 20px rgba(0,0,0,0.1));
        }

        /* Icons */
        .problem-icon,
        .solution-icon,
        .step-icon,
        .audience-icon {
          display: flex;
          justify-content: center;
          margin-bottom: var(--spacing-md);
          transition: transform 0.3s ease;
        }

        .card:hover .problem-icon { transform: scale(1.1) rotate(-5deg); }
        
        .card h3 {
          margin-bottom: var(--spacing-sm);
          color: var(--color-text-primary);
          font-weight: 700;
        }
        
        .card p {
          color: var(--color-text-secondary);
          font-size: 0.95rem;
        }

        /* Specific Card Styles */
        .problem-card {
          background: linear-gradient(145deg, #ffffff, #fff1f2);
          border: 1px solid #ffe4e6;
        }

        /* Mockup */
        .solution-mockup {
          background: white;
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-xl);
          border: 1px solid #e2e8f0;
          overflow: hidden;
        }
        
        .mockup-header {
          display: flex;
          gap: 8px;
          padding: 12px 16px;
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .mockup-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .mockup-dot.red { background: #fee2e2; border: 1px solid #fecaca; }
        .mockup-dot.yellow { background: #fef3c7; border: 1px solid #fde68a; }
        .mockup-dot.green { background: #dcfce7; border: 1px solid #bbf7d0; }
        
        .mockup-content {
          display: flex;
          min-height: 280px;
        }
        
        .mockup-sidebar {
          width: 35%;
          background: #f1f5f9;
          padding: 1rem;
          border-left: 1px solid #e2e8f0;
        }
        
        .sidebar-item {
          padding: 8px 12px;
          margin-bottom: 4px;
          border-radius: 6px;
          font-size: 0.85rem;
          color: var(--color-text-secondary);
        }
        .sidebar-item.active {
          background: white;
          color: var(--color-primary);
          box-shadow: var(--shadow-sm);
          font-weight: 600;
        }
        
        .mockup-main {
          flex: 1;
          padding: 1.5rem;
          background: white;
        }
        
        .message-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: #f8fafc;
          border-radius: 12px;
          margin-bottom: 12px;
          border: 1px solid #f1f5f9;
        }
        
        .msg-avatar { font-size: 1.5rem; }
        .msg-name { display: block; font-weight: 700; font-size: 0.85rem; color: var(--color-text-primary); }
        .msg-text { font-size: 0.85rem; color: var(--color-text-secondary); }
        
        .msg-badge {
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 0.7rem;
          font-weight: 600;
        }
        .msg-badge.new { background: var(--color-primary-light); color: var(--color-primary-dark); }
        .msg-badge.order { background: #dcfce7; color: #166534; }
        
        /* Steps */
        .steps-wrapper { position: relative; }
        .steps-line {
          position: absolute;
          top: 50px;
          left: 10%;
          right: 10%;
          height: 3px;
          background: linear-gradient(90deg, #e2e8f0 0%, var(--color-primary-light) 50%, #e2e8f0 100%);
          z-index: 0;
        }
        
        .step-card {
          background: white;
          position: relative;
          z-index: 1;
          text-align: center;
          padding: var(--spacing-xl);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-md);
          border: 1px solid #f1f5f9;
          transition: transform 0.3s ease;
        }

        .step-card:hover {
          transform: translateY(-5px);
        }
        
        .step-number {
          position: absolute;
          top: -20px;
          right: 50%;
          transform: translateX(50%);
          width: 40px;
          height: 40px;
          background: var(--color-primary);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          box-shadow: 0 4px 6px rgba(190, 24, 93, 0.3);
          border: 2px solid white;
        }

        /* Demo CTA */
        .demo-cta-box {
          display: flex;
          align-items: center;
          gap: var(--spacing-2xl);
          padding: var(--spacing-2xl);
          background: linear-gradient(135deg, white, var(--color-bg-subtle));
          border: 1px solid #e2e8f0;
          border-radius: var(--radius-2xl);
          box-shadow: var(--shadow-xl);
          position: relative;
          overflow: hidden;
        }
        
        .demo-cta-box::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 6px;
          background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
        }

        .demo-preview {
          width: 200px;
          height: 150px;
          background: var(--color-bg-subtle);
          border: 1px solid #cbd5e1;
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
        }
        
        .preview-play {
          width: 50px;
          height: 50px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-primary);
          box-shadow: var(--shadow-md);
          font-size: 1.5rem;
          padding-left: 4px; /* Optical adjustment for play icon */
        }

        /* Final CTA */
        .final-cta-section {
          background: white;
          padding-bottom: 100px;
        }
        
        .final-cta-box {
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .final-cta-buttons {
          display: flex;
          justify-content: center;
          gap: var(--spacing-lg);
          margin-top: var(--spacing-xl);
        }

        /* Footer */
        .footer {
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
          padding: var(--spacing-xl) 0;
          text-align: center;
        }
        
        .footer-brand {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--color-text-primary);
          margin-bottom: var(--spacing-sm);
        }
        
        /* Responsive */
        @media (max-width: 1024px) {
          .hero-layout { grid-template-columns: 1fr; text-align: center; }
          .hero-content { text-align: center; }
          .hero-cta, .hero-platforms { justify-content: center; }
          .hero-visual { margin-bottom: 2rem; order: -1; }
          .grid-2, .grid-3, .grid-4 { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 768px) {
          .nav-buttons .btn {
            font-size: 0.8rem;
            padding: 0.5rem 1rem;
          }
          .hero-cta { flex-direction: column; }
          .demo-cta-box { flex-direction: column; text-align: center; }
          .steps-line { display: none; }
          .final-cta-buttons { flex-direction: column; }
          .mockup-content { flex-direction: column; }
          .mockup-sidebar { width: 100%; border-left: none; border-bottom: 1px solid #e2e8f0; }
        }
      `}</style>
    </div>
  )
}
