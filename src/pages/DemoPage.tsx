import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { WaslaLogo } from '../components/WaslaLogo'
import { InstagramIcon, FacebookIcon, WhatsAppIcon } from '../components/SocialIcons'

import {
  Send, LayoutDashboard, Inbox, Users, Zap, Settings, Search, ChevronRight,
  Bell, MoreVertical, Phone, UserPlus, FileText, TrendingUp, MessageSquare,
  Clock, Filter, CheckCircle, Sparkles, Brain, Lightbulb, Link as LinkIcon
} from 'lucide-react'
import { DemoTour, TourStep } from '../components/DemoTour'
import { TypebotModal } from '../components/TypebotModal'

const CHATWOOT_API_TOKEN = 'qhp2k4eENktdWiBDYd87i2S7'
const CHATWOOT_ACCOUNT_ID = '1'
const CHATWOOT_BASE_URL = 'https://chatwoot.panel.nawaedutech.com'

// Types for our Dashboard
interface Contact {
  id: number
  name: string
  platform: 'instagram' | 'facebook' | 'whatsapp'
  status: 'new' | 'processing' | 'order' | 'completed'
  lastMessage: string
  timeAgo: string
  avatar: string
  phone?: string
  tags: string[]
}

interface Message {
  id: number
  sender: 'contact' | 'me' | 'bot'
  text: string
  time: string
  status?: 'sent' | 'delivered' | 'read'
}

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState('inbox')
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false)
  const [contacts, setContacts] = useState<Contact[]>([])

  const [chatMessages, setChatMessages] = useState<Message[]>([])

  const [newMessage, setNewMessage] = useState('')
  const [isTourOpen, setIsTourOpen] = useState(true)
  const [isTypebotOpen, setIsTypebotOpen] = useState(false)
  const [showN8nToast, setShowN8nToast] = useState(false)
  const [salesCount, setSalesCount] = useState(12500)

  const chatEndRef = useRef<HTMLDivElement>(null)

  const simulateAIReply = async () => {
    if (!selectedContact) return;

    // Scenario Step 2: Auto-reply with Pricing + CTA
    const text = "أهلاً سارة! 👋 برنامج CostCrafter Pro متوفر بـ 3000 دج فقط (ترخيص مدى الحياة). ⚡ اطلبي نسختك فوراً من هنا: 👇";

    // Send Real Message to Chatwoot
    await sendChatwootMessage(selectedContact.id, text);

    // Also send the CTA link as a separate message
    setTimeout(async () => {
      await sendChatwootMessage(selectedContact.id, '✨ رابط طلب النسخة');
      fetchMessages(selectedContact.id);
    }, 1000);

    setNewMessage('');
    fetchMessages(selectedContact.id);
  }

  const fetchConversations = async () => {
    try {
      const response = await fetch(`${CHATWOOT_BASE_URL}/api/v1/accounts/${CHATWOOT_ACCOUNT_ID}/conversations`, {
        headers: {
          'api_access_token': CHATWOOT_API_TOKEN,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();

      const mappedContacts: Contact[] = data.payload.map((conv: any) => ({
        id: conv.id,
        name: conv.meta.sender.name || 'عميل مجهول',
        platform: conv.meta.channel.split('::')[1]?.toLowerCase().includes('instagram') ? 'instagram' :
          conv.meta.channel.split('::')[1]?.toLowerCase().includes('whatsapp') ? 'whatsapp' : 'facebook',
        status: conv.status === 'open' ? 'new' : 'completed',
        lastMessage: conv.messages?.[0]?.content || '',
        timeAgo: new Date(conv.timestamp * 1000).toLocaleTimeString('ar-DZ', { hour: '2-digit', minute: '2-digit' }),
        avatar: conv.meta.sender.thumbnail || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&h=150&auto=format&fit=crop',
        tags: conv.labels || []
      }));

      setContacts(mappedContacts);
      if (!selectedContact && mappedContacts.length > 0) {
        setSelectedContact(mappedContacts[0]);
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  }

  const fetchMessages = async (conversationId: number) => {
    try {
      const response = await fetch(`${CHATWOOT_BASE_URL}/api/v1/accounts/${CHATWOOT_ACCOUNT_ID}/conversations/${conversationId}/messages`, {
        headers: {
          'api_access_token': CHATWOOT_API_TOKEN,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();

      const mappedMessages: Message[] = data.payload.map((msg: any) => ({
        id: msg.id,
        sender: msg.message_type === 0 ? 'contact' : 'me',
        text: msg.content || '',
        time: new Date(msg.created_at).toLocaleTimeString('ar-DZ', { hour: '2-digit', minute: '2-digit' }),
        status: 'read'
      }));

      setChatMessages(mappedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }

  const sendChatwootMessage = async (conversationId: number, content: string) => {
    try {
      await fetch(`${CHATWOOT_BASE_URL}/api/v1/accounts/${CHATWOOT_ACCOUNT_ID}/conversations/${conversationId}/messages`, {
        method: 'POST',
        headers: {
          'api_access_token': CHATWOOT_API_TOKEN,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content, message_type: 'outgoing' })
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  const tourSteps: TourStep[] = [
    {
      target: '.sidebar',
      title: 'أهلاً بك في NawaEduTech',
      content: 'منصتك المتكاملة لإدارة مبيعات CostCrafter Pro.',
      position: 'left'
    },
    {
      target: '#inbox-tab',
      title: 'الـ Inbox الموحد 📥',
      content: 'كل رسائل انستجرام "بشحال؟" تصل هنا فوراً.',
      position: 'left'
    },
    {
      target: '#contact-item-1',
      title: 'رسالة جديدة من سارة',
      content: 'انظري! سارة تسأل عن السعر. لنرد عليها آلياً.',
      position: 'left',
      action: () => handleContactSelect(contacts[0])
    },
    {
      target: '#smart-reply-btn',
      title: 'الرد الذكي (Auto-Reply)',
      content: 'اضغطي الزر السحري لإرسال تفاصيل السعر ورابط الشراء في ثانية!',
      position: 'top'
    }
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedContact) return

    await sendChatwootMessage(selectedContact.id, newMessage)
    setNewMessage('')
    fetchMessages(selectedContact.id)
  }



  const handleTypebotComplete = () => {
    // Scenario Step 4: n8n + Sheets Simulation
    setShowN8nToast(true);
    setTimeout(() => setShowN8nToast(false), 5000);

    // Update Dashboard
    setSalesCount(prev => prev + 3000);
  }

  // Fetch conversations on load
  useEffect(() => {
    fetchConversations();
    const interval = setInterval(fetchConversations, 10000); // Polling every 10s
    return () => clearInterval(interval);
  }, [])

  // Fetch messages when contact changes
  useEffect(() => {
    if (selectedContact) {
      fetchMessages(selectedContact.id);
      const interval = setInterval(() => fetchMessages(selectedContact.id), 5000); // Poll messages every 5s
      return () => clearInterval(interval);
    }
  }, [selectedContact])

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact)
    if (window.innerWidth <= 768) {
      setIsMobileChatOpen(true)
    }
  }

  return (
    <div className={`dashboard-layout ${isMobileChatOpen ? 'mobile-chat-open' : ''}`}>
      {/* Sidebar (Right side for RTL) */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <WaslaLogo size={40} />
          <span className="brand-name">NawaEduTech</span>
        </div>

        <nav className="sidebar-nav">
          <button className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <LayoutDashboard size={20} />
            <span>لوحة التحكم</span>
          </button>
          <button id="inbox-tab" className={`nav-item ${activeTab === 'inbox' ? 'active' : ''}`} onClick={() => setActiveTab('inbox')}>
            <div className="nav-item-content">
              <Inbox size={20} />
              <span>صندوق الوارد</span>
            </div>
            <span className="badge">3</span>
          </button>
          <button className={`nav-item ${activeTab === 'contacts' ? 'active' : ''}`} onClick={() => setActiveTab('contacts')}>
            <Users size={20} />
            <span>قاعدة الزبائن</span>
          </button>
          <button className={`nav-item ${activeTab === 'automations' ? 'active' : ''}`} onClick={() => setActiveTab('automations')}>
            <Zap size={20} />
            <span>الأتمتة</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item" onClick={() => setActiveTab('settings')}>
            <Settings size={20} />
            <span>الإعدادات</span>
          </button>
          <div className="user-profile">
            <img src="https://images.unsplash.com/photo-1596704017254-9b121068fb29?q=80&w=150&h=150&auto=format&fit=crop" alt="User" />
            <div className="user-info">
              <p className="user-name">Amna (Owner)</p>
              <p className="user-plan">Pro Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Topbar */}
        <header className="topbar">
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input type="text" placeholder="بحث عن رسائل، زبائن..." />
          </div>
          <div className="topbar-actions">
            <button className="icon-btn" aria-label="التنبيهات" title="التنبيهات">
              <Bell size={20} />
              <span className="dot"></span>
            </button>
            <div className="divider"></div>
            <Link to="/" className="btn btn-outline btn-sm">خروج</Link>
          </div>
        </header>

        {activeTab === 'inbox' ? (
          <div className="inbox-container">
            {/* Conversations List */}
            <div className={`conversations-sidebar ${isMobileChatOpen ? 'hidden-mobile' : ''}`}>
              <div className="sidebar-tools">
                <h3>المحادثات</h3>
                <button className="icon-btn" aria-label="تصفية" title="تصفية"><Filter size={16} /></button>
              </div>
              <div className="conv-list">
                {contacts.map(contact => (
                  <div
                    key={contact.id}
                    id={`contact-item-${contact.id}`}
                    className={`conv-item ${selectedContact?.id === contact.id ? 'active' : ''}`}
                    onClick={() => handleContactSelect(contact)}
                  >
                    <div className="avatar-wrapper">
                      <img src={contact.avatar} alt={contact.name} className="avatar-img" />
                      <span className={`platform-icon ${contact.platform}`}>
                        {contact.platform === 'whatsapp' && <WhatsAppIcon size={12} />}
                        {contact.platform === 'instagram' && <InstagramIcon size={12} />}
                        {contact.platform === 'facebook' && <FacebookIcon size={12} />}
                      </span>
                    </div>
                    <div className="conv-content">
                      <div className="conv-header">
                        <span className="conv-name">{contact.name}</span>
                        <span className="conv-time">{contact.timeAgo}</span>
                      </div>
                      <p className="conv-last-msg">{contact.lastMessage}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="chat-area">
              {selectedContact ? (
                <>
                  <div className="chat-header">
                    <div className="chat-header-left">
                      <button
                        className="back-btn-mobile"
                        onClick={() => setIsMobileChatOpen(false)}
                        aria-label="الرجوع"
                      >
                        <ChevronRight size={24} />
                      </button>
                      <div className="contact-summary">
                        <img src={selectedContact.avatar} alt={selectedContact.name} />
                        <div>
                          <h4>{selectedContact.name}</h4>
                          <span className="status-indicator online">متصل الآن</span>
                        </div>
                      </div>
                    </div>
                    <div className="chat-actions">
                      <button className="icon-btn" aria-label="اتصال هاتفي" title="اتصال هاتفي"><Phone size={18} /></button>
                      <button className="icon-btn" aria-label="خيارات إضافية" title="خيارات إضافية"><MoreVertical size={18} /></button>
                    </div>
                  </div>

                  <div className="chat-messages">
                    <div className="date-divider"><span>اليوم</span></div>
                    {chatMessages.map(msg => (
                      <div key={msg.id} className={`message-bubble-wrapper ${msg.sender}`}>
                        <div className="message-bubble">
                          {msg.text === '✨ رابط طلب النسخة' ? (
                            <button
                              className="cta-link-btn"
                              onClick={() => setIsTypebotOpen(true)}
                            >
                              <LinkIcon size={16} /> اطلبي نسختك الآن
                            </button>
                          ) : (
                            <p>{msg.text}</p>
                          )}
                          <span className="message-time">{msg.time}</span>
                        </div>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>

                  <form className="chat-input" onSubmit={handleSendMessage}>
                    <button
                      type="button"
                      id="smart-reply-btn"
                      className="smart-reply-btn"
                      onClick={simulateAIReply}
                      title="توليد رد بالذكاء الاصطناعي"
                    >
                      <Sparkles size={18} />
                    </button>
                    <input
                      type="text"
                      placeholder="اكتبي رسالتك هنا..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button type="submit" className="send-btn" title="إرسال الرسالة"><Send size={20} /></button>
                  </form>
                </>
              ) : (
                <div className="no-selection">
                  <MessageSquare size={48} />
                  <p>اختاري محادثة للبدء والرد على زبائنك</p>
                </div>
              )}
            </div>

            {/* Contact Details Panel */}
            <div className="details-panel">
              {selectedContact && (
                <div className="details-content">

                  {/* AI Insight Card */}
                  <div id="ai-insight-box" className="ai-insight-card">
                    <div className="ai-header">
                      <Brain size={16} />
                      <span>تحليل الذكاء الاصطناعي</span>
                    </div>
                    <div className="ai-body">
                      <div className="win-probability">
                        <span>احتمالية الشراء</span>
                        <span className="prob-value high">85%</span>
                      </div>
                      <div className="prob-bar"><div className="prob-fill win-prob-85"></div></div>
                      <p className="ai-suggestion">
                        <Lightbulb size={12} className="inline ml-1" />
                        الزبونة مهتمة بالسعر والتوصيل. <strong>نصيحة:</strong> قدمي عرض التوصيل المجاني لإغلاق الصفقة الآن.
                      </p>
                    </div>
                  </div>

                  <div className="profile-card">
                    <img src={selectedContact.avatar} alt={selectedContact.name} />
                    <h3>{selectedContact.name}</h3>
                    <p>{selectedContact.phone}</p>
                    <div className="quick-actions">
                      <button className="btn btn-secondary btn-sm"><UserPlus size={14} /> إضافة لـ CRM</button>
                    </div>
                  </div>

                  <div className="details-section">
                    <div className="section-label"><Clock size={14} /> حالة الطلب</div>
                    <select
                      className={`status-select ${selectedContact.status}`}
                      value={selectedContact.status}
                      aria-label="حالة الطلب"
                      title="تغيير حالة الطلب"
                      onChange={(e) => {
                        const newStatus = e.target.value as any;
                        setSelectedContact({ ...selectedContact, status: newStatus });
                        setContacts(contacts.map(c => c.id === selectedContact.id ? { ...c, status: newStatus } : c));
                      }}
                    >
                      <option value="new">عميل جديد</option>
                      <option value="processing">قيد المعالجة</option>
                      <option value="order">تم تقديم طلب</option>
                      <option value="completed">طلب مكتمل</option>
                    </select>
                  </div>

                  <div className="details-section">
                    <div className="section-label"><Filter size={14} /> التصنيفات (Tags)</div>
                    <div className="tags-container">
                      {selectedContact.tags.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                      <button className="add-tag">+ إضافة</button>
                    </div>
                  </div>

                  <div className="details-section">
                    <div className="section-label"><FileText size={14} /> ملاحظات</div>
                    <textarea placeholder="أضيفي ملاحظات عن الزبونة هنا..." defaultValue="مهتمة جداً بدورة الخياطة للمبتدئين. سألت عن موعد الدفعة القادمة." />
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="dashboard-home">
            <div className="dashboard-grid">
              <div className="metric-card">
                <div className="metric-header">
                  <TrendingUp size={20} className="text-success" />
                  <span>المبيعات اليوم</span>
                </div>
                <div className="metric-value">{salesCount.toLocaleString()} دج</div>
                <div className="metric-change positive">+25% مقارنة بأمس</div>
              </div>
              <div className="metric-card">
                <div className="metric-header">
                  <MessageSquare size={20} className="text-primary" />
                  <span>معدل الرد الآلي</span>
                </div>
                <div className="metric-value">94%</div>
                <div className="metric-change positive">تم توفير 4 ساعات عمل اليوم</div>
              </div>
              <div className="metric-card">
                <div className="metric-header">
                  <Users size={20} className="text-secondary" />
                  <span>الزبائن النشطون</span>
                </div>
                <div className="metric-value">1,240</div>
                <div className="metric-change">+12 زبون جديد في الـ 24 ساعة الماضية</div>
              </div>
            </div>

            {/* Recent Activity chart placeholder */}
            <div className="activity-section">
              <div className="section-header">
                <h3>نشاط المبيعات الأسبوعي</h3>
                <button className="btn btn-sm btn-outline" title="تحميل التقرير">تحميل التقرير</button>
              </div>
              <div className="chart-placeholder">
                <div className="bar bar-h40" title="السبت: 15 طلب"></div>
                <div className="bar bar-h60" title="الأحد: 22 طلب"></div>
                <div className="bar bar-h80" title="الاثنين: 34 طلب"></div>
                <div className="bar bar-h50" title="الثلاثاء: 18 طلب"></div>
                <div className="bar bar-h90" title="الأربعاء: 45 طلب"></div>
                <div className="bar bar-h70" title="الخميس: 28 طلب"></div>
                <div className="bar bar-h85" title="الجمعة: 40 طلب"></div>
              </div>
              <div className="chart-labels">
                <span>السبت</span><span>الأحد</span><span>الاثنين</span><span>الثلاثاء</span><span>الأربعاء</span><span>الخميس</span><span>الجمعة</span>
              </div>
            </div>

            <div className="recent-activity">
              <h3>آخر العمليات</h3>
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-icon success"><CheckCircle size={16} /></div>
                  <div className="activity-info">
                    <p className="activity-title">تم تأكيد طلب جديد - سارة أحمد</p>
                    <p className="activity-time">منذ 5 دقائق عبر Instagram</p>
                  </div>
                  <div className="activity-amount">4,500 دج</div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon info"><Zap size={16} /></div>
                  <div className="activity-info">
                    <p className="activity-title">رد تلقائي ذكي على استفسار - نورة محمد</p>
                    <p className="activity-time">منذ 12 دقيقة عبر WhatsApp</p>
                  </div>
                  <div className="activity-status">مؤتمت</div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon success"><CheckCircle size={16} /></div>
                  <div className="activity-info">
                    <p className="activity-title">تم تقديم طلب - ليلى كريم</p>
                    <p className="activity-time">منذ ساعة عبر Facebook</p>
                  </div>
                  <div className="activity-amount">2,800 دج</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <DemoTour
        steps={tourSteps}
        isOpen={isTourOpen}
        onComplete={() => setIsTourOpen(false)}
        onSkip={() => setIsTourOpen(false)}
      />

      <TypebotModal
        isOpen={isTypebotOpen}
        onClose={() => setIsTypebotOpen(false)}
        onComplete={handleTypebotComplete}
      />

      {/* n8n Toast Notification */}
      {showN8nToast && (
        <div className="n8n-toast">
          <div className="toast-content">
            <div className="n8n-icon">⚡</div>
            <div>
              <h4>Automation Success</h4>
              <p>Data sent to Google Sheets & Notification Sent!</p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap');

        :root {
          --primary-color: #310b82;
          --secondary-color: #eeb32a;
          --accent-purple: #4c1db0;
          --bg-light: #fefeff;
          --text-main: #1e1b4b;
          --text-muted: #64748b;
          --glass-bg: rgba(255, 255, 255, 0.75);
          --glass-border: rgba(255, 255, 255, 0.5);
          --sidebar-width: 280px;
        }

        .dashboard-layout {
          display: flex;
          height: 100vh;
          background-color: var(--bg-light);
          background-image: 
            radial-gradient(at 0% 0%, rgba(49, 11, 130, 0.05) 0px, transparent 50%),
            radial-gradient(at 100% 0%, rgba(238, 179, 42, 0.05) 0px, transparent 50%);
          font-family: 'Cairo', 'Tajawal', sans-serif;
          direction: rtl;
        }

        /* Sidebar - Premium Dark Mode */
        .sidebar {
          width: var(--sidebar-width);
          background: linear-gradient(180deg, #150636 0%, #310b82 100%);
          display: flex;
          flex-direction: column;
          padding: 2rem 1.25rem;
          z-index: 100;
          color: white;
          box-shadow: -10px 0 30px rgba(0,0,0,0.15);
          border-left: none;
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 3.5rem;
          padding: 0 0.5rem;
        }

        .brand-name {
          font-size: 1.6rem;
          font-weight: 950;
          color: white;
          letter-spacing: -0.5px;
          text-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }

        .sidebar-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .nav-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.9rem 1.25rem;
          border-radius: 16px;
          color: rgba(255, 255, 255, 0.65);
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          font-weight: 700;
          text-align: right;
        }

        .nav-item:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          transform: translateX(-5px);
        }

        .nav-item.active {
          background: linear-gradient(90deg, #eeb32a 0%, #fde047 100%);
          color: #310b82;
          box-shadow: 0 8px 20px rgba(238, 179, 42, 0.35);
        }

        .nav-item .badge {
          background: #ef4444;
          color: white;
          padding: 2px 10px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 800;
          box-shadow: 0 2px 8px rgba(239, 68, 68, 0.5);
        }

        .sidebar-footer {
          margin-top: auto;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.85rem;
          background: rgba(0, 0, 0, 0.25);
          border-radius: 18px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .user-profile img {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          border: 2px solid var(--secondary-color);
          object-fit: cover;
        }

        .user-name { font-weight: 700; color: white; margin: 0; font-size: 1rem; }
        .user-plan { font-size: 0.75rem; color: rgba(255, 255, 255, 0.4); margin: 0; }

        /* Main Content */
        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          position: relative;
        }

        .topbar {
          height: 85px;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          border-bottom: 1px solid var(--glass-border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 3rem;
          z-index: 50;
        }

        .search-bar {
          background: white;
          border: 1px solid #eef2f6;
          border-radius: 18px;
          display: flex;
          align-items: center;
          padding: 0 1.25rem;
          width: 420px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.03);
          transition: all 0.3s;
        }
        .search-bar:focus-within { border-color: var(--primary-color); box-shadow: 0 4px 20px rgba(49, 11, 130, 0.08); }

        .search-bar input {
          background: transparent;
          border: none;
          padding: 0.8rem 1rem;
          flex: 1;
          font-family: inherit;
          font-size: 0.95rem;
          font-weight: 500;
        }
        .search-bar input:focus { outline: none; }

        /* Metrics Grid */
        .dashboard-home { padding: 3rem; overflow-y: auto; height: 100%; }
        .dashboard-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-bottom: 3rem; }
        
        .metric-card {
          background: white;
          padding: 2rem;
          border-radius: 28px;
          border: 1px solid #f1f5f9;
          box-shadow: 0 10px 30px rgba(0,0,0,0.03);
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
        }

        .metric-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0,0,0,0.06); }
        .metric-card::after {
          content: ''; position: absolute; top: 0; left: 0; width: 6px; height: 100%; background: var(--secondary-color);
        }

        .metric-header { display: flex; justify-content: space-between; align-items: center; color: var(--text-muted); font-size: 1rem; margin-bottom: 1.5rem; font-weight: 800; }
        .metric-value { font-size: 2.8rem; font-weight: 950; color: var(--primary-color); margin-bottom: 0.75rem; letter-spacing: -1.5px; }
        .metric-change { font-size: 0.9rem; font-weight: 700; display: flex; align-items: center; gap: 6px; }
        .metric-change.positive { color: #10b981; }

        /* Charts & Activity */
        .activity-section {
          background: white;
          padding: 2.5rem;
          border-radius: 30px;
          border: 1px solid #f1f5f9;
          margin-bottom: 2.5rem;
          box-shadow: 0 12px 40px rgba(0,0,0,0.04);
        }

        .section-header { margin-bottom: 2.5rem; }
        .section-header h3 { font-size: 1.5rem; font-weight: 950; color: var(--primary-color); }

        .chart-placeholder {
          height: 280px;
          display: flex;
          align-items: flex-end;
          gap: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 2px solid #f8fafc;
        }

        .bar {
          flex: 1;
          background: linear-gradient(180deg, #e9d5ff 0%, #c084fc 100%);
          border-radius: 14px 14px 4px 4px;
          position: relative;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: pointer;
        }

        .bar:hover {
          background: linear-gradient(180deg, #fde047 0%, #eeb32a 100%);
          transform: scaleX(1.15) translateY(-5px);
        }

        /* Inbox View Box Style */
        .inbox-container { 
          display: flex; 
          flex: 1; 
          overflow: hidden; 
          background: white; 
          margin: 2rem; 
          border-radius: 35px; 
          box-shadow: 0 20px 60px rgba(0,0,0,0.08);
          border: 1px solid #f1f5f9;
        }
        
        .conversations-sidebar {
          width: 360px;
          background: #fbfbfc;
          border-left: 1px solid #f1f5f9;
          display: flex;
          flex-direction: column;
        }

        .sidebar-tools { padding: 2.5rem 2rem; border-bottom: 1px solid #f1f5f9; }
        .sidebar-tools h3 { font-size: 1.4rem; font-weight: 950; color: var(--primary-color); }

        .conv-list { flex: 1; overflow-y: auto; }
        .conv-item {
          display: flex;
          gap: 1.5rem;
          padding: 1.75rem 2rem;
          cursor: pointer;
          transition: all 0.3s ease;
          border-bottom: 1px solid #f8fafc;
        }

        .conv-item:hover { background: #fdfafb; }
        .conv-item.active {
          background: #fdf6ff;
          border-right: 5px solid var(--secondary-color);
          box-shadow: inset 5px 0 10px rgba(0,0,0,0.02);
        }

        .avatar-img {
          width: 60px;
          height: 60px;
          border-radius: 20px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.08);
          object-fit: cover;
        }

        .conv-header { margin-bottom: 0.5rem; }
        .conv-name { font-weight: 900; font-size: 1.1rem; color: var(--primary-color); }
        .conv-time { font-size: 0.75rem; font-weight: 700; color: var(--text-muted); }
        .conv-last-msg { color: var(--text-muted); font-size: 0.9rem; font-weight: 500; line-height: 1.4; }

        /* Chat Area Box */
        .chat-area { background: white; flex: 1; display: flex; flex-direction: column; position: relative; }
        .chat-header {
          padding: 1.5rem 2.5rem;
          border-bottom: 1px solid #f1f5f9;
          background: rgba(255,255,255,0.8);
          backdrop-filter: blur(10px);
        }

        .chat-messages {
          background-image: 
            radial-gradient(#e5e7eb 1px, transparent 1px);
          background-size: 24px 24px;
          padding: 3rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .message-bubble {
          padding: 1.1rem 1.6rem;
          border-radius: 24px;
          font-weight: 600;
          font-size: 1rem;
          line-height: 1.5;
          box-shadow: 0 4px 15px rgba(0,0,0,0.03);
          max-width: 80%;
        }

        .contact .message-bubble { background: #f8fafc; border: 1px solid #f1f5f9; border-bottom-right-radius: 4px; color: var(--text-main); }
        .me .message-bubble { 
          background: linear-gradient(135deg, #310b82 0%, #4c1db0 100%); 
          color: white; 
          border-bottom-left-radius: 4px; 
          box-shadow: 0 6px 20px rgba(49, 11, 130, 0.2);
        }

        .chat-input {
          padding: 2.5rem;
          gap: 1.5rem;
          border-top: 1px solid #f1f5f9;
        }

        .chat-input input {
          background: #f8fafc;
          border: 2px solid #eef2f6;
          border-radius: 20px;
          padding: 1rem 1.75rem;
          font-size: 1rem;
          transition: all 0.3s;
          font-weight: 600;
        }

        .chat-input input:focus {
          background: white;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 5px rgba(49, 11, 130, 0.08);
          outline: none;
        }

        .smart-reply-btn {
          background: linear-gradient(135deg, #eeb32a 0%, #fde047 100%);
          width: 58px;
          height: 58px;
          border-radius: 20px;
          color: #310b82;
          box-shadow: 0 8px 25px rgba(238, 179, 42, 0.35);
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .smart-reply-btn:hover { transform: scale(1.1) rotate(5deg); box-shadow: 0 12px 30px rgba(238, 179, 42, 0.45); }

        .send-btn {
          background: var(--primary-color);
          width: 58px; height: 58px; border-radius: 20px;
          box-shadow: 0 8px 25px rgba(49, 11, 130, 0.25);
          transition: all 0.3s;
        }
        .send-btn:hover { transform: scale(1.05); filter: brightness(1.15); }

        /* AI Insight Premium Card */
        .ai-insight-card {
          background: linear-gradient(145deg, #1e0b4b 0%, #310b82 100%);
          color: white;
          border: none;
          padding: 1.75rem;
          border-radius: 28px;
          box-shadow: 0 15px 40px rgba(30, 11, 75, 0.4);
          margin-bottom: 2.5rem;
        }

        .ai-header { color: var(--secondary-color); font-size: 1.1rem; font-weight: 900; margin-bottom: 1.25rem; }
        .win-probability { font-weight: 800; font-size: 0.9rem; }
        .prob-bar { height: 8px; border-radius: 4px; background: rgba(255,255,255,0.1); margin: 0.75rem 0 1.25rem 0; }
        .prob-fill { background: linear-gradient(90deg, #eeb32a, #fde047); box-shadow: 0 0 15px rgba(238, 179, 42, 0.6); transition: width 1s ease-out; }
        .win-prob-85 { width: 85%; }

        .cta-link-btn {
          border-radius: 16px;
          padding: 1rem 1.75rem;
          background: var(--secondary-color);
          color: var(--primary-color);
          font-weight: 950;
          font-size: 1.05rem;
          box-shadow: 0 8px 25px rgba(238, 179, 42, 0.3);
          animation: cta-pulse 2s infinite ease-in-out;
        }
        @keyframes cta-pulse {
          0% { transform: scale(1); box-shadow: 0 8px 25px rgba(238, 179, 42, 0.3); }
          50% { transform: scale(1.03); box-shadow: 0 12px 35px rgba(238, 179, 42, 0.5); }
          100% { transform: scale(1); box-shadow: 0 8px 25px rgba(238, 179, 42, 0.3); }
        }

        /* n8n Toast Upgrade */
        .n8n-toast {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255,255,255,0.8);
          padding: 1.25rem 2rem;
          border-right: 8px solid #ff6b6b;
          border-radius: 24px;
          box-shadow: 0 15px 50px rgba(0,0,0,0.15);
        }

        /* Mobile Adjustments */
        @media (max-width: 1024px) {
          .details-panel { display: none; }
        }

        @media (max-width: 768px) {
          .dashboard-layout {
            flex-direction: column;
            height: 100vh;
            overflow: hidden;
            padding-bottom: 80px;
          }

          .sidebar {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: 80px;
            flex-direction: row;
            padding: 0 1rem;
            border-left: none;
            border-top: 1px solid rgba(255,255,255,0.1);
            justify-content: space-around;
            z-index: 1001;
            background: #150636;
            box-shadow: 0 -10px 30px rgba(0,0,0,0.2);
          }

          .sidebar-header, .sidebar-footer, .brand-name { display: none; }

          .sidebar-nav {
            flex-direction: row;
            width: 100%;
            justify-content: space-around;
            gap: 0;
          }

          .nav-item {
            flex-direction: column !important;
            padding: 0.5rem !important;
            font-size: 0.65rem !important;
            gap: 4px !important;
            flex: 1;
            border-radius: 0;
            align-items: center !important;
            justify-content: center !important;
            color: rgba(255,255,255,0.5);
          }

          .nav-item.active { background: transparent !important; color: #eeb32a !important; box-shadow: none; }
          .nav-item.active::after { content: ''; position: absolute; top: 0; width: 30px; height: 3px; background: #eeb32a; border-radius: 0 0 4px 4px; }

          .main-content { height: calc(100vh - 80px); }
          .topbar { height: 75px; padding: 0 1.5rem; }
          .search-bar { display: none; }

          .inbox-container { margin: 0; border-radius: 0; border: none; height: 100%; }
          .conversations-sidebar { width: 100% !important; }

          .chat-area {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 80px;
            z-index: 1010;
            display: none;
          }

          .mobile-chat-open .chat-area { display: flex; }

          .back-btn-mobile {
            display: flex !important;
            align-items: center; justify-content: center;
            padding: 0.5rem; margin-left: 0.5rem;
            color: var(--primary-color);
            background: transparent; border: none;
          }

          .dashboard-home { padding: 1.5rem; }
          .dashboard-grid { grid-template-columns: 1fr; gap: 1rem; }
          .metric-value { font-size: 2.2rem; }
          .activity-section { padding: 1.5rem; }
          .chart-placeholder { gap: 0.75rem; height: 180px; }
          .chart-labels span { font-size: 0.6rem; }
        }

        .back-btn-mobile { display: none; }
        .chat-header-left { display: flex; align-items: center; gap: 1rem; }
      `}</style>
    </div>
  )
}
