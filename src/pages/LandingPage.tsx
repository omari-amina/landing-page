import { Link } from 'react-router-dom'
import { WaslaLogo } from '../components/WaslaLogo'
import { InstagramIcon, FacebookIcon, WhatsAppIcon } from '../components/SocialIcons'
import {
  Play, Calendar, Sparkles,
  Smartphone, AlertOctagon, TrendingDown, Clock, Target, Bot,
  RefreshCw, Inbox, Tag, CheckCircle, BookOpen, ShoppingBag,
  Dumbbell, Palette, MessageSquare, ChevronRight, Zap
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
            <button
              onClick={() => (window as any).$chatwoot.toggle()}
              className="btn btn-primary"
            >
              <Calendar className="w-5 h-5" size={20} />
              احجزي استشارة
            </button>
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
              <button
                onClick={() => (window as any).$chatwoot.toggle()}
                className="btn btn-secondary btn-lg"
              >
                <Calendar className="icon-sm" size={24} />
                احجزي استشارة
              </button>
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

      {/* Automation Flow Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">كيف تعمل أتمتة "وصلة"؟</h2>
            <p className="section-subtitle">نظام ذكي يعمل خلف الكواليس ليدير أعمالكِ بدقة متناهية</p>
          </div>

          <div className="workflow-grid">
            <div className="workflow-step">
              <div className="workflow-icon bg-primary-light">
                <MessageSquare className="text-primary" size={32} />
              </div>
              <h3>1. استقبال الرسالة</h3>
              <p>يصل استفسار من الزبونة عبر Instagram أو WhatsApp أو Facebook إلى منصة Chatwoot الموحدة.</p>
            </div>

            <div className="workflow-connector">
              <ChevronRight className="connector-icon" size={32} />
            </div>

            <div className="workflow-step">
              <div className="workflow-icon bg-secondary-light">
                <Zap className="text-secondary" size={32} />
              </div>
              <h3>2. المعالجة الذكية (n8n)</h3>
              <p>يقوم محرك n8n بتحليل الرسالة، تحديد نوع الطلب، واسترجاع الإجابة المناسبة من Typebot.</p>
            </div>

            <div className="workflow-connector">
              <ChevronRight className="connector-icon" size={32} />
            </div>

            <div className="workflow-step">
              <div className="workflow-icon bg-success-light">
                <CheckCircle className="text-success" size={32} />
              </div>
              <h3>3. الرد والتنفيذ</h3>
              <p>يتم الرد آلياً على الزبونة، مع تسجيل بيانات الطلب في قاعدة بياناتكِ وتنبيهكِ فوراً.</p>
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
              <button
                onClick={() => (window as any).$chatwoot.toggle()}
                className="btn btn-secondary btn-lg"
              >
                <Calendar size={24} />
                احجزي استشارة مجانية
              </button>
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

    </div>
  )
}
