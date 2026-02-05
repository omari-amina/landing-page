import { useState, useEffect, useRef } from 'react';
import { X, Send, User, ChevronLeft } from 'lucide-react';

interface TypebotModalProps {
    isOpen: boolean;
    onClose: () => void;
    onComplete: () => void;
}

export function TypebotModal({ isOpen, onClose, onComplete }: TypebotModalProps) {
    const [step, setStep] = useState(0);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<{ text: string; sender: 'bot' | 'user' }[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Bot Script
    const script = [
        { text: "مرحباً بك! 👋 لطلب رخصة CostCrafter Pro، يرجى تزويدنا ببعض المعلومات.", delay: 500 },
        { text: "ما هو اسمك الكامل؟", delay: 1500 },
        { input: true, key: 'name' },
        { text: "تشارفنا! 🌹", delay: 800 },
        { text: "رقم الهاتف للتواصل وتفعيل الرخصة؟", delay: 1800 },
        { input: true, key: 'phone' },
        { text: "شكراً جزيلاً! جاري تسجيل الطلب...", delay: 800 },
        { action: 'finish', delay: 2000 }
    ];

    useEffect(() => {
        if (isOpen) {
            setStep(0);
            setMessages([]);
            setInput('');
            processStep(0);
        }
    }, [isOpen]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const processStep = (currentStepIndex: number) => {
        if (currentStepIndex >= script.length) return;

        const currentItem = script[currentStepIndex];

        if (currentItem.text) {
            setTimeout(() => {
                setMessages(prev => [...prev, { text: currentItem.text!, sender: 'bot' }]);
                // Auto proceed if no input required next
                if (!script[currentStepIndex + 1]?.input) {
                    processStep(currentStepIndex + 1);
                } else {
                    setStep(currentStepIndex + 1); // Move to input step
                }
            }, currentItem.delay);
        } else if (currentItem.action === 'finish') {
            setTimeout(() => {
                onComplete();
                onClose();
            }, currentItem.delay);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        setMessages(prev => [...prev, { text: input, sender: 'user' }]);
        const currentInput = input;
        setInput('');

        // Proceed to next bot message
        processStep(step + 1);
    };

    if (!isOpen) return null;

    return (
        <div className="typebot-overlay">
            <div className="typebot-modal">
                <div className="typebot-header">
                    <div className="bot-info">
                        <div className="bot-avatar">
                            <img src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png" alt="Bot" />
                        </div>
                        <div>
                            <h4>تحدي التسعير</h4>
                            <span>يعمل الآن</span>
                        </div>
                    </div>
                    <button onClick={onClose} className="close-btn"><X size={20} /></button>
                </div>

                <div className="typebot-messages">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`tb-msg-row ${msg.sender}`}>
                            {msg.sender === 'bot' && (
                                <div className="tb-avatar-small">
                                    <img src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png" alt="Bot" />
                                </div>
                            )}
                            <div className="tb-bubble">
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <form className="typebot-input-area" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="اكتب إجابتك هنا..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        autoFocus
                    />
                    <button type="submit" className="tb-send-btn" disabled={!input.trim()}>
                        <Send size={18} />
                    </button>
                </form>
            </div>

            <style>{`
        .typebot-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(4px);
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Cairo', sans-serif;
        }
        .typebot-modal {
          width: 100%;
          max-width: 400px;
          height: 600px;
          max-height: 90vh;
          background: #fff;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0,0,0,0.2);
          animation: slideUp 0.4s ease-out;
        }
        .typebot-header {
           background: #eeb32a;
           padding: 1rem;
           display: flex;
           justify-content: space-between;
           align-items: center;
           color: #310b82;
        }
        .bot-info { display: flex; align-items: center; gap: 0.75rem; }
        .bot-avatar { width: 40px; height: 40px; background: white; border-radius: 50%; padding: 5px; }
        .bot-avatar img { width: 100%; height: 100%; object-fit: contain; }
        .bot-info h4 { margin: 0; font-weight: 800; font-size: 1rem; }
        .bot-info span { font-size: 0.75rem; opacity: 0.8; }
        .close-btn { background: none; border: none; cursor: pointer; color: #310b82; opacity: 0.7; }
        .close-btn:hover { opacity: 1; }

        .typebot-messages {
            flex: 1;
            padding: 1.5rem;
            overflow-y: auto;
            background: #f9fafb;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        .tb-msg-row { display: flex; gap: 0.5rem; max-width: 80%; }
        .tb-msg-row.bot { align-self: flex-start; }
        .tb-msg-row.user { align-self: flex-end; flex-direction: row-reverse; }

        .tb-avatar-small { width: 28px; height: 28px; border-radius: 50%; overflow: hidden; flex-shrink: 0; }
        .tb-avatar-small img { width: 100%; height: 100%; }

        .tb-bubble {
            padding: 0.8rem 1.2rem;
            border-radius: 18px;
            font-size: 0.95rem;
            line-height: 1.5;
            box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }
        .bot .tb-bubble { background: white; border-top-left-radius: 4px; color: #1f2937; }
        .user .tb-bubble { background: #310b82; color: white; border-top-right-radius: 4px; }

        .typebot-input-area {
            padding: 1rem;
            background: white;
            border-top: 1px solid #e5e7eb;
            display: flex;
            gap: 0.5rem;
        }
        .typebot-input-area input {
            flex: 1;
            border: 1px solid #e5e7eb;
            border-radius: 25px;
            padding: 0.8rem 1.2rem;
            font-family: inherit;
            outline: none;
            transition: border-color 0.2s;
        }
        .typebot-input-area input:focus { border-color: #310b82; }
        .tb-send-btn {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            background: #310b82;
            color: white;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.2s;
        }
        .tb-send-btn:hover:not(:disabled) { transform: scale(1.05); background: #4c1db0; }
        .tb-send-btn:disabled { opacity: 0.5; cursor: not-allowed; }
      `}</style>
        </div>
    );
}
