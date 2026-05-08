import React from 'react';
import { 
  FaBoxes, FaShoppingCart, FaMoneyBillWave, FaArrowUp, FaArrowDown, FaEllipsisV 
} from "react-icons/fa";
import { BiSolidQuoteAltLeft } from "react-icons/bi";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';

// Mock Data for Analysis
const revenueData = [
  { name: 'Jan', revenue: 4000, orders: 240 },
  { name: 'Feb', revenue: 3000, orders: 198 },
  { name: 'Mar', revenue: 5000, orders: 300 },
  { name: 'Apr', revenue: 2780, orders: 190 },
  { name: 'May', revenue: 1890, orders: 150 },
  { name: 'Jun', revenue: 6390, orders: 420 },
];

const categoryData = [
  { name: '3D Printing', value: 400 },
  { name: 'Engraving', value: 300 },
  { name: 'Laser Cut', value: 300 },
  { name: 'CNC', value: 200 },
];

const COLORS = ['#5a46c2', '#4838a3', '#7c66e3', '#a855f7'];

export default function AnalysisDashboard() {
  const stats = [
    { label: "Total Revenue", value: "Rs 128,430", icon: <FaMoneyBillWave />, color: "#5a46c2", change: "+12.5%", trend: "up" },
    { label: "Active Projects", value: "43", icon: <FaBoxes />, color: "#4838a3", change: "+5.2%", trend: "up" },
    { label: "Conversion Rate", value: "3.2%", icon: <BiSolidQuoteAltLeft />, color: "#7c66e3", change: "-1.1%", trend: "down" },
  ];

  return (
    <div className="p-6 bg-slate-50 min-h-screen space-y-6 font-sans">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Executive Summary</h1>
          <p className="text-sm text-slate-500 font-medium">Real-time performance analytics for DNP 3D</p>
        </div>
        <div className="flex gap-2">
          <select className="bg-white border border-slate-200 text-sm font-bold px-4 py-2 rounded-xl focus:ring-2 focus:ring-[#5a46c2]/20 outline-none cursor-pointer">
            <option>Last 30 Days</option>
            <option>Last 6 Months</option>
            <option>Year to Date</option>
          </select>
        </div>
      </div>

      {/* Top Stats - Minimalist Design */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm group hover:border-[#5a46c2]/30 transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">{stat.label}</p>
                <h3 className="text-3xl font-black text-slate-800">{stat.value}</h3>
                <div className={`flex items-center mt-2 text-[10px] font-bold px-2 py-1 rounded-full w-fit ${
                  stat.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                }`}>
                  {stat.trend === 'up' ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
                  {stat.change} <span className="ml-1 opacity-60">vs prev.</span>
                </div>
              </div>
              <div className="p-3 rounded-xl text-white shadow-lg" style={{ backgroundColor: stat.color }}>
                {React.cloneElement(stat.icon, { size: 20 })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Area Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-slate-800 tracking-tight">Revenue Growth</h3>
            <button className="text-slate-400 hover:text-slate-600"><FaEllipsisV /></button>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5a46c2" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#5a46c2" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#5a46c2" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart Analysis */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
          <h3 className="font-bold text-slate-800 tracking-tight mb-4">Service Distribution</h3>
          <div className="flex-1 h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Custom Legend */}
          <div className="space-y-2 mt-4">
            {categoryData.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-slate-500">{item.name}</span>
                </div>
                <span className="text-slate-800">{item.value} units</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Quick Action Analysis Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-[#5a46c2] to-[#4838a3] p-8 rounded-3xl text-white relative overflow-hidden group">
          <div className="relative z-10">
            <h4 className="text-xl font-black mb-2">Efficiency Insight</h4>
            <p className="text-indigo-100 text-sm max-w-xs opacity-90">Your 3D Printing turnaround time improved by 14% this week. Keep up the optimization!</p>
          </div>
          <div className="absolute -right-8 -bottom-8 bg-white/10 p-12 rounded-full group-hover:scale-110 transition-transform duration-700" />
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                    <BiSolidQuoteAltLeft size={24} />
                </div>
                <div>
                    <p className="text-sm font-bold text-slate-800">Pending Quotes</p>
                    <p className="text-xs text-slate-400 font-medium">8 quotes need your attention</p>
                </div>
            </div>
            <button className="px-5 py-2 bg-slate-900 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-[#5a46c2] transition-all">
                Review Now
            </button>
        </div>
      </div>

    </div>
  );
}