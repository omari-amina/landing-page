import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { WaslaLogo } from '../components/WaslaLogo'
import { Inbox, Zap, MessageSquare, CheckCircle } from 'lucide-react'
import { TypebotModal } from '../components/TypebotModal'

export default function DemoPage() {
  const [isTypebotOpen, setIsTypebotOpen] = useState(false)
  const [showN8nToast, setShowN8nToast] = useState(false)
  const [salesCount, setSalesCount] = useState(12500)
  const [automationStep, setAutomationStep] = useState(0) // 0: Idle, 1: Received, 2: n8n Processing, 3: Success


  const handleTypebotComplete = () => {
    setAutomationStep(1); // Step 1: Received

    // Simulate n8n processing flow
    setTimeout(() => setAutomationStep(2), 1500); // Step 2: Processing in n8n

    setTimeout(() => {
      setAutomationStep(3); // Step 3: Success (Chatwoot + Sheets)
      setShowN8nToast(true);
      setSalesCount(prev => prev + 3000);
    }, 4000);

    setTimeout(() => setShowN8nToast(false), 9000);
  }

  return (
    <div className="demo-v2-container">
      {/* Navigation */}
      <nav className="navbar demo-nav">
        <div className="container navbar-content">
          <Link to="/" className="logo">
            <WaslaLogo size={40} />
            <span className="brand-name-light">وصلة</span>
          </Link>
          <div className="demo-header-info">
            <div className="tag-live">بث تجريبي مباشر ⚡</div>
            <Link to="/" className="btn btn-outline btn-sm">الخروج</Link>
          </div>
        </div>
      </nav>

      <div className="demo-split-layout">
        {/* Left Column: Interactive Experience */}
        <section className="demo-interactive-pane">
          <div className="pane-header">
            <h3>1. التجربة التفاعلية (زبونتك)</h3>
            <p>تخيلي أنك الزبونة، جربي كيف يكون التواصل معكِ</p>
          </div>
          <div className="typebot-embed-wrapper">
            <iframe
              src="https://typebot.co/wasla-demo-dz"
              style={{ border: 'none', width: '100%', height: '100%' }}
              title="Wasla Interactive Demo"
            ></iframe>
          </div>
          <div className="pane-footer p-4 border-t text-center">
            <button
              className="btn btn-primary"
              onClick={() => {
                setIsTypebotOpen(true);
                handleTypebotComplete(); // Trigger animation for demo purposes if iframe doesn't call it
              }}
            >
              جربي كـ "نافذة منبثقة"
            </button>
          </div>
        </section>

        {/* Right Column: Automation Reality */}
        <section className="demo-automation-pane">
          <div className="pane-header">
            <h3>2. ما يحدث خلف الكواليس (صاحبة المشروع)</h3>
            <p>شوفي كيف النظام يسجل، يصنف، ويجاوب في ثواني</p>
          </div>

          <div className="automation-flow-visual">
            <div className={`flow-node ${automationStep >= 1 ? 'active' : ''}`}>
              <div className="node-icon"><Inbox /></div>
              <div className="node-details">
                <h4>استلام البيانات</h4>
                <p>{automationStep >= 1 ? 'تم استلام البيانات من Typebot' : 'بانتظار تفاعل الزبونة...'}</p>
              </div>
              {automationStep >= 1 && <CheckCircle className="check-done" />}
            </div>

            <div className="flow-connector"><div className={`line ${automationStep >= 2 ? 'active' : ''}`}></div></div>

            <div className={`flow-node ${automationStep >= 2 ? 'active processing' : ''}`}>
              <div className="node-icon"><Zap /></div>
              <div className="node-details">
                <h4>معالجة n8n</h4>
                <p>{automationStep === 2 ? 'جاري التحليل والتصنيف...' : automationStep > 2 ? 'تم التحليل بنجاح ✅' : 'بانتظار تفعيل المعالجة'}</p>
              </div>
              {automationStep > 2 && <CheckCircle className="check-done" />}
            </div>

            <div className="flow-connector"><div className={`line ${automationStep >= 3 ? 'active' : ''}`}></div></div>

            <div className={`flow-node ${automationStep >= 3 ? 'active' : ''}`}>
              <div className="node-icon"><MessageSquare /></div>
              <div className="node-details">
                <h4>النتائج النهائية</h4>
                <ul className="mini-status-list">
                  <li className={automationStep >= 3 ? 'done' : ''}>فتح محادثة في Chatwoot</li>
                  <li className={automationStep >= 3 ? 'done' : ''}>إرسال بيانات لـ Sheets</li>
                  <li className={automationStep >= 3 ? 'done' : ''}>تنبيه الهاتف</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Live Dashboard Preview Section */}
          <div className="live-preview-box">
            <div className="dashboard-preview-header">
              <span>لوحة التحكم (Live)</span>
            </div>
            <div className="dashboard-mini-grid">
              <div className="mini-card">
                <span className="label">المبيعات</span>
                <span className="value">{salesCount.toLocaleString()} دج</span>
              </div>
              <div className="mini-card">
                <span className="label">الأتمتة</span>
                <span className="value">94%</span>
              </div>
            </div>

            <div className="mini-chat-preview">
              <div className="chat-header-mini">أحدث محادثة (Chatwoot)</div>
              <div className="chat-body-mini">
                {automationStep < 3 ? (
                  <div className="empty-chat">بانتظار رسالة جديدة...</div>
                ) : (
                  <div className="message-preview">
                    <div className="msg from-bot">"أهلاً بك! تم استلام طلبك وتصنيفه كطلب جديد 🚀"</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      <TypebotModal
        isOpen={isTypebotOpen}
        onClose={() => setIsTypebotOpen(false)}
        onComplete={handleTypebotComplete} // This actually updates the step
      />

      {/* n8n Toast Notification */}
      {showN8nToast && (
        <div className="n8n-toast">
          <div className="toast-content">
            <div className="n8n-icon">⚡</div>
            <div>
              <h4>تمت العملية الأتمتة!</h4>
              <p>تم إرسال البيانات لجداول البيانات وتحديث CRM.</p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap');

        :root {
          --primary-color: #be185d;
          --secondary-color: #0d9488;
          --accent-pink: #db2777;
          --bg-light: #f8fafc;
          --text-main: #1e293b;
          --text-muted: #64748b;
          --glass-bg: rgba(255, 255, 255, 0.85);
          --glass-border: rgba(255, 255, 255, 0.4);
        }

        .demo-v2-container {
          min-height: 100vh;
          background: #f8fafc;
          direction: rtl;
          font-family: 'Cairo', sans-serif;
        }

        .demo-nav { 
          background: white; 
          border-bottom: 2px solid #edf2f7; 
          padding: 1rem 0;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .navbar-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .brand-name-light {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--primary-color);
          margin-right: 0.75rem;
        }

        .demo-header-info {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .tag-live {
          background: #fee2e2;
          color: #ef4444;
          padding: 0.5rem 1rem;
          border-radius: 99px;
          font-weight: 800;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .demo-split-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          height: calc(100vh - 80px);
        }

        .demo-interactive-pane {
          background: white;
          border-left: 2px solid #edf2f7;
          display: flex;
          flex-direction: column;
        }

        .pane-header {
          padding: 2rem 3rem;
          border-bottom: 1px solid #edf2f7;
        }
        .pane-header h3 { font-size: 1.4rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem; }
        .pane-header p { color: var(--text-muted); font-size: 0.95rem; }

        .typebot-embed-wrapper {
          flex: 1;
          background: #f1f5f9;
        }

        .demo-automation-pane {
          background: #f8fafc;
          padding: 2.5rem 3rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        .automation-flow-visual {
          display: flex;
          flex-direction: column;
        }

        .flow-node {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 1.25rem 1.75rem;
          background: white;
          border-radius: 20px;
          border: 1px solid #e2e8f0;
          transition: all 0.4s ease;
          position: relative;
        }

        .flow-node.active {
          border-color: var(--primary-color);
          box-shadow: 0 10px 25px rgba(190, 24, 93, 0.08);
        }

        .flow-node.processing {
          animation: node-pulse 2s infinite ease-in-out;
        }

        @keyframes node-pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); border-color: var(--secondary-color); }
          100% { transform: scale(1); }
        }

        .node-icon {
          width: 50px;
          height: 50px;
          background: #f1f5f9;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
        }

        .flow-node.active .node-icon {
          background: var(--primary-color);
          color: white;
        }

        .node-details h4 { font-weight: 800; margin-bottom: 0.25rem; }
        .node-details p { font-size: 0.85rem; color: var(--text-muted); margin: 0; }

        .check-done { color: #10b981; margin-right: auto; }

        .flow-connector {
          height: 25px;
          width: 2px;
          background: #e2e8f0;
          margin-right: 42px;
        }
        .flow-connector .line { background: #e2e8f0; width: 100%; height: 0; transition: height 0.5s ease; }
        .flow-connector .line.active { background: var(--primary-color); height: 100%; }

        .mini-status-list {
          list-style: none;
          padding: 0; margin: 0.5rem 0 0 0;
          display: flex; gap: 0.75rem;
          font-size: 0.7rem;
          font-weight: 700;
          flex-wrap: wrap;
        }
        .mini-status-list li { color: var(--text-muted); display: flex; align-items: center; gap: 4px; }
        .mini-status-list li.done { color: var(--secondary-color); }

        .live-preview-box {
          background: white;
          border-radius: 24px;
          border: 1px solid #e2e8f0;
          padding: 1.5rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.02);
        }

        .dashboard-preview-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
          font-weight: 800;
          color: var(--text-main);
        }

        .dashboard-mini-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }

        .mini-card {
          background: #f8fafc;
          padding: 0.85rem;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
        }
        .mini-card .label { font-size: 0.7rem; color: var(--text-muted); }
        .mini-card .value { font-size: 1.15rem; font-weight: 800; color: var(--primary-color); }

        .mini-chat-preview {
          background: #f1f5f9;
          border-radius: 16px;
          padding: 1rem;
        }
        .chat-header-mini { font-size: 0.75rem; font-weight: 800; color: var(--text-muted); margin-bottom: 0.75rem; }
        .empty-chat { text-align: center; color: var(--text-muted); font-size: 0.8rem; padding: 1rem; border: 1px dashed #cbd5e1; border-radius: 10px; }
        
        .message-preview .msg {
          background: white;
          padding: 0.75rem;
          border-radius: 12px;
          font-size: 0.85rem;
          font-weight: 600;
          border-right: 4px solid var(--primary-color);
        }

        .n8n-toast {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          background: white;
          border-right: 8px solid var(--primary-color);
          padding: 1.5rem 2rem;
          border-radius: 20px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.1);
          z-index: 2000;
          animation: slide-in 0.5s ease-out;
        }

        @keyframes slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @media (max-width: 1024px) {
          .demo-split-layout { grid-template-columns: 1fr; height: auto; }
          .demo-interactive-pane { height: 600px; border-left: none; border-bottom: 2px solid #edf2f7; }
        }
      `}</style>
    </div>
  )
}
