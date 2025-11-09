import Slider from 'react-slick';
import { MessageSquare, Users, Brain, Gamepad2, Code } from 'lucide-react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const events = [
  {
    icon: <MessageSquare size={40} />,
    title: '🎙 Speaker Sessions',
    desc: 'Get inspired by innovators and leaders sharing bold ideas that are shaping the AI-driven future.',
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80'
  },
  {
    icon: <Users size={40} />,
    title: '💬 Panel Discussion',
    desc: 'Join an open conversation with experts as they decode the real impact of AI — raw, insightful, and thought-provoking.',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80'
  },
  {
    icon: <Brain size={40} />,
    title: '🧠 Quizzes',
    desc: 'Test your brainpower with fun, fast-paced AI and tech quizzes — compete, climb the leaderboard, and win exciting prizes!',
    image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=800&q=80'
  },
  {
    icon: <Gamepad2 size={40} />,
    title: '🎮 Games',
    desc: 'Step into AI vs. Real and Prompt Play — interactive games that blur the line between human creativity and machine genius.',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80'
  },
  {
    icon: <Code size={40} />,
    title: '💻 SolveSphere - Hackathon',
    desc: 'Bring your ideas to life! Join the Hackathon to innovate, build, and showcase your AI-powered solutions. Team up, code, create, and compete for the ultimate title of innovation champion.',
    image: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?auto=format&fit=crop&w=800&q=80'
  }
];

const EventCarousel = () => {
  const CustomPrevArrow = (props: any) => (
    <button
      onClick={props.onClick}
      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 bg-[#001525] hover:bg-[#00B4D8] text-white w-10 h-10 rounded-full flex items-center justify-center transition-all"
      aria-label="Previous slide"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  );

  const CustomNextArrow = (props: any) => (
    <button
      onClick={props.onClick}
      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 bg-[#001525] hover:bg-[#00B4D8] text-white w-10 h-10 rounded-full flex items-center justify-center transition-all"
      aria-label="Next slide"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-16">
      <Slider {...settings}>
        {events.map((item, idx) => (
          <div key={idx} className="px-4 h-[450px]">
            <div className="bg-[#001525] rounded-2xl overflow-hidden hover:border-[#00B4D8] transition-all h-full border border-gray-800">
              <div className="relative h-48">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-[#2d2b2b] bg-opacity-90 p-1 rounded-lg text-white">
                  {item.icon}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4 text-white">{item.title}</h3>
                <p className="text-gray-300 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default EventCarousel;