import React from 'react';
import { BookOpen, Users, Award, Briefcase, ChevronRight } from 'lucide-react';

export default function SchoolPortfolio() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Header for B2B */}
      <header className="p-6 flex justify-between items-center border-b border-slate-100">
        <h1 className="font-bold text-2xl text-slate-900">STEM Robotics <span className="text-orange-500">For Schools</span></h1>
        <a href="#admin" className="text-sm font-medium hover:text-orange-500">Partner Login</a>
      </header>

      {/* Hero */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-5xl font-extrabold mb-6">Empower Your Students with <br/><span className="text-orange-500">Future-Ready STEM Labs</span></h2>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">We bring hands-on robotics curriculum directly to your classrooms. Transform your school into an innovation hub.</p>
        <button className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800">Download School Brochure</button>
      </section>

      {/* Grid Features */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          <Feature icon={<BookOpen />} title="Custom Curriculum" desc="Aligned with NEP 2020 and modern coding standards." />
          <Feature icon={<Users />} title="Teacher Training" desc="We train your staff to deliver impactful robotics lessons." />
          <Feature icon={<Award />} title="Lab Setup" desc="Complete hardware sourcing, setup, and maintenance." />
        </div>
      </section>
    </div>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
      <div className="text-orange-500 mb-4">{icon}</div>
      <h3 className="font-bold text-xl mb-2">{title}</h3>
      <p className="text-slate-600 text-sm">{desc}</p>
    </div>
  );
}