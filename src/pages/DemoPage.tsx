import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { WaslaLogo } from "../components/WaslaLogo";
import { Play, RefreshCw, Calendar } from "lucide-react";

// Official Typebot credentials for Wasla
const TYPEBOT_ID = "wasla-demo-dz";
const TYPEBOT_HOST = "https://typebot.co";

export default function DemoPage() {
  const [isBotLoaded, setIsBotLoaded] = useState(false);

  useEffect(() => {
    // Inject Typebot initStandard as module script (official approach)
    const script = document.createElement("script");
    script.type = "module";
    script.textContent = `
      import Typebot from "https://cdn.jsdelivr.net/npm/@typebot.io/js@0/dist/web.js";

      Typebot.initStandard({
        id: "wasla-demo",
        typebot: "${TYPEBOT_ID}",
        apiHost: "${TYPEBOT_HOST}",
        prefilledVariables: {
          "Current URL": window.location.href,
          "utm_source": new URLSearchParams(window.location.search).get("utm_source") ?? "",
          "utm_campaign": new URLSearchParams(window.location.search).get("utm_campaign") ?? "",
          "page": "demo"
        },
        onEnd: () => {
          // Open Chatwoot automatically when demo ends
          if (window.$chatwoot) window.$chatwoot.toggle("open");
        }
      });
    `;
    document.body.appendChild(script);
    setIsBotLoaded(true);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const restartDemo = () => {
    // Refresh the bot via Typebot commands
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).Typebot?.reload?.({ id: "wasla-demo" });
  };

  const openChat = () => {
    // Open Chatwoot widget
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).$chatwoot?.toggle?.("open");
  };

  return (
    <div className="demo-page-v3" style={{ direction: 'rtl', fontFamily: 'Cairo, sans-serif' }}>
      <nav className="navbar" style={{ background: 'white', borderBottom: '1px solid #edf2f7', padding: '1rem 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" className="logo" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: 'none' }}>
            <WaslaLogo size={42} />
            <span style={{ fontWeight: 800, fontSize: '1.5rem', color: '#be185d' }}>وصلة</span>
          </Link>

          <div className="nav-buttons" style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center' }}>رجوع</Link>
            <button onClick={openChat} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={18} />
              احجزي استشارة
            </button>
          </div>
        </div>
      </nav>

      <section className="demo-hero" style={{ padding: '4rem 0', background: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: 980 }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', marginBottom: 12, fontWeight: 900, color: '#1e293b' }}>
              جرّبي كيف وصلة تهنّيك من "بشحال؟" في دقيقة 🎬
            </h1>
            <p style={{ fontSize: '1.15rem', color: '#64748b', fontWeight: 600 }}>
              بدون تسجيل — مجرد تجربة تفاعلية سريعة.
            </p>
          </div>

          {/* Typebot container */}
          <div className="typebot-wrapper" style={{
            background: 'white',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e2e8f0'
          }}>
            {isBotLoaded && (
              <typebot-standard
                id="wasla-demo"
                style={{ width: "100%", height: "650px", display: "block" }}
              ></typebot-standard>
            )}
          </div>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 32, flexWrap: "wrap" }}>
            <button onClick={restartDemo} className="btn btn-secondary btn-lg" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <RefreshCw size={20} />
              أعيدي التجربة
            </button>
            <button onClick={openChat} className="btn btn-primary btn-lg" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Play size={20} />
              احجزي استشارة الآن
            </button>
          </div>
        </div>
      </section>

      <footer style={{ padding: '2rem 0', textAlign: 'center', color: '#94a3b8', fontSize: '0.9rem' }}>
        &copy; {new Date().getFullYear()} وصلة (Wasla) - جميع الحقوق محفوظة
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap');
        
        .demo-page-v3 {
          min-height: 100vh;
          background: #f8fafc;
        }

        .btn {
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
          text-decoration: none;
        }

        .btn-primary {
          background: #be185d;
          color: white;
        }
        .btn-primary:hover {
          background: #9d174d;
          transform: translateY(-2px);
        }

        .btn-secondary {
          background: #0d9488;
          color: white;
        }
        .btn-secondary:hover {
          background: #0f766e;
          transform: translateY(-2px);
        }

        .btn-outline {
          background: transparent;
          border: 2px solid #e2e8f0;
          color: #64748b;
        }
        .btn-outline:hover {
          background: #f1f5f9;
        }

        .btn-lg {
          padding: 1rem 2rem;
          font-size: 1.1rem;
        }

        .container {
          width: 90%;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        typebot-standard {
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
}
