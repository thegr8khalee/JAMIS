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
  Trees,
  Truck,
  Calendar,
  AlertOctagon,
  Warehouse,
  TrendingDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as ReTooltip, ResponsiveContainer,
  BarChart, Bar, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip as LeafletTooltip } from 'react-leaflet';
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
  { id: 1, type: 'ATTENTION', msg: 'AI Insight: Multiple identity registration needs review - ID #9928 (Hadejia)', time: '2m ago' },
  { id: 2, type: 'REVIEW', msg: 'Early Signal: Fertilizer stock variance at Dutse Depot', time: '15m ago' },
  { id: 3, type: 'INFO', msg: 'AI Insight: Soil moisture change in Zone B (Kazaure)', time: '45m ago' },
  { id: 4, type: 'ATTENTION', msg: 'Needs Attention: Possible unauthorized activity in Sector 4', time: '1h ago' },
  { id: 5, type: 'REVIEW', msg: 'Early Signal: Price change at Gujungu Market (Rice)', time: '3h ago' },
];

const DISTRIBUTION_LEDGER = [
    { id: 'TRK-2024-001', lga: 'Hadejia', item: 'NPK Fertilizer (Bags)', dispatched: 5000, received: 4850, status: 'Leakage', variance: '-150' },
    { id: 'TRK-2024-002', lga: 'Dutse', item: 'Improved Rice Seeds', dispatched: 2000, received: 2000, status: 'Verified', variance: '0' },
    { id: 'TRK-2024-003', lga: 'Kazaure', item: 'FMD Vaccines (Vials)', dispatched: 10000, received: 10000, status: 'Verified', variance: '0' },
    { id: 'TRK-2024-004', lga: 'Gumel', item: 'Solar Pumps', dispatched: 50, received: 48, status: 'Leakage', variance: '-2' },
];

const SEASONAL_INTELLIGENCE = [
    { activity: 'Sorghum Planting', window: 'May 15 - Jun 10', confidence: '94%', condition: 'Soil Moisture Optimal', status: 'Active' },
    { activity: 'Cattle Grazing (Zone C)', window: 'Nov 01 - Feb 28', confidence: '88%', condition: 'Biomass Adequate', status: 'Early Warning' },
    { activity: 'Dry Season Wheat', window: 'Nov 15 - Dec 20', confidence: '91%', condition: 'Temperature Favorable', status: 'Upcoming' },
];

const WAREHOUSE_STOCK = [
    { name: 'Dutse Central', capacity: '10000 MT', utilization: 85, items: [{ name: 'Fertilizer', count: '4500 Bags' }, { name: 'Seeds', count: '2100 Bags' }] },
    { name: 'Hadejia North', capacity: '8000 MT', utilization: 42, items: [{ name: 'Grains', count: '1200 MT' }, { name: 'Pesticides', count: '500 L' }] },
    { name: 'Birnin Kudu', capacity: '12000 MT', utilization: 91, items: [{ name: 'Fertilizer', count: '8000 Bags' }, { name: 'Tractors', count: '12 Units' }] },
];

const messages = [
  { id: 1, sender: 'bot', text: 'Good day. I am JAMIS AI. I can assist with policy analysis, agricultural data queries, and report generation. How may I be of service?' },
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
    { id: 'LS-293', type: 'Sheep', breed: 'Balami', owner: 'Aliyu Sani', lga: 'Dutse', health: 'Needs Review', lastVaccine: 'PPR - Pending' },
    { id: 'LS-294', type: 'Camel', breed: 'Ja', owner: 'Farouk Umar', lga: 'Kazaure', health: 'Healthy', lastVaccine: 'Anthrax - Dec 20' },
    { id: 'LS-295', type: 'Cattle', breed: 'White Fulani', owner: 'Yusuf Bala', lga: 'Hadejia', health: 'Urgent', lastVaccine: 'None' },
    { id: 'LS-296', type: 'Goat', breed: 'Red Sokoto', owner: 'Amina Lawal', lga: 'Ringim', health: 'Observed', lastVaccine: 'PPR - Jan 05' },
];

const VACCINE_DATA = [
    { lga: 'Hadejia', coverage: 85, target: 100 },
    { lga: 'Dutse', coverage: 72, target: 100 },
    { lga: 'Kazaure', coverage: 64, target: 100 },
    { lga: 'Gumel', coverage: 91, target: 100 },
    { lga: 'Ringim', coverage: 58, target: 100 },
];

const PASTURE_ZONES = [
    { name: 'Northern Grazing Planning Zone', status: 'Optimal', biomass: '4.2 ton/ha', alerts: 0 },
    { name: 'Hadejia Wetlands Planning Zone', status: 'Needs Review', biomass: '1.8 ton/ha', alerts: 2 },
    { name: 'Dutse Range Planning Zone', status: 'Needs Visit', biomass: '0.9 ton/ha', alerts: 5 },
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
  const center = [12.1800, 9.5300]; // Jigawa center approx

  // Mock data points
  const zones = [
    { id: 'A', lat: 12.35, lng: 9.30, vegetation: 98, pasture: 'High', flood: 'Safe', pollution: 'Low' },
    { id: 'B', lat: 11.95, lng: 9.90, vegetation: 85, pasture: 'Mod', flood: 'Risk', pollution: 'Med' },
    { id: 'C', lat: 12.45, lng: 9.80, vegetation: 92, pasture: 'Low', flood: 'Safe', pollution: 'High' },
    { id: 'D', lat: 12.10, lng: 9.20, vegetation: 75, pasture: 'High', flood: 'Risk', pollution: 'Low' },
  ];

  const getColor = (layer) => {
    switch(layer) {
      case 'vegetation': return '#10b981'; // emerald-500
      case 'pasture': return '#eab308'; // yellow-500
      case 'flood': return '#0ea5e9'; // sky-500
      case 'pollution': return '#f43f5e'; // rose-500
      default: return '#cbd5e1';
    }
  };

  return (
    <div className="relative w-full h-[500px] bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 group z-0">
       <MapContainer 
          center={center} 
          zoom={9} 
          style={{ height: '100%', width: '100%', background: '#0f172a' }}
          zoomControl={false}
          className="z-0"
       >
          <TileLayer
            attribution='&copy; Esri'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
          {/* Dark Overlay */}
          <div className="leaflet-bottom leaflet-left" style={{pointerEvents: 'none', width: '100%', height: '100%', background: 'rgba(15, 23, 42, 0.2)', zIndex: 400}}></div>
          
          {zones.map(zone => (
            <CircleMarker 
              key={zone.id}
              center={[zone.lat, zone.lng]}
              radius={20}
              pathOptions={{ 
                color: getColor(activeLayer), 
                fillColor: getColor(activeLayer), 
                fillOpacity: 0.4,
                weight: 2
              }}
            >
              <LeafletTooltip direction="top" offset={[0, -20]} opacity={1} permanent>
                 <div className="bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold shadow-sm whitespace-nowrap text-slate-800 border border-slate-200">
                    Planning Zone {zone.id}: {activeLayer === 'vegetation' ? `${zone.vegetation}% Yield` : activeLayer === 'pasture' ? zone.pasture : activeLayer === 'flood' ? zone.flood : zone.pollution}
                 </div>
              </LeafletTooltip>
            </CircleMarker>
          ))}
       </MapContainer>

       {/* Tech Grid Overlay */}
       <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100px_100px] z-[500]" />
       
       {/* Active Layer Indicator */}
       <div className="absolute top-4 right-4 pointer-events-none z-[500]">
           <div className={cn("px-3 py-1 rounded-full text-xs font-bold shadow-sm border uppercase backdrop-blur-md flex items-center gap-2", 
              activeLayer === 'vegetation' ? "bg-emerald-500/20 text-emerald-100 border-emerald-500/50" : 
              activeLayer === 'pasture' ? "bg-yellow-500/20 text-yellow-100 border-yellow-500/50" : 
              activeLayer === 'flood' ? "bg-sky-500/20 text-sky-100 border-sky-500/50" : 
              "bg-rose-500/20 text-rose-100 border-rose-500/50"
           )}>
              <div className={cn("w-2 h-2 rounded-full animate-pulse", 
                 activeLayer === 'vegetation' ? "bg-emerald-400" : activeLayer === 'pasture' ? "bg-yellow-400" : activeLayer === 'flood' ? "bg-sky-400" : "bg-rose-400"
              )}/>
              LIVE: {activeLayer}
           </div>
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
            text: "Searching the agricultural database... Analysis of Hadejia LGA yield data indicates a 15% increase in rice production compared to the previous fiscal year. Would you like a detailed PDF report generated for the Ministry?"
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
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <h3 className="font-semibold text-lg text-slate-800">Personal Information</h3>
                        <span className="text-xs font-medium px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full">Step 1 of 3</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-500 mb-1">Full Name *</label>
                            <input 
                                value={formData.name}
                                onChange={e => setFormData({...formData, name: e.target.value})}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" 
                                placeholder="e.g. Ibrahim Musa" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-500 mb-1 flex items-center gap-1">
                                NIN / BVN <span className="text-slate-400 text-xs">(Optional)</span>
                                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-slate-100 text-slate-400 text-[10px] cursor-help" title="Optional: Used only for data accuracy and identity verification">
                                    ?
                                </span>
                            </label>
                            <input 
                                value={formData.nin}
                                onChange={e => setFormData({...formData, nin: e.target.value})}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" 
                                placeholder="11-digit ID (optional)" 
                            />
                            <p className="text-[10px] text-slate-400 mt-1">For data accuracy only – not required for registration.</p>
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
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <h3 className="font-semibold text-lg text-slate-800">Farm Details</h3>
                        <span className="text-xs font-medium px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full">Step 2 of 3</span>
                    </div>
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
                    <div className="w-full flex justify-end mb-2">
                        <span className="text-xs font-medium px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full">Step 3 of 3</span>
                    </div>
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
                        <h3 className="font-semibold text-slate-800">Biometric Verification <span className="text-slate-400 text-xs font-normal">(Optional)</span></h3>
                        <p className="text-xs text-slate-500 mt-1">AI Face Match + Liveness Check</p>
                        <p className="text-[10px] text-slate-400 mt-1">Optional: Used for data accuracy only.</p>
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
            {/* JAMIS Mission Statement */}
            <div className="bg-gradient-to-r from-emerald-50 to-sky-50 border border-emerald-100 rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                    <Leaf className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                    <p className="text-sm text-slate-700"><strong>JAMIS</strong> helps the government plan, support farmers, and improve agriculture across Jigawa State.</p>
                    <p className="text-[10px] text-slate-400 mt-1">All AI insights are for guidance only. Final decisions are made by field officers.</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Total Tonnage" value="14,230 MT" trend="+12%" trendUp={true} icon={Leaf} color="bg-emerald-500" />
              <StatCard label="Warehouse Cap." value="82%" trend="-5%" trendUp={false} icon={LayoutDashboard} color="bg-indigo-500" />
              <StatCard label="Active Farmers" value="1,402" trend="+84" trendUp={true} icon={Users} color="bg-blue-500" />
              <StatCard label="Needs Attention" value="12" trend="+3" trendUp={false} icon={BrainCircuit} color="bg-amber-500" />
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
                                    <BrainCircuit className={cn("w-4 h-4 mt-0.5 shrink-0", item.type === 'ATTENTION' ? 'text-amber-500' : item.type === 'REVIEW' ? 'text-sky-500' : 'text-emerald-500')} />
                                    <div>
                                        <p className="text-sm text-slate-700 leading-tight font-medium">{item.msg}</p>
                                        <span className="text-[10px] text-slate-400 font-mono mt-1 block">{item.time}</span>
                                        <span className="text-[9px] text-slate-400 italic">For guidance only. Final decision by field officers.</span>
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
                    <div className="flex justify-between items-center mb-4">
                        <div>
                         <h2 className="text-xl font-bold text-slate-800">Market Price Radar</h2>
                         <p className="text-slate-500 text-sm">Comparing local Jigawa markets vs National Index</p>
                        </div>
                        <div className="flex gap-2">
                             <div className="flex items-center gap-2 text-sm text-slate-500"><div className="w-3 h-3 rounded-full bg-emerald-500"></div> Jigawa</div>
                             <div className="flex items-center gap-2 text-sm text-slate-500"><div className="w-3 h-3 rounded-full bg-sky-500"></div> National</div>
                        </div>
                    </div>
                    <div className="bg-sky-50 border border-sky-100 rounded-lg p-3 mb-4">
                        <p className="text-sm text-sky-800 flex items-start gap-2">
                            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-sky-200 text-sky-700 text-[10px] shrink-0 mt-0.5">?</span>
                            <span><strong>What this means:</strong> When Jigawa prices are higher than National, farmers may get better returns locally. When lower, planners may consider storage or export options.</span>
                        </p>
                    </div>
                    <p className="text-[10px] text-slate-400 italic mb-2">For guidance only. Final decision by field officers.</p>
                    
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
                                            <div className={`w-2 h-2 rounded-full ${z.status === 'Optimal' ? 'bg-emerald-500' : z.status === 'Needs Review' ? 'bg-yellow-500' : 'bg-amber-500'}`} />
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
                                <Activity className="w-5 h-5 text-emerald-500" /> Animal Health AI Insights
                                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-slate-100 text-slate-400 text-[10px] cursor-help" title="AI analyzes sensor data to provide early signals for animal health">
                                    ?
                                </span>
                            </h3>
                            <div className="space-y-3">
                                <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-xs font-bold text-amber-700 uppercase">Acoustic Sensor #402</span>
                                        <span className="text-[10px] text-amber-500">2m ago</span>
                                    </div>
                                    <p className="text-sm text-slate-700 font-medium">AI Insight: Possible respiratory change in Cattle herd (Zone A) – Needs Review for CBPP.</p>
                                    <p className="text-[9px] text-slate-400 italic mt-1">For guidance only. Final decision by field officers.</p>
                                </div>
                                <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-xs font-bold text-emerald-700 uppercase">Visual AI #119</span>
                                        <span className="text-[10px] text-emerald-500">15m ago</span>
                                    </div>
                                    <p className="text-sm text-slate-700 font-medium">AI Insight: Gait analysis normal for Sheep flock (Zone C). No concerns observed.</p>
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
                            <select className="text-xs bg-white border border-slate-200 rounded-lg px-2 py-1 text-slate-600">
                                <option>Export by LGA</option>
                                <option>Export by Type</option>
                                <option>Export by Health</option>
                                <option>Export by Date</option>
                            </select>
                            <button className="text-sm text-emerald-600 font-medium hover:underline px-2 py-1 bg-emerald-50 rounded-lg border border-emerald-100">Download Report</button>
                        </div>
                    </div>
                    <p className="text-[10px] text-slate-400 italic mb-3">For guidance only. Final decision by field officers.</p>
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
                                                row.health === 'Observed' ? 'bg-sky-100 text-sky-700' :
                                                row.health === 'Needs Review' ? 'bg-yellow-100 text-yellow-700' : 
                                                row.health === 'Urgent' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'
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
                        
                        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs text-amber-600 border border-amber-100 shadow-sm font-medium flex items-center gap-2">
                             <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                             Possible High Nitrogen Activity – Needs Review
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
      case 'seasonal':
        return (
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                            <Calendar className="text-indigo-600"/> AI Seasonal Planner
                        </h2>
                        <p className="text-slate-500">Predictive Intelligence for agricultural planning</p>
                    </div>
                    <div className="flex gap-2">
                        <select className="text-xs bg-white border border-slate-200 rounded-lg px-2 py-1 text-slate-600">
                            <option>All Activities</option>
                            <option>Planting</option>
                            <option>Grazing</option>
                            <option>Harvesting</option>
                        </select>
                        <button className="text-sm text-indigo-600 font-medium px-3 py-1 bg-indigo-50 rounded-lg border border-indigo-100 hover:bg-indigo-100 transition-colors">Download Calendar</button>
                    </div>
                </div>
                
                {/* Mission Note */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
                        <BrainCircuit className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-700"><strong>AI-Powered Planning:</strong> Seasonal predictions based on satellite data, weather patterns, and historical trends to help planners and farmers optimize activities.</p>
                        <p className="text-[10px] text-slate-400 mt-1">For guidance only. Final decisions by field officers and farmers.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Calendar Cards */}
                    <div className="lg:col-span-2 space-y-4">
                        {SEASONAL_INTELLIGENCE.map((item, idx) => (
                            <Card key={idx} className="relative overflow-hidden group hover:border-indigo-300 transition-colors">
                                <div className={cn("absolute left-0 top-0 bottom-0 w-1.5", 
                                    item.status === 'Active' ? "bg-emerald-500" : 
                                    item.status === 'Early Warning' ? "bg-amber-500" : "bg-sky-500"
                                )} />
                                
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pl-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="font-bold text-lg text-slate-800">{item.activity}</h3>
                                            <span className={cn("px-2 py-0.5 rounded text-xs font-bold uppercase",
                                                item.status === 'Active' ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : 
                                                item.status === 'Early Warning' ? "bg-amber-50 text-amber-700 border border-amber-100" : "bg-sky-50 text-sky-700 border border-sky-100"
                                            )}>{item.status}</span>
                                        </div>
                                        
                                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-3">
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="w-4 h-4" /> 
                                                <span><strong>Window:</strong> {item.window}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <BrainCircuit className="w-4 h-4 text-indigo-500" />
                                                <span><strong>AI Confidence:</strong> <span className="text-indigo-600 font-semibold">{item.confidence}</span></span>
                                            </div>
                                        </div>
                                        
                                        <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                                            <p className="text-sm text-slate-600"><strong>Current Condition:</strong> {item.condition}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex md:flex-col gap-2 md:items-end">
                                        <button className="text-xs text-slate-500 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors">View Details</button>
                                        <button className="text-xs text-indigo-600 px-3 py-1.5 bg-indigo-50 rounded-lg border border-indigo-100 hover:bg-indigo-100 transition-colors">Set Reminder</button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                        
                        {/* Additional Planned Activities */}
                        <Card className="border-dashed border-2 border-slate-200 bg-slate-50/50">
                            <div className="flex items-center justify-center gap-3 py-4 text-slate-400">
                                <Calendar className="w-5 h-5" />
                                <span className="text-sm font-medium">More seasonal activities loading from satellite data...</span>
                            </div>
                        </Card>
                    </div>

                    {/* Sidebar Info */}
                    <div className="lg:col-span-1 space-y-4">
                        {/* Data Sources */}
                        <Card>
                            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <Satellite className="w-4 h-4 text-sky-500" /> Data Sources
                            </h4>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                    <span className="text-sm text-slate-600">Sentinel-2 Satellite Imagery</span>
                                </div>
                                <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                    <span className="text-sm text-slate-600">Ground Sensors (4 Zones)</span>
                                </div>
                                <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                    <span className="text-sm text-slate-600">Weather Station Data</span>
                                </div>
                                <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg">
                                    <div className="w-2 h-2 rounded-full bg-sky-500"></div>
                                    <span className="text-sm text-slate-600">Historical Yield Records</span>
                                </div>
                            </div>
                        </Card>
                        
                        {/* Quick Stats */}
                        <Card>
                            <h4 className="font-bold text-slate-800 mb-4">Planning Summary</h4>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-emerald-50 rounded-lg p-3 text-center">
                                    <p className="text-2xl font-bold text-emerald-700">3</p>
                                    <p className="text-xs text-emerald-600">Active Windows</p>
                                </div>
                                <div className="bg-amber-50 rounded-lg p-3 text-center">
                                    <p className="text-2xl font-bold text-amber-700">1</p>
                                    <p className="text-xs text-amber-600">Early Signals</p>
                                </div>
                                <div className="bg-sky-50 rounded-lg p-3 text-center">
                                    <p className="text-2xl font-bold text-sky-700">2</p>
                                    <p className="text-xs text-sky-600">Upcoming</p>
                                </div>
                                <div className="bg-indigo-50 rounded-lg p-3 text-center">
                                    <p className="text-2xl font-bold text-indigo-700">89%</p>
                                    <p className="text-xs text-indigo-600">Avg Confidence</p>
                                </div>
                            </div>
                        </Card>
                        
                        {/* Help Tip */}
                        <div className="bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-100 rounded-xl p-4">
                            <div className="flex items-start gap-2">
                                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-sky-200 text-sky-700 text-[10px] shrink-0 mt-0.5">?</span>
                                <div>
                                    <p className="text-xs text-slate-600"><strong>How to use:</strong> Review activity windows and AI confidence levels. Plan field visits and resource allocation around predicted optimal periods.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
      case 'audit':
        return (
            <div className="space-y-6">
                <Card>
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        System Trust & Audit Log
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-slate-400 text-[10px] cursor-help" title="Shows who accessed what data, when, and why">
                            ?
                        </span>
                    </h2>
                    <p className="text-slate-500 mb-6">Transparent record of all system access and actions.</p>
                    
                    <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-xs font-bold">AM</div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <p className="text-sm font-medium text-slate-800">Aliyu Musa</p>
                                    <span className="text-[10px] text-slate-400 font-mono">Today, 10:23 AM</span>
                                </div>
                                <p className="text-xs text-slate-500">Viewed farmer records for <strong>Hadejia LGA</strong></p>
                                <p className="text-[10px] text-slate-400 mt-1">Purpose: Monthly farmer verification</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                            <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 text-xs font-bold">FI</div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <p className="text-sm font-medium text-slate-800">Fatima Ibrahim</p>
                                    <span className="text-[10px] text-slate-400 font-mono">Today, 09:15 AM</span>
                                </div>
                                <p className="text-xs text-slate-500">Downloaded livestock report for <strong>All LGAs</strong></p>
                                <p className="text-[10px] text-slate-400 mt-1">Purpose: Vaccination planning report</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 text-xs font-bold">SB</div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <p className="text-sm font-medium text-slate-800">Sani Bello</p>
                                    <span className="text-[10px] text-slate-400 font-mono">Yesterday, 04:45 PM</span>
                                </div>
                                <p className="text-xs text-slate-500">Registered new farmer in <strong>Dutse LGA</strong></p>
                                <p className="text-[10px] text-slate-400 mt-1">Purpose: New farmer enrollment</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-bold">YU</div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <p className="text-sm font-medium text-slate-800">Yusuf Usman</p>
                                    <span className="text-[10px] text-slate-400 font-mono">Yesterday, 02:30 PM</span>
                                </div>
                                <p className="text-xs text-slate-500">Exported market prices for <strong>Kazaure Zone</strong></p>
                                <p className="text-[10px] text-slate-400 mt-1">Purpose: Price comparison analysis</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-6 flex gap-2">
                        <select className="text-xs bg-white border border-slate-200 rounded-lg px-2 py-1 text-slate-600">
                            <option>Filter by User</option>
                            <option>Filter by Action</option>
                            <option>Filter by Date</option>
                            <option>Filter by LGA</option>
                        </select>
                        <button className="text-sm text-emerald-600 font-medium hover:underline px-2 py-1 bg-emerald-50 rounded-lg border border-emerald-100">Export Audit Log</button>
                    </div>
                </Card>
            </div>
        );
      case 'logistics':
        return (
            <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Unified Distribution Ledger */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                                <Truck className="text-emerald-600"/> Unified Distribution Ledger
                            </h2>
                            <div className="flex gap-2">
                                <select className="text-xs bg-white border border-slate-200 rounded-lg px-2 py-1 text-slate-600">
                                    <option>Export by LGA</option>
                                    <option>Export by Item</option>
                                    <option>Export by Status</option>
                                    <option>Export by Date</option>
                                </select>
                                <button className="text-sm text-emerald-600 font-medium hover:underline flex items-center gap-1 px-2 py-1 bg-emerald-50 rounded-lg border border-emerald-100">
                                    Download Report <ArrowLeft className="w-3 h-3 rotate-180" />
                                </button>
                            </div>
                        </div>
                        <Card className="p-0 overflow-hidden">
                            <table className="w-full text-left text-sm text-slate-600">
                                <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
                                    <tr>
                                        <th className="px-4 py-3">Tracking ID</th>
                                        <th className="px-4 py-3">LGA / Zone</th>
                                        <th className="px-4 py-3">Item</th>
                                        <th className="px-4 py-3">Dispatched / Received</th>
                                        <th className="px-4 py-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {DISTRIBUTION_LEDGER.map(row => (
                                        <tr key={row.id} className="hover:bg-slate-50 group transition-colors">
                                            <td className="px-4 py-3 font-mono text-xs text-slate-400">{row.id}</td>
                                            <td className="px-4 py-3 font-medium text-slate-800">{row.lga}</td>
                                            <td className="px-4 py-3 text-slate-600">{row.item}</td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium">{row.dispatched.toLocaleString()}</span>
                                                    <span className="text-slate-400">→</span>
                                                    <span className={cn("font-bold", row.variance.startsWith('-') ? "text-rose-600" : "text-emerald-600")}>
                                                        {row.received.toLocaleString()}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium border",
                                                    row.status === 'Verified' ? "bg-emerald-50 text-emerald-700 border-emerald-100" : 
                                                    "bg-rose-50 text-rose-700 border-rose-100"
                                                )}>
                                                    {row.status === 'Leakage' && <AlertOctagon className="w-3 h-3" />}
                                                    {row.status}
                                                    {row.status === 'Leakage' && <span className="ml-1">({row.variance})</span>}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Card>
                        
                         {/* Warehouse Inventory */}
                        <div className="mt-8">
                             <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
                                <Warehouse className="w-5 h-5 text-indigo-500" /> State Warehouse Inventory
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {WAREHOUSE_STOCK.map(wh => (
                                    <div key={wh.name} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-16 h-16 bg-slate-50 rounded-bl-full -mr-8 -mt-8 z-0"></div>
                                        <div className="relative z-10">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-bold text-slate-800">{wh.name}</h4>
                                                <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded border",
                                                    wh.utilization > 90 ? "bg-rose-50 text-rose-700 border-rose-100" : "bg-emerald-50 text-emerald-700 border-emerald-100"
                                                )}>{wh.utilization}% Full</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-slate-100 rounded-full mb-3 overflow-hidden">
                                                <div style={{ width: `${wh.utilization}%` }} className={cn("h-full rounded-full", wh.utilization > 90 ? "bg-rose-500" : "bg-indigo-500")} />
                                            </div>
                                            <div className="space-y-1">
                                                {wh.items.map((item, idx) => (
                                                    <div key={idx} className="flex justify-between text-xs">
                                                        <span className="text-slate-500">{item.name}</span>
                                                        <span className="font-mono font-medium text-slate-700">{item.count}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* AI Seasonal Calendar (Sidebar) */}
                    <div className="lg:col-span-1">
                        <Card className="h-full bg-slate-50/50">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="p-2 bg-emerald-100 rounded-lg">
                                    <Calendar className="w-5 h-5 text-emerald-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800">AI Seasonal Calendar</h3>
                                    <p className="text-xs text-slate-500">Predictive Intelligence</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {SEASONAL_INTELLIGENCE.map((item, idx) => (
                                    <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-emerald-300 transition-colors">
                                        <div className={cn("absolute left-0 top-0 bottom-0 w-1", 
                                            item.status === 'Active' ? "bg-emerald-500" : 
                                            item.status === 'Early Warning' ? "bg-amber-500" : "bg-sky-500"
                                        )} />
                                        
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-semibold text-slate-800 text-sm">{item.activity}</h4>
                                            <span className={cn("px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                                                 item.status === 'Active' ? "bg-emerald-50 text-emerald-700" : 
                                                 item.status === 'Early Warning' ? "bg-amber-50 text-amber-700" : "bg-sky-50 text-sky-700"
                                            )}>{item.status}</span>
                                        </div>
                                        
                                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                                            <Clock className="w-3 h-3" /> {item.window}
                                        </div>

                                        <div className="bg-slate-50 rounded-lg p-2 border border-slate-100">
                                            <div className="flex items-center gap-1.5 mb-1">
                                                <BrainCircuit className="w-3 h-3 text-indigo-500" />
                                                <span className="text-[10px] font-bold text-slate-400 uppercase">AI Confidence: <span className="text-slate-700">{item.confidence}</span></span>
                                            </div>
                                            <p className="text-xs text-slate-600 font-medium leading-tight">
                                                {item.condition}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 p-3 bg-sky-50 border border-sky-100 rounded-xl flex gap-3">
                                <Satellite className="w-8 h-8 text-sky-500 shrink-0" />
                                <div>
                                    <p className="text-xs text-sky-800 font-medium leading-tight">
                                        Data sourced from Sentinel-2 Satellite & ground sensors in 4 Zones.
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
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
    { icon: Truck, label: 'Logistics', view: 'logistics' },
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
           <SidebarItem icon={LayoutDashboard} label="Operations Center" active={activeView === 'dashboard'} onClick={() => setActiveView('dashboard')} collapsed={isSidebarCollapsed} />
           <SidebarItem icon={ScanFace} label="Registration" active={activeView === 'registration'} onClick={() => setActiveView('registration')} collapsed={isSidebarCollapsed} />
           <SidebarItem icon={Users} label="Farmers Directory" active={activeView === 'farmers' || activeView === 'farmer-detail'} onClick={() => setActiveView('farmers')} collapsed={isSidebarCollapsed} />
           <SidebarItem icon={Footprints} label="Livestock & Range" active={activeView === 'livestock'} onClick={() => setActiveView('livestock')} collapsed={isSidebarCollapsed} />
           <SidebarItem icon={BarChart3} label="Market Radar" active={activeView === 'market'} onClick={() => setActiveView('market')} collapsed={isSidebarCollapsed} />
           <SidebarItem icon={Calendar} label="Seasonal Planner" active={activeView === 'seasonal'} onClick={() => setActiveView('seasonal')} collapsed={isSidebarCollapsed} />
           <SidebarItem icon={Truck} label="Logistics & Inputs" active={activeView === 'logistics'} onClick={() => setActiveView('logistics')} collapsed={isSidebarCollapsed} />
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
            <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 border border-slate-200 rounded-full" title="AI assists with data analysis for planning support">
              <span className="relative flex h-1.5 w-1.5">
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
              </span>
              <span className="text-[10px] font-medium text-slate-500">AI Assist</span>
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
              <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-200 rounded-full" title="AI assists with data verification for planning support">
                  <span className="relative flex h-2 w-2">
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                  </span>
                  <span className="text-xs font-medium text-slate-500">AI Assist Active</span>
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

             {/* Footer */}
             <div className="mt-16 py-8 border-t border-slate-200/60 flex flex-col items-center justify-center text-center opacity-70 hover:opacity-100 transition-opacity">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Romana Group</h4>
                <p className="text-[10px] text-slate-400 font-medium tracking-wide bg-white/50 px-3 py-1 rounded-full border border-slate-100">
                    Presented by: <span className="text-emerald-700 font-bold">Ibrahim Babangida kani</span> • <span className="font-mono text-xs">+234 803 680 2214</span>
                </p>
             </div>
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
                                placeholder="Query aggregate data..." 
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
            className="fixed bottom-24 lg:bottom-6 right-4 lg:right-6 px-5 h-12 lg:h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg shadow-emerald-500/30 z-40 transition-transform hover:scale-105 flex items-center gap-2"
        >   
            <MessageSquare className="w-5 h-5 lg:w-6 lg:h-6" /> 
            <span className="font-bold text-sm sm:text-base">JAMIS AI</span>
        </button>

        {/* Mobile Bottom Navigation */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-200 flex items-center justify-around px-2 z-50 shadow-lg">
          {mobileNavItems.map((item) => {
            const isActive = item.view === 'more' 
              ? ['registration', 'climate', 'audit', 'seasonal'].includes(activeView)
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
                          onClick={() => { setActiveView('market'); setShowMoreMenu(false); }}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 text-slate-700"
                        >
                          <BarChart3 className="w-4 h-4 text-emerald-600" />
                          <span className="text-sm">Market Radar</span>
                        </button>
                        <button
                          onClick={() => { setActiveView('seasonal'); setShowMoreMenu(false); }}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 text-slate-700"
                        >
                          <Calendar className="w-4 h-4 text-indigo-500" />
                          <span className="text-sm">Seasonal Planner</span>
                        </button>
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
