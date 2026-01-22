import React, { useState } from 'react';
import { 
  Home, 
  Sprout, 
  QrCode, 
  Menu, 
  Bell, 
  Sun, 
  CloudRain, 
  Droplets,
  Calendar,
  CheckCircle2,
  ChevronRight,
  User,
  LogOut,
  MapPin,
  Leaf,
  Bot,
  MessageSquare,
  Send,
  X,
  Camera,
  Sparkles,
  Loader2,
  Brain,
  TrendingUp,
  AlertTriangle,
  Info,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Shared Toast & Modal Components
const ToastContainer = ({ toasts, removeToast }) => (
  <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 pointer-events-none w-full max-w-sm px-4">
    <AnimatePresence>
      {toasts.map(toast => (
        <motion.div
           key={toast.id}
           initial={{ opacity: 0, y: -20, scale: 0.9 }}
           animate={{ opacity: 1, y: 0, scale: 1 }}
           exit={{ opacity: 0, scale: 0.9 }}
           className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border backdrop-blur-md w-full ${
             toast.type === 'success' ? "bg-emerald-50/95 text-emerald-800 border-emerald-200" :
             toast.type === 'error' ? "bg-rose-50/95 text-rose-800 border-rose-200" :
             "bg-indigo-50/95 text-indigo-800 border-indigo-200"
           }`}
        >
           {toast.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" /> :
            toast.type === 'error' ? <AlertTriangle className="w-5 h-5 shrink-0 text-rose-500" /> :
            <Info className="w-5 h-5 shrink-0 text-indigo-400" />}
           <div className="flex-1 text-sm font-medium">{toast.message}</div>
           <button onClick={() => removeToast(toast.id)} className="p-1 hover:bg-black/5 rounded bg-transparent transition-colors">
              <X className="w-4 h-4 opacity-50" />
           </button>
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
);

const Modal = ({ isOpen, onClose, title, children }) => (
    <AnimatePresence>
      {isOpen && (
        <>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose} className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm" />
            <motion.div initial={{opacity:0, scale:0.95, y:20}} animate={{opacity:1, scale:1, y:0}} exit={{opacity:0, scale:0.95, y:20}}
                className="fixed z-[70] left-4 right-4 top-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-xl max-w-md mx-auto overflow-hidden max-h-[85vh] flex flex-col"
            >
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h3 className="font-bold text-slate-800">{title}</h3>
                    <button onClick={onClose} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"><X className="w-4 h-4"/></button>
                </div>
                <div className="p-4 overflow-y-auto">{children}</div>
            </motion.div>
        </>
      )}
    </AnimatePresence>
);

const AiAssistant = ({ isOpen, onClose, user }) => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: t('jamis_ai_intro') }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), type: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    
    // Improved Mock response Logic for Farmer
    setTimeout(() => {
        setIsTyping(false);
        const lowerInput = input.toLowerCase();
        let response = t('jamis_ai_help');

        if (lowerInput.includes('price') || lowerInput.includes('sell') || lowerInput.includes('market')) {
            response = `Current market insights show Rice (Paddy) is trending up by 2.4% in ${user?.lga || 'Hadejia'}. ${t('good_time_to_sell') || 'Good time to sell!'}`;
        } else if (lowerInput.includes('weather') || lowerInput.includes('rain')) {
             response = "Forecast: Clear skies expected for the next 48 hours. Good conditions for drying crops. Humidity: 45%.";
        } else if (lowerInput.includes('pest') || lowerInput.includes('disease')) {
             response = "Alert: Early signs of Stem Borer reported in neighboring wards. Inspect your crop stems for small holes. If found, apply Neem extract or consult your extension agent.";
        } else if (lowerInput.includes('fertilizer') || lowerInput.includes('input')) {
             response = "Inputs: Your NPK allocation (5 bags) is ready for pickup at the Hadejia Central Warehouse. Reference: #JMS-2024-899.";
        }

        setMessages(prev => [...prev, { 
            id: Date.now()+1, 
            type: 'bot', 
            text: response
        }]);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for desktop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="hidden lg:block fixed inset-0 bg-black/20 z-[55]"
            onClick={onClose}
          />
          <motion.div 
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-0 lg:inset-auto lg:right-0 lg:top-0 lg:bottom-0 lg:w-[400px] z-[60] bg-white flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-emerald-600 text-white shadow-md">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                        <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="font-bold">{t('jamis_ai')}</h3>
                        <p className="text-xs text-emerald-100 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse"/> {t('online')}
                        </p>
                    </div>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <X className="w-6 h-6" />
                </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                {messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                            msg.type === 'user' 
                                ? 'bg-emerald-600 text-white rounded-tr-none shadow-md' 
                                : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none shadow-sm'
                        }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex gap-1">
                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100" />
                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200" />
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-100 pb-safe">
                <div className="flex gap-2">
                    <button className="p-3 text-emerald-600 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors">
                        <Camera className="w-5 h-5" />
                    </button>
                    <div className="flex-1 relative">
                        <input 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={t('ask_placeholder')}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-4 pr-10 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        />
                    </div>
                    <button 
                        onClick={handleSend}
                        disabled={!input.trim()}
                        className="p-3 bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-600/20 disabled:opacity-50 disabled:shadow-none"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};


const JIGAWA_LGAS = [
  "Dutse", "Hadejia", "Kazaure", "Gumel", "Ringim", "Birnin Kudu", "Gwaram", "Kafin Hausa"
];

const Onboarding = ({ onComplete }) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', nin: '', phone: '', lga: '', farmSize: '', crop: '', location: '', images: []
  });
  const [isScanning, setIsScanning] = useState(false);
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type='info') => {
      const id = Date.now();
      setToasts(prev => [...prev, { id, message, type }]);
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };
  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  const handleNext = () => {
    if (step === 1 && (!formData.name || !formData.lga)) {
        addToast("Please fill in required fields", "error");
        return;
    }
    if (step === 2 && (!formData.farmSize || !formData.crop)) {
        addToast("Please describe your farm", "error");
        return;
    }
    
    if (step < 3) setStep(step + 1);
    else onComplete(formData);
  };

  const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
          const url = URL.createObjectURL(file);
          setFormData(prev => ({ ...prev, images: [...prev.images, url] }));
          addToast("Photo added", "success");
      }
  };

  const simulateScan = () => {
      setIsScanning(true);
      setTimeout(() => {
          setIsScanning(false);
          addToast("Identity Verified Successfully", "success");
      }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-100 flex items-center justify-center">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <div className="w-full max-w-md lg:max-w-lg bg-white flex flex-col safe-area-pb shadow-2xl lg:rounded-2xl lg:max-h-[90vh] h-full lg:h-auto">
      <div className="p-4 sm:p-6 pt-8 sm:pt-10 bg-white border-b border-slate-100">
         <h1 className="text-2xl font-bold text-slate-800">{t('setup_profile')}</h1>
         <p className="text-slate-500 text-sm mt-1">{t('complete_registration')}</p>
         <div className="flex gap-2 mt-4">
             <div className={`h-1 flex-1 rounded-full transition-colors ${step >= 1 ? 'bg-emerald-500' : 'bg-slate-200'}`} />
             <div className={`h-1 flex-1 rounded-full transition-colors ${step >= 2 ? 'bg-emerald-500' : 'bg-slate-200'}`} />
             <div className={`h-1 flex-1 rounded-full transition-colors ${step >= 3 ? 'bg-emerald-500' : 'bg-slate-200'}`} />
         </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
          <AnimatePresence mode="wait">
             {step === 1 && (
                 <motion.div 
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                 >
                     <h2 className="text-lg sm:text-xl font-semibold text-slate-700">{t('personal_details')}</h2>
                     <div className="space-y-4">
                         <div>
                             <label className="text-sm font-medium text-slate-600 block mb-1">{t('full_name')}</label>
                             <input 
                                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                                className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                                placeholder={t('enter_full_name')} 
                             />
                         </div>
                         <div>
                             <label className="text-sm font-medium text-slate-600 block mb-1">{t('nin')}</label>
                             <input 
                                value={formData.nin} onChange={e => setFormData({...formData, nin: e.target.value})}
                                className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                                placeholder={t('nin_placeholder')}
                                maxLength={11}
                                type="number"
                             />
                         </div>
                         <div>
                             <label className="text-sm font-medium text-slate-600 block mb-1">{t('phone_number')}</label>
                             <input 
                                value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                                className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                                placeholder="080..." 
                                type="tel"
                             />
                         </div>
                         <div>
                             <label className="text-sm font-medium text-slate-600 block mb-1">{t('select_lga')}</label>
                             <select 
                                value={formData.lga} onChange={e => setFormData({...formData, lga: e.target.value})}
                                className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none"
                             >
                                 <option value="">{t('select_lga')}...</option>
                                 {JIGAWA_LGAS.map(l => <option key={l} value={l}>{l}</option>)}
                             </select>
                         </div>
                     </div>
                 </motion.div>
             )}

             {step === 2 && (
                 <motion.div 
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                 >
                     <h2 className="text-xl font-semibold text-slate-700">{t('farm_info')}</h2>
                     <div className="space-y-4">
                         <div>
                             <label className="text-sm font-medium text-slate-600 block mb-1">{t('farm_size')}</label>
                             <input 
                                type="number"
                                value={formData.farmSize} onChange={e => setFormData({...formData, farmSize: e.target.value})}
                                className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none"
                                placeholder="0.0" 
                             />
                         </div>
                         <div>
                             <label className="text-sm font-medium text-slate-600 block mb-1">{t('primary_crop')}</label>
                             <select 
                                value={formData.crop} onChange={e => setFormData({...formData, crop: e.target.value})}
                                className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none"
                             >
                                 <option value="">{t('select_crop')}</option>
                                 <option>Rice (Paddy)</option>
                                 <option>Wheat</option>
                                 <option>Sorghum</option>
                                 <option>Sesame</option>
                             </select>
                         </div>
                         <div>
                            <label className="text-sm font-medium text-slate-600 block mb-1">{t('location')}</label>
                            <textarea
                                value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})}
                                className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none"
                                placeholder={t('location_desc')}
                                rows={2}
                            />
                         </div>
                         <div>
                            <label className="text-sm font-medium text-slate-600 block mb-1">{t('farm_photos')}</label>
                            <div className="grid grid-cols-3 gap-3">
                                {formData.images.map((src, i) => (
                                    <div key={i} className="aspect-square rounded-lg overflow-hidden border border-slate-200">
                                        <img src={src} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                                <label className="aspect-square bg-slate-100 rounded-lg flex flex-col items-center justify-center text-slate-400 border border-dashed border-slate-300 cursor-pointer hover:bg-slate-200 transition-colors">
                                    <Camera className="w-6 h-6 mb-1" />
                                    <span className="text-[10px]">{t('add')}</span>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                </label>
                            </div>
                         </div>
                     </div>
                 </motion.div>
             )}

             {step === 3 && (
                 <motion.div 
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col items-center text-center space-y-6 pt-8"
                 >
                     <div className="relative w-40 h-40">
                         {isScanning ? (
                            <>
                                <motion.div 
                                    className="absolute inset-0 border-4 border-emerald-500 rounded-full border-t-transparent"
                                    animate={{ rotate: 360 }} transition={{ repeat: Infinity, ease: 'linear', duration: 1 }}
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <User className="w-16 h-16 text-slate-300" />
                                </div>
                            </>
                         ) : (
                            <div className="w-full h-full bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4">
                                <CheckCircle2 className="w-20 h-20" />
                            </div>
                         )}
                     </div>
                     
                     <div>
                         <h2 className="text-2xl font-bold text-slate-800">
                             {isScanning ? t('verifying_identity') : t('registration_complete')}
                         </h2>
                         <p className="text-slate-500 mt-2">
                             {isScanning ? t('matching_face') : t('id_verified')}
                         </p>
                     </div>

                     {!isScanning && (
                         <div className="w-full p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-left">
                             <div className="flex justify-between items-center mb-2">
                                 <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">{t('jamis_id_generated')}</span>
                                 <span className="text-[10px] bg-white px-2 py-1 rounded text-emerald-600 shadow-sm">{t('verified')}</span>
                             </div>
                             <p className="font-mono text-lg text-emerald-900 font-bold">JM-2026-{Math.floor(Math.random() * 9000) + 1000}</p>
                             <div className="mt-2 flex items-center gap-2 text-xs text-emerald-700">
                                <CheckCircle2 className="w-3 h-3" /> NIN: {formData.nin || '***********'} {t('(Matched)')}
                             </div>
                         </div>
                     )}
                 </motion.div>
             )}
          </AnimatePresence>
      </div>

      <div className="p-4 sm:p-6 bg-white border-t border-slate-100 lg:rounded-b-2xl">
        {step === 3 ? (
             !isScanning && (
                <button 
                    onClick={handleNext}
                    className="w-full py-3 sm:py-4 bg-emerald-600 text-white rounded-xl font-bold text-base sm:text-lg shadow-lg shadow-emerald-500/30 active:scale-95 transition-all hover:bg-emerald-700"
                >
                    {t('get_started')}
                </button>
             ) || <button onClick={simulateScan} className="w-full py-3 sm:py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors">{t('start_biometric')}</button>
        ) : (
            <button 
                onClick={handleNext}
                disabled={step === 1 ? (!formData.name || !formData.nin) : !formData.farmSize}
                className="w-full py-3 sm:py-4 bg-slate-900 text-white rounded-xl font-bold text-base sm:text-lg disabled:opacity-50 active:scale-95 transition-all hover:bg-slate-800"
            >
                {t('continue')}
            </button>
        )}
      </div>
      </div>
    </div>
  );
};

const MobileNav = ({ activeTab, setActiveTab }) => {
  const { t } = useTranslation();
  return (
  <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 sm:px-6 py-3 flex justify-between items-center z-50 pb-safe">
    <button 
      onClick={() => setActiveTab('home')}
      className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${activeTab === 'home' ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 hover:text-slate-600'}`}
    >
      <Home className="w-5 h-5 sm:w-6 sm:h-6" />
      <span className="text-[10px] font-medium">{t('dashboard')}</span>
    </button>
    <button 
      onClick={() => setActiveTab('farm')}
      className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${activeTab === 'farm' ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 hover:text-slate-600'}`}
    >
      <Sprout className="w-5 h-5 sm:w-6 sm:h-6" />
      <span className="text-[10px] font-medium">{t('my_farm')}</span>
    </button>
    <div className="relative -top-6">
      <button 
        onClick={() => setActiveTab('id')}
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 ring-4 ring-slate-50 hover:bg-emerald-700 transition-colors"
      >
        <QrCode className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>
    </div>
    <button 
      onClick={() => setActiveTab('insights')}
      className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${activeTab === 'insights' ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 hover:text-slate-600'}`}
    >
      <Brain className="w-5 h-5 sm:w-6 sm:h-6" />
      <span className="text-[10px] font-medium">{t('ai_insights')}</span>
    </button>
    <button 
      onClick={() => setActiveTab('tasks')}
      className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${activeTab === 'tasks' ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 hover:text-slate-600'}`}
    >
      <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
      <span className="text-[10px] font-medium">{t('tasks')}</span>
    </button>
    <button 
      onClick={() => setActiveTab('profile')}
      className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${activeTab === 'profile' ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 hover:text-slate-600'}`}
    >
      <User className="w-5 h-5 sm:w-6 sm:h-6" />
      <span className="text-[10px] font-medium">{t('profile')}</span>
    </button>
  </div>
);
};

const DesktopSidebar = ({ activeTab, setActiveTab, user }) => {
  const { t, i18n } = useTranslation();
  return (
  <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 h-screen sticky top-0">
    {/* Logo */}
    <div className="p-6 border-b border-slate-100">
      <h1 title={t('app_subtitle')} className="font-bold text-slate-900 text-2xl tracking-tight">{t('app_title')}</h1>
      <span className="text-[10px] text-slate-400 font-medium tracking-wide leading-tight block mt-1">{t('app_subtitle')}</span>
    </div>
    
    {/* Nav Items */}
    <nav className="flex-1 p-4 space-y-1">
      <button 
        onClick={() => setActiveTab('home')}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'home' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'}`}
      >
        <Home className="w-5 h-5" />
        <span className="font-medium">{t('dashboard')}</span>
      </button>
      <button 
        onClick={() => setActiveTab('farm')}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'farm' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'}`}
      >
        <Sprout className="w-5 h-5" />
        <span className="font-medium">{t('my_farm')}</span>
      </button>
      <button 
        onClick={() => setActiveTab('insights')}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'insights' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'}`}
      >
        <Brain className="w-5 h-5" />
        <span className="font-medium">{t('ai_insights')}</span>
      </button>
      <button 
        onClick={() => setActiveTab('id')}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'id' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'}`}
      >
        <QrCode className="w-5 h-5" />
        <span className="font-medium">{t('digital_id')}</span>
      </button>
      <button 
        onClick={() => setActiveTab('tasks')}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'tasks' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'}`}
      >
        <Calendar className="w-5 h-5" />
        <span className="font-medium">{t('tasks')}</span>
      </button>
      <button 
        onClick={() => setActiveTab('profile')}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'profile' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'}`}
      >
        <User className="w-5 h-5" />
        <span className="font-medium">{t('profile')}</span>
      </button>
    </nav>
    
    {/* User Profile Summary */}
    <div className="p-4 border-t border-slate-100">
      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold shrink-0 overflow-hidden">
          {user?.images?.[0] ? (
            <img src={user.images[0]} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            user?.name?.split(' ').map(n => n[0]).join('') || 'IM'
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-medium text-slate-800 text-sm truncate">{user?.name || 'Ibrahim Musa'}</p>
          <p className="text-xs text-slate-500 truncate">{user?.lga || 'Hadejia'} LGA</p>
        </div>
      </div>
    </div>
  </aside>
);
};

const Header = ({ user, addToast, openModal }) => {
  const { t, i18n } = useTranslation();
  return (
  <header className="lg:hidden fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-40 px-4 h-16 flex items-center justify-between border-b border-slate-100">
    <div className="flex flex-col justify-center">
      <h1 title={t('app_subtitle')} className="font-bold text-slate-900 text-lg sm:text-xl tracking-tight leading-none">{t('app_title')}</h1>
      <span className="text-[9px] text-slate-400 font-medium tracking-wide leading-none mt-1">{t('app_subtitle')}</span>
    </div>
    <div className="flex items-center gap-2">
    <button onClick={() => {
        const newLang = i18n.language === 'en' ? 'ha' : 'en';
        i18n.changeLanguage(newLang);
        addToast(`Language changed to ${newLang === 'en' ? 'English' : 'Hausa'}`, 'success');
    }} className="text-xs text-emerald-600 font-bold hover:underline">
          {i18n.language.toUpperCase()}
    </button>
    <button onClick={() => openModal(t('notifications'), <div className="p-4 text-center text-slate-500">{t('no_new_notifications') || 'No new notifications currently.'}</div>)} className="relative p-2 text-slate-500 hover:text-emerald-600 transition-colors rounded-full hover:bg-slate-100">
        <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
        <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
    </button>
    </div>
  </header>
);
};

const DesktopHeader = ({ user, addToast, openModal }) => {
  const { t, i18n } = useTranslation();
  return (
  <header className="hidden lg:flex items-center justify-between px-8 py-4 bg-white border-b border-slate-100 sticky top-0 z-40">
    <div>
      <h2 className="text-2xl font-bold text-slate-900">{t('welcome_back')}, {user?.name?.split(' ')[0] || 'Ibrahim'}</h2>
      <p className="text-slate-500">{t('farm_summary')}</p>
    </div>
    <div className="flex items-center gap-4">
      <button onClick={() => {
          const newLang = i18n.language === 'en' ? 'ha' : 'en';
          i18n.changeLanguage(newLang);
          addToast(`Language changed to ${newLang === 'en' ? 'English' : 'Hausa'}`, 'success');
      }} className="text-xs text-emerald-600 font-bold hover:underline">
          {i18n.language.toUpperCase()}
      </button>
      <button onClick={() => openModal(t('notifications'), <div className="p-4 text-center text-slate-500">{t('no_new_notifications') || 'No new notifications currently.'}</div>)} className="relative p-3 text-slate-500 hover:text-emerald-600 transition-colors rounded-xl hover:bg-slate-100">
        <Bell className="w-6 h-6" />
        <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
      </button>
    </div>
  </header>
);
};

const WeatherCard = ({ openModal }) => {
    const { t } = useTranslation();
    const showWeatherDetails = () => {
        openModal(
            t('weather_forecast') || 'Weather Forecast',
            <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="font-medium">Tomorrow</span>
                    <div className="flex items-center gap-2">
                        <CloudRain className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">26°C - Heavy Rain</span>
                    </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="font-medium">Sunday</span>
                    <div className="flex items-center gap-2">
                        <Sun className="w-4 h-4 text-amber-500" />
                        <span className="text-sm">30°C - Sunny</span>
                    </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="font-medium">Monday</span>
                    <div className="flex items-center gap-2">
                         <Sun className="w-4 h-4 text-amber-500" />
                        <span className="text-sm">29°C - Sunny</span>
                    </div>
                </div>
                <div className="p-3 bg-blue-50 text-blue-800 text-sm rounded-lg">
                    <strong>Tip:</strong> Good conditions for applying fertilizer on Sunday.
                </div>
            </div>,
            t('close')
        );
    };
    return (
  <div onClick={showWeatherDetails} className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-3 sm:p-4 text-white shadow-lg mb-4 sm:mb-6 cursor-pointer hover:shadow-xl transition-shadow">
    <div className="flex justify-between items-start mb-3 sm:mb-4">
      <div>
        <p className="text-blue-100 text-xs sm:text-sm font-medium">{t('today_rain')}, 24 Jan</p>
        <h2 className="text-2xl sm:text-3xl font-bold">28°C</h2>
        <p className="text-blue-100 text-sm">Partly Cloudy</p>
      </div>
      <Sun className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-300" />
    </div>
    <div className="flex gap-3 sm:gap-4 p-2 sm:p-3 bg-white/10 rounded-xl backdrop-blur-sm">
      <div className="flex items-center gap-1.5 sm:gap-2">
        <CloudRain className="w-4 h-4 text-blue-200" />
        <span className="text-xs sm:text-sm font-medium">30% {t('today_rain')}</span>
      </div>
      <div className="w-px bg-blue-400/30"></div>
      <div className="flex items-center gap-1.5 sm:gap-2">
        <Droplets className="w-4 h-4 text-blue-200" />
        <span className="text-xs sm:text-sm font-medium">65% {t('humidity')}</span>
      </div>
    </div>
  </div>
);
};

const TaskItem = ({ title, date, status }) => (
  <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-white rounded-xl border border-slate-100 shadow-sm mb-2 sm:mb-3 hover:border-slate-200 transition-colors cursor-pointer">
    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 ${status === 'done' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
      {status === 'done' ? <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />}
    </div>
    <div className="flex-1 min-w-0">
      <h4 className={`font-semibold text-xs sm:text-sm truncate ${status === 'done' ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{title}</h4>
      <p className="text-[10px] text-slate-500">{date}</p>
    </div>
  </div>
);

const DigitalID = ({ user, addToast, openModal }) => {
  const { t } = useTranslation();
  
  const showTicket = () => {
    openModal(
        t('input_allocation_ticket'),
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-center space-y-4">
            <div className="w-24 h-24 mx-auto bg-white p-2 rounded-lg border border-slate-200">
                <QrCode className="w-full h-full text-slate-900" />
            </div>
            <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">JAMIS-INPUT-2024-X88</h3>
                <p className="text-sm text-slate-500">Scan this code at the collection center</p>
            </div>
            <div className="text-left text-sm space-y-2 pt-2 border-t border-slate-200">
                <div className="flex justify-between"><span>Point:</span> <span className="font-bold text-slate-800">{user?.lga || 'Hadejia'} Central</span></div>
                <div className="flex justify-between"><span>Date:</span> <span className="font-bold text-slate-800">25 Jan - 30 Jan</span></div>
                <div className="flex justify-between"><span>Items:</span> <span className="font-bold text-slate-800">4 Bags NPK 15:15, 20kg Seeds</span></div>
            </div>
        </div>,
        t('download_pdf'),
        () => addToast(t('ticket_downloaded') || 'Ticket downloaded to device.', 'success')
    );
  };

  return (
  <div className="space-y-4 sm:space-y-6 pt-3 sm:pt-4 lg:pt-6 pb-24 lg:pb-8">
    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 px-3 sm:px-4 lg:px-8">{t('my_digital_id') || 'My Digital ID'}</h2>
    
    <div className="grid gap-6 lg:grid-cols-2 px-3 sm:px-4 lg:px-8">
        {/* ID Card */}
        <div className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 text-white shadow-2xl relative overflow-hidden aspect-[1.58/1] lg:aspect-auto lg:min-h-[280px]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            
            <div className="flex justify-between items-start mb-4 sm:mb-6 relative z-10">
                <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center">
                        <Leaf className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                    </div>
                    <span className="font-bold tracking-wider text-xs sm:text-sm lg:text-base">JAMIS ID</span>
                </div>
                <div className="px-1.5 sm:px-2 lg:px-3 py-0.5 sm:py-1 bg-white/20 backdrop-blur rounded text-[8px] sm:text-[10px] lg:text-xs font-mono">{t('verified') || 'VERIFIED'}</div>
            </div>

            <div className="flex gap-3 sm:gap-4 lg:gap-6 relative z-10 items-center">
                <div className="w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10 shrink-0 overflow-hidden">
                     {user?.images?.[0] ? (
                         <img src={user.images[0]} className="w-full h-full object-cover" />
                     ) : (
                        <User className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white/80" />
                     )}
                </div>
                <div className="min-w-0 flex-1">
                    <h3 className="text-sm sm:text-lg lg:text-xl font-bold uppercase leading-tight truncate">{user?.name || 'Ibrahim Musa'}</h3>
                    <p className="text-emerald-100 text-[10px] sm:text-xs lg:text-sm mt-0.5 sm:mt-1 font-mono tracking-wide">NIN: {user?.nin || '*** *** ***'}</p>
                    <p className="text-emerald-200/60 text-[8px] sm:text-[10px] lg:text-xs mt-0.5">ID: JM-2024-8892-XK</p>
                </div>
            </div>

            <div className="mt-4 sm:mt-6 lg:mt-8 flex justify-between items-end relative z-10">
                <div className="text-[8px] sm:text-[10px] lg:text-xs text-emerald-200/80 space-y-0.5 sm:space-y-1">
                    <p>LGA: {user?.lga || 'Hadejia'}</p>
                    <p>Farm: {user?.farmSize ? `${user.farmSize} ha` : '2.5 ha'}</p>
                </div>
                <div className="bg-white p-1 sm:p-1.5 lg:p-2 rounded-lg">
                    <QrCode className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-slate-900" />
                </div>
            </div>
        </div>
        
        {/* Input Allocation Status */}
        <div className="p-4 sm:p-5 lg:p-6 bg-white rounded-xl border border-slate-100 shadow-sm">
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-slate-800 mb-2 lg:mb-3">{t('input_allocation_status')}</h3>
            <div className="flex items-center gap-2 sm:gap-3">
                 <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-emerald-500 animate-pulse" />
                 <p className="text-xs sm:text-sm lg:text-base text-slate-600">{t('ready_pickup')} <strong>{user?.lga || 'Hadejia'} {t('Central') || 'Central'}</strong></p>
            </div>
            <button onClick={showTicket} className="mt-3 lg:mt-4 w-full py-2 lg:py-3 bg-emerald-50 text-emerald-700 text-xs sm:text-sm lg:text-base font-medium rounded-lg hover:bg-emerald-100 transition-colors">{t('view_ticket')}</button>
        </div>
            
        <div className="p-4 sm:p-5 lg:p-6 bg-white rounded-xl border border-slate-100 shadow-sm">
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-slate-800 mb-2 lg:mb-3">{t('verification_history')}</h3>
                <div className="space-y-2">
                    <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-slate-500">{t('last_verified')}</span>
                        <span className="font-medium text-slate-700">Jan 20, 2026</span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-slate-500">{t('registration_date')}</span>
                        <span className="font-medium text-slate-700">Dec 15, 2025</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
};

const AiInsights = ({ user, addToast, openModal }) => {
    const { t } = useTranslation();
    
    // Simulations
    const showHeatStressDetails = () => {
        openModal(
            t('heat_stress_warning'),
            <div className="space-y-3">
                <p className="text-slate-600">{t('heat_stress_detailed_desc') || "The upcoming heatwave is expected to last for 72 hours. Temperatures will peak at 41°C. This poses a significant risk to your crop's flowering stage."}</p>
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                    <h4 className="font-bold text-amber-900 mb-2">Recommended Actions:</h4>
                    <ul className="list-disc list-inside text-sm text-amber-800 space-y-1">
                        <li>Increase irrigation by 20% in the early morning.</li>
                        <li>Avoid applying foliar sprays during peak heat hours.</li>
                        <li>Monitor soil moisture levels closely.</li>
                    </ul>
                </div>
            </div>,
            t('schedule_irrigation'),
            () => addToast('Irrigation schedule updated for heat mitigation.', 'success')
        );
    };

    const showIrrigationDetails = () => {
         openModal(
            t('irrigation_optimization'),
             <div className="space-y-3">
                <p className="text-slate-600">Analysis of soil moisture sensors indicates ground saturation is higher than necessary for this growth stage.</p>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h4 className="font-bold text-blue-900 mb-2">Savings Projection:</h4>
                    <div className="flex justify-between items-center mb-1"><span className="text-sm">Water Saved:</span> <span className="font-bold">12,000 Liters</span></div>
                    <div className="flex justify-between items-center"><span className="text-sm">Cost Reduction:</span> <span className="font-bold">₦8,500</span></div>
                </div>
            </div>,
            t('apply_optimization'),
            () => addToast('Irrigation settings optimized.', 'success')
        );
    };

    const showMarketValidation = () => {
        openModal(
            t('market_price_forecast'),
            <div className="space-y-4">
                <p className="text-slate-600 text-sm">Forecast based on historical data from Hadejia Market and current national supply trends.</p>
                <div className="h-40 bg-slate-50 rounded border border-slate-200 flex items-center justify-center text-slate-400 italic">
                    [Interactive Price Graph Simulation]
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-red-50 rounded border border-red-100">
                        <span className="text-xs text-red-600 font-bold uppercase">Risk Factor</span>
                        <p className="text-sm font-medium">Fuel Price Hikes</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded border border-green-100">
                        <span className="text-xs text-green-600 font-bold uppercase">Opportunity</span>
                        <p className="text-sm font-medium">Export Demand</p>
                    </div>
                </div>
            </div>,
            t('set_price_alert'),
            () => addToast('Price alert set for ₦450k.', 'success')
        );
    };

    return (
    <div className="px-3 sm:px-4 lg:px-8 pt-3 sm:pt-4 lg:pt-6 pb-24 lg:pb-8 space-y-4 sm:space-y-6">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900">{t('ai_farm_insights')}</h2>
        
        {/* Alerts */}
        <div className="grid gap-4 lg:grid-cols-2">
            <div onClick={showHeatStressDetails} className="cursor-pointer bg-amber-50 rounded-2xl p-5 border border-amber-100 relative overflow-hidden transition-transform hover:scale-[1.02]">
                <div className="flex gap-4 relative z-10">
                   <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                       <Sun className="w-5 h-5 text-amber-600" />
                   </div>
                   <div>
                       <h3 className="font-bold text-amber-900 mb-1">{t('heat_stress_warning') || 'Heat Stress Warning'}</h3>
                       <p className="text-sm text-amber-700 leading-relaxed">{t('heat_stress_desc') || 'High temperatures predicted for the next 3 days. Consider increasing irrigation frequency for your'} {user?.crop || 'crops'}.</p>
                   </div>
                </div>
            </div>
            
            <div onClick={showIrrigationDetails} className="cursor-pointer bg-blue-50 rounded-2xl p-5 border border-blue-100 relative overflow-hidden transition-transform hover:scale-[1.02]">
                <div className="flex gap-4 relative z-10">
                   <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                       <CloudRain className="w-5 h-5 text-blue-600" />
                   </div>
                   <div>
                       <h3 className="font-bold text-blue-900 mb-1">{t('irrigation_optimization') || 'Irrigation Optimization'}</h3>
                       <p className="text-sm text-blue-700 leading-relaxed">{t('irrigation_desc') || 'Based on soil data, reducing water usage by 15% next week will not affect yield and can save costs.'}</p>
                   </div>
                </div>
            </div>
        </div>

        {/* Crop Health Analysis */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-50 flex justify-between items-center">
                <h3 className="font-bold text-slate-900">{t('crop_health_analysis')}</h3>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">{t('healthy')}</span>
            </div>
            <div className="p-5">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                       <Leaf className="w-8 h-8 text-emerald-500" />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 text-lg">Vigor Index (NDVI)</h4>
                        <p className="text-slate-500 text-sm">Satellite analysis from yesterday</p>
                    </div>
                    <div className="ml-auto text-2xl font-bold text-emerald-600">0.85</div>
                </div>
                
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-600">Nitrogen Levels</span>
                            <span className="font-medium text-slate-900">Optimal</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 w-[85%] rounded-full" />
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-600">Moisture Content</span>
                            <span className="font-medium text-slate-900">Good</span>
                        </div>
                         <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 w-[70%] rounded-full" />
                        </div>
                    </div>
                </div>
            </div>
             <div className="bg-slate-50 p-4 flex gap-3">
                 <Bot className="w-5 h-5 text-emerald-600 shrink-0" />
                 <p className="text-xs text-slate-600">
                     <strong>{t('ai_recommendation')}:</strong> {t('ai_crop_recommendation') || 'Your crop development is on track. Applying the second round of fertilizer in 5 days is recommended for maximum yield.'}
                 </p>
             </div>
        </div>

        {/* Market Prediction */}
        <div onClick={showMarketValidation} className="cursor-pointer bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:border-emerald-200 transition-colors">
            <h3 className="font-bold text-slate-900 mb-4">{t('market_price_forecast')} (Tap for details)</h3>
            <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                 <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                     <p className="text-xs text-slate-500 mb-1">{t('current')}</p>
                     <p className="font-bold text-slate-900">₦420k</p>
                 </div>
                 <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 relative">
                     <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[9px] px-2 py-0.5 rounded-full">Likely</div>
                     <p className="text-xs text-emerald-700 mb-1">{t('next_week')}</p>
                     <p className="font-bold text-emerald-900">₦435k</p>
                 </div>
                 <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                     <p className="text-xs text-slate-500 mb-1">{t('next_month')}</p>
                     <p className="font-bold text-slate-900">₦410k</p>
                 </div>
            </div>
             <p className="text-xs text-slate-400 mt-4 text-center">Prediction confidence: 85% based on seasonal trends and demand.</p>
        </div>
    </div>
    );
};

const HomeTab = ({ user, addToast, openModal }) => {
    const { t } = useTranslation();
    
    // Simulations
    const showAllTasks = () => {
        openModal(
            t('all_tasks') || 'All Tasks',
            <div className="space-y-2">
                <TaskItem title="Apply NPK Fertilizer" date="Due Today, 4:00 PM" status="pending" />
                <TaskItem title="Morning Irrigation" date="Today, 7:30 AM" status="done" />
                <TaskItem title="Pest Inspection" date="Tomorrow" status="pending" />
                <TaskItem title="Harvest Zone A" date="In 3 days" status="pending" />
                <TaskItem title="Soil Testing" date="Next Week" status="pending" />
            </div>
        );
    };

    const showMarketDetails = (crop) => {
        openModal(
            `${crop} Market Analysis`,
            <div className="space-y-4">
                <p className="text-slate-600">Detailed price trends for {crop} in Hadejia vs. National Average.</p>
                <div className="h-32 bg-slate-50 flex items-center justify-center text-slate-400 italic border border-slate-200 rounded">
                    [Price Trend Chart Placeholder]
                </div>
                <button className="w-full py-2 bg-emerald-600 text-white rounded-lg" onClick={() => addToast(`Subscribed to ${crop} price alerts`, 'success')}>
                    Subscribe to Price Alerts
                </button>
            </div>,
            t('close')
        );
    };

    return (
    <div className="px-3 sm:px-4 lg:px-8 pt-3 sm:pt-4 lg:pt-6 space-y-4 sm:space-y-6 pb-24 lg:pb-8">
        <div className="lg:hidden">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">Salam, {user?.name?.split(' ')[0] || 'Ibrahim'}</h2>
            <p className="text-slate-500 text-xs sm:text-sm">{t('farm_summary')}</p>
        </div>
        
        {/* Desktop Grid Layout */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Weather Card - spans 2 cols on desktop */}
          <div className="lg:col-span-2">
            <WeatherCard openModal={openModal} />
          </div>
          
          {/* Quick Stats for Desktop */}
          <div className="hidden lg:block bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4">{t('farm_overview')}</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">{t('farm_size')}</span>
                <span className="font-bold text-slate-900">{user?.farmSize || '2.5'} Ha</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">{t('primary_crop')}</span>
                <span className="font-bold text-slate-900">{user?.crop || 'Rice'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">{t('select_lga')}</span>
                <span className="font-bold text-slate-900">{user?.lga || 'Hadejia'}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <div className="flex justify-between items-center mb-2 sm:mb-3 lg:mb-4">
                <h3 className="font-bold text-slate-800 text-sm sm:text-base lg:text-lg">{t('todays_tasks')}</h3>
                <span onClick={showAllTasks} className="text-xs lg:text-sm text-emerald-600 font-medium cursor-pointer hover:underline">{t('view_all')}</span>
            </div>
            <TaskItem title="Apply NPK Fertilizer" date="Due Today, 4:00 PM" status="pending" />
            <TaskItem title="Morning Irrigation" date="Completed at 7:30 AM" status="done" />
          </div>

          <div>
            <h3 className="font-bold text-slate-800 mb-2 sm:mb-3 lg:mb-4 text-sm sm:text-base lg:text-lg">{t('market_prices')} ({user?.lga || 'Hadejia'})</h3>
            <div className="flex lg:grid lg:grid-cols-3 gap-3 sm:gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 -mx-3 sm:-mx-4 lg:mx-0 px-3 sm:px-4 lg:px-0 scrollbar-hide">
                <div onClick={() => showMarketDetails('Rice (Paddy)')} className="min-w-[120px] sm:min-w-[140px] lg:min-w-0 p-3 lg:p-4 bg-white border border-slate-100 rounded-xl shadow-sm flex-shrink-0 cursor-pointer hover:border-emerald-300 transition-colors">
                    <div className="text-[10px] sm:text-xs lg:text-sm text-slate-500 mb-1">Rice (Paddy)</div>
                    <div className="font-bold text-slate-900 text-sm sm:text-base lg:text-lg">₦420k <span className="text-[10px] sm:text-xs font-normal text-slate-400">/ton</span></div>
                    <div className="text-[10px] sm:text-xs text-emerald-600 mt-1 flex items-center">↑ 2.4% vs yest.</div>
                </div>
                <div onClick={() => showMarketDetails('Soybeans')} className="min-w-[120px] sm:min-w-[140px] lg:min-w-0 p-3 lg:p-4 bg-white border border-slate-100 rounded-xl shadow-sm flex-shrink-0 cursor-pointer hover:border-emerald-300 transition-colors">
                    <div className="text-[10px] sm:text-xs lg:text-sm text-slate-500 mb-1">Soybeans</div>
                    <div className="font-bold text-slate-900 text-sm sm:text-base lg:text-lg">₦380k <span className="text-[10px] sm:text-xs font-normal text-slate-400">/ton</span></div>
                    <div className="text-[10px] sm:text-xs text-rose-500 mt-1 flex items-center">↓ 1.2% vs yest.</div>
                </div>
                <div onClick={() => showMarketDetails('Maize')} className="min-w-[120px] sm:min-w-[140px] lg:min-w-0 p-3 lg:p-4 bg-white border border-slate-100 rounded-xl shadow-sm flex-shrink-0 cursor-pointer hover:border-emerald-300 transition-colors">
                    <div className="text-[10px] sm:text-xs lg:text-sm text-slate-500 mb-1">Maize</div>
                    <div className="font-bold text-slate-900 text-sm sm:text-base lg:text-lg">₦290k <span className="text-[10px] sm:text-xs font-normal text-slate-400">/ton</span></div>
                    <div className="text-[10px] sm:text-xs text-emerald-600 mt-1 flex items-center">↑ 0.5% vs yest.</div>
                </div>
            </div>
          </div>
        </div>
    </div>
);
};

const FarmTab = ({ user, addToast, openModal }) => {
    const { t } = useTranslation();
    
    // Simulations
    const recalibrate = () => {
        openModal(
            t('recalibrate_gps'),
            <div className="space-y-4 text-center">
                <MapPin className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
                <p className="text-slate-600">Acquiring high-precision GPS coordinates from satellites...</p>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 animate-[pulse_2s_infinite] w-2/3"></div>
                </div>
            </div>,
            t('confirm_coordinates'),
            () => {
                addToast(t('coordinates_updated') || 'Farm boundaries updated successfully.', 'success');
            }
        );
    };

    const addPhoto = () => {
         openModal(
            t('add_farm_photo'),
            <div className="p-8 border-2 border-dashed border-slate-300 rounded-xl text-center space-y-4">
                <Camera className="w-12 h-12 text-slate-300 mx-auto" />
                <p className="text-slate-500">Tap to take a photo or select from gallery</p>
                <button className="px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200">
                    {t('open_camera')}
                </button>
            </div>,
            t('upload'),
            () => addToast(t('photo_uploaded') || 'Photo uploaded to farm documentation.', 'success')
        );
    };

    return (
    <div className="px-3 sm:px-4 lg:px-8 pt-3 sm:pt-4 lg:pt-6 pb-24 lg:pb-8 space-y-4 sm:space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-2xl p-4 sm:p-5 lg:p-6 shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-3 sm:mb-4">
             <div className="min-w-0 flex-1">
                 <h2 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 truncate">{user?.crop || 'Mixed Crops'} {t('Farm') || 'Farm'}</h2>
                 <p className="text-slate-500 text-xs sm:text-sm truncate">{user?.location || 'Unspecified Location'}</p>
             </div>
             <div className="bg-emerald-100 text-emerald-700 px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold shrink-0 ml-2">
                 {t('Active') || 'Active'}
             </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="p-3 sm:p-4 bg-slate-50 rounded-xl">
                  <p className="text-[10px] sm:text-xs lg:text-sm text-slate-500 mb-1">{t('Total Size') || 'Total Size'}</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800">{user?.farmSize || '0.0'} <span className="text-xs sm:text-sm font-normal text-slate-500">Ha</span></p>
              </div>
              <div className="p-3 sm:p-4 bg-slate-50 rounded-xl">
                  <p className="text-[10px] sm:text-xs lg:text-sm text-slate-500 mb-1">{t('Est. Yield') || 'Est. Yield'}</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800">{((parseFloat(user?.farmSize) || 0) * 4.5).toFixed(1)} <span className="text-xs sm:text-sm font-normal text-slate-500">Tons</span></p>
              </div>
          </div>
        </div>

         <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
            <div className="h-32 sm:h-40 lg:h-48 bg-slate-200 relative">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-emerald-500 text-white p-2 lg:p-3 rounded-full shadow-lg">
                        <MapPin className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
                    </div>
                </div>
            </div>
            <div className="p-3 sm:p-4 flex justify-between items-center gap-2">
                <div className="min-w-0 flex-1">
                    <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase">{t('Input Coordinates') || 'Input Coordinates'}</p>
                    <p className="font-mono text-slate-700 text-xs sm:text-sm truncate">12.4509° N, 9.9201° E</p>
                </div>
                <button onClick={recalibrate} className="text-emerald-600 font-bold text-xs sm:text-sm shrink-0 hover:underline">{t('Recalibrate') || 'Recalibrate'}</button>
            </div>
         </div>
      </div>

      <div>
        <h3 className="font-bold text-slate-800 mb-2 sm:mb-3 lg:mb-4 px-1 text-sm sm:text-base lg:text-lg">{t('Farm Documentation') || 'Farm Documentation'}</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
             {user?.images?.map((img, i) => (
                 <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-200">
                     <img src={img} className="w-full h-full object-cover" />
                 </div>
             ))}
             <button onClick={addPhoto} className="aspect-[4/3] rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 hover:border-emerald-400 hover:text-emerald-500 transition-colors">
                 <Camera className="w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2" />
                 <span className="text-[10px] sm:text-xs font-bold">{t('Add Photo') || 'Add Photo'}</span>
             </button>
        </div>
      </div>
    </div>
);
};

const App = () => {
    const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('home');
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const [toasts, setToasts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };

  const openModal = (title, content, actionLabel, onAction) => {
    setModalContent({ title, content, actionLabel, onAction });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  if (!hasOnboarded) {
      return <Onboarding onComplete={(data) => {
          setUserProfile(data);
          setHasOnboarded(true);
          addToast(t('welcome_message') || "Welcome to JAMIS Farmer Portal!", "success");
      }} addToast={addToast} />;
  }

  return (
    <div className="min-h-screen bg-slate-100 font-sans selection:bg-emerald-100 flex">
      <ToastContainer toasts={toasts} removeToast={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />
      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalContent?.title}>
        <div className="space-y-4">
            <div className="text-slate-600">{modalContent?.content}</div>
            {modalContent?.actionLabel && (
                <div className="flex justify-end gap-3 mt-6">
                    <button onClick={closeModal} className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">
                        {t('cancel') || 'Cancel'}
                    </button>
                    <button onClick={() => { modalContent.onAction?.(); closeModal(); }} className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20">
                        {modalContent.actionLabel}
                    </button>
                </div>
            )}
        </div>
      </Modal>

      {/* Desktop Sidebar */}
      <DesktopSidebar activeTab={activeTab} setActiveTab={setActiveTab} user={userProfile} />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <Header user={userProfile} addToast={addToast} openModal={openModal} />
        {/* Desktop Header */}
        <DesktopHeader user={userProfile} addToast={addToast} openModal={openModal} />
        
        <AiAssistant isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} user={userProfile} addToast={addToast} />
        
        <main className="flex-1 pt-16 lg:pt-0 pb-20 lg:pb-8">
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    {activeTab === 'insights' && <AiInsights user={userProfile} addToast={addToast} openModal={openModal} />}
                    {activeTab === 'home' && <HomeTab user={userProfile} addToast={addToast} openModal={openModal} />}
                    {activeTab === 'id' && <DigitalID user={userProfile} addToast={addToast} openModal={openModal} />}
                    {activeTab === 'farm' && <FarmTab user={userProfile} addToast={addToast} openModal={openModal} />}
                     {activeTab === 'tasks' && (
                        <div className="px-3 sm:px-4 lg:px-8 pt-3 sm:pt-4 lg:pt-6 pb-24 lg:pb-8">
                            <div className="flex justify-between items-center mb-3 sm:mb-4 lg:mb-6">
                                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900">{t('task_schedule')}</h2>
                                <button
                                    onClick={() => openModal(t('new_task'), <div className="p-4 text-center text-slate-500 italic">Task creation form simulation...</div>, t('create'), () => addToast(t('task_added'), 'success'))}
                                    className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                                >
                                    <Plus className="w-4 h-4" /> {t('add_task') || 'Add Task'}
                                </button>
                            </div>
                            <div className="grid gap-4 lg:grid-cols-2">
                              <div>
                                <h3 className="text-sm font-bold text-slate-500 mb-3 uppercase tracking-wider">{t('upcoming')}</h3>
                                <TaskItem title="Apply NPK Fertilizer" date="Due Today" status="pending" />
                                <TaskItem title="Pest Inspection" date="Tomorrow" status="pending" />
                                <TaskItem title="Harvest Zone A" date="In 3 days" status="pending" />
                              </div>
                              <div>
                                <h3 className="text-xs sm:text-sm font-bold text-slate-400 mb-2 sm:mb-3 uppercase tracking-wider">{t('completed')}</h3>
                                <TaskItem title="Land Preparation" date="Jan 10" status="done" />
                                <TaskItem title="Seed Purchase" date="Jan 05" status="done" />
                              </div>
                            </div>
                        </div>
                    )}
                    {activeTab === 'profile' && (
                        <div className="px-3 sm:px-4 lg:px-8 pt-3 sm:pt-4 lg:pt-6 pb-24 lg:pb-8 space-y-4 sm:space-y-6">
                            <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 p-4 sm:p-5 lg:p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-emerald-100 rounded-full overflow-hidden flex items-center justify-center text-emerald-700 text-2xl lg:text-3xl font-bold shrink-0">
                                    {userProfile?.images?.[0] ? (
                                        <img src={userProfile.images[0]} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        userProfile?.name?.split(' ').map(n => n[0]).join('') || 'IM'
                                    )}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 truncate">{userProfile?.name || 'Ibrahim Musa'}</h2>
                                    <p className="text-slate-500 text-sm sm:text-base truncate">{t('Farmer') || 'Farmer'} • {userProfile?.lga || 'Hadejia'} LGA</p>
                                </div>
                            </div>

                            <div className="grid gap-6 lg:grid-cols-2">
                              <div className="space-y-2">
                                 <h3 className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-wider px-2">{t('settings')}</h3>
                                 <div className="bg-white rounded-xl border border-slate-100 divide-y divide-slate-50 overflow-hidden">
                                     <button onClick={() => addToast(t('feature_coming_soon'), 'info')} className="w-full text-left px-4 py-3 lg:py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                         <span className="text-slate-700 font-medium">{t('edit_profile')}</span>
                                         <ChevronRight className="w-4 h-4 text-slate-300" />
                                     </button>
                                     <button onClick={() => openModal(t('notifications'), <div className="p-4 text-center text-slate-500">{t('no_notifications') || 'No new notifications'}</div>)} className="w-full text-left px-4 py-3 lg:py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                         <span className="text-slate-700 font-medium">{t('notifications')}</span>
                                         <ChevronRight className="w-4 h-4 text-slate-300" />
                                     </button>
                                     <button onClick={() => addToast('Language switched (simulation)', 'success')} className="w-full text-left px-4 py-3 lg:py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                         <span className="text-slate-700 font-medium">{t('language')}</span>
                                         <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded">English</span>
                                     </button>
                                 </div>
                              </div>

                              <div className="space-y-2">
                                 <h3 className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-wider px-2">{t('support')}</h3>
                                 <div className="bg-white rounded-xl border border-slate-100 divide-y divide-slate-50 overflow-hidden">
                                     <button onClick={() => openModal(t('help_center'), <div className="p-4 text-center">Help Center Content...</div>)} className="w-full text-left px-4 py-3 lg:py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                         <span className="text-slate-700 font-medium">{t('help_center')}</span>
                                         <ChevronRight className="w-4 h-4 text-slate-300" />
                                     </button>
                                     <button onClick={() => addToast('Calling Support...', 'info')} className="w-full text-left px-4 py-3 lg:py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                         <span className="text-slate-700 font-medium">{t('contact_extension')}</span>
                                         <ChevronRight className="w-4 h-4 text-slate-300" />
                                     </button>
                                 </div>
                              </div>
                            </div>

                            <button onClick={() => openModal(t('sign_out'), t('confirm_sign_out') || 'Are you sure?', t('sign_out'), () => { setHasOnboarded(false); setUserProfile(null); })} className="w-full max-w-md py-3 flex items-center justify-center gap-2 text-rose-600 font-medium hover:bg-rose-50 rounded-xl transition-colors">
                                <LogOut className="w-5 h-5" /> {t('sign_out')}
                            </button>
                            
                            <div className="text-center pb-8 pt-4">
                                <p className="text-xs text-slate-400">JAMIS App v1.0.2</p>
                                <p className="text-[10px] text-slate-300 mt-1">Jigawa State Government</p>
                            </div>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
            
            {/* Footer */}
            <div className="mt-8 py-6 border-t border-slate-200/60 flex flex-col items-center justify-center text-center opacity-80 hover:opacity-100 transition-opacity">
               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Romana Group</h4>
               <p className="text-[10px] text-slate-400 font-medium tracking-wide">
                 {t('presented_by')}: <span className="text-slate-600 font-semibold">Ibrahim Babangida kani</span> • <span className="font-mono text-xs">+234 803 680 2214</span>
               </p>
            </div>

          </div>
        </main>
      </div>

      {/* Mobile Navigation */}
      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Floating AI Button */}
      <motion.button
         whileHover={{ scale: 1.05 }}
         whileTap={{ scale: 0.95 }}
         onClick={() => setIsAiOpen(true)}
         className="fixed bottom-24 right-4 sm:right-6 lg:bottom-8 lg:right-8 z-40 px-5 h-12 sm:h-14 bg-emerald-600 rounded-full shadow-xl shadow-emerald-500/40 flex items-center gap-2 border-4 border-white hover:bg-emerald-700 transition-colors"
      >
          <Sparkles className="w-5 h-5 text-white" />
          <span className="font-bold text-white text-sm sm:text-base">JAMIS AI</span>
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
      </motion.button>
    </div>
  );
}

export default App;
