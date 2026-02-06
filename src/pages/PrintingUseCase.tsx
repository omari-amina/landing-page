import { Link } from 'react-router-dom'
import { WaslaLogo } from '../components/WaslaLogo'
import { CheckCircle, BarChart3, Zap, ShieldCheck } from 'lucide-react'

export default function PrintingUseCase() {
    return (
        <div className="landing-page bg-light">
            <nav className="navbar">
                <div className="container navbar-content">
                    <Link to="/" className="logo">
                        <WaslaLogo size={45} />
                    </Link>
                    <div className="nav-buttons">
                        <Link to="/demo" className="btn btn-secondary">جربي Demo</Link>
                        <Link to="/" className="btn btn-primary">العودة للرئيسية</Link>
                    </div>
                </div>
            </nav>

            <section className="section">
                <div className="container">
                    <div className="grid-2 gap-12 items-center">
                        <div>
                            <div className="tag-special mb-4">قصة نجاح: قطاع الطباعة 🏪</div>
                            <h1 className="hero-title mb-6" style={{ fontSize: '2.5rem' }}>
                                كيف أتمتت "مطبعة الهدايا" مبيعاتها بنسبة 100%؟
                            </h1>
                            <p className="hero-description mb-8">
                                باستخدام نظام <strong>أتمتة وصلة</strong>، استطاع عميلنا دمج برنامج <strong>CostCrafter Pro</strong> مع واتساب وانستجرام للرد الفوري على طلبات التسعير المعقدة.
                            </p>
                            <div className="card bg-white p-8 border-primary-light">
                                <h3 className="mb-4">⚡ النتائج المحققة:</h3>
                                <ul className="upsell-list" style={{ gap: '1.5rem' }}>
                                    <li><CheckCircle className="text-primary" /> رد آلي على استفسارات "بشحال" في أقل من 5 ثوانٍ.</li>
                                    <li><CheckCircle className="text-primary" /> حساب دقيق لتكلفة الورق والحبر والفينيل آلياً.</li>
                                    <li><CheckCircle className="text-primary" /> تقليل ضغط المتابعة اليدوية بنسبة 80%.</li>
                                    <li><CheckCircle className="text-primary" /> زيادة المبيعات بسبب سرعة الرد قبل ذهاب الزبونة للمنافس.</li>
                                </ul>
                            </div>
                        </div>
                        <div className="visual-wrapper">
                            <div className="card p-4 glass-card animate-float">
                                <div className="bg-primary text-white p-4 rounded-xl mb-4">
                                    <strong>الرسالة:</strong> "حابة نطبع 50 بطاقة دعوة ذهبية، شحال تحسبولي؟"
                                </div>
                                <div className="bg-bg-subtle p-4 rounded-xl text-text-primary">
                                    <strong>رد الأتمتة:</strong> "أهلاً بك! سعر 50 بطاقة دعوة ذهبية هو 7500 دج. هل ترغبين في تأكيد الطلب؟"
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section bg-white">
                <div className="container text-center">
                    <h2 className="section-title">لماذا نجحت هذه التجربة؟</h2>
                    <div className="grid-3 gap-8 mt-12">
                        <div className="card p-8">
                            <div className="workflow-icon mx-auto mb-6"><Zap size={32} className="text-primary" /></div>
                            <h3>التكامل السريع</h3>
                            <p>تم ربط حاسبة CostCrafter مع n8n لتنتج السعر النهائي فوراً دون تدخل بشري.</p>
                        </div>
                        <div className="card p-8">
                            <div className="workflow-icon mx-auto mb-6"><BarChart3 size={32} className="text-primary" /></div>
                            <h3>تنظيم البيانات</h3>
                            <p>كل طلب يتم تسجيله في Google Sheets مع تفاصيل المنتج والكمية والسعر.</p>
                        </div>
                        <div className="card p-8">
                            <div className="workflow-icon mx-auto mb-6"><ShieldCheck size={32} className="text-primary" /></div>
                            <h3>ضمان الثقة</h3>
                            <p>الزبونة تحصل على سعر دقيق واحترافي في ثوانٍ، مما يبني انطباعاً بالمصداقية العالية.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section final-cta-section">
                <div className="container">
                    <div className="final-cta-box text-center">
                        <h2>ابدئي قصة نجاحكِ اليوم</h2>
                        <p>نحن نصمم لكِ الأتمتة التي يحتاجها مشروعكِ بالذات.</p>
                        <div className="flex gap-4 justify-center mt-8">
                            <Link to="/demo" className="btn btn-primary btn-lg">جربي الديمو العام</Link>
                            <a href="https://wa.me/213000000000" className="btn btn-secondary btn-lg">احجزي استشارة لمشروعك</a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
