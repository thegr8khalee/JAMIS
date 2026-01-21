import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  ShieldAlert, 
  Sprout, 
  Users, 
  BarChart3, 
  Settings, 
  Search, 
  Bell, 
  Satellite, 
  BrainCircuit,
  Map as MapIcon,
  Wind,
  AlertTriangle,
  Leaf,
  ScanFace,
  CheckCircle2,
  Menu,
  X,
  MessageSquare,
  Send,
  Loader2,
  QrCode,
  Package,
  Clock,
  Smartphone,
  Filter,
  ChevronRight,
  ArrowLeft,
  MapPin,
  Camera,
  Upload,
  Syringe,
  Stethoscope,
  Footprints,
  Activity,
  Trees
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as ReTooltip, ResponsiveContainer,
  BarChart, Bar, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utility ---
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- Mock Data ---

const cropHealthData = [
  { month: 'Jan', ndvi: 0.4, moisture: 30 },
  { month: 'Feb', ndvi: 0.35, moisture: 20 },
  { month: 'Mar', ndvi: 0.5, moisture: 45 },
  { month: 'Apr', ndvi: 0.7, moisture: 60 },
  { month: 'May', ndvi: 0.85, moisture: 75 },
  { month: 'Jun', ndvi: 0.8, moisture: 70 },
];

const marketData = [
  { subject: 'Maize', A: 120, B: 110, fullMark: 150 },
  { subject: 'Sorghum', A: 98, B: 130, fullMark: 150 },
  { subject: 'Rice', A: 86, B: 130, fullMark: 150 },
  { subject: 'Wheat', A: 99, B: 100, fullMark: 150 },
  { subject: 'Millet', A: 85, B: 90, fullMark: 150 },
  { subject: 'Soybean', A: 65, B: 85, fullMark: 150 },
];

const anomalies = [
  { id: 1, type: 'CRITICAL', msg: 'Multiple identity reg: ID #9928 (Hadejia)', time: '2m ago' },
  { id: 2, type: 'WARN', msg: 'Fertilizer stock variance: Dutse Depot', time: '15m ago' },
  { id: 3, type: 'INFO', msg: 'Soil moisture dip: Zone B (Kazaure)', time: '45m ago' },
  { id: 4, type: 'CRITICAL', msg: 'Illegal logging detected: Sector 4', time: '1h ago' },
  { id: 5, type: 'WARN', msg: 'Price surge: Gujungu Market (Rice)', time: '3h ago' },
];

const messages = [
  { id: 1, sender: 'bot', text: 'Sannu! I am JAMIS AI. How can I help with your harvest today?' },
];

const INITIAL_FARMERS = [
  { id: 1, name: "Ibrahim Musa", lga: "Hadejia", crop: "Rice", performance: "High", coop: "Arewa Rice", status: "Active" },
  { id: 2, name: "Fatima Aliyu", lga: "Dutse", crop: "Wheat", performance: "Average", coop: "Dutse Farmers", status: "Pending" },
  { id: 3, name: "Sani Bello", lga: "Kazaure", crop: "Sorghum", performance: "High", coop: "Kazaure Union", status: "Active" },
  { id: 4, name: "Yusuf Usman", lga: "Hadejia", crop: "Rice", performance: "Low", coop: "Arewa Rice", status: "Flagged" },
  { id: 5, name: "Amina Lawal", lga: "Dutse", crop: "Millet", performance: "Average", coop: "Dutse Farmers", status: "Active" },
  { id: 6, name: "Musa Garba", lga: "Gumel", crop: "Sesame", performance: "High", coop: "Gumel Exports", status: "Active" },
  { id: 7, name: "Zainab Abba", lga: "Ringim", crop: "Rice", performance: "High", coop: "Ringim Rice", status: "Active" },
  { id: 8, name: "Umar Farouk", lga: "Kazaure", crop: "Wheat", performance: "Low", coop: "Kazaure Union", status: "Review" },
];

const JIGAWA_LGAS = [
  "Auyo", "Babura", "Biriniwa", "Birnin Kudu", "Buji", "Dutse", 
  "Gagarawa", "Garki", "Gumel", "Guri", "Gwaram", "Gwiwa", 
  "Hadejia", "Jahun", "Kafin Hausa", "Kaugama", "Kazaure", 
  "Kiri Kasama", "Kiyawa", "Maigatari", "Malam Madori", "Miga", 
  "Ringim", "Roni", "Sule Tankarkar", "Taura", "Yankwashi"
];

// --- Mock Livestock Data ---
const LIVESTOCK_REGISTRY = [
    { id: 'LS-292', type: 'Cattle', breed: 'Gudali', owner: 'Musa Ibrahim', lga: 'Hadejia', health: 'Healthy', lastVaccine: 'FMD - Jan 10' },
    { id: 'LS-293', type: 'Sheep', breed: 'Balami', owner: 'Aliyu Sani', lga: 'Dutse', health: 'Review', lastVaccine: 'PPR - Pending' },
    { id: 'LS-294', type: 'Camel', breed: 'Ja', owner: 'Farouk Umar', lga: 'Kazaure', health: 'Healthy', lastVaccine: 'Anthrax - Dec 20' },
    { id: 'LS-295', type: 'Cattle', breed: 'White Fulani', owner: 'Yusuf Bala', lga: 'Hadejia', health: 'Critical', lastVaccine: 'None' },
    { id: 'LS-296', type: 'Goat', breed: 'Red Sokoto', owner: 'Amina Lawal', lga: 'Ringim', health: 'Healthy', lastVaccine: 'PPR - Jan 05' },
];

const VACCINE_DATA = [
    { lga: 'Hadejia', coverage: 85, target: 100 },
    { lga: 'Dutse', coverage: 72, target: 100 },
    { lga: 'Kazaure', coverage: 64, target: 100 },
    { lga: 'Gumel', coverage: 91, target: 100 },
    { lga: 'Ringim', coverage: 58, target: 100 },
];

const PASTURE_ZONES = [
    { name: 'Northern Grazing Reserve', status: 'Optimal', biomass: '4.2 ton/ha', alerts: 0 },
    { name: 'Hadejia Wetlands', status: 'Warning', biomass: '1.8 ton/ha', alerts: 2 },
    { name: 'Dutse Range', status: 'Critical', biomass: '0.9 ton/ha', alerts: 5 },
];

// --- Components ---

const SidebarItem = ({ icon: Icon, label, active, onClick, collapsed }) => (
  <button 
    onClick={onClick}
    className={cn(
      "flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group w-full",
      active ? "bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-sm" : "text-slate-500 hover:bg-slate-100 hover:text-slate-700",
      collapsed ? "justify-center" : "justify-start"
    )}
  >
    <Icon className="w-5 h-5" />
    {!collapsed && <span className="font-medium">{label}</span>}
    {active && !collapsed && <motion.div layoutId="active-pill" className="ml-auto w-1.5 h-1.5 bg-emerald-500 rounded-full" />}
  </button>
);

const Card = ({ children, className }) => (
  <div className={cn("glass-panel rounded-2xl p-6 bg-white border border-slate-200 shadow-sm", className)}>
    {children}
  </div>
);

const StatCard = ({ label, value, trend, trendUp, icon: Icon, color }) => (
  <Card className="relative overflow-hidden group">
    {/* Light themed background blob */}
    <div className={cn("absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-5 blur-xl group-hover:opacity-10 transition-opacity", color)} />
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">{label}</p>
        <h3 className="text-2xl font-bold text-slate-800 mt-1">{value}</h3>
      </div>
      <div className={cn("p-2 rounded-lg bg-slate-50", color.replace('bg-', 'text-'))}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
    <div className="flex items-center gap-2 text-sm">
      <span className={cn("font-medium", trendUp ? "text-emerald-600" : "text-rose-600")}>
        {trend}
      </span>
      <span className="text-slate-500">vs last week</span>
    </div>
  </Card>
);

const WarRoomMap = ({ activeLayer }) => {
  return (
    <div className="relative w-full h-[500px] bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 group">
      {/* Google Maps Satellite Base */}
      <div className="absolute inset-0">
        <iframe 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            scrolling="no" 
            marginHeight="0" 
            marginWidth="0" 
            src="https://maps.google.com/maps?q=Jigawa%20State%2C%20Nigeria&t=k&z=9&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full opacity-90 saturate-150 contrast-125 grayscale-[20%]"
            title="Jigawa Satellite Map"
        ></iframe>
        
        {/* Layer Overlays */}
        {activeLayer === 'vegetation' && (
            <div className="absolute inset-0 bg-emerald-500/20 mix-blend-overlay" />
        )}
      {activeLayer === 'pasture' && (
          <div className="absolute inset-0 bg-yellow-500/20 mix-blend-overlay" />
      )}
      {activeLayer === 'flood' && (
          <div className="absolute inset-0 bg-sky-500/20 mix-blend-overlay" />
      )}
      {activeLayer === 'pollution' && (
          <div className="absolute inset-0 bg-rose-500/20 mix-blend-overlay" />
      )}
      
      {/* Grid Overlay for Tech Feel */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100px_100px]" />
    </div>
    
    {/* Dynamic Data Hotspots */}
    <div className="absolute inset-0">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="absolute top-1/3 left-1/4"
        >
           <div className={cn("w-4 h-4 rounded-full animate-ping absolute opacity-75", 
              activeLayer === 'vegetation' ? "bg-emerald-500" : activeLayer === 'pasture' ? "bg-yellow-500" : activeLayer === 'flood' ? "bg-sky-500" : "bg-rose-500"
           )} />
           <div className={cn("w-3 h-3 rounded-full relative z-10 border-2 border-white shadow-sm", 
              activeLayer === 'vegetation' ? "bg-emerald-500" : activeLayer === 'pasture' ? "bg-yellow-500" : activeLayer === 'flood' ? "bg-sky-500" : "bg-rose-500"
           )} />
           <div className="absolute left-6 top-0 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold shadow-sm whitespace-nowrap">
               Zone A: {activeLayer === 'vegetation' ? '98% Yield' : activeLayer === 'pasture' ? 'High Biomass' : activeLayer === 'flood' ? 'Safe' : 'Normal'}
           </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute bottom-1/3 right-1/3"
        >
           <div className={cn("w-6 h-6 rounded-full animate-ping absolute opacity-75 duration-[3000ms]", 
              activeLayer === 'vegetation' ? "bg-emerald-500" : activeLayer === 'pasture' ? "bg-yellow-500" : activeLayer === 'flood' ? "bg-sky-500" : "bg-rose-500"
           )} />
           <div className={cn("w-4 h-4 rounded-full relative z-10 border-2 border-white shadow-sm", 
              activeLayer === 'vegetation' ? "bg-emerald-500" : activeLayer === 'pasture' ? "bg-yellow-500" : activeLayer === 'flood' ? "bg-sky-500" : "bg-rose-500"
           )} />
            <div className="absolute left-6 top-0 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold shadow-sm whitespace-nowrap">
               Zone B: {activeLayer === 'vegetation' ? 'Harvest Ready' : activeLayer === 'pasture' ? 'Moderate Grazing' : activeLayer === 'flood' ? 'Water Levels High' : 'Clear'}
           </div>
        </motion.div>

         <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute top-1/2 right-12"
        >
           <div className={cn("w-3 h-3 rounded-full animate-ping absolute opacity-75 duration-[1500ms]", 
              activeLayer === 'vegetation' ? "bg-emerald-500" : activeLayer === 'pasture' ? "bg-yellow-500" : activeLayer === 'flood' ? "bg-sky-500" : "bg-rose-500"
           )} />
           <div className={cn("w-2 h-2 rounded-full relative z-10 border-2 border-white shadow-sm", 
              activeLayer === 'vegetation' ? "bg-emerald-500" : activeLayer === 'pasture' ? "bg-yellow-500" : activeLayer === 'flood' ? "bg-sky-500" : "bg-rose-500"
           )} />
        </motion.div>
    </div>

    {/* Map Overlay UI */}
    <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
       {['Vegetation', 'Pasture', 'Flood SAR', 'Pollution'].map(layer => (
         <div key={layer} className="flex items-center gap-2 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full border border-slate-200 text-xs text-slate-600 shadow-sm cursor-pointer hover:bg-white transition-colors">
           <div className={cn("w-2 h-2 rounded-full", 
             layer === 'Vegetation' && activeLayer === 'vegetation' ? "bg-emerald-500 animate-pulse" : 
             layer === 'Pasture' && activeLayer === 'pasture' ? "bg-yellow-500 animate-pulse" :
             layer === 'Flood SAR' && activeLayer === 'flood' ? "bg-sky-500 animate-pulse" : 
             layer === 'Pollution' && activeLayer === 'pollution' ? "bg-rose-500 animate-pulse" : "bg-slate-300"
           )} />
           {layer}
         </div>
       ))}
    </div>
  </div>
  );
};

// --- App Component ---

export default function App() {
  const [farmers, setFarmers] = useState(INITIAL_FARMERS);
  const [activeView, setActiveView] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [mapLayer, setMapLayer] = useState('vegetation');
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [localMessages, setLocalMessages] = useState(messages);
  const [selectedFarmerId, setSelectedFarmerId] = useState(null);
  
  // Filter states
  const [filterLga, setFilterLga] = useState('All');
  const [filterCrop, setFilterCrop] = useState('All');
  const [filterPerf, setFilterPerf] = useState('All');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) setIsSidebarCollapsed(true);
      else setIsSidebarCollapsed(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const newMsg = { id: Date.now(), sender: 'user', text: chatInput };
    setLocalMessages([...localMessages, newMsg]);
    setChatInput('');
    
    // Mock Response
    setTimeout(() => {
        setLocalMessages(prev => [...prev, {
            id: Date.now() + 1,
            sender: 'bot',
            text: "Based on soil spectral analysis (Zone 4), I recommend nitrogen-rich fertilizer application within the next 48 hours before the expected rainfall."
        }]);
    }, 1500);
  };

  const RegistrationForm = () => {
    const [scanState, setScanState] = useState('idle'); // idle, scanning, complete
    const [formData, setFormData] = useState({ 
        name: '', nin: '', lga: '', 
        farmSize: '', coordinates: '', locationDesc: '', crops: '',
        images: [] 
    });
    
    const handleScan = () => {
        setScanState('scanning');
        setTimeout(() => setScanState('complete'), 3000);
    };

    const handleRegister = () => {
        if (!formData.name || !formData.lga || !formData.farmSize) {
            alert("Please fill in Name, LGA and Farm Size");
            return;
        }

        const newFarmer = {
            id: Date.now(),
            name: formData.name,
            lga: formData.lga,
            crop: formData.crops || "Yet to Plant",
            performance: "New", // Default
            coop: "Pending", // Default
            status: scanState === 'complete' ? "Active" : "Pending",
            farmSize: formData.farmSize,
            coordinates: formData.coordinates,
            images: formData.images
        };
        
        setFarmers([newFarmer, ...farmers]);
        alert(`Farmer ${newFarmer.name} registered successfully!`);
        setFormData({ name: '', nin: '', lga: '', farmSize: '', coordinates: '', locationDesc: '', crops: '', images: [] });
        setScanState('idle');
        setActiveView('farmers');
    };

    const getLocation = () => {
        // Simulation
        setFormData({...formData, coordinates: "12.0456° N, 9.5567° E"}); 
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setFormData(prev => ({
                ...prev,
                images: [...prev.images, url]
            }));
        }
    };

    return (
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-slate-800">
            <ScanFace className="text-emerald-600" /> New Farmer Registration
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                <Card className="space-y-4">
                    <h3 className="font-semibold text-lg text-slate-800 border-b border-slate-100 pb-2">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-500 mb-1">Full Name</label>
                            <input 
                                value={formData.name}
                                onChange={e => setFormData({...formData, name: e.target.value})}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" 
                                placeholder="e.g. Ibrahim Musa" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-500 mb-1">NIN / BVN</label>
                            <input 
                                value={formData.nin}
                                onChange={e => setFormData({...formData, nin: e.target.value})}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" 
                                placeholder="11-digit ID" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-500 mb-1">LGA / Ward</label>
                            <select 
                                value={formData.lga}
                                onChange={e => setFormData({...formData, lga: e.target.value})}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                            >
                                <option value="">Select LGA</option>
                                {JIGAWA_LGAS.map(lga => (
                                    <option key={lga} value={lga}>{lga}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </Card>

                <Card className="space-y-4">
                    <h3 className="font-semibold text-lg text-slate-800 border-b border-slate-100 pb-2">Farm Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-500 mb-1">Farm Size (Hectares)</label>
                            <input 
                                type="number"
                                value={formData.farmSize}
                                onChange={e => setFormData({...formData, farmSize: e.target.value})}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" 
                                placeholder="0.0" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-500 mb-1">Primary Crop</label>
                            <input 
                                value={formData.crops}
                                onChange={e => setFormData({...formData, crops: e.target.value})}
                                list="common-crops"
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" 
                                placeholder="Select or type..." 
                            />
                            <datalist id="common-crops">
                                <option value="Rice" />
                                <option value="Wheat" />
                                <option value="Sorghum" />
                                <option value="Millet" />
                                <option value="Sesame" />
                            </datalist>
                        </div>
                        <div className="md:col-span-2">
                             <label className="block text-sm font-medium text-slate-500 mb-1">GPS Coordinates</label>
                             <div className="flex gap-2">
                                <input 
                                    value={formData.coordinates}
                                    readOnly
                                    className="flex-1 bg-slate-100 border border-slate-200 rounded-lg px-4 py-2 text-slate-600 cursor-not-allowed" 
                                    placeholder="Latitude, Longitude" 
                                />
                                <button 
                                    onClick={getLocation}
                                    className="px-4 py-2 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-lg hover:bg-emerald-100 flex items-center gap-2 transition-colors"
                                >
                                    <MapPin className="w-4 h-4" /> Get Location
                                </button>
                             </div>
                        </div>
                         <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-500 mb-1">Farm Location Description</label>
                            <textarea
                                value={formData.locationDesc}
                                onChange={e => setFormData({...formData, locationDesc: e.target.value})}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" 
                                placeholder="Nearest landmark, village name, etc." 
                                rows="2"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-500 mb-1">Land Images</label>
                            <div 
                                onClick={() => document.getElementById('imageInput').click()}
                                className="border-2 border-dashed border-slate-200 rounded-lg p-6 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 hover:border-emerald-300 transition-colors cursor-pointer"
                            >
                                <Camera className="w-8 h-8 mb-2" />
                                <span className="text-sm">Click to upload or take photo</span>
                                <input 
                                    id="imageInput"
                                    type="file" 
                                    accept="image/*"
                                    className="hidden" 
                                    onChange={handleImageUpload}
                                />
                            </div>
                            
                            {formData.images.length > 0 && (
                                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                                    {formData.images.map((img, idx) => (
                                        <div key={idx} className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border border-slate-200">
                                            <img src={img} alt={`Farm ${idx}`} className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </Card>
            </div>

            <div className="lg:col-span-1">
                <Card className="flex flex-col items-center justify-center text-center space-y-4 bg-slate-50/50 sticky top-6">
                    <div className="relative w-32 h-32 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-slate-200 shadow-inner">
                        {scanState === 'idle' && <ScanFace className="w-12 h-12 text-slate-400" />}
                        {scanState === 'scanning' && (
                            <>
                                <motion.div 
                                    className="absolute inset-0 bg-emerald-500/20"
                                    animate={{ top: ['0%', '100%'] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                                    style={{ height: '4px', boxShadow: '0 0 10px #10b981' }}
                                />
                                <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
                            </>
                        )}
                        {scanState === 'complete' && <CheckCircle2 className="w-16 h-16 text-emerald-500" />}
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-800">Biometric Verification</h3>
                        <p className="text-xs text-slate-500 mt-1">AI Face Match + Liveness Check</p>
                    </div>
                    <button 
                        onClick={handleScan}
                        disabled={scanState !== 'idle'}
                        className="w-full px-4 py-2 bg-white hover:bg-slate-50 rounded-lg text-sm border border-slate-200 text-slate-700 transition-colors disabled:opacity-50 shadow-sm"
                    >
                        {scanState === 'idle' ? 'Start Scan' : scanState === 'scanning' ? 'Scanning...' : 'Verified'}
                    </button>
                    
                    <div className="w-full pt-6 border-t border-slate-200 mt-6">
                        <button 
                            onClick={handleRegister}
                            className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                        >
                            Complete Registration <Send className="w-4 h-4" />
                        </button>
                    </div>
                </Card>
            </div>
        </div>
      </div>
    );
  };

  const FarmersList = () => {
    const filteredFarmers = farmers.filter(f => {
        return (filterLga === 'All' || f.lga === filterLga) &&
               (filterCrop === 'All' || f.crop === filterCrop) &&
               (filterPerf === 'All' || f.performance === filterPerf);
    });

    const uniqueLgas = ['All', ...JIGAWA_LGAS];
    const uniqueCrops = ['All', ...new Set(farmers.map(f => f.crop))];
    const uniquePerf = ['All', 'High', 'Average', 'Low'];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Farmers Directory</h2>
                    <p className="text-slate-500">Manage and monitor farmer performance</p>
                </div>
                {/* Filters */}
                <div className="flex flex-wrap gap-2">
                    <select 
                        value={filterLga} onChange={e => setFilterLga(e.target.value)}
                        className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-2.5"
                    >
                        {uniqueLgas.map(l => <option key={l} value={l}>{l === 'All' ? 'All LGAs' : l}</option>)}
                    </select>
                    <select 
                        value={filterCrop} onChange={e => setFilterCrop(e.target.value)}
                        className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-2.5"
                    >
                        {uniqueCrops.map(c => <option key={c} value={c}>{c === 'All' ? 'All Crops' : c}</option>)}
                    </select>
                    <select 
                        value={filterPerf} onChange={e => setFilterPerf(e.target.value)}
                        className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-2.5"
                    >
                        {uniquePerf.map(p => <option key={p} value={p}>{p === 'All' ? 'All Performance' : p}</option>)}
                    </select>
                    <button className="p-2.5 bg-slate-100 rounded-lg text-slate-500 hover:bg-slate-200">
                        <Filter className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredFarmers.map(farmer => (
                    <Card 
                        key={farmer.id} 
                        className="group cursor-pointer hover:border-emerald-400 hover:shadow-md transition-all relative overflow-hidden"
                    >
                        <div onClick={() => { setSelectedFarmerId(farmer.id); setActiveView('farmer-detail'); }}>
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                                        {farmer.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-800">{farmer.name}</h3>
                                        <p className="text-xs text-slate-500">{farmer.lga} • {farmer.coop}</p>
                                    </div>
                                </div>
                                <div className={cn("px-2 py-1 rounded-full text-[10px] font-medium border",
                                    farmer.performance === 'High' ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                                    farmer.performance === 'Average' ? "bg-amber-50 text-amber-700 border-amber-100" :
                                    "bg-rose-50 text-rose-700 border-rose-100"
                                )}>
                                    {farmer.performance} Perf
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-xs font-medium px-2 py-1 bg-slate-50 rounded text-slate-600 border border-slate-100">{farmer.crop}</span>
                                <span className={cn("text-xs font-medium px-2 py-1 rounded border", 
                                    farmer.status === 'Active' ? "bg-sky-50 text-sky-700 border-sky-100" : 
                                    farmer.status === 'Flagged' ? "bg-rose-50 text-rose-700 border-rose-100" : "bg-slate-50 text-slate-500 border-slate-100"
                                )}>{farmer.status}</span>
                            </div>

                            <div className="flex items-center text-xs text-emerald-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                                View Portal <ChevronRight className="w-3 h-3 ml-1" />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
  };

  const FarmerPortal = () => {
    const farmer = farmers.find(f => f.id === selectedFarmerId) || farmers[0];

    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <button 
            onClick={() => setActiveView('farmers')}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-emerald-600 px-3 py-1.5 rounded-lg hover:bg-emerald-50 transition-colors mb-2"
        >
            <ArrowLeft className="w-4 h-4" /> Back to Farmers List
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-emerald-100 rounded-xl">
             <Smartphone className="w-8 h-8 text-emerald-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Farmer Experience Portal</h2>
            <p className="text-slate-500">Live View for: <span className="font-semibold text-emerald-600">{farmer.name}</span></p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Digital ID Wallet */}
            <div className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden aspect-[1.58/1]">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                
                <div className="flex justify-between items-start mb-8 relative z-10">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center">
                            <Leaf className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold tracking-wider">JAMIS ID</span>
                    </div>
                    <div className="px-2 py-1 bg-white/20 backdrop-blur rounded text-xs font-mono">VERIFIED</div>
                </div>

                <div className="flex gap-6 relative z-10">
                    <div className="w-24 h-24 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10 shrink-0">
                         <div className="text-2xl font-bold">{farmer.name.split(' ').map(n=>n[0]).join('')}</div>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold uppercase">{farmer.name}</h3>
                        <p className="text-emerald-100 text-sm mb-4">ID: JM-2024-{8000 + farmer.id}-XK</p>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-xs text-emerald-100/80">
                            <div>LGA</div>
                            <div className="text-white font-medium">{farmer.lga}</div>
                            <div>Cooperative</div>
                            <div className="text-white font-medium">{farmer.coop}</div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-between items-end relative z-10">
                    <div className="text-[10px] text-emerald-200/80 space-y-1">
                        <p>ISSUED BY JIGAWA STATE GOVT</p>
                        <p>VALID UNTIL: DEC 2028</p>
                    </div>
                    <div className="bg-white p-2 rounded-lg">
                        <QrCode className="w-12 h-12 text-slate-900" />
                    </div>
                </div>
            </div>

            {/* Input Request Tracker */}
            <Card className="h-full relative overflow-hidden">
                <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Package className="w-5 h-5 text-emerald-600" /> Input Allocation Status
                </h3>
                
                <div className="relative pl-4 space-y-8 before:absolute before:left-[27px] before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
                    
                    <div className="flex gap-4 relative">
                        <div className="w-6 h-6 rounded-full bg-emerald-500 border-4 border-white shadow-sm shrink-0 z-10 flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-800 text-sm">Request Submitted</h4>
                            <p className="text-xs text-slate-500 mt-0.5">NPK fertilizer (5 bags) & {farmer.crop} Seeds</p>
                            <span className="text-[10px] font-mono text-slate-400">Jan 12, 09:30 AM</span>
                        </div>
                    </div>

                    <div className="flex gap-4 relative">
                        <div className="w-6 h-6 rounded-full bg-emerald-500 border-4 border-white shadow-sm shrink-0 z-10 flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-800 text-sm">Approvals Cleared</h4>
                            <p className="text-xs text-slate-500 mt-0.5">Ward Officer & Cooperative Lead signed off</p>
                            <span className="text-[10px] font-mono text-slate-400">Jan 14, 02:15 PM</span>
                        </div>
                    </div>

                    <div className="flex gap-4 relative">
                        <div className="w-6 h-6 rounded-full bg-amber-400 border-4 border-white shadow-sm shrink-0 z-10 animate-pulse">
                        </div>
                        <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 -mt-2 w-full">
                            <h4 className="font-semibold text-amber-800 text-sm flex items-center gap-2">
                                <Clock className="w-3 h-3" /> Ready for Pickup
                            </h4>
                            <p className="text-xs text-amber-700 mt-1">
                                Your allocation is ready at <strong>{farmer.lga} Central Depot</strong>. 
                                Present QR code at Counter 4.
                            </p>
                        </div>
                    </div>
                </div>

                <button className="mt-8 w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-sm font-medium transition-colors">
                    View Allocation History
                </button>
            </Card>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Total Tonnage" value="14,230 MT" trend="+12%" trendUp={true} icon={Leaf} color="bg-emerald-500" />
              <StatCard label="Warehouse Cap." value="82%" trend="-5%" trendUp={false} icon={LayoutDashboard} color="bg-indigo-500" />
              <StatCard label="Active Farmers" value="1,402" trend="+84" trendUp={true} icon={Users} color="bg-blue-500" />
              <StatCard label="Risk Alerts" value="12" trend="+3" trendUp={false} icon={AlertTriangle} color="bg-rose-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                 <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2"><MapIcon className="w-5 h-5 text-emerald-600"/> Operational Map: Jigawa State</h2>
                    <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
                        {['vegetation', 'flood', 'pollution'].map(l => (
                            <button
                                key={l}
                                onClick={() => setMapLayer(l)}
                                className={cn(
                                    "px-3 py-1 text-xs rounded-md capitalize transition-all font-medium",
                                    mapLayer === l ? "bg-white text-slate-900 shadow-sm border border-slate-200" : "text-slate-500 hover:text-slate-700"
                                )}
                            >
                                {l}
                            </button>
                        ))}
                    </div>
                 </div>
                 <WarRoomMap activeLayer={mapLayer} />
              </div>
              
              <div className="space-y-6">
                 <Card className="h-full">
                    <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-emerald-600"/> Crop Health (NDVI)
                    </h3>
                    <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={cropHealthData}>
                                <defs>
                                    <linearGradient id="colorNdvi" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <ReTooltip 
                                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    itemStyle={{ color: '#1e293b' }}
                                />
                                <Area type="monotone" dataKey="ndvi" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorNdvi)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    
                    <div className="mt-6">
                        <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                           <ShieldAlert className="w-4 h-4 text-rose-500"/> Audit Log
                        </h3>
                        <div className="bg-slate-50 rounded-xl p-2 h-[200px] overflow-y-auto space-y-2 border border-slate-100">
                            {anomalies.map(item => (
                                <div key={item.id} className="flex gap-3 p-3 rounded-lg bg-white border border-slate-200 hover:border-slate-300 transition-colors shadow-sm">
                                    <AlertTriangle className={cn("w-4 h-4 mt-0.5 shrink-0", item.type === 'CRITICAL' ? 'text-rose-500' : 'text-amber-500')} />
                                    <div>
                                        <p className="text-sm text-slate-700 leading-tight font-medium">{item.msg}</p>
                                        <span className="text-[10px] text-slate-400 font-mono mt-1 block">{item.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                 </Card>
              </div>
            </div>
          </div>
        );
      case 'registration':
        return <RegistrationForm />;
      case 'farmers':
        return <FarmersList />;
      case 'farmer-detail':
        return <FarmerPortal />;
      case 'market':
        return (
             <div className="space-y-6">
                <Card>
                    <div className="flex justify-between items-center mb-6">
                        <div>
                         <h2 className="text-xl font-bold text-slate-800">Market Price Radar</h2>
                         <p className="text-slate-500 text-sm">Comparing local Jigawa markets vs National Index</p>
                        </div>
                        <div className="flex gap-2">
                             <div className="flex items-center gap-2 text-sm text-slate-500"><div className="w-3 h-3 rounded-full bg-emerald-500"></div> Jigawa</div>
                             <div className="flex items-center gap-2 text-sm text-slate-500"><div className="w-3 h-3 rounded-full bg-sky-500"></div> National</div>
                        </div>
                    </div>
                    
                    <div className="h-[400px] w-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={marketData}>
                            <PolarGrid stroke="#e2e8f0" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 150]} stroke="#cbd5e1" />
                            <Radar name="Jigawa" dataKey="A" stroke="#10b981" strokeWidth={2} fill="#10b981" fillOpacity={0.3} />
                            <Radar name="National" dataKey="B" stroke="#0ea5e9" strokeWidth={2} fill="#0ea5e9" fillOpacity={0.3} />
                            <ReTooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px' }} itemStyle={{ color: '#1e293b' }} />
                            <Legend />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
             </div>
        );
      case 'livestock':
        return (
             <div className="space-y-6">
                 {/* Header & Map */}
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                         <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                                <Footprints className="text-emerald-600"/> Livestock & Rangeland Monitor
                            </h2>
                            <div className="flex gap-2 text-sm">
                                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded font-bold">Biomass: 1.2M Tons</span>
                                <span className="px-2 py-1 bg-sky-100 text-sky-700 rounded font-bold">Vaccine Cov: 74%</span>
                            </div>
                         </div>
                         <Card className="h-[400px] p-0 overflow-hidden relative border-slate-200">
                             <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur p-2 rounded-lg shadow-sm">
                                <h4 className="text-xs font-bold text-slate-500 uppercase">Pasture Biomass Map</h4>
                                <div className="flex flex-col gap-1 mt-2">
                                    {PASTURE_ZONES.map(z => (
                                        <div key={z.name} className="flex items-center gap-2 text-xs">
                                            <div className={`w-2 h-2 rounded-full ${z.status === 'Optimal' ? 'bg-emerald-500' : z.status === 'Warning' ? 'bg-yellow-500' : 'bg-rose-500'}`} />
                                            <span className="text-slate-700">{z.name} ({z.biomass})</span>
                                        </div>
                                    ))}
                                </div>
                             </div>
                             <WarRoomMap activeLayer="pasture" />
                         </Card>
                    </div>
                    
                     {/* Animal Health AI */}
                    <div className="space-y-6">
                        <Card className="items-start">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-3">
                                <Activity className="w-5 h-5 text-rose-500" /> Animal Health AI
                            </h3>
                            <div className="space-y-3">
                                <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-xs font-bold text-rose-700 uppercase">Acoustic Sensor #402</span>
                                        <span className="text-[10px] text-rose-500">2m ago</span>
                                    </div>
                                    <p className="text-sm text-slate-700 font-medium">Warning: Respiratory distress detected in Cattle herd (Zone A). Possible CBPP indicator.</p>
                                </div>
                                <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-xs font-bold text-emerald-700 uppercase">Visual AI #119</span>
                                        <span className="text-[10px] text-emerald-500">15m ago</span>
                                    </div>
                                    <p className="text-sm text-slate-700 font-medium">Gait analysis normal for Sheep flock (Zone C). No signs of foot rot.</p>
                                </div>
                            </div>
                        </Card>

                        {/* Vaccine Tracker */}
                        <Card>
                             <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
                                <Syringe className="w-5 h-5 text-sky-500" /> Vax Tracker (FMD/PPR)
                            </h3>
                            <div className="space-y-3">
                                {VACCINE_DATA.slice(0, 3).map(d => (
                                    <div key={d.lga}>
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="font-medium text-slate-700">{d.lga}</span>
                                            <span className="text-slate-500">{d.coverage}%</span>
                                        </div>
                                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div style={{ width: `${d.coverage}%` }} className={`h-full rounded-full ${d.coverage > 80 ? 'bg-emerald-500' : d.coverage > 60 ? 'bg-yellow-500' : 'bg-rose-500'}`} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                 </div>

                 {/* Livestock Registry */}
                 <Card>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                             <Trees className="w-5 h-5 text-emerald-600" /> Livestock ID Registry
                        </h3>
                        <div className="flex gap-2">
                            <button className="text-sm text-emerald-600 font-medium hover:underline">Download Report</button>
                        </div>
                    </div>
                     <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-600">
                            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
                                <tr>
                                    <th className="px-4 py-3">Tag ID</th>
                                    <th className="px-4 py-3">Type / Breed</th>
                                    <th className="px-4 py-3">Owner</th>
                                    <th className="px-4 py-3">LGA</th>
                                    <th className="px-4 py-3">Health Status</th>
                                    <th className="px-4 py-3">Last Vax</th>
                                    <th className="px-4 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {LIVESTOCK_REGISTRY.map(row => (
                                    <tr key={row.id} className="hover:bg-slate-50 group transition-colors">
                                        <td className="px-4 py-3 font-mono text-emerald-700 font-medium">{row.id}</td>
                                        <td className="px-4 py-3 text-slate-800 font-medium">
                                            {row.type} <span className="text-slate-400 font-normal">({row.breed})</span>
                                        </td>
                                        <td className="px-4 py-3">{row.owner}</td>
                                        <td className="px-4 py-3">{row.lga}</td>
                                        <td className="px-4 py-3">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                                row.health === 'Healthy' ? 'bg-emerald-100 text-emerald-700' : 
                                                row.health === 'Critical' ? 'bg-rose-100 text-rose-700' : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                                {row.health}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">{row.lastVaccine}</td>
                                        <td className="px-4 py-3">
                                            <button className="p-1 hover:bg-emerald-50 rounded text-emerald-600"><Stethoscope className="w-4 h-4"/></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                 </Card>
             </div>
        );
      case 'climate':
        return (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-800"><Wind className="w-5 h-5 text-sky-500"/> Pollution Heatmap</h2>
                    <div className="h-[300px] bg-slate-900 rounded-xl relative overflow-hidden flex items-center justify-center border border-slate-200">
                        {/* Google Satellite Map */}
                        <iframe 
                            width="100%" 
                            height="100%" 
                            frameBorder="0" 
                            scrolling="no" 
                            marginHeight="0" 
                            marginWidth="0" 
                            src="https://maps.google.com/maps?q=Hadejia%2C%20Nigeria&t=k&z=10&ie=UTF8&iwloc=&output=embed"
                            className="w-full h-full opacity-60 grayscale-[50%] contrast-125"
                            title="Pollution Heatmap Map"
                        ></iframe>

                        {/* Interactive Heatmap Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/10 via-transparent to-amber-500/10 mix-blend-overlay pointer-events-none" />
                        
                        {/* Dynamic Heat Zones */}
                        <div className="absolute inset-0 pointer-events-none">
                             <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-rose-500/30 rounded-full blur-3xl animate-pulse mix-blend-color-dodge"></div>
                             <div className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-amber-500/30 rounded-full blur-2xl animate-pulse delay-700 mix-blend-color-dodge"></div>
                             
                             {/* Data Points */}
                             <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute top-[28%] right-[28%] w-4 h-4 bg-rose-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center cursor-help pointer-events-auto"
                                title="Runoff Level: Critical"
                             >
                                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                             </motion.div>
                        </div>
                        
                        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs text-rose-600 border border-rose-100 shadow-sm font-medium flex items-center gap-2">
                             <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                             High Nitrogen Runoff Detected
                        </div>
                    </div>
                </Card>
                <Card>
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-800"><Sprout className="w-5 h-5 text-emerald-600"/> Deforestation Tracking</h2>
                    <div className="h-[300px]">
                         <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={[
                                { zone: 'Zone A', preserved: 85, loss: 15 },
                                { zone: 'Zone B', preserved: 60, loss: 40 },
                                { zone: 'Zone C', preserved: 92, loss: 8 },
                                { zone: 'Zone D', preserved: 75, loss: 25 },
                            ]}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis dataKey="zone" stroke="#64748b" tickLine={false} axisLine={false} />
                                <YAxis stroke="#64748b" tickLine={false} axisLine={false} />
                                <ReTooltip cursor={{fill: '#f1f5f9'}} contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px' }} />
                                <Legend />
                                <Bar dataKey="preserved" name="Preserved Cover" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} />
                                <Bar dataKey="loss" name="Forest Loss" stackId="a" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
             </div>
        );
      default:
        return <div className="text-center text-slate-400 py-20">Module Under Construction</div>;
    }
  };

  // Mobile navigation items
  const mobileNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', view: 'dashboard' },
    { icon: Users, label: 'Farmers', view: 'farmers' },
    { icon: Footprints, label: 'Livestock', view: 'livestock' },
    { icon: BarChart3, label: 'Market', view: 'market' },
    { icon: Menu, label: 'More', view: 'more' }
  ];

  const [showMoreMenu, setShowMoreMenu] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-900 font-sans selection:bg-emerald-500/20">
        
      {/* Desktop Sidebar - Hidden on mobile */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarCollapsed ? 80 : 280 }}
        className="hidden lg:flex h-full bg-white border-r border-slate-200 flex-col z-20 relative shadow-md"
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center shrink-0 shadow-sm">
             <div className="w-4 h-4 bg-white rounded-full" />
          </div>
          {!isSidebarCollapsed && (
            <div className="flex flex-col">
                <motion.h1 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="text-2xl font-black tracking-tighter text-slate-900 font-sans"
                >
                    JAMIS
                </motion.h1>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold font-sans">by Romana Group</span>
            </div>
          )}
        </div>

        <nav className="flex-1 px-4 space-y-2 py-4">
           <SidebarItem icon={LayoutDashboard} label="War Room" active={activeView === 'dashboard'} onClick={() => setActiveView('dashboard')} collapsed={isSidebarCollapsed} />
           <SidebarItem icon={ScanFace} label="Registration" active={activeView === 'registration'} onClick={() => setActiveView('registration')} collapsed={isSidebarCollapsed} />
           <SidebarItem icon={Users} label="Farmers Directory" active={activeView === 'farmers' || activeView === 'farmer-detail'} onClick={() => setActiveView('farmers')} collapsed={isSidebarCollapsed} />
           <SidebarItem icon={Footprints} label="Livestock & Range" active={activeView === 'livestock'} onClick={() => setActiveView('livestock')} collapsed={isSidebarCollapsed} />
           <SidebarItem icon={BarChart3} label="Market Radar" active={activeView === 'market'} onClick={() => setActiveView('market')} collapsed={isSidebarCollapsed} />
           <SidebarItem icon={Wind} label="Climate Monitor" active={activeView === 'climate'} onClick={() => setActiveView('climate')} collapsed={isSidebarCollapsed} />
           <SidebarItem icon={ShieldAlert} label="Trust & Audit" active={activeView === 'audit'} onClick={() => setActiveView('audit')} collapsed={isSidebarCollapsed} />
        </nav>

        <div className="p-4 border-t border-slate-100">
           <SidebarItem icon={Settings} label="System Config" onClick={() => {}} collapsed={isSidebarCollapsed} />
           <button 
             onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
             className="mt-2 w-full flex items-center justify-center p-2 text-slate-400 hover:text-slate-600 transition-colors"
           >
              {isSidebarCollapsed ? <Menu className="w-5 h-5"/> : <div className="text-xs uppercase font-bold tracking-widest flex items-center gap-2"><div className="w-full h-px bg-slate-200"/> Collapse</div>}
           </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden grid-bg">
        
        {/* Mobile Header - Only visible on mobile */}
        <header className="lg:hidden h-16 border-b border-slate-200 bg-white flex items-center justify-between px-4 z-10 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center shrink-0 shadow-sm">
              <div className="w-4 h-4 bg-white rounded-full" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-black tracking-tighter text-slate-900">JAMIS</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-50 border border-emerald-100 rounded-full">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-semibold text-emerald-700">AI ACTIVE</span>
            </div>
            <button className="relative p-2 text-slate-500 hover:text-emerald-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
            </button>
          </div>
        </header>

        {/* Desktop Topbar - Hidden on mobile */}
        <header className="hidden lg:flex h-16 border-b border-slate-200 bg-white/80 backdrop-blur-sm items-center justify-between px-6 z-10 shadow-sm">
           <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-semibold text-emerald-700">AI INTEGRITY: ACTIVE</span>
              </div>
              <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-sky-50 border border-sky-100 rounded-full">
                  <Satellite className="w-3 h-3 text-sky-500" />
                  <span className="text-xs font-semibold text-sky-700">SAT-LINK: OPTIMAL</span>
              </div>
           </div>

           <div className="flex items-center gap-4">
               <div className="relative hidden md:block">
                   <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                   <input type="text" placeholder="Search data, farms, IDs..." className="w-64 bg-slate-100 border border-slate-200 rounded-full pl-9 pr-4 py-1.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" />
               </div>
               <button className="relative p-2 text-slate-500 hover:text-emerald-600 transition-colors">
                   <Bell className="w-5 h-5" />
                   <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
               </button>
               <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white shadow-sm" />
           </div>
        </header>

        {/* Scrollable View Area */}
        <div className="flex-1 overflow-y-auto p-4 pb-24 lg:pb-8 lg:p-8 scroll-smooth">
           <div className="max-w-7xl mx-auto">
             <motion.div
               key={activeView}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.3 }}
             >
                {renderContent()}
             </motion.div>
           </div>
        </div>

        {/* JAMIS AI Bubble - Full screen on mobile, panel on desktop */}
        <AnimatePresence>
            {chatOpen && (
                <motion.div 
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    className="fixed lg:absolute inset-0 lg:inset-auto lg:bottom-20 lg:right-6 lg:w-96 lg:h-[450px] bg-white lg:border lg:border-slate-200 lg:rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 lg:glass-panel"
                >
                    <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-emerald-50">
                        <div className="flex items-center gap-2">
                            <BrainCircuit className="w-5 h-5 text-emerald-600" />
                            <h3 className="font-semibold text-slate-800">JAMIS AI</h3>
                        </div>
                        <button onClick={() => setChatOpen(false)} className="p-2 hover:bg-emerald-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors"><X className="w-5 h-5"/></button>
                    </div>
                    
                    <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50">
                        {localMessages.map(msg => (
                            <div key={msg.id} className={cn("flex", msg.sender === 'user' ? "justify-end" : "justify-start")}>
                                <div className={cn("max-w-[80%] p-3 rounded-2xl text-sm shadow-sm", 
                                    msg.sender === 'user' ? "bg-emerald-600 text-white rounded-tr-none" : "bg-white text-slate-700 rounded-tl-none border border-slate-200")}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-3 bg-white border-t border-slate-100">
                        <div className="flex gap-2">
                            <input 
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder="Ask about crops, pests..." 
                                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none" 
                            />
                            <button onClick={handleSendMessage} className="p-2 bg-emerald-600 rounded-xl hover:bg-emerald-700 text-white shadow-sm"><Send className="w-4 h-4"/></button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
        
        <button 
            onClick={() => setChatOpen(!chatOpen)}
            className="absolute bottom-24 lg:bottom-6 right-4 lg:right-6 p-3 lg:p-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg shadow-emerald-500/30 z-40 transition-transform hover:scale-105"
        >
            <MessageSquare className="w-5 h-5 lg:w-6 lg:h-6" />
        </button>

        {/* Mobile Bottom Navigation */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-200 flex items-center justify-around px-2 z-50 shadow-lg">
          {mobileNavItems.map((item) => {
            const isActive = item.view === 'more' 
              ? ['registration', 'climate', 'audit'].includes(activeView)
              : activeView === item.view || (item.view === 'farmers' && activeView === 'farmer-detail');
            
            if (item.view === 'more') {
              return (
                <div key={item.view} className="relative">
                  <button
                    onClick={() => setShowMoreMenu(!showMoreMenu)}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
                      isActive ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-[10px] mt-1 font-medium">{item.label}</span>
                  </button>
                  
                  <AnimatePresence>
                    {showMoreMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-full right-0 mb-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden"
                      >
                        <button
                          onClick={() => { setActiveView('registration'); setShowMoreMenu(false); }}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 text-slate-700"
                        >
                          <ScanFace className="w-4 h-4 text-emerald-600" />
                          <span className="text-sm">Registration</span>
                        </button>
                        <button
                          onClick={() => { setActiveView('climate'); setShowMoreMenu(false); }}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 text-slate-700"
                        >
                          <Wind className="w-4 h-4 text-sky-500" />
                          <span className="text-sm">Climate Monitor</span>
                        </button>
                        <button
                          onClick={() => { setActiveView('audit'); setShowMoreMenu(false); }}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 text-slate-700"
                        >
                          <ShieldAlert className="w-4 h-4 text-rose-500" />
                          <span className="text-sm">Trust & Audit</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }
            
            return (
              <button
                key={item.view}
                onClick={() => { setActiveView(item.view); setShowMoreMenu(false); }}
                className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
                  isActive 
                    ? 'text-emerald-600' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform`} />
                <span className="text-[10px] mt-1 font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="mobileNavIndicator"
                    className="absolute -bottom-0.5 w-8 h-0.5 bg-emerald-600 rounded-full"
                  />
                )}
              </button>
            );
          })}
        </nav>

      </main>
    </div>
  );
}
