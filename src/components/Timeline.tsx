import React from 'react';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const timelineData: TimelineItem[] = [
  {
    year: '2025',
    title: 'The Genesis Project',
    description: 'Foundation of the dedicated AI research division. This pivotal moment set the stage for decades of innovation, focusing on foundational models and ethical AI frameworks.',
    icon: '⚡'
  },
  {
    year: '2032',
    title: 'Quantum Leap',
    description: 'A monumental breakthrough in quantum-assisted AI computing, enabling problem-solving at speeds previously unimaginable and unlocking new frontiers in scientific discovery.',
    icon: '🔮'
  },
  {
    year: '2040',
    title: 'Global Integration',
    description: 'AI becomes the core of global digital infrastructure, seamlessly managing smart cities, autonomous logistics, and personalized healthcare systems worldwide.',
    icon: '🌐'
  },
  {
    year: '2045',
    title: 'AGI Partnership',
    description: 'The launch of the first successful, large-scale human-AGI collaborative project, revolutionizing creative industries and complex scientific research through symbiotic partnership.',
    icon: '🤝'
  },
  {
    year: '2050',
    title: 'The Pinnacle',
    description: 'Recognized as the definitive global leader in AI, TCS now shapes a new world where technology serves humanity, fostering an era of unprecedented progress and prosperity.',
    icon: '🏆'
  }
];

const Timeline: React.FC = () => {
  return (
    <section className="py-20 bg-[#001525]">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
          The 2050 Vision: A Legacy of Innovation
        </h2>
        
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-[#00B4D8] opacity-20"></div>
          
          {/* Timeline Items */}
          {timelineData.map((item, index) => (
            <div key={item.year} className={`flex items-center mb-16 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
              <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                <div className="text-[#00B4D8] text-xl mb-2">{item.year}</div>
                <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
              
              <div className="w-12 h-12 rounded-full bg-[#00B4D8] flex items-center justify-center text-2xl absolute left-1/2 transform -translate-x-1/2">
                {item.icon}
              </div>
              
              <div className="w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;