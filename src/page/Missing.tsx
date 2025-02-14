import { useNavigate } from 'react-router-dom';
import { BiError } from 'react-icons/bi';

const Missing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen grid place-content-center">
      <div className="rounded-2xl animate__animated animate__fadeInDown relative z-10 p-4 md:p-8 grid gap-4 md:gap-8 border-[#0E464F] w-[90%] md:w-[48rem] bg-[#04272e] mx-auto border text-center">
        <div className="space-y-4">
    
          <span className="inline-block mx-auto text-[#24A0B5]">
            <BiError size={64} />
          </span>

       
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            404
          </h1>
          <h2 className="text-xl md:text-2xl text-[#24A0B5]">
            Page Not Found
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>

          <button
            onClick={() => navigate('/')}
            className="mt-8 px-6 py-3 bg-[#24A0B5] text-white rounded-md hover:bg-[#1b7a8a] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#24A0B5] focus:ring-offset-2 focus:ring-offset-[#04272e]"
          >
            Back to Home
          </button>
        </div>

    
        <div className="absolute inset-0 -z-10 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 border-2 border-[#24A0B5] rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 border-2 border-[#24A0B5] rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Missing;