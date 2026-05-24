import React, { useState, useEffect } from 'react';
import { 
  PlayCircle, CheckCircle, Gift, Star, Calendar, Cpu, Shield, Zap, ChevronRight, 
  Phone, Wifi, X, Lock, LogOut, Users, FileText, Activity,
  BookOpen, Award, Briefcase, Rocket, Target, Wrench, Trophy, Building, TrendingUp, Lightbulb,
  GraduationCap, Terminal, Network, Code, FileCode2, Presentation
} from 'lucide-react';
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy } from 'firebase/firestore';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { db, auth } from './firebase';

// ==========================================
// 1. MAIN APP ROUTER
// ==========================================
export default function App() {
  const [route, setRoute] = useState(window.location.hash || '#');

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash || '#');
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  switch (route) {
    case '#school':
      return <SchoolPortfolio />;
    case '#college':
      return <CollegePortfolio />;
    case '#admin':
      return <AdminDashboard />;
    default:
      return <Portfolio />; 
  }
}

// ==========================================
// 2. ENHANCED B2B SCHOOL PORTFOLIO
// ==========================================
function SchoolPortfolio() {
  const [formData, setFormData] = useState({ schoolName: '', contactName: '', role: 'Principal / Director', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSchoolSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "school_leads"), {
        schoolName: formData.schoolName,
        contactName: formData.contactName,
        role: formData.role,
        phone: formData.phone,
        timestamp: serverTimestamp()
      });
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);
      setFormData({ schoolName: '', contactName: '', role: 'Principal / Director', phone: '' });
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error submitting form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = (e) => {
    e.preventDefault();
    document.getElementById('consultation').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 scroll-smooth">
      <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="font-bold text-xl md:text-2xl text-slate-900 flex items-center gap-2">
            <Cpu className="text-orange-500 w-6 h-6 md:w-8 md:h-8" />
            STEM Robotics <span className="text-orange-500 hidden md:inline">For Schools</span>
          </h1>
          <nav className="flex items-center space-x-6">
            <button onClick={scrollToForm} className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-lg font-semibold text-sm transition-colors shadow-md">
              Book Free Demo
            </button>
          </nav>
        </div>
      </header>

      <section className="relative bg-slate-900 text-white py-20 md:py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block border border-orange-500/30 bg-orange-500/10 text-orange-400 px-4 py-1 rounded-full text-sm mb-6 font-bold tracking-wide">
            NEP 2020 ALIGNED CURRICULUM
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Upgrade Your School with a <br className="hidden md:block"/><span className="text-orange-500">World-Class Robotics Lab</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-300 mb-10">
            We provide end-to-end Tinkering Lab setup, grade-wise STEM curriculum, and teacher training. Increase admissions by positioning your school as an innovation leader in Anakapalle.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={scrollToForm} className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-transform hover:scale-105 shadow-lg shadow-orange-500/30 flex justify-center items-center">
              Request a Free School Audit <ChevronRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <div className="bg-orange-500 text-white py-6 border-b-4 border-orange-600">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-x divide-orange-400/50">
          <div><p className="text-2xl md:text-3xl font-bold">Grades 3-10</p><p className="text-xs md:text-sm font-medium text-orange-100 uppercase mt-1">Structured Levels</p></div>
          <div><p className="text-2xl md:text-3xl font-bold">100%</p><p className="text-xs md:text-sm font-medium text-orange-100 uppercase mt-1">NEP Compliant</p></div>
          <div><p className="text-2xl md:text-3xl font-bold">Hardware</p><p className="text-xs md:text-sm font-medium text-orange-100 uppercase mt-1">Provided by Us</p></div>
          <div><p className="text-2xl md:text-3xl font-bold">Training</p><p className="text-xs md:text-sm font-medium text-orange-100 uppercase mt-1">For Your Teachers</p></div>
        </div>
      </div>

      <section className="py-24 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Comprehensive School Solution</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">You don't need to hire expensive new staff or figure out the hardware. We handle the entire STEM ecosystem for you.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ServiceCard 
            icon={<Wrench className="w-8 h-8 text-blue-500" />} color="bg-blue-50"
            title="1. Tinkering Lab Setup" 
            desc="We convert an empty room into a futuristic tech lab. We supply Arduino kits, sensors, 3D printing basics, soldering stations, and safety equipment." 
          />
          <ServiceCard 
            icon={<BookOpen className="w-8 h-8 text-orange-500" />} color="bg-orange-50"
            title="2. Grade-Wise Curriculum" 
            desc="Structured 35-week syllabuses for Grades 3 through 10. Includes student workbooks, PPTs, and project guides perfectly aligned with the academic calendar." 
          />
          <ServiceCard 
            icon={<Users className="w-8 h-8 text-green-500" />} color="bg-green-50"
            title="3. Teacher Enablement" 
            desc="We train your existing science/computer teachers to become certified STEM instructors. Includes year-round technical support and doubt-clearing sessions." 
          />
          <ServiceCard 
            icon={<Trophy className="w-8 h-8 text-purple-500" />} color="bg-purple-50"
            title="4. Competitions & Olympiads" 
            desc="We prepare your best students for national-level robotics hackathons and Olympiads, bringing trophies and prestige directly to your school." 
          />
        </div>
      </section>

      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Progressive Schools Choose STEM Robotics</h2>
            <div className="space-y-6">
              <div className="flex">
                <div className="mt-1 mr-4"><TrendingUp className="w-6 h-6 text-orange-500" /></div>
                <div>
                  <h4 className="text-xl font-bold mb-1">Boost New Admissions</h4>
                  <p className="text-slate-400 text-sm">Parents are looking for schools that offer 21st-century skills. A functional Robotics Lab becomes your biggest marketing asset during admissions season.</p>
                </div>
              </div>
              <div className="flex">
                <div className="mt-1 mr-4"><Shield className="w-6 h-6 text-orange-500" /></div>
                <div>
                  <h4 className="text-xl font-bold mb-1">Hassle-Free Management</h4>
                  <p className="text-slate-400 text-sm">Hardware breaks. Sensors burn out. Our Annual Maintenance Contract (AMC) means we replace damaged parts instantly. Zero headache for management.</p>
                </div>
              </div>
              <div className="flex">
                <div className="mt-1 mr-4"><Lightbulb className="w-6 h-6 text-orange-500" /></div>
                <div>
                  <h4 className="text-xl font-bold mb-1">Practical Over Theory</h4>
                  <p className="text-slate-400 text-sm">Move beyond textbook definitions. Your students will build automatic dustbins, radar systems, and line-following robots with their own hands.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 relative">
             <div className="absolute inset-0 bg-orange-500 rounded-3xl transform rotate-3"></div>
             <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Students in class" className="relative rounded-3xl shadow-2xl" />
          </div>
        </div>
      </section>

      <section id="consultation" className="py-24 bg-white scroll-mt-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-orange-50 rounded-[2rem] p-8 md:p-12 border border-orange-100 flex flex-col md:flex-row gap-12 shadow-xl">
            <div className="md:w-1/2 flex flex-col justify-center">
              <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-bold mb-6 w-fit">
                <Building className="w-4 h-4" /> <span>FOR MANAGEMENT</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Request a Free School Consultation</h2>
              <p className="text-slate-600 mb-8 text-lg">
                We will visit your campus, evaluate your space, and provide a custom blueprint and quotation for your new Tinkering Lab at zero cost.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center text-slate-700 font-medium"><CheckCircle className="w-5 h-5 text-orange-500 mr-3" /> Get a detailed syllabus breakdown</li>
                <li className="flex items-center text-slate-700 font-medium"><CheckCircle className="w-5 h-5 text-orange-500 mr-3" /> See a live hardware demonstration</li>
                <li className="flex items-center text-slate-700 font-medium"><CheckCircle className="w-5 h-5 text-orange-500 mr-3" /> Transparent pricing structure</li>
              </ul>
            </div>
            
            <div className="md:w-1/2 w-full">
              <form onSubmit={handleSchoolSubmit} className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Schedule Your Demo</h3>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">School Name</label>
                    <input type="text" required placeholder="e.g. Delhi Public School" value={formData.schoolName} onChange={(e) => setFormData({...formData, schoolName: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Contact Person Name</label>
                    <input type="text" required placeholder="Your Name" value={formData.contactName} onChange={(e) => setFormData({...formData, contactName: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Designation</label>
                    <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all cursor-pointer">
                      <option>Principal / Director</option>
                      <option>School Correspondent</option>
                      <option>Academic Coordinator</option>
                      <option>Science / CS Teacher</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Phone Number</label>
                    <input type="tel" required placeholder="Mobile Number" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all" />
                  </div>
                  
                  <button type="submit" disabled={isSubmitting} className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-4 px-4 rounded-xl transition-all shadow-lg hover:shadow-orange-500/30 flex items-center justify-center mt-2">
                    {isSubmitting ? 'Submitting...' : (isSubmitted ? 'Consultation Requested! ✓' : 'Book Free Consultation')}
                  </button>
                  {isSubmitted && <p className="text-sm text-center text-green-600 font-medium mt-2">Thank you! We will call you within 24 hours.</p>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 text-slate-400 py-12 text-center border-t border-slate-900">
        <div className="max-w-6xl mx-auto px-4">
          <Cpu className="text-orange-500 w-10 h-10 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">STEM Robotics Academy</h3>
          <p className="mb-6">B2B Education Partner Division | Anakapalle</p>
          <div className="flex justify-center items-center space-x-6 text-sm">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-orange-400 transition-colors flex items-center"><Phone className="w-4 h-4 mr-2"/> +91 98765 43210</a>
            <a href="#admin" className="hover:text-white transition-colors opacity-30"><Lock className="w-3 h-3"/></a>
          </div>
          <p className="mt-8 text-xs text-slate-600">© 2026 STEM Robotics Academy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function ServiceCard({ icon, title, desc, color }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group">
      <div className={`${color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className="font-bold text-xl mb-3 text-slate-900">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{desc}</p>
    </div>
  );
}


// ==========================================
// 3. ENHANCED B2B COLLEGE PORTFOLIO (SERVICES FOCUS)
// ==========================================
function CollegePortfolio() {
  const [formData, setFormData] = useState({ collegeName: '', contactName: '', department: 'ECE', phone: '', interest: 'Final Year Projects' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCollegeSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "college_leads"), {
        collegeName: formData.collegeName,
        contactName: formData.contactName,
        department: formData.department,
        phone: formData.phone,
        interest: formData.interest,
        timestamp: serverTimestamp()
      });
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);
      setFormData({ collegeName: '', contactName: '', department: 'ECE', phone: '', interest: 'Final Year Projects' });
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error submitting form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = (e) => {
    e.preventDefault();
    document.getElementById('college-proposal').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans scroll-smooth">
      {/* HEADER */}
      <header className="p-6 border-b border-slate-800 flex justify-between items-center max-w-6xl mx-auto sticky top-0 bg-slate-950/90 backdrop-blur-md z-50">
        <h1 className="font-bold text-xl md:text-2xl tracking-tight flex items-center gap-2 text-white">
          <Network className="text-blue-500 w-6 h-6 md:w-8 md:h-8" />
          STEM Robotics <span className="text-blue-500 hidden md:inline">Industry Hub</span>
        </h1>
        <button onClick={scrollToForm} className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg font-bold text-sm transition-colors shadow-[0_0_15px_rgba(37,99,235,0.3)]">
          Partner With Us
        </button>
      </header>

      {/* HERO SECTION WITH DYNAMIC IMAGERY */}
      <section className="relative py-20 md:py-28 px-6 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 opacity-30">
          <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Engineering Lab" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/95 to-slate-950/40"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-3/5 text-left">
            <div className="inline-flex items-center gap-2 border border-blue-500/30 bg-blue-500/10 text-blue-400 px-4 py-1.5 rounded-full text-sm mb-6 font-semibold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4" /> For Engineering Institutions
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-white leading-tight">
              Elevate Engineering with <br className="hidden md:block"/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Industry Execution</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
              We provide comprehensive final-year project incubation, intensive technical workshops, and industrial training to make your core engineering students interview-ready.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={scrollToForm} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] flex items-center justify-center">
                Request Collaboration <ChevronRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="md:w-2/5 hidden md:block">
            <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-[0_0_40px_rgba(37,99,235,0.15)] relative group cursor-pointer">
              <img src="https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="IoT Circuit" className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent opacity-90"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-2 text-blue-400 text-xs font-bold mb-2 uppercase tracking-widest">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                  Live Project Incubation
                </div>
                <p className="text-white font-medium text-lg leading-tight">Advanced IoT & Embedded Systems Architecture</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STATS */}
      <div className="border-y border-slate-800 bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div><p className="text-3xl font-bold text-white mb-1">ECE & EEE</p><p className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Core Domains</p></div>
          <div><p className="text-3xl font-bold text-white mb-1">IEEE</p><p className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Base Papers Executed</p></div>
          <div><p className="text-3xl font-bold text-white mb-1">Viva</p><p className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Preparation Support</p></div>
          <div><p className="text-3xl font-bold text-white mb-1">100%</p><p className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Practical Training</p></div>
        </div>
      </div>

      {/* COLLEGE SERVICES (REVISED) */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Institutional Services</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">We focus on specialized skill delivery and project execution without requiring infrastructure investments from the college.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CollegeCard 
            icon={<Rocket className="w-8 h-8" />} 
            title="End-to-End Capstone Support" 
            desc="Complete B.Tech/M.Tech project lifecycle: concept selection, hardware assembly, coding, IEEE base paper implementation, and comprehensive project documentation." 
            highlight={true}
          />
          <CollegeCard 
            icon={<Terminal className="w-8 h-8" />} 
            title="Industrial Workshops" 
            desc="Intensive 1-to-3 day hands-on workshops on IoT, Robotics, Arduino, and Embedded C. Perfect for tech fests, symposiums, and skill-building weeks." 
          />
          <CollegeCard 
            icon={<FileCode2 className="w-8 h-8" />} 
            title="Value Added Courses (VAC)" 
            desc="Structured 30-40 hour certification programs delivered on your campus. Enhances student resumes and adds direct value to institutional accreditation metrics." 
          />
        </div>
      </section>

      {/* VALUE PROPOSITION LIST */}
      <section className="py-20 bg-slate-900 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">Why HODs & Placement Officers Trust Us</h2>
            <div className="space-y-6">
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex items-start">
                <div className="bg-blue-900/30 p-3 rounded-xl mr-5 shrink-0"><Presentation className="w-6 h-6 text-blue-400" /></div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Flawless Project Defenses (Viva-Voce)</h4>
                  <p className="text-slate-400 text-sm">We don't just hand over a finished robot. We conduct mock vivas, explain circuit diagrams, and ensure students deeply understand the code, guaranteeing high scores during externals.</p>
                </div>
              </div>
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex items-start">
                <div className="bg-blue-900/30 p-3 rounded-xl mr-5 shrink-0"><Award className="w-6 h-6 text-blue-400" /></div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">NAAC & NBA Accreditation Boost</h4>
                  <p className="text-slate-400 text-sm">Our industry-delivered workshops, expert guest lectures, and Value Added Courses (VACs) provide the necessary documentation and metrics to strengthen your accreditation files.</p>
                </div>
              </div>
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex items-start">
                <div className="bg-blue-900/30 p-3 rounded-xl mr-5 shrink-0"><Briefcase className="w-6 h-6 text-blue-400" /></div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Core Placement Readiness</h4>
                  <p className="text-slate-400 text-sm">Software companies test DSA, but core engineering firms test hardware logic and real-world troubleshooting. Our hands-on industrial training bridges this exact gap.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 relative hidden md:block">
             <div className="absolute inset-0 bg-blue-600 rounded-3xl transform rotate-3 opacity-30 blur-md"></div>
             <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Students presenting project" className="relative rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-slate-700 object-cover aspect-[4/3] w-full" />
             
             {/* Floating badge over the image */}
             <div className="absolute -bottom-6 -left-6 bg-slate-950 border border-slate-800 p-4 rounded-xl shadow-xl flex items-center gap-4">
               <div className="bg-green-500/20 p-3 rounded-full"><CheckCircle className="w-6 h-6 text-green-500" /></div>
               <div>
                 <p className="text-white font-bold text-sm">100% Practical</p>
                 <p className="text-slate-400 text-xs">Zero rote learning</p>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* B2B COLLEGE LEAD CAPTURE FORM */}
      <section id="college-proposal" className="py-24 bg-slate-950 scroll-mt-24 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2rem] p-8 md:p-12 border border-slate-700 flex flex-col md:flex-row gap-12 shadow-2xl">
            <div className="md:w-1/2 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Request a Collaboration Discussion</h2>
              <p className="text-slate-400 mb-8 text-lg">
                Whether you need a 2-day IoT workshop, or you want us to mentor 50 final-year project batches, fill out the details below. Our technical director will contact you.
              </p>
              <div className="bg-slate-950/50 p-6 rounded-xl border border-slate-800">
                <h4 className="text-white font-bold mb-3 flex items-center"><Target className="w-5 h-5 text-blue-400 mr-2" /> Our Process</h4>
                <ol className="text-sm text-slate-400 space-y-3 list-decimal list-inside">
                  <li>Initial requirement gathering</li>
                  <li>Review of departmental goals & timelines</li>
                  <li>Submission of structured syllabus & pricing</li>
                  <li>Execution of workshops or project mentoring</li>
                </ol>
              </div>
            </div>
            
            <div className="md:w-1/2 w-full">
              <form onSubmit={handleCollegeSubmit} className="bg-slate-950 p-8 rounded-2xl border border-slate-800 shadow-xl">
                <h3 className="text-2xl font-bold text-white mb-6">Partnership Inquiry</h3>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">College / University Name</label>
                    <input type="text" required placeholder="e.g. Anil Neerukonda Institute of Technology" value={formData.collegeName} onChange={(e) => setFormData({...formData, collegeName: e.target.value})} className="w-full px-4 py-3 bg-slate-900 border border-slate-700 text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-600" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Your Name</label>
                    <input type="text" required placeholder="Name of HOD/Principal/Coordinator" value={formData.contactName} onChange={(e) => setFormData({...formData, contactName: e.target.value})} className="w-full px-4 py-3 bg-slate-900 border border-slate-700 text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-600" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Department</label>
                      <select value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} className="w-full px-4 py-3 bg-slate-900 border border-slate-700 text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer">
                        <option>ECE</option>
                        <option>EEE</option>
                        <option>CSE / IT</option>
                        <option>Mechanical</option>
                        <option>Placement Cell</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Primary Interest</label>
                      <select value={formData.interest} onChange={(e) => setFormData({...formData, interest: e.target.value})} className="w-full px-4 py-3 bg-slate-900 border border-slate-700 text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer">
                        <option>Final Year Projects</option>
                        <option>1-3 Day Workshop</option>
                        <option>Value Added Course</option>
                        <option>Industrial Training</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Direct Phone Number</label>
                    <input type="tel" required placeholder="Mobile Number" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 bg-slate-900 border border-slate-700 text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-600" />
                  </div>
                  
                  <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-bold py-4 px-4 rounded-xl transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)] flex items-center justify-center mt-4">
                    {isSubmitting ? 'Sending Request...' : (isSubmitted ? 'Request Sent! ✓' : 'Submit Inquiry')}
                  </button>
                  {isSubmitted && <p className="text-sm text-center text-blue-400 font-medium mt-3">Received. Our Institutional Head will contact you.</p>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-black text-slate-500 py-12 text-center border-t border-slate-900">
        <div className="max-w-6xl mx-auto px-4">
          <Network className="text-blue-500 w-10 h-10 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-300 mb-2">STEM Robotics Academy</h3>
          <p className="mb-6 text-sm">Higher Education & Engineering Division | Anakapalle</p>
          <div className="flex justify-center items-center space-x-6 text-sm">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-blue-400 transition-colors flex items-center"><Phone className="w-4 h-4 mr-2"/> +91 98765 43210</a>
            <a href="#admin" className="hover:text-white transition-colors opacity-30"><Lock className="w-3 h-3"/></a>
          </div>
          <p className="mt-8 text-xs text-slate-700">© 2026 STEM Robotics Academy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function CollegeCard({ icon, title, desc, highlight = false }) {
  return (
    <div className={`p-8 rounded-2xl border transition-all duration-300 group ${highlight ? 'bg-blue-900/20 border-blue-500/50 shadow-[0_0_30px_rgba(37,99,235,0.15)]' : 'bg-slate-900 border-slate-800 hover:border-slate-600'}`}>
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:-translate-y-2 ${highlight ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]' : 'bg-slate-800 text-blue-400'}`}>
        {icon}
      </div>
      <h3 className="font-bold text-xl mb-3 text-white">{title}</h3>
      <p className="text-slate-400 leading-relaxed text-sm">{desc}</p>
    </div>
  );
}

// ==========================================
// 4. ADMIN DASHBOARD COMPONENT
// ==========================================
function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Tab Management updated for 3 states
  const [activeTab, setActiveTab] = useState('b2c'); // 'b2c', 'b2b-schools', or 'b2b-colleges'
  const [b2cLeads, setB2cLeads] = useState([]);
  const [schoolLeads, setSchoolLeads] = useState([]);
  const [collegeLeads, setCollegeLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchAllData();
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
    setB2cLeads([]);
    setSchoolLeads([]);
    setCollegeLeads([]);
  };

  // Fetches ALL THREE databases at once
  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const b2cQuery = query(collection(db, "enrollments"), orderBy("timestamp", "desc"));
      const schoolQuery = query(collection(db, "school_leads"), orderBy("timestamp", "desc"));
      const collegeQuery = query(collection(db, "college_leads"), orderBy("timestamp", "desc"));

      const [b2cSnapshot, schoolSnapshot, collegeSnapshot] = await Promise.all([
        getDocs(b2cQuery),
        getDocs(schoolQuery),
        getDocs(collegeQuery)
      ]);

      setB2cLeads(b2cSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setSchoolLeads(schoolSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setCollegeLeads(collegeSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (err) {
      console.error("Error fetching admin data:", err);
    } finally {
      setIsLoading(false);
    }
  };

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

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 flex">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-slate-900 text-white hidden md:flex flex-col">
        <div className="p-6 flex items-center space-x-3">
          <Cpu className="text-orange-500 w-8 h-8" />
          <span className="font-bold text-xl tracking-tight">SRA Admin</span>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <button 
            onClick={() => setActiveTab('b2c')} 
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'b2c' ? 'bg-slate-800 text-orange-400 font-medium' : 'hover:bg-slate-800 text-slate-400'}`}>
            <Users className="w-5 h-5" /> <span>B2C Leads (Parents)</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('b2b-schools')} 
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'b2b-schools' ? 'bg-slate-800 text-orange-400 font-medium' : 'hover:bg-slate-800 text-slate-400'}`}>
            <Building className="w-5 h-5" /> <span>B2B Schools</span>
          </button>

          <button 
            onClick={() => setActiveTab('b2b-colleges')} 
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'b2b-colleges' ? 'bg-slate-800 text-blue-400 font-medium' : 'hover:bg-slate-800 text-slate-400'}`}>
            <Network className="w-5 h-5" /> <span>B2B Colleges</span>
          </button>
        </nav>
        <div className="p-4">
          <button onClick={handleLogout} className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors w-full px-4 py-2">
            <LogOut className="w-5 h-5" /> <span>Secure Logout</span>
          </button>
        </div>
      </div>

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

        {/* Dynamic Content Based on Tab */}
        <div className="p-8 pb-4">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {activeTab === 'b2c' ? 'Parent & Student Leads' : 
                 activeTab === 'b2b-schools' ? 'School Partnerships' : 
                 'College Partnerships'}
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                {activeTab === 'b2c' ? 'Reviewing submissions from the B2C Portfolio.' : 
                 activeTab === 'b2b-schools' ? 'Reviewing demo requests from School Principals.' : 
                 'Reviewing proposals from College HODs & Placement Officers.'}
              </p>
            </div>
            <button onClick={fetchAllData} className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors flex items-center shadow-sm">
              <Zap className="w-4 h-4 mr-2 text-orange-500" /> Refresh Data
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">Total Entries</p>
                <p className="text-3xl font-bold text-slate-900">
                  {activeTab === 'b2c' ? b2cLeads.length : 
                   activeTab === 'b2b-schools' ? schoolLeads.length : 
                   collegeLeads.length}
                </p>
              </div>
              <div className="bg-blue-50 p-3 rounded-xl">
                {activeTab === 'b2c' ? <Users className="w-6 h-6 text-blue-600" /> : 
                 activeTab === 'b2b-schools' ? <Building className="w-6 h-6 text-blue-600" /> :
                 <Network className="w-6 h-6 text-blue-600" />}
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Tables */}
        <div className="flex-1 overflow-auto px-8 pb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {isLoading ? (
              <div className="p-12 text-center text-slate-500">Loading secure data...</div>
            ) : activeTab === 'b2c' ? (
              /* --- B2C PARENTS TABLE --- */
              b2cLeads.length === 0 ? (
                <div className="p-12 text-center text-slate-500">No B2C leads received yet.</div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                      <th className="p-4 font-medium">Date</th>
                      <th className="p-4 font-medium">Parent Name</th>
                      <th className="p-4 font-medium">Contact</th>
                      <th className="p-4 font-medium">Child Name</th>
                      <th className="p-4 font-medium">Plan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {b2cLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4 text-sm text-slate-500">{lead.timestamp ? new Date(lead.timestamp.toDate()).toLocaleDateString() : 'New'}</td>
                        <td className="p-4 text-sm font-medium text-slate-900">{lead.parentName}</td>
                        <td className="p-4 text-sm text-slate-600">
                          <a href={`https://wa.me/91${lead.phone.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="flex items-center hover:text-green-600">
                             <Phone className="w-3 h-3 mr-1" /> {lead.phone}
                          </a>
                        </td>
                        <td className="p-4 text-sm text-slate-600">{lead.childName}</td>
                        <td className="p-4 text-sm"><span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-full">{lead.selectedPlan}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )
            ) : activeTab === 'b2b-schools' ? (
              /* --- B2B SCHOOLS TABLE --- */
              schoolLeads.length === 0 ? (
                <div className="p-12 text-center text-slate-500">No B2B School leads received yet.</div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                      <th className="p-4 font-medium">Date</th>
                      <th className="p-4 font-medium">School Name</th>
                      <th className="p-4 font-medium">Contact Person</th>
                      <th className="p-4 font-medium">Designation</th>
                      <th className="p-4 font-medium">Phone Number</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {schoolLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4 text-sm text-slate-500">{lead.timestamp ? new Date(lead.timestamp.toDate()).toLocaleDateString() : 'New'}</td>
                        <td className="p-4 text-sm font-bold text-orange-600">{lead.schoolName}</td>
                        <td className="p-4 text-sm font-medium text-slate-900">{lead.contactName}</td>
                        <td className="p-4 text-sm text-slate-600">{lead.role}</td>
                        <td className="p-4 text-sm text-slate-600">
                          <a href={`https://wa.me/91${lead.phone.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="flex items-center hover:text-green-600">
                             <Phone className="w-3 h-3 mr-1" /> {lead.phone}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )
            ) : (
              /* --- B2B COLLEGES TABLE --- */
              collegeLeads.length === 0 ? (
                <div className="p-12 text-center text-slate-500">No B2B College leads received yet.</div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                      <th className="p-4 font-medium">Date</th>
                      <th className="p-4 font-medium">College Name</th>
                      <th className="p-4 font-medium">Contact Person</th>
                      <th className="p-4 font-medium">Department & Interest</th>
                      <th className="p-4 font-medium">Phone Number</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {collegeLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4 text-sm text-slate-500">{lead.timestamp ? new Date(lead.timestamp.toDate()).toLocaleDateString() : 'New'}</td>
                        <td className="p-4 text-sm font-bold text-blue-600">{lead.collegeName}</td>
                        <td className="p-4 text-sm font-medium text-slate-900">{lead.contactName}</td>
                        <td className="p-4 text-sm text-slate-600">
                          {lead.department} <br/>
                          <span className="text-xs text-blue-500 font-medium">{lead.interest}</span>
                        </td>
                        <td className="p-4 text-sm text-slate-600">
                          <a href={`https://wa.me/91${lead.phone.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="flex items-center hover:text-green-600">
                             <Phone className="w-3 h-3 mr-1" /> {lead.phone}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. PUBLIC B2C PORTFOLIO COMPONENT
// ==========================================
function Portfolio() {
  const videoData = [
    { id: 1, videoLink: "/videos/team1-dustbin.mp4", title: "Team A: Smart Dustbin", subtitle: "Students demonstrating their automated lid using ultrasonic sensors and Arduino logic." },
    { id: 2, videoLink: "/videos/team2-dustbin.mp4", title: "Team B: Smart Dustbin", subtitle: "A second group successfully executing the same complex hardware integration." },
    { id: 3, videoLink: "/videos/class-action.mp4", title: "Working on LED traffic light logic", subtitle: "Hands-on learning with LED traffic light logic and interactive hardware building." },
    { id: 4, videoLink: "/videos/experience.mp4", title: "The Boot Camp Experience", subtitle: "sharing their experience for the 2 days KIDS CODING BOOT CAMP." }
  ];

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

  const scrollToForm = (e) => {
    e.preventDefault();
    document.getElementById('enroll').scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToPortfolio = (e) => {
    e.preventDefault();
    document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 scroll-smooth">
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
            <button onClick={scrollToPortfolio} className="hidden md:block hover:text-orange-400 transition-colors">Videos</button>
            <button onClick={scrollToForm} className="bg-orange-500 hover:bg-orange-600 text-white px-4 md:px-6 py-2 rounded-full font-semibold transition-colors duration-200 text-xs md:text-sm">
              Enroll Now
            </button>
          </nav>
        </div>
      </header>

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
              <button onClick={scrollToForm} className="bg-orange-500 hover:bg-orange-600 text-center text-white px-8 py-4 rounded-lg font-bold text-lg transition-transform hover:scale-105 flex items-center justify-center">
                Enroll for Level 1 <ChevronRight className="ml-2 w-5 h-5" />
              </button>
              <button onClick={scrollToPortfolio} className="bg-slate-800 hover:bg-slate-700 text-center text-white border border-slate-600 px-8 py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center">
                <PlayCircle className="mr-2 w-5 h-5 text-orange-400" /> Watch Videos
              </button>
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

      <section id="offer" className="py-20 bg-slate-900 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Choose Your Path</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Flexible enrollment options for the 4-Week Weekend Innovators Club.</p>
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-8 max-w-4xl mx-auto">
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
              <button onClick={(e) => { setFormData({...formData, plan: 'Standard (₹1,100)'}); scrollToForm(e); }} className="w-full block text-center bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-xl transition-colors">
                Select Standard
              </button>
            </div>

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
              <button onClick={(e) => { setFormData({...formData, plan: 'Innovator + Kit (₹2,999)'}); scrollToForm(e); }} className="w-full block text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors shadow-lg">
                Select Innovator Pack
              </button>
            </div>
          </div>
        </div>
      </section>

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

      <footer className="bg-slate-900 text-slate-400 py-12 text-center">
        <div className="max-w-6xl mx-auto px-4">
          <Cpu className="text-orange-500 w-10 h-10 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">STEM Robotics Academy</h3>
          <p className="mb-6">Empowering the next generation of innovators in Anakapalle.</p>
          <div className="flex justify-center items-center space-x-6 text-sm">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-orange-400 transition-colors flex items-center"><Phone className="w-4 h-4 mr-2"/> Call Us</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-orange-400 transition-colors flex items-center"><Zap className="w-4 h-4 mr-2"/> WhatsApp</a>
            <a href="#admin" className="hover:text-white transition-colors flex items-center ml-4 opacity-30 hover:opacity-100"><Lock className="w-3 h-3 mr-1"/> Admin</a>
          </div>
          <p className="mt-12 text-xs text-slate-600">© 2026 STEM Robotics Academy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}