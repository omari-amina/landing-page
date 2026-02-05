import { useState, useEffect } from 'react';
import { X, ChevronLeft, Sparkles } from 'lucide-react';

export interface TourStep {
    target: string; // CSS selector
    title: string;
    content: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
    action?: () => void; // Optional action to trigger when step starts
}

interface DemoTourProps {
    steps: TourStep[];
    onComplete: () => void;
    onSkip: () => void;
    isOpen: boolean;
}

export function DemoTour({ steps, onComplete, onSkip, isOpen }: DemoTourProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [position, setPosition] = useState<{ top: number; left: number; width: number; height: number } | null>(null);

    useEffect(() => {
        if (!isOpen) return;

        const updatePosition = () => {
            const step = steps[currentStep];
            const element = document.querySelector(step.target);

            if (element) {
                const rect = element.getBoundingClientRect();
                // Add scroll offset
                const scrollX = window.scrollX;
                const scrollY = window.scrollY;

                setPosition({
                    top: rect.top + scrollY,
                    left: rect.left + scrollX,
                    width: rect.width,
                    height: rect.height
                });

                // Scroll element into view if needed
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Trigger step action if exists
                if (step.action) {
                    step.action();
                }
            }
        };

        // Small delay to ensure DOM is ready and transitions finish
        const timer = setTimeout(updatePosition, 300);
        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition); // Handle scroll updates

        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition);
        };
    }, [currentStep, isOpen, steps]);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            onComplete();
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    if (!isOpen || !position) return null;

    const step = steps[currentStep];

    // Tooltip positioning logic
    const getTooltipStyle = () => {
        const gap = 12;
        // Default to bottom if not specified
        const pos = step.position || 'bottom';

        let top = 0;
        let left = 0;

        switch (pos) {
            case 'bottom':
                top = position.top + position.height + gap;
                left = position.left + (position.width / 2) - 150; // Center (assuming 300px width)
                break;
            case 'top':
                top = position.top - gap; // Will need to transform -100% Y in CSS or calc
                left = position.left + (position.width / 2) - 150;
                break;
            case 'right':
                top = position.top;
                left = position.left + position.width + gap;
                break;
            case 'left':
                top = position.top;
                left = position.left - gap; // Will need to transform -100% X
                break;
        }

        // Adjust for screen edges (basic clamp)
        const safeLeft = Math.max(20, Math.min(window.innerWidth - 320, left));

        return {
            top: pos === 'top' ? 'auto' : top,
            bottom: pos === 'top' ? window.innerHeight - top + gap * 2 : 'auto', // Hack for top positioning
            left: safeLeft,
        };
    };

    return (
        <div className="demo-tour-overlay">
            {/* Spotlight Canvas using SVG mask */}
            <svg className="spotlight-svg">
                <defs>
                    <mask id="spotlight-mask">
                        <rect x="0" y="0" width="100%" height="100%" fill="white" />
                        <rect
                            x={position.left}
                            y={position.top}
                            width={position.width}
                            height={position.height}
                            rx="8"
                            fill="black"
                        />
                    </mask>
                </defs>
                <rect
                    x="0" y="0" width="100%" height="100%"
                    fill="rgba(0, 0, 0, 0.6)"
                    mask="url(#spotlight-mask)"
                />
                {/* Animated border around the target */}
                <rect
                    x={position.left - 4}
                    y={position.top - 4}
                    width={position.width + 8}
                    height={position.height + 8}
                    rx="12"
                    fill="none"
                    stroke="#be185d"
                    strokeWidth="3"
                    className="pulse-border"
                />
            </svg>

            {/* Tooltip Card */}
            <div className="tour-tooltip" style={getTooltipStyle()}>
                <div className="tour-header">
                    <div className="step-indicator">
                        خطوة {currentStep + 1} من {steps.length}
                    </div>
                    <button onClick={onSkip} className="close-btn"><X size={16} /></button>
                </div>

                <h3 className="tour-title">
                    {step.title} <Sparkles size={16} className="text-primary inline-block mr-1" />
                </h3>
                <p className="tour-content">{step.content}</p>

                <div className="tour-footer">
                    <button
                        onClick={handlePrev}
                        disabled={currentStep === 0}
                        className="tour-btn outlined"
                    >
                        السابق
                    </button>

                    <button onClick={handleNext} className="tour-btn primary">
                        {currentStep === steps.length - 1 ? 'إنهاء' : 'التالي'}
                        {currentStep < steps.length - 1 && <ChevronLeft size={16} className="mr-1" />}
                    </button>
                </div>
            </div>

            <style>{`
        .demo-tour-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 9999;
          pointer-events: none; /* Let clicks pass through generally, but catch on tooltip */
        }
        .spotlight-svg {
          width: 100vw;
          height: 100vh;
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: auto; /* Catch clicks on the overlay bg */
        }
        .pulse-border {
          animation: pulse-ring 2s infinite;
        }
        @keyframes pulse-ring {
          0% { stroke-opacity: 1; stroke-width: 3; }
          50% { stroke-opacity: 0.5; stroke-width: 6; }
          100% { stroke-opacity: 1; stroke-width: 3; }
        }

        .tour-tooltip {
          position: absolute;
          width: 300px;
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          pointer-events: auto;
          z-index: 10000;
          transition: all 0.3s ease;
          animation: slideUp 0.3s ease-out;
          direction: rtl;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .tour-header { display: flex; justify-content: space-between; margin-bottom: 0.75rem; }
        .step-indicator { font-size: 0.75rem; color: #94a3b8; font-weight: 600; background: #f1f5f9; padding: 2px 8px; border-radius: 4px; }
        .close-btn { background: none; border: none; cursor: pointer; color: #94a3b8; }
        .close-btn:hover { color: #64748b; }

        .tour-title { font-size: 1.1rem; font-weight: 800; color: #1e293b; margin: 0 0 0.5rem 0; display: flex; align-items: center; gap: 0.5rem; }
        .tour-content { color: #64748b; font-size: 0.9rem; line-height: 1.5; margin-bottom: 1.5rem; }
        
        .tour-footer { display: flex; justify-content: space-between; gap: 1rem; }
        .tour-btn { 
          padding: 0.5rem 1rem; 
          border-radius: 8px; 
          border: none; 
          cursor: pointer; 
          font-family: inherit; 
          font-weight: 600; 
          font-size: 0.85rem; 
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .tour-btn.primary { background: #be185d; color: white; flex: 1; }
        .tour-btn.primary:hover { background: #9d174d; }
        .tour-btn.outlined { background: white; border: 1px solid #e2e8f0; color: #64748b; }
        .tour-btn.outlined:hover { background: #f8fafc; }
        .tour-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        
        .mr-1 { margin-right: 0.25rem; }
      `}</style>
        </div>
    );
}
