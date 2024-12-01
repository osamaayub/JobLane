import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import testimonials from './testimonials';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const itemsPerPage = isSmallScreen ? 1 : 3;

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const getVisibleTestimonials = () => {
    const end = currentIndex + itemsPerPage;
    if (end > testimonials.length) {
      return [...testimonials.slice(currentIndex), ...testimonials.slice(0, end - testimonials.length)];
    }
    return testimonials.slice(currentIndex, end);
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div className='pt-20 flex flex-col gap-4 md:px-4 px-4'>
      <div className='text-2xl font-bold'>
        What Our Users Say
      </div>
      <div className='relative w-full flex justify-center items-center'>
        <div className='absolute left-[-30px] top-1/2 transform -translate-y-1/2'>
          <button
            onClick={handlePrev}
            className='bg-transparent text-white p-2 rounded-full z-10 hover:bg-gray-700 transition duration-300'
          >
            <FaChevronLeft size={35} />
          </button>
        </div>
        <div className='w-full flex justify-center overflow-hidden'>
          <div className='flex  transition-transform duration-500 ease-in-out gap-3'>
            {getVisibleTestimonials().map((testimonial, index) => (
              <div key={index} className='flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-2'>
                <div className='w-full p-4 bg-gray-900 rounded-md shadow-md'>
                  <div className='flex  items-center gap-4 p-2'>
                    <img src={testimonial.image} alt={testimonial.name} className='w-16 h-16 rounded-full' />
                    <div>
                      <p className='text-lg md:text-base font-semibold text-white'>{testimonial.name}</p>
                      <p className='text-sm text-gray-400'>{testimonial.position}, {testimonial.company}</p>
                    </div>
                  </div>
                  <p className='mt-4 text-gray-300'>{testimonial.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='absolute right-[-35px] top-1/2 transform -translate-y-1/2'>
          <button
            onClick={handleNext}
            className='bg-transparent text-white p-2 rounded-full z-10 hover:bg-gray-700 transition duration-300'
          >
            <FaChevronRight size={35} />
          </button>
        </div>
      </div>
    </div>
  );
  }

export default Testimonials;
