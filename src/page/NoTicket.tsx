import { useNavigate } from "react-router-dom";
import { BiErrorCircle } from "react-icons/bi";
import { motion } from "framer-motion";

const NoTicket = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-[80vh] relative z-10 grid place-content-center">
            <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative h-fit p-8 md:p-12 rounded-[2rem] border-2 border-[#24A0B5] bg-[#02191D] text-white text-center overflow-hidden"
            >
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-5 left-5 w-20 h-20 border-2 border-[#24A0B5] rounded-full animate-ping"></div>
                    <div className="absolute bottom-5 right-5 w-32 h-32 border-2 border-[#24A0B5] rounded-full animate-pulse"></div>
                </div>

            
                <motion.div
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6 relative z-10"
                >
                    <span className="inline-block text-[#24A0B5] animate-bounce">
                        <BiErrorCircle size={64} />
                    </span>

                    <h1 className="font-extrabold text-3xl md:text-4xl bg-gradient-to-r from-[#24A0B5] to-[#0E464F] bg-clip-text text-transparent">
                        No Ticket Available
                    </h1>

                    <p className="text-sm md:text-base text-gray-400">
                        Looks like you haven't booked any tickets yet.
                        <br />
                        Head back to the event page to secure your spot!
                    </p>

                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium transition duration-300 ease-out border-2 border-[#24A0B5] rounded-full text-[#24A0B5] hover:text-white"
                        onClick={() => navigate('/')}
                    >
                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#24A0B5] group-hover:translate-x-0 ease">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                        </span>
                        <span className="absolute flex items-center justify-center w-full h-full transition-all duration-300 transform group-hover:translate-x-full ease">
                            Book Event Ticket
                        </span>
                        <span className="relative invisible">Book Event Ticket</span>
                    </motion.button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default NoTicket;
