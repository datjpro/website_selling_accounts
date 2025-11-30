import React, { useRef } from 'react';
import { POPULAR_GAMES } from '../constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PopularGames: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 300;
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Tựa Game Phổ biến</h2>
          <div className="flex gap-2">
            <button 
              onClick={() => scroll('left')}
              className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 text-gray-600 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 text-gray-600 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory"
        >
          {POPULAR_GAMES.map((game) => (
            <div 
              key={game.id} 
              className="flex-shrink-0 w-40 sm:w-48 group cursor-pointer snap-start"
            >
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-3 shadow-md">
                <img 
                  src={game.image} 
                  alt={game.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
              <h3 className="font-bold text-gray-900 text-center group-hover:text-blue-600 transition-colors">
                {game.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularGames;