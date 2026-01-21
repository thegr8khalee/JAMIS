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
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AiAssistant = ({ isOpen, onClose, user }) => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: `Salam ${user?.name?.split(' ')[0] || 'Farmer'}! I am JAMIS AI. I can diagnose crop diseases or advice on market prices. How can I help?` }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), type: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    
    // Mock response
    setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, { 
            id: Date.now()+1, 
            type: 'bot', 
            text: input.toLowerCase().includes('price') 
                ? `Current market insights show Rice (Paddy) is trending up by 2.4% in ${user?.lga || 'Hadejia'}. Good time to sell!` 
                : 'I can help with that. Would you like to upload a photo of your crop for analysis?' 
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
                        <h3 className="font-bold">JAMIS AI</h3>
                        <p className="text-xs text-emerald-100 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse"/> Online
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
                            placeholder="Ask about pests, weather..."
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
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', nin: '', phone: '', lga: '', farmSize: '', crop: '', location: '', images: []
  });
  const [isScanning, setIsScanning] = useState(false);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else onComplete(formData);
  };

  const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
          const url = URL.createObjectURL(file);
          setFormData(prev => ({ ...prev, images: [...prev.images, url] }));
      }
  };

  const simulateScan = () => {
      setIsScanning(true);
      setTimeout(() => {
          setIsScanning(false);
          // handleNext(); // Don't auto-advance, let user click Get Started
      }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-100 flex items-center justify-center">
      <div className="w-full max-w-md lg:max-w-lg bg-white flex flex-col safe-area-pb shadow-2xl lg:rounded-2xl lg:max-h-[90vh] h-full lg:h-auto">
      <div className="p-4 sm:p-6 pt-8 sm:pt-10 bg-white border-b border-slate-100 lg:rounded-t-2xl">
         <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Setup Profile</h1>
         <p className="text-slate-500 text-sm mt-1">Complete your registration to get started</p>
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
                     <h2 className="text-lg sm:text-xl font-semibold text-slate-700">Personal Details</h2>
                     <div className="space-y-4">
                         <div>
                             <label className="text-sm font-medium text-slate-600 block mb-1">Full Name</label>
                             <input 
                                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                                className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                                placeholder="Enter your full name" 
                             />
                         </div>
                         <div>
                             <label className="text-sm font-medium text-slate-600 block mb-1">NIN (National Identity Number)</label>
                             <input 
                                value={formData.nin} onChange={e => setFormData({...formData, nin: e.target.value})}
                                className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                                placeholder="11-digit NIN" 
                                maxLength={11}
                                type="number"
                             />
                         </div>
                         <div>
                             <label className="text-sm font-medium text-slate-600 block mb-1">Phone Number</label>
                             <input 
                                value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                                className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                                placeholder="080..." 
                                type="tel"
                             />
                         </div>
                         <div>
                             <label className="text-sm font-medium text-slate-600 block mb-1">Select LGA</label>
                             <select 
                                value={formData.lga} onChange={e => setFormData({...formData, lga: e.target.value})}
                                className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none"
                             >
                                 <option value="">Select LGA...</option>
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
                     <h2 className="text-xl font-semibold text-slate-700">Farm Information</h2>
                     <div className="space-y-4">
                         <div>
                             <label className="text-sm font-medium text-slate-600 block mb-1">Farm Size (Hectares)</label>
                             <input 
                                type="number"
                                value={formData.farmSize} onChange={e => setFormData({...formData, farmSize: e.target.value})}
                                className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none"
                                placeholder="0.0" 
                             />
                         </div>
                         <div>
                             <label className="text-sm font-medium text-slate-600 block mb-1">Primary Crop</label>
                             <select 
                                value={formData.crop} onChange={e => setFormData({...formData, crop: e.target.value})}
                                className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none"
                             >
                                 <option value="">Select Crop...</option>
                                 <option>Rice (Paddy)</option>
                                 <option>Wheat</option>
                                 <option>Sorghum</option>
                                 <option>Sesame</option>
                             </select>
                         </div>
                         <div>
                            <label className="text-sm font-medium text-slate-600 block mb-1">Location / Landmark</label>
                            <textarea
                                value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})}
                                className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none"
                                placeholder="Describe farm location..."
                                rows={2}
                            />
                         </div>
                         <div>
                            <label className="text-sm font-medium text-slate-600 block mb-1">Farm Photos</label>
                            <div className="grid grid-cols-3 gap-3">
                                {formData.images.map((src, i) => (
                                    <div key={i} className="aspect-square rounded-lg overflow-hidden border border-slate-200">
                                        <img src={src} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                                <label className="aspect-square bg-slate-100 rounded-lg flex flex-col items-center justify-center text-slate-400 border border-dashed border-slate-300 cursor-pointer hover:bg-slate-200 transition-colors">
                                    <Camera className="w-6 h-6 mb-1" />
                                    <span className="text-[10px]">Add</span>
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
                             {isScanning ? "Verifying Identity" : "Registration Complete"}
                         </h2>
                         <p className="text-slate-500 mt-2">
                             {isScanning ? "Matching Face ID with NIN Database..." : "Your digital ID is verified & active."}
                         </p>
                     </div>

                     {!isScanning && (
                         <div className="w-full p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-left">
                             <div className="flex justify-between items-center mb-2">
                                 <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">JAMIS ID Generated</span>
                                 <span className="text-[10px] bg-white px-2 py-1 rounded text-emerald-600 shadow-sm">Verified</span>
                             </div>
                             <p className="font-mono text-lg text-emerald-900 font-bold">JM-2026-{Math.floor(Math.random() * 9000) + 1000}</p>
                             <div className="mt-2 flex items-center gap-2 text-xs text-emerald-700">
                                <CheckCircle2 className="w-3 h-3" /> NIN: {formData.nin || '***********'} (Matched)
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
                    Get Started
                </button>
             ) || <button onClick={simulateScan} className="w-full py-3 sm:py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors">Start Biometric Verification</button>
        ) : (
            <button 
                onClick={handleNext}
                disabled={step === 1 ? (!formData.name || !formData.nin) : !formData.farmSize}
                className="w-full py-3 sm:py-4 bg-slate-900 text-white rounded-xl font-bold text-base sm:text-lg disabled:opacity-50 active:scale-95 transition-all hover:bg-slate-800"
            >
                Continue
            </button>
        )}
      </div>
      </div>
    </div>
  );
};

const MobileNav = ({ activeTab, setActiveTab }) => (
  <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 sm:px-6 py-3 flex justify-between items-center z-50 pb-safe">
    <button 
      onClick={() => setActiveTab('home')}
      className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${activeTab === 'home' ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 hover:text-slate-600'}`}
    >
      <Home className="w-5 h-5 sm:w-6 sm:h-6" />
      <span className="text-[10px] font-medium">Home</span>
    </button>
    <button 
      onClick={() => setActiveTab('farm')}
      className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${activeTab === 'farm' ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 hover:text-slate-600'}`}
    >
      <Sprout className="w-5 h-5 sm:w-6 sm:h-6" />
      <span className="text-[10px] font-medium">My Farm</span>
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
      onClick={() => setActiveTab('tasks')}
      className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${activeTab === 'tasks' ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 hover:text-slate-600'}`}
    >
      <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
      <span className="text-[10px] font-medium">Tasks</span>
    </button>
    <button 
      onClick={() => setActiveTab('profile')}
      className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${activeTab === 'profile' ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 hover:text-slate-600'}`}
    >
      <User className="w-5 h-5 sm:w-6 sm:h-6" />
      <span className="text-[10px] font-medium">Profile</span>
    </button>
  </div>
);

const DesktopSidebar = ({ activeTab, setActiveTab, user }) => (
  <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 h-screen sticky top-0">
    {/* Logo */}
    <div className="p-6 border-b border-slate-100">
      <h1 className="font-bold text-slate-900 text-2xl tracking-tight">JAMIS <span className="text-emerald-600">Farmer</span></h1>
      <span className="text-xs text-slate-400 font-medium tracking-wide">by Romana Group</span>
    </div>
    
    {/* Nav Items */}
    <nav className="flex-1 p-4 space-y-1">
      <button 
        onClick={() => setActiveTab('home')}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'home' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'}`}
      >
        <Home className="w-5 h-5" />
        <span className="font-medium">Dashboard</span>
      </button>
      <button 
        onClick={() => setActiveTab('farm')}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'farm' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'}`}
      >
        <Sprout className="w-5 h-5" />
        <span className="font-medium">My Farm</span>
      </button>
      <button 
        onClick={() => setActiveTab('id')}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'id' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'}`}
      >
        <QrCode className="w-5 h-5" />
        <span className="font-medium">Digital ID</span>
      </button>
      <button 
        onClick={() => setActiveTab('tasks')}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'tasks' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'}`}
      >
        <Calendar className="w-5 h-5" />
        <span className="font-medium">Tasks</span>
      </button>
      <button 
        onClick={() => setActiveTab('profile')}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'profile' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'}`}
      >
        <User className="w-5 h-5" />
        <span className="font-medium">Profile</span>
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

const Header = ({ user }) => (
  <header className="lg:hidden fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-40 px-4 h-16 flex items-center justify-between border-b border-slate-100">
    <div className="flex flex-col justify-center">
      <h1 className="font-bold text-slate-900 text-lg sm:text-xl tracking-tight leading-none">JAMIS <span className="text-emerald-600">Farmer</span></h1>
      <span className="text-[10px] text-slate-400 font-medium tracking-wide leading-none mt-1">by Romana Group</span>
    </div>
    <button className="relative p-2 text-slate-500 hover:text-emerald-600 transition-colors rounded-full hover:bg-slate-100">
        <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
        <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
    </button>
  </header>
);

const DesktopHeader = ({ user }) => (
  <header className="hidden lg:flex items-center justify-between px-8 py-4 bg-white border-b border-slate-100 sticky top-0 z-40">
    <div>
      <h2 className="text-2xl font-bold text-slate-900">Welcome back, {user?.name?.split(' ')[0] || 'Ibrahim'}</h2>
      <p className="text-slate-500">Here's what's happening with your farm today.</p>
    </div>
    <div className="flex items-center gap-4">
      <button className="relative p-3 text-slate-500 hover:text-emerald-600 transition-colors rounded-xl hover:bg-slate-100">
        <Bell className="w-6 h-6" />
        <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
      </button>
    </div>
  </header>
);

const WeatherCard = () => (
  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-3 sm:p-4 text-white shadow-lg mb-4 sm:mb-6">
    <div className="flex justify-between items-start mb-3 sm:mb-4">
      <div>
        <p className="text-blue-100 text-xs sm:text-sm font-medium">Today, 24 Jan</p>
        <h2 className="text-2xl sm:text-3xl font-bold">28°C</h2>
        <p className="text-blue-100 text-sm">Partly Cloudy</p>
      </div>
      <Sun className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-300" />
    </div>
    <div className="flex gap-3 sm:gap-4 p-2 sm:p-3 bg-white/10 rounded-xl backdrop-blur-sm">
      <div className="flex items-center gap-1.5 sm:gap-2">
        <CloudRain className="w-4 h-4 text-blue-200" />
        <span className="text-xs sm:text-sm font-medium">30% Rain</span>
      </div>
      <div className="w-px bg-blue-400/30"></div>
      <div className="flex items-center gap-1.5 sm:gap-2">
        <Droplets className="w-4 h-4 text-blue-200" />
        <span className="text-xs sm:text-sm font-medium">65% Humidity</span>
      </div>
    </div>
  </div>
);

const TaskItem = ({ title, date, status }) => (
  <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-white rounded-xl border border-slate-100 shadow-sm mb-2 sm:mb-3 hover:border-slate-200 transition-colors cursor-pointer">
    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 ${status === 'done' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
      {status === 'done' ? <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />}
    </div>
    <div className="flex-1 min-w-0">
      <h4 className={`font-semibold text-xs sm:text-sm truncate ${status === 'done' ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{title}</h4>
      <p className="text-[10px] sm:text-xs text-slate-500 truncate">{date}</p>
    </div>
    <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
  </div>
);

const DigitalID = ({ user }) => (
  <div className="space-y-4 sm:space-y-6 pt-3 sm:pt-4 lg:pt-6 pb-24 lg:pb-8">
    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 px-3 sm:px-4 lg:px-8">My Digital ID</h2>
    
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
                <div className="px-1.5 sm:px-2 lg:px-3 py-0.5 sm:py-1 bg-white/20 backdrop-blur rounded text-[8px] sm:text-[10px] lg:text-xs font-mono">VERIFIED</div>
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
        
        {/* Status Cards */}
        <div className="space-y-3 sm:space-y-4">
            <div className="p-4 sm:p-5 lg:p-6 bg-white rounded-xl border border-slate-100 shadow-sm">
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-slate-800 mb-2 lg:mb-3">Input Allocation Status</h3>
                <div className="flex items-center gap-2 sm:gap-3">
                     <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-emerald-500 animate-pulse" />
                     <p className="text-xs sm:text-sm lg:text-base text-slate-600">Ready for pickup at <strong>{user?.lga || 'Hadejia'} Central</strong></p>
                </div>
                <button className="mt-3 lg:mt-4 w-full py-2 lg:py-3 bg-emerald-50 text-emerald-700 text-xs sm:text-sm lg:text-base font-medium rounded-lg hover:bg-emerald-100 transition-colors">View Ticket</button>
            </div>
            
            <div className="p-4 sm:p-5 lg:p-6 bg-white rounded-xl border border-slate-100 shadow-sm">
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-slate-800 mb-2 lg:mb-3">Verification History</h3>
                <div className="space-y-2">
                    <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-slate-500">Last verified</span>
                        <span className="font-medium text-slate-700">Jan 20, 2026</span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-slate-500">Registration date</span>
                        <span className="font-medium text-slate-700">Dec 15, 2025</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
);

const HomeTab = ({ user }) => (
    <div className="px-3 sm:px-4 lg:px-8 pt-3 sm:pt-4 lg:pt-6 space-y-4 sm:space-y-6 pb-24 lg:pb-8">
        <div className="lg:hidden">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">Salam, {user?.name?.split(' ')[0] || 'Ibrahim'}</h2>
            <p className="text-slate-500 text-xs sm:text-sm">Here is your daily farm summary</p>
        </div>
        
        {/* Desktop Grid Layout */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Weather Card - spans 2 cols on desktop */}
          <div className="lg:col-span-2">
            <WeatherCard />
          </div>
          
          {/* Quick Stats for Desktop */}
          <div className="hidden lg:block bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4">Farm Overview</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Farm Size</span>
                <span className="font-bold text-slate-900">{user?.farmSize || '2.5'} Ha</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Primary Crop</span>
                <span className="font-bold text-slate-900">{user?.crop || 'Rice'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">LGA</span>
                <span className="font-bold text-slate-900">{user?.lga || 'Hadejia'}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <div className="flex justify-between items-center mb-2 sm:mb-3 lg:mb-4">
                <h3 className="font-bold text-slate-800 text-sm sm:text-base lg:text-lg">Today's Tasks</h3>
                <span className="text-xs lg:text-sm text-emerald-600 font-medium cursor-pointer hover:underline">View All</span>
            </div>
            <TaskItem title="Apply NPK Fertilizer" date="Due Today, 4:00 PM" status="pending" />
            <TaskItem title="Morning Irrigation" date="Completed at 7:30 AM" status="done" />
          </div>

          <div>
            <h3 className="font-bold text-slate-800 mb-2 sm:mb-3 lg:mb-4 text-sm sm:text-base lg:text-lg">Market Prices ({user?.lga || 'Hadejia'})</h3>
            <div className="flex lg:grid lg:grid-cols-3 gap-3 sm:gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 -mx-3 sm:-mx-4 lg:mx-0 px-3 sm:px-4 lg:px-0 scrollbar-hide">
                <div className="min-w-[120px] sm:min-w-[140px] lg:min-w-0 p-3 lg:p-4 bg-white border border-slate-100 rounded-xl shadow-sm flex-shrink-0">
                    <div className="text-[10px] sm:text-xs lg:text-sm text-slate-500 mb-1">Rice (Paddy)</div>
                    <div className="font-bold text-slate-900 text-sm sm:text-base lg:text-lg">₦420k <span className="text-[10px] sm:text-xs font-normal text-slate-400">/ton</span></div>
                    <div className="text-[10px] sm:text-xs text-emerald-600 mt-1 flex items-center">↑ 2.4% vs yest.</div>
                </div>
                <div className="min-w-[120px] sm:min-w-[140px] lg:min-w-0 p-3 lg:p-4 bg-white border border-slate-100 rounded-xl shadow-sm flex-shrink-0">
                    <div className="text-[10px] sm:text-xs lg:text-sm text-slate-500 mb-1">Soybeans</div>
                    <div className="font-bold text-slate-900 text-sm sm:text-base lg:text-lg">₦380k <span className="text-[10px] sm:text-xs font-normal text-slate-400">/ton</span></div>
                    <div className="text-[10px] sm:text-xs text-rose-500 mt-1 flex items-center">↓ 1.2% vs yest.</div>
                </div>
                <div className="min-w-[120px] sm:min-w-[140px] lg:min-w-0 p-3 lg:p-4 bg-white border border-slate-100 rounded-xl shadow-sm flex-shrink-0">
                    <div className="text-[10px] sm:text-xs lg:text-sm text-slate-500 mb-1">Maize</div>
                    <div className="font-bold text-slate-900 text-sm sm:text-base lg:text-lg">₦290k <span className="text-[10px] sm:text-xs font-normal text-slate-400">/ton</span></div>
                    <div className="text-[10px] sm:text-xs text-emerald-600 mt-1 flex items-center">↑ 0.5% vs yest.</div>
                </div>
            </div>
          </div>
        </div>
    </div>
);

const FarmTab = ({ user }) => (
    <div className="px-3 sm:px-4 lg:px-8 pt-3 sm:pt-4 lg:pt-6 pb-24 lg:pb-8 space-y-4 sm:space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-2xl p-4 sm:p-5 lg:p-6 shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-3 sm:mb-4">
             <div className="min-w-0 flex-1">
                 <h2 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 truncate">{user?.crop || 'Mixed Crops'} Farm</h2>
                 <p className="text-slate-500 text-xs sm:text-sm truncate">{user?.location || 'Unspecified Location'}</p>
             </div>
             <div className="bg-emerald-100 text-emerald-700 px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold shrink-0 ml-2">
                 Active
             </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="p-3 sm:p-4 bg-slate-50 rounded-xl">
                  <p className="text-[10px] sm:text-xs lg:text-sm text-slate-500 mb-1">Total Size</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800">{user?.farmSize || '0.0'} <span className="text-xs sm:text-sm font-normal text-slate-500">Ha</span></p>
              </div>
              <div className="p-3 sm:p-4 bg-slate-50 rounded-xl">
                  <p className="text-[10px] sm:text-xs lg:text-sm text-slate-500 mb-1">Est. Yield</p>
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
                    <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase">Input Coordinates</p>
                    <p className="font-mono text-slate-700 text-xs sm:text-sm truncate">12.4509° N, 9.9201° E</p>
                </div>
                <button className="text-emerald-600 font-bold text-xs sm:text-sm shrink-0 hover:underline">Recalibrate</button>
            </div>
         </div>
      </div>

      <div>
        <h3 className="font-bold text-slate-800 mb-2 sm:mb-3 lg:mb-4 px-1 text-sm sm:text-base lg:text-lg">Farm Documentation</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
             {user?.images?.map((img, i) => (
                 <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-200">
                     <img src={img} className="w-full h-full object-cover" />
                 </div>
             ))}
             <button className="aspect-[4/3] rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 hover:border-emerald-400 hover:text-emerald-500 transition-colors">
                 <Camera className="w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2" />
                 <span className="text-[10px] sm:text-xs font-bold">Add Photo</span>
             </button>
        </div>
      </div>
    </div>
);

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  if (!hasOnboarded) {
      return <Onboarding onComplete={(data) => {
          setUserProfile(data);
          setHasOnboarded(true);
      }} />;
  }

  return (
    <div className="min-h-screen bg-slate-100 font-sans selection:bg-emerald-100 flex">
      {/* Desktop Sidebar */}
      <DesktopSidebar activeTab={activeTab} setActiveTab={setActiveTab} user={userProfile} />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <Header user={userProfile} />
        {/* Desktop Header */}
        <DesktopHeader user={userProfile} />
        
        <AiAssistant isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} user={userProfile} />
        
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
                    {activeTab === 'home' && <HomeTab user={userProfile} />}
                    {activeTab === 'id' && <DigitalID user={userProfile} />}
                    {activeTab === 'farm' && <FarmTab user={userProfile} />}
                     {activeTab === 'tasks' && (
                        <div className="px-3 sm:px-4 lg:px-8 pt-3 sm:pt-4 lg:pt-6 pb-24 lg:pb-8">
                            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 mb-3 sm:mb-4 lg:mb-6">Task Schedule</h2>
                            <div className="grid gap-4 lg:grid-cols-2">
                              <div>
                                <h3 className="text-sm font-bold text-slate-500 mb-3 uppercase tracking-wider">Upcoming</h3>
                                <TaskItem title="Apply NPK Fertilizer" date="Due Today" status="pending" />
                                <TaskItem title="Pest Inspection" date="Tomorrow" status="pending" />
                                <TaskItem title="Harvest Zone A" date="In 3 days" status="pending" />
                              </div>
                              <div>
                                <h3 className="text-xs sm:text-sm font-bold text-slate-400 mb-2 sm:mb-3 uppercase tracking-wider">Completed</h3>
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
                                    <p className="text-slate-500 text-sm sm:text-base truncate">Farmer • {userProfile?.lga || 'Hadejia'} LGA</p>
                                </div>
                            </div>

                            <div className="grid gap-6 lg:grid-cols-2">
                              <div className="space-y-2">
                                 <h3 className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-wider px-2">Settings</h3>
                                 <div className="bg-white rounded-xl border border-slate-100 divide-y divide-slate-50 overflow-hidden">
                                     <button className="w-full text-left px-4 py-3 lg:py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                         <span className="text-slate-700 font-medium">Edit Profile</span>
                                         <ChevronRight className="w-4 h-4 text-slate-300" />
                                     </button>
                                     <button className="w-full text-left px-4 py-3 lg:py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                         <span className="text-slate-700 font-medium">Notifications</span>
                                         <ChevronRight className="w-4 h-4 text-slate-300" />
                                     </button>
                                     <button className="w-full text-left px-4 py-3 lg:py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                         <span className="text-slate-700 font-medium">Language</span>
                                         <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded">English</span>
                                     </button>
                                 </div>
                              </div>

                              <div className="space-y-2">
                                 <h3 className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-wider px-2">Support</h3>
                                 <div className="bg-white rounded-xl border border-slate-100 divide-y divide-slate-50 overflow-hidden">
                                     <button className="w-full text-left px-4 py-3 lg:py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                         <span className="text-slate-700 font-medium">Help Center</span>
                                         <ChevronRight className="w-4 h-4 text-slate-300" />
                                     </button>
                                     <button className="w-full text-left px-4 py-3 lg:py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                         <span className="text-slate-700 font-medium">Contact Extension Worker</span>
                                         <ChevronRight className="w-4 h-4 text-slate-300" />
                                     </button>
                                 </div>
                              </div>
                            </div>

                            <button className="w-full max-w-md py-3 flex items-center justify-center gap-2 text-rose-600 font-medium hover:bg-rose-50 rounded-xl transition-colors">
                                <LogOut className="w-5 h-5" /> Sign Out
                            </button>
                            
                            <div className="text-center pb-8 pt-4">
                                <p className="text-xs text-slate-400">JAMIS Farmer App v1.0.2</p>
                                <p className="text-[10px] text-slate-300 mt-1">Jigawa State Government</p>
                            </div>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
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
         className="fixed bottom-24 right-4 sm:right-6 lg:bottom-8 lg:right-8 z-40 w-12 h-12 sm:w-14 sm:h-14 bg-emerald-600 rounded-full shadow-xl shadow-emerald-500/40 flex items-center justify-center border-4 border-white hover:bg-emerald-700 transition-colors"
      >
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
      </motion.button>
    </div>
  );
}

export default App;
