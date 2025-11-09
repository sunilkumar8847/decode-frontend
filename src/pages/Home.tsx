import React, { useState, useEffect, useRef } from 'react';
import { Users, Trophy, Sparkles, Brain, Gamepad2, Code } from 'lucide-react';
import { Particle } from '../types';
import Timeline from '../components/Timeline';
import { AuthModal } from '../components/AuthModal';
import EventCarousel from '../components/EventCarousel';
import CountdownTimer from '../components/CountdownTimer';

const Home = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Three.js-like Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.fill();

        particles.forEach((p2, j) => {
          if (i !== j) {
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 120) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 - dist / 600})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  return (
    <div className="bg-[#001525] text-white min-h-screen relative overflow-hidden">
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full opacity-30 pointer-events-none" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 ">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            Decode
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 mb-4">
            Unveiling the Next Frontier of Intelligence
          </p>
          <p className="text-lg text-[#00B4D8] mb-8">
            October 21, 2025 | Virtual & In-Person
          </p>
          <CountdownTimer />
          <button 
            onClick={() => {
              setAuthMode('register');
              setShowAuthModal(true);
            }}
            className="bg-[#00B4D8] text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-[#0096b4] transition-all"
          >
            Join the Revolution
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="text-[#00B4D8] text-sm uppercase tracking-widest">Scroll</div>
          <div className="w-0.5 h-8 bg-[#00B4D8] mx-auto mt-2 animate-pulse"></div>
        </div>
      </section>

      {/* Why Attend */}
      <section className="relative z-10 container mx-auto px-8 pt-20 pb-20">
        <h2 className="text-5xl font-bold mb-16 text-center">Why Attend DECODE</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: <Sparkles size={32} />, title: '🚀 Expand Your Horizons', desc: 'Dive deep into the world of Artificial Intelligence and discover how it\'s shaping tomorrow.' },
            { icon: <Users size={32} />, title: '🤖 Connect with Brilliant Minds', desc: 'Meet the brains building the future.' },
            { icon: <Brain size={32} />, title: '🧠 Learn from Visionaries', desc: 'Get insider wisdom from those shaping tomorrow\'s tech today.' },
            { icon: <Code size={32} />, title: '💻 Create, Compete, Conquer', desc: 'Hack, brainstorm, and outsmart the impossible in challenges that push limits.' },
            { icon: <Gamepad2 size={32} />, title: '🏆 Battle of Brains', desc: 'Sharpen your instincts, join the madness, and play your way through the most exciting AI games of the season.' },
            { icon: <Trophy size={32} />, title: '🏆 Exciting Prizes', desc: 'Win cash rewards, snag cool gadgets, flaunt exclusive TCS goodies, and unwrap a trove of surprise gifts.' }
          ].map((item, idx) => (
            <div key={idx} className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 hover:border-gray-600 transition-all hover:transform hover:scale-105">
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Event Highlights */}
      <section className="relative z-10 py-20 bg-white">
        <h2 className="text-5xl font-bold mb-16 text-center text-[#001525]">Event Highlights</h2>
        <EventCarousel />
      </section>

      {/* Timeline Section */}
      <Timeline />

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800 py-16">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="text-3xl font-bold">DECODE</div>
              <p className="text-gray-400">Where the future learns to speak human.</p>
              <div className="flex space-x-4">
                <a href="https://twitter.com/decode" target="_blank" rel="noopener noreferrer" 
                   className="text-gray-400 hover:text-[#00B4D8] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="https://linkedin.com/company/decode" target="_blank" rel="noopener noreferrer" 
                   className="text-gray-400 hover:text-[#00B4D8] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="https://discord.gg/decode" target="_blank" rel="noopener noreferrer" 
                   className="text-gray-400 hover:text-[#00B4D8] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026 13.83 13.83 0 0 0 1.226-1.963.074.074 0 0 0-.041-.104 13.175 13.175 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#timeline" className="text-gray-400 hover:text-[#00B4D8] transition-colors">Timeline</a></li>
                <li><a href="#tracks" className="text-gray-400 hover:text-[#00B4D8] transition-colors">Event Tracks</a></li>
                <li><a href="#register" className="text-gray-400 hover:text-[#00B4D8] transition-colors">Register</a></li>
                <li><a href="#highlights" className="text-gray-400 hover:text-[#00B4D8] transition-colors">Event Highlights</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Contact Us</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">
                  <span className="block">Email:</span>
                  <a href="mailto:contact@decode.event" className="text-[#00B4D8] hover:underline">contact@decode.event</a>
                </li>
                <li className="text-gray-400">
                  <span className="block">Support:</span>
                  <a href="mailto:support@decode.event" className="text-[#00B4D8] hover:underline">support@decode.event</a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Stay Updated</h3>
              <p className="text-gray-400">Subscribe to our newsletter for the latest updates.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-gray-300 flex-grow focus:outline-none focus:border-[#00B4D8]"
                />
                <button className="bg-[#00B4D8] text-white px-4 py-2 rounded-lg hover:bg-[#0096b4] transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© {new Date().getFullYear()} DECODE. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        initialMode={authMode}
      />
    </div>
  );
};

export default Home;