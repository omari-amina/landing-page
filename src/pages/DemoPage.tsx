import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { WaslaLogo } from '../components/WaslaLogo'
import { InstagramIcon, FacebookIcon, WhatsAppIcon } from '../components/SocialIcons'
import {
  Send,
  LayoutDashboard, Inbox, Users, Zap, Settings, Search, ChevronRight,
  Bell, MoreVertical, Phone, UserPlus, FileText,
  TrendingUp, MessageSquare, Clock, Filter, CheckCircle
} from 'lucide-react'

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
  const [contacts, setContacts] = useState<Contact[]>([
    { id: 1, name: 'سارة أحمد', platform: 'instagram', status: 'completed', lastMessage: 'تم تأكيد الحجز، شكراً!', timeAgo: 'منذ ساعتين', avatar: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=150&h=150&auto=format&fit=crop', phone: '+213 555 12 34 56', tags: ['زبونة دائمة', 'دورة الخياطة'] },
    { id: 2, name: 'نورة محمد', platform: 'whatsapp', status: 'processing', lastMessage: 'هل يمكن الدفع عند الاستلام؟', timeAgo: 'منذ 5 د', avatar: 'https://images.unsplash.com/photo-1563240381-5ccf7690ca08?q=80&w=150&h=150&auto=format&fit=crop', phone: '+213 661 98 76 54', tags: ['مهتمة', 'استفسار'] },
    { id: 3, name: 'ليلى كريم', platform: 'facebook', status: 'new', lastMessage: 'ممكن تفاصيل الأسعار؟', timeAgo: 'الآن', avatar: 'https://images.unsplash.com/photo-1609358913973-28b3f67f70a7?q=80&w=150&h=150&auto=format&fit=crop', phone: '+213 770 11 22 33', tags: ['جديدة'] },
  ])

  const [chatMessages, setChatMessages] = useState<Message[]>([
    { id: 1, sender: 'contact', text: 'السلام عليكم، هل الكورس مازال متاح؟', time: '10:00 AM' },
    { id: 2, sender: 'bot', text: 'وعليكم السلام يا أهلا! نعم الكورس متاح ويمكنك التسجيل الآن عبر الرابط.', time: '10:01 AM' },
    { id: 3, sender: 'me', text: 'أهلاً بكِ سارة، هل لديكِ أي استفسار حول المحتوى؟', time: '10:15 AM' },
  ])

  const [newMessage, setNewMessage] = useState('')
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const msg: Message = {
      id: Date.now(),
      sender: 'me',
      text: newMessage,
      time: new Date().toLocaleTimeString('ar-DZ', { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    }
    setChatMessages([...chatMessages, msg])
    setNewMessage('')
  }

  // Set default selected contact on load
  useEffect(() => {
    if (!selectedContact && contacts.length > 0 && window.innerWidth > 768) {
      setSelectedContact(contacts[1]) // Select Noura as default on desktop
    }
  }, [])

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
          <span className="brand-name">وصلة</span>
        </div>

        <nav className="sidebar-nav">
          <button className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <LayoutDashboard size={20} />
            <span>لوحة التحكم</span>
          </button>
          <button className={`nav-item ${activeTab === 'inbox' ? 'active' : ''}`} onClick={() => setActiveTab('inbox')}>
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
              <p className="user-name">أمينة</p>
              <p className="user-plan">خطة احترافية</p>
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
                          <p>{msg.text}</p>
                          <span className="message-time">{msg.time}</span>
                        </div>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>

                  <form className="chat-input" onSubmit={handleSendMessage}>
                    <input
                      type="text"
                      placeholder="اكتبي رسالتك هنا..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button type="submit" className="send-btn"><Send size={20} /></button>
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
                <div className="metric-value">12,500 دج</div>
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

      <style>{`
        .dashboard-layout {
          display: flex;
          height: 100vh;
          background-color: #f1f5f9;
          font-family: 'Tajawal', sans-serif;
          direction: rtl;
        }

        /* Sidebar */
        .sidebar {
          width: 260px;
          background: white;
          border-left: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          padding: 1.5rem 1rem;
          z-index: 100;
        }
        .sidebar-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 2.5rem;
          padding: 0 0.5rem;
        }
        .brand-name {
          font-size: 1.5rem;
          font-weight: 900;
          color: #be185d;
        }
        .sidebar-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .nav-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          color: #64748b;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          font-weight: 600;
          text-align: right;
        }
        .nav-item-content {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .nav-item span { flex: 1; }
        .nav-item:hover { background: #f8fafc; color: #be185d; }
        .nav-item.active { background: #fee2e2; color: #be185d; }
        .nav-item .badge {
          background: #be185d;
          color: white;
          padding: 2px 6px;
          border-radius: 6px;
          font-size: 0.7rem;
        }

        .sidebar-footer {
          margin-top: auto;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid #f1f5f9;
        }
        .user-profile {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem;
        }
        .user-profile img {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .user-name { font-weight: 700; color: #1e293b; margin: 0; font-size: 0.9rem; }
        .user-plan { font-size: 0.75rem; color: #94a3b8; margin: 0; }

        /* Main Content */
        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .topbar {
          height: 70px;
          background: white;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
        }
        .search-bar {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          display: flex;
          align-items: center;
          padding: 0 1rem;
          width: 350px;
        }
        .search-icon { color: #94a3b8; }
        .search-bar input {
          background: transparent;
          border: none;
          padding: 0.6rem 0.75rem;
          flex: 1;
          font-family: inherit;
          font-size: 0.9rem;
        }
        .topbar-actions { display: flex; align-items: center; gap: 1rem; }
        .icon-btn {
          background: transparent;
          border: none;
          color: #64748b;
          cursor: pointer;
          position: relative;
          padding: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          transition: background 0.2s;
        }
        .icon-btn:hover { background: #f1f5f9; }
        .icon-btn .dot {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 8px;
          height: 8px;
          background: #ef4444;
          border: 2px solid white;
          border-radius: 50%;
        }
        .divider { width: 1px; height: 24px; background: #e2e8f0; }

        /* Inbox View */
        .inbox-container {
          display: flex;
          flex: 1;
          overflow: hidden;
        }
        .conversations-sidebar {
          width: 320px;
          background: white;
          border-left: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
        }
        .sidebar-tools {
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #f1f5f9;
        }
        .sidebar-tools h3 { font-size: 1.1rem; font-weight: 800; }
        .conv-list { flex: 1; overflow-y: auto; }
        .conv-item {
          display: flex;
          gap: 1rem;
          padding: 1.25rem 1.5rem;
          cursor: pointer;
          border-bottom: 1px solid #f8fafc;
          transition: all 0.2s;
        }
        .conv-item:hover { background: #fdf2f8; }
        .conv-item.active { background: #fff1f2; border-right: 3px solid #be185d; }
        .avatar-wrapper { position: relative; }
        .avatar-img { width: 48px; height: 48px; border-radius: 14px; object-fit: cover; }
        .platform-icon {
          position: absolute;
          bottom: -2px;
          left: -2px;
          background: white;
          border-radius: 50%;
          padding: 3px;
          display: flex;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .conv-content { flex:1; overflow: hidden; }
        .conv-header { display: flex; justify-content: space-between; margin-bottom: 0.25rem; }
        .conv-name { font-weight: 700; font-size: 0.95rem; color: #1e293b; }
        .conv-time { font-size: 0.7rem; color: #94a3b8; }
        .conv-last-msg {
          font-size: 0.85rem;
          color: #64748b;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Chat Area */
        .chat-area {
          flex: 1;
          background: #f8fafc;
          display: flex;
          flex-direction: column;
        }
        .chat-header {
          background: white;
          padding: 0.75rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #e2e8f0;
        }
        .contact-summary { display: flex; align-items: center; gap: 1rem; }
        .contact-summary img { width: 40px; height: 40px; border-radius: 12px; }
        .contact-summary h4 { margin: 0; font-size: 1rem; }
        .status-indicator { font-size: 0.75rem; display: flex; align-items: center; gap: 0.4rem; }
        .status-indicator.online { color: #10b981; }
        .status-indicator.online::before { content: ''; width: 8px; height: 8px; background: #10b981; border-radius: 50%; }
        .chat-actions { display: flex; gap: 0.5rem; }

        .chat-messages {
          flex: 1;
          padding: 2rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .date-divider {
          text-align: center;
          position: relative;
          margin: 1rem 0;
        }
        .date-divider::before {
          content: ''; position: absolute; top: 50%; left: 0; right: 0; height: 1px; background: #e2e8f0; z-index: 1;
        }
        .date-divider span {
          position: relative; z-index: 2; background: #f8fafc; padding: 0 1rem; font-size: 0.8rem; color: #94a3b8;
        }
        .message-bubble-wrapper { display: flex; flex-direction: column; max-width: 70%; }
        .message-bubble-wrapper.contact { align-self: flex-start; }
        .message-bubble-wrapper.me { align-self: flex-end; }
        .message-bubble-wrapper.bot { align-self: center; max-width: 80%; }
        
        .message-bubble {
          padding: 0.85rem 1.25rem;
          border-radius: 18px;
          font-size: 0.95rem;
          line-height: 1.5;
          position: relative;
        }
        .contact .message-bubble { background: white; color: #1e293b; border-bottom-right-radius: 4px; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
        .me .message-bubble { background: #be185d; color: white; border-bottom-left-radius: 4px; }
        .bot .message-bubble { background: #f1f5f9; color: #475569; border: 1px dashed #cbd5e1; font-style: italic; text-align: center; }
        
        .message-time { font-size: 0.65rem; margin-top: 0.4rem; display: block; opacity: 0.7; }
        .me .message-time { text-align: left; }

        .chat-input {
          padding: 1.5rem;
          background: white;
          border-top: 1px solid #e2e8f0;
          display: flex;
          gap: 1rem;
        }
        .chat-input input {
          flex: 1;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 0.8rem 1.25rem;
          font-family: inherit;
        }
        .send-btn {
          background: #be185d;
          color: white;
          border: none;
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .send-btn:hover { transform: scale(1.05); }

        /* Details Panel */
        .details-panel {
          width: 300px;
          background: white;
          border-right: 1px solid #e2e8f0;
          padding: 2rem 1.5rem;
          overflow-y: auto;
        }
        .profile-card { text-align: center; margin-bottom: 2rem; }
        .profile-card img { width: 100px; height: 100px; border-radius: 20px; object-fit: cover; margin-bottom: 1rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
        .profile-card h3 { margin-bottom: 0.25rem; font-size: 1.2rem; }
        .profile-card p { color: #94a3b8; font-size: 0.85rem; margin-bottom: 1.25rem; }

        .details-section { margin-bottom: 1.5rem; }
        .section-label { font-size: 0.75rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem; }
        .status-select {
          width: 100%;
          padding: 0.6rem;
          border-radius: 8px;
          border: 2px solid transparent;
          font-family: inherit;
          font-weight: 700;
          font-size: 0.85rem;
        }
        .status-select.new { background: #eff6ff; color: #2563eb; }
        .status-select.processing { background: #fff7ed; color: #ea580c; }
        .status-select.order { background: #ecfdf5; color: #059669; }
        .status-select.completed { background: #f8fafc; color: #64748b; }

        .tags-container { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .tag { background: #f1f5f9; color: #475569; padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 600; }
        .add-tag { background: transparent; border: 1px dashed #cbd5e1; color: #94a3b8; padding: 2px 10px; border-radius: 6px; cursor: pointer; font-size: 0.8rem; }

        .details-section textarea {
          width: 100%;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 0.75rem;
          font-family: inherit;
          font-size: 0.85rem;
          min-height: 100px;
          resize: vertical;
        }

        /* Dashboard Home */
        .dashboard-home { padding: 2.5rem; overflow-y: auto; }
        .dashboard-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-bottom: 2.5rem; }
        .metric-card { background: white; padding: 1.5rem; border-radius: 16px; border: 1px solid #e2e8f0; }
        .metric-header { display: flex; justify-content: space-between; align-items: center; color: #64748b; font-size: 0.9rem; margin-bottom: 1rem; }
        .metric-value { font-size: 2rem; font-weight: 900; color: #1e293b; margin-bottom: 0.5rem; }
        .metric-change { font-size: 0.75rem; font-weight: 600; color: #94a3b8; }
        .metric-change.positive { color: #10b981; }
        
        .activity-section { background: white; padding: 2rem; border-radius: 20px; border: 1px solid #e2e8f0; }
        .activity-section { background: white; padding: 2rem; border-radius: 20px; border: 1px solid #e2e8f0; margin-bottom: 1.5rem; }
        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .section-header h3 { margin: 0; }
        .chart-placeholder { height: 200px; display: flex; align-items: flex-end; gap: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid #f1f5f9; }
        .bar { flex: 1; background: #fee2e2; border-radius: 8px 8px 0 0; position: relative; transition: all 0.3s; cursor: pointer; }
        .bar:hover { background: #be185d; }
        .bar-h40 { height: 40%; }
        .bar-h60 { height: 60%; }
        .bar-h80 { height: 80%; }
        .bar-h50 { height: 50%; }
        .bar-h90 { height: 90%; }
        .bar-h70 { height: 70%; }
        .bar-h85 { height: 85%; }
        .chart-labels { display: flex; justify-content: space-between; margin-top: 1rem; color: #94a3b8; font-size: 0.8rem; }

        .recent-activity { background: white; padding: 2rem; border-radius: 20px; border: 1px solid #e2e8f0; }
        .activity-list { display: flex; flex-direction: column; gap: 1rem; margin-top: 1.5rem; }
        .activity-item { display: flex; align-items: center; gap: 1.25rem; padding-bottom: 1rem; border-bottom: 1px solid #f8fafc; }
        .activity-item:last-child { border-bottom: none; padding-bottom: 0; }
        .activity-icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
        .activity-icon.success { background: #ecfdf5; color: #10b981; }
        .activity-icon.info { background: #eff6ff; color: #3b82f6; }
        .activity-info { flex: 1; }
        .activity-title { font-weight: 700; font-size: 0.95rem; margin: 0; }
        .activity-time { font-size: 0.8rem; color: #94a3b8; margin: 0; }
        .activity-amount { font-weight: 800; color: #1e293b; }
        .activity-status { font-size: 0.75rem; background: #f1f5f9; color: #64748b; padding: 2px 8px; border-radius: 6px; }

        .no-selection { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #94a3b8; gap: 1.5rem; }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }

        /* Media Queries & Mobile Responsiveness */
        @media (max-width: 1024px) {
          .details-panel { display: none; }
        }

        @media (max-width: 768px) {
          .dashboard-layout {
            flex-direction: column;
            height: 100vh;
            overflow: hidden;
            padding-bottom: 70px; /* Space for bottom nav */
          }

          .sidebar {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: 70px;
            flex-direction: row;
            padding: 0;
            border-left: none;
            border-top: 1px solid #e2e8f0;
            justify-content: space-around;
            z-index: 1001;
            background: white;
          }

          .sidebar-header, 
          .sidebar-footer .user-profile, 
          .brand-name {
            display: none;
          }

          .sidebar-nav {
            flex-direction: row;
            width: 100%;
            justify-content: space-around;
            gap: 0;
          }

          .nav-item {
            flex-direction: column !important;
            padding: 0.5rem !important;
            font-size: 0.7rem !important;
            gap: 2px !important;
            flex: 1;
            border-radius: 0;
            align-items: center !important;
          }

          .nav-item.active {
            background: transparent !important;
            color: #be185d !important;
          }

          .nav-item-content {
            flex-direction: column;
            gap: 2px;
          }

          .sidebar-footer {
            display: none !important; 
          }

          .main-content {
            height: calc(100vh - 70px);
          }

          .topbar {
            padding: 0 1rem;
            height: 60px;
          }

          .search-bar {
            width: 100%;
          }

          /* Inbox Mobile State */
          .inbox-container {
            display: block;
            position: relative;
          }

          .conversations-sidebar {
            width: 100% !important;
            height: 100%;
          }

          .conversations-sidebar.hidden-mobile {
            display: none;
          }

          .chat-area {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 70px; /* Above bottom nav */
            z-index: 1010;
            display: none;
            background: #f8fafc;
          }

          .mobile-chat-open .chat-area {
            display: flex;
          }

          .back-btn-mobile {
            display: flex !important;
            align-items: center;
            justify-content: center;
            padding: 0.5rem;
            margin-left: 0.5rem;
            color: #be185d;
            background: transparent;
            border: none;
          }

          .chat-header-left {
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .chat-messages {
            padding: 1rem;
          }

          .message-bubble-wrapper {
            max-width: 85%;
          }

          .dashboard-home {
            padding: 1rem;
          }

          .dashboard-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .metric-value {
            font-size: 1.5rem;
          }

          .activity-section {
            padding: 1rem;
          }

          .chart-placeholder {
            gap: 0.5rem;
            height: 150px;
          }

          .chart-labels span {
            font-size: 0.6rem;
          }
        }

        /* Utility for back button */
        .back-btn-mobile {
          display: none;
        }

        .chat-header-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
      `}</style>
    </div>
  )
}
