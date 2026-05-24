import React, { useState, useEffect } from 'react';
import { PlayCircle, CheckCircle, Gift, Star, Calendar, Cpu, Shield, Zap, ChevronRight, Phone, Wifi, X, Lock, LogOut, Users, FileText, Activity } from 'lucide-react';
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy } from 'firebase/firestore';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { db, auth } from './firebase';

export default function App() {
  const [isAdminRoute, setIsAdminRoute] = useState(window.location.hash === '#admin');

  // Listen for URL changes to switch between Portfolio and Admin Dashboard
  useEffect(() => {
    const handleHashChange = () => setIsAdminRoute(window.location.hash === '#admin');
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (isAdminRoute) {
    return <AdminDashboard />;
  }

  return <Portfolio />;
}

// ==========================================
// ADMIN DASHBOARD COMPONENT
// ==========================================
function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Check if admin is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchLeads();
      } else {
        setIsLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError('Invalid email or password. Only authorized personnel.');
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setLeads([]);
  };

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const q = query(collection(db, "enrollments"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const leadsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLeads(leadsData);
    } catch (err) {
      console.error("Error fetching leads:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // RENDER LOGIN SCREEN IF NOT AUTHENTICATED
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-200">
          <div className="flex justify-center mb-6">
            <div className="bg-slate-900 p-4 rounded-full">
              <Lock className="w-8 h-8 text-orange-500" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">Admin Access</h2>
          <p className="text-slate-500 text-center text-sm mb-8">STEM Robotics Academy Central Command</p>
          
          {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 border border-red-100">{error}</div>}
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Admin Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Secure Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
            </div>
            <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-lg transition-colors mt-4">
              Authenticate
            </button>
          </form>
          <div className="mt-6 text-center">
             <a href="#" onClick={() => window.location.hash = ''} className="text-sm text-slate-500 hover:text-slate-800">← Back to Portfolio</a>
          </div>
        </div>
      </div>
    );
  }

  // RENDER ADMIN DASHBOARD IF AUTHENTICATED
  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white hidden md:flex flex-col">
        <div className="p-6 flex items-center space-x-3">
          <Cpu className="text-orange-500 w-8 h-8" />
          <span className="font-bold text-xl tracking-tight">SRA Admin</span>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <a href="#" className="flex items-center space-x-3 bg-slate-800 px-4 py-3 rounded-xl text-orange-400 font-medium">
            <Users className="w-5 h-5" /> <span>B2C Leads (Parents)</span>
          </a>
          <a href="#" className="flex items-center space-x-3 hover:bg-slate-800 px-4 py-3 rounded-xl text-slate-400 transition-colors opacity-50 cursor-not-allowed" title="Coming Soon">
            <FileText className="w-5 h-5" /> <span>B2B Schools</span>
          </a>
          <a href="#" className="flex items-center space-x-3 hover:bg-slate-800 px-4 py-3 rounded-xl text-slate-400 transition-colors opacity-50 cursor-not-allowed" title="Coming Soon">
            <Activity className="w-5 h-5" /> <span>B2B Colleges</span>
          </a>
        </nav>
        <div className="p-4">
          <button onClick={handleLogout} className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors w-full px-4 py-2">
            <LogOut className="w-5 h-5" /> <span>Secure Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center md:hidden">
          <div className="flex items-center space-x-2">
            <Cpu className="text-orange-500 w-6 h-6" />
            <span className="font-bold text-slate-900">SRA Admin</span>
          </div>
          <button onClick={handleLogout} className="text-slate-500 hover:text-slate-900">
            <LogOut className="w-5 h-5" />
          </button>
        </header>

        {/* Top Stats Bar */}
        <div className="p-8 pb-4">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Parent & Student Leads</h1>
              <p className="text-slate-500 text-sm mt-1">Reviewing submissions from the B2C Portfolio Funnel.</p>
            </div>
            <button onClick={fetchLeads} className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors flex items-center shadow-sm">
              <Zap className="w-4 h-4 mr-2 text-orange-500" /> Refresh Data
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">Total Leads (All Time)</p>
                <p className="text-3xl font-bold text-slate-900">{leads.length}</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-xl">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">Innovator Pack (₹2,999)</p>
                <p className="text-3xl font-bold text-slate-900">
                  {leads.filter(l => l.selectedPlan?.includes('2,999')).length}
                </p>
              </div>
              <div className="bg-orange-50 p-3 rounded-xl">
                <Star className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="flex-1 overflow-auto px-8 pb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {isLoading ? (
              <div className="p-12 text-center text-slate-500">Loading secure data...</div>
            ) : leads.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-slate-500 mb-2">No leads received yet.</p>
                <p className="text-sm text-slate-400">Deploy your portfolio to start capturing data.</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                    <th className="p-4 font-medium">Date Received</th>
                    <th className="p-4 font-medium">Parent Name</th>
                    <th className="p-4 font-medium">Contact</th>
                    <th className="p-4 font-medium">Child Name</th>
                    <th className="p-4 font-medium">Selected Plan</th>
                    <th className="p-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 text-sm text-slate-500">
                        {lead.timestamp ? new Date(lead.timestamp.toDate()).toLocaleDateString() : 'Just now'}
                      </td>
                      <td className="p-4 text-sm font-medium text-slate-900">{lead.parentName}</td>
                      <td className="p-4 text-sm text-slate-600">
                        <a href={`https://wa.me/91${lead.phone.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="flex items-center hover:text-green-600">
                           <Phone className="w-3 h-3 mr-1" /> {lead.phone}
                        </a>
                      </td>
                      <td className="p-4 text-sm text-slate-600">{lead.childName}</td>
                      <td className="p-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${lead.selectedPlan?.includes('2,999') ? 'bg-orange-100 text-orange-700 border border-orange-200' : 'bg-slate-100 text-slate-700 border border-slate-200'}`}>
                          {lead.selectedPlan || 'Not specified'}
                        </span>
                      </td>
                      <td className="p-4">
                        <button className="text-xs bg-slate-900 hover:bg-slate-800 text-white px-3 py-1 rounded transition-colors">
                          Mark Called
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// PUBLIC B2C PORTFOLIO COMPONENT
// ==========================================
function Portfolio() {
  // 1. VIDEO DATA LIST
  const videoData = [
    { id: 1, videoLink: "/videos/team1-dustbin.mp4", title: "Team A: Smart Dustbin", subtitle: "Students demonstrating their automated lid using ultrasonic sensors and Arduino logic." },
    { id: 2, videoLink: "/videos/team2-dustbin.mp4", title: "Team B: Smart Dustbin", subtitle: "A second group successfully executing the same complex hardware integration." },
    { id: 3, videoLink: "/videos/class-action.mp4", title: "Working on LED traffic light logic", subtitle: "Hands-on learning with LED traffic light logic and interactive hardware building." },
    { id: 4, videoLink: "/videos/experience.mp4", title: "The Boot Camp Experience", subtitle: "sharing their experience for the 2 days KIDS CODING BOOT CAMP." }
  ];

  // 2. FORM STATE MANAGEMENT
  const [formData, setFormData] = useState({ name: '', phone: '', childName: '', plan: 'Innovator + Kit (₹2,999)' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "enrollments"), {
        parentName: formData.name,
        phone: formData.phone,
        childName: formData.childName,
        selectedPlan: formData.plan,
        timestamp: serverTimestamp()
      });
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 4000);
      setFormData({ name: '', phone: '', childName: '', plan: 'Innovator + Kit (₹2,999)' });
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("There was an error submitting your form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 3. MAIN WEBSITE UI
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 scroll-smooth">
      {/* HEADER */}
      <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Cpu className="text-orange-500 w-8 h-8 md:w-8 md:h-8 w-6 h-6" />
            <div>
              <h1 className="text-lg md:text-xl font-bold leading-tight">STEM Robotics</h1>
              <p className="text-[10px] md:text-xs text-slate-400">Anakapalle, AP</p>
            </div>
          </div>
          <nav className="flex items-center space-x-4 md:space-x-6 text-sm font-medium">
            <a href="#portfolio" className="hidden md:block hover:text-orange-400 transition-colors">Videos</a>
            <a href="#offer" className="hover:text-orange-400 transition-colors">Plans & Pricing</a>
            <a href="#enroll" className="bg-orange-500 hover:bg-orange-600 text-white px-4 md:px-6 py-2 rounded-full font-semibold transition-colors duration-200 text-xs md:text-sm">
              Enroll Now
            </a>
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="/images/classroom.jpg" alt="Students working on robotics" className="w-full h-full object-cover" onError={(e) => e.target.src = "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"} />
        </div>
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-32 relative z-10 flex flex-col md:flex-row items-center">
          <div className="md:w-3/5 pr-0 md:pr-10">
            <div className="inline-block bg-orange-500/20 text-orange-400 font-semibold px-4 py-1 rounded-full mb-6 border border-orange-500/30">
              Boot Camp Success: The Smart Dustbin 🤖
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              Your Child Just Built a Robot. <span className="text-orange-500">Now What?</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl">
              Don't let their new skills fade! Turn their curiosity into real engineering talent with our Level 1 Weekend Innovators Club.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="#enroll" className="bg-orange-500 hover:bg-orange-600 text-center text-white px-8 py-4 rounded-lg font-bold text-lg transition-transform hover:scale-105 flex items-center justify-center">
                Enroll for Level 1 <ChevronRight className="ml-2 w-5 h-5" />
              </a>
              <a href="#portfolio" className="bg-slate-800 hover:bg-slate-700 text-center text-white border border-slate-600 px-8 py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center">
                <PlayCircle className="mr-2 w-5 h-5 text-orange-400" /> Watch Videos
              </a>
            </div>
          </div>
          <div className="md:w-2/5 mt-12 md:mt-0">
            <div className="rounded-2xl overflow-hidden border-4 border-slate-700 shadow-2xl relative">
              <img src="/images/student.jpg" alt="Student with circuit" className="w-full h-auto" onError={(e) => e.target.src = "https://images.unsplash.com/photo-1517077304055-6e89abf0ceb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 to-transparent p-6 pt-20">
                <p className="text-white font-semibold">Anakapalle Boot Camp: Day 2</p>
                <p className="text-orange-400 text-sm">Testing the Ultrasonic Sensor</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO / SOCIAL PROOF SECTION */}
      <section id="portfolio" className="py-20 bg-white scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-orange-100 text-orange-600 font-bold px-4 py-1 rounded-full mb-4">
              Real Student Results
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Proof of Local Innovation</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Watch our local Anakapalle students move from basic circuits to fully functioning automation in just 48 hours.</p>
          </div>
          
          <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-6 pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {videoData.map((video) => (
              <div key={video.id} className="min-w-[85vw] md:min-w-0 snap-center group rounded-2xl overflow-hidden shadow-lg bg-slate-50 border border-slate-100 hover:shadow-xl transition-shadow flex flex-col">
                <div className="aspect-[9/16] relative bg-black w-full">
                  <video controls className="absolute inset-0 w-full h-full object-contain" preload="metadata">
                    <source src={video.videoLink} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="p-6 grow flex flex-col justify-center">
                  <h3 className="font-bold text-xl text-slate-900 mb-2">{video.title}</h3>
                  <p className="text-slate-500 text-sm">{video.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-2 md:hidden text-slate-400 text-sm flex items-center justify-center">
             <ChevronRight className="w-4 h-4 mr-1 animate-pulse" /> Swipe to see more videos
          </div>
        </div>
      </section>

      {/* PRICING PLANS SECTION */}
      <section id="offer" className="py-20 bg-slate-900 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Choose Your Path</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Flexible enrollment options for the 4-Week Weekend Innovators Club.</p>
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-8 max-w-4xl mx-auto">
            {/* PLAN 1 */}
            <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 w-full md:w-1/2 flex flex-col">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Standard Entry</h3>
                <p className="text-slate-400 text-sm">Perfect for focused classroom learning.</p>
              </div>
              <div className="mb-8"><span className="text-4xl font-extrabold text-white">₹1,100</span></div>
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex text-slate-300"><CheckCircle className="w-5 h-5 text-green-500 mr-3 shrink-0" /> 4 Weeks of Weekend Classes (Sat & Sun)</li>
                <li className="flex text-slate-300"><CheckCircle className="w-5 h-5 text-green-500 mr-3 shrink-0" /> Learn C++ & Basic Electronics</li>
                <li className="flex text-slate-300"><CheckCircle className="w-5 h-5 text-green-500 mr-3 shrink-0" /> Use Academy Equipment during class time</li>
                <li className="flex text-slate-500 line-through opacity-50"><X className="w-5 h-5 text-red-400 mr-3 shrink-0" /> No Take-Home Hardware Kit</li>
              </ul>
              <a href="#enroll" onClick={() => setFormData({...formData, plan: 'Standard (₹1,100)'})} className="w-full block text-center bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-xl transition-colors">
                Select Standard
              </a>
            </div>

            {/* PLAN 2 */}
            <div className="bg-white rounded-3xl p-8 border-4 border-orange-500 w-full md:w-1/2 flex flex-col relative transform md:-translate-y-4 shadow-2xl">
              <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center shadow-lg">
                <Star className="w-4 h-4 mr-1 fill-current" /> MOST POPULAR
              </div>
              <div className="mb-8 mt-2">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Innovator Pack</h3>
                <p className="text-slate-500 text-sm">Best value. Keep practicing at home!</p>
              </div>
              <div className="mb-8"><span className="text-4xl font-extrabold text-slate-900">₹2,999</span></div>
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex text-slate-700 font-medium"><CheckCircle className="w-5 h-5 text-green-500 mr-3 shrink-0" /> Everything in Standard Entry</li>
                <li className="flex text-slate-900 font-bold bg-orange-50 p-2 rounded-lg -mx-2">
                  <Gift className="w-5 h-5 text-orange-500 mr-3 shrink-0" /> INCLUDES ₹1,930 Hardware Kit to take home!
                </li>
                <li className="flex text-slate-700"><CheckCircle className="w-5 h-5 text-green-500 mr-3 shrink-0" /> Arduino UNO R3, Sensors, Breadboard</li>
                <li className="flex text-slate-700"><CheckCircle className="w-5 h-5 text-green-500 mr-3 shrink-0" /> Practice projects at home anytime</li>
              </ul>
              <a href="#enroll" onClick={() => setFormData({...formData, plan: 'Innovator + Kit (₹2,999)'})} className="w-full block text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors shadow-lg">
                Select Innovator Pack
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CURRICULUM SECTION */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Level 1: Weekend Innovators Club</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">A 4-week structured curriculum designed to build logical thinking and real-world problem-solving skills.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { week: 1, title: 'Smart Streetlight', desc: 'Working with Light Dependent Resistors (LDRs) and analog signals.', icon: <Zap className="w-8 h-8 text-orange-500" /> },
              { week: 2, title: 'Laser Security Alarm', desc: 'Mastering C++ conditions, loops, and digital buzzers.', icon: <Shield className="w-8 h-8 text-orange-500" /> },
              { week: 3, title: 'Smart Plant Waterer', desc: 'Reading real-world environmental data with soil moisture sensors.', icon: <CheckCircle className="w-8 h-8 text-orange-500" /> },
              { week: 4, title: 'Radar Scanner', desc: 'Managing servo motors and real-time distance mapping.', icon: <Wifi className="w-8 h-8 text-orange-500" /> },
            ].map((item) => (
              <div key={item.week} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="bg-orange-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">{item.icon}</div>
                <div className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Week {item.week}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENROLLMENT FORM */}
      <section id="enroll" className="py-20 bg-white scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-orange-50 rounded-3xl p-8 md:p-12 border border-orange-100 flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">⚠️ Only 10 Seats Available</h2>
              <p className="text-slate-600 mb-6">Our weekend batches are kept small to ensure personal attention. Register today to secure your child's spot.</p>
              <div className="space-y-4">
                <div className="flex items-center text-slate-700"><Calendar className="w-5 h-5 text-orange-500 mr-3" /><span>Starts: Saturday, May 30th</span></div>
                <div className="flex items-center text-slate-700"><PlayCircle className="w-5 h-5 text-orange-500 mr-3" /><span>Format: 4 Weeks (Sat & Sun)</span></div>
              </div>
            </div>
            
            <div className="md:w-1/2 w-full">
              <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Secure Your Seat</h3>
                
                <div className="space-y-4">
                  {/* PLAN SELECTOR */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Select Batch Plan</label>
                    <div className="grid grid-cols-2 gap-3">
                      <label className={`border-2 rounded-lg p-3 cursor-pointer flex flex-col items-center text-center transition-colors ${formData.plan === 'Standard (₹1,100)' ? 'border-orange-500 bg-orange-50' : 'border-slate-200 hover:border-orange-300'}`}>
                        <input type="radio" name="plan" value="Standard (₹1,100)" className="hidden" onChange={(e) => setFormData({...formData, plan: e.target.value})} checked={formData.plan === 'Standard (₹1,100)'} />
                        <span className="font-bold text-slate-900 text-sm">Standard</span>
                        <span className="text-xs text-slate-500">₹1,100</span>
                      </label>
                      <label className={`border-2 rounded-lg p-3 cursor-pointer flex flex-col items-center text-center transition-colors ${formData.plan === 'Innovator + Kit (₹2,999)' ? 'border-orange-500 bg-orange-50' : 'border-slate-200 hover:border-orange-300'}`}>
                        <input type="radio" name="plan" value="Innovator + Kit (₹2,999)" className="hidden" onChange={(e) => setFormData({...formData, plan: e.target.value})} checked={formData.plan === 'Innovator + Kit (₹2,999)'} />
                        <span className="font-bold text-slate-900 text-sm">Innovator + Kit</span>
                        <span className="text-xs text-slate-500">₹2,999</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Parent's Name</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone / WhatsApp</label>
                    <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Child's Name</label>
                    <input type="text" required value={formData.childName} onChange={(e) => setFormData({...formData, childName: e.target.value})} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none" />
                  </div>
                  
                  <button type="submit" disabled={isSubmitting} className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center mt-6">
                    {isSubmitting ? 'Saving...' : (isSubmitted ? 'Request Sent!' : 'Confirm Selection & Call Me')}
                  </button>
                  <p className="text-xs text-center text-slate-500 mt-3">We will call you to confirm your seat and batch timings.</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 text-center">
        <div className="max-w-6xl mx-auto px-4">
          <Cpu className="text-orange-500 w-10 h-10 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">STEM Robotics Academy</h3>
          <p className="mb-6">Empowering the next generation of innovators in Anakapalle.</p>
          <div className="flex justify-center items-center space-x-6 text-sm">
            <a href="#" className="hover:text-orange-400 transition-colors flex items-center"><Phone className="w-4 h-4 mr-2"/> Call Us</a>
            <a href="#" className="hover:text-orange-400 transition-colors flex items-center"><Zap className="w-4 h-4 mr-2"/> WhatsApp</a>
            {/* HIDDEN ADMIN LINK */}
            <a href="#admin" className="hover:text-white transition-colors flex items-center ml-4 opacity-30 hover:opacity-100"><Lock className="w-3 h-3 mr-1"/> Admin</a>
          </div>
          <p className="mt-12 text-xs text-slate-600">© 2026 STEM Robotics Academy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}