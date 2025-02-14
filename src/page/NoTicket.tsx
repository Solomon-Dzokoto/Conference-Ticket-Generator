import { useNavigate } from "react-router-dom"

const NoTicket = () => {
    const navigate = useNavigate()
    return (
        <div className="min-h-[80vh] relative z-10 grid place-content-center">
            <div className=" h-fit p-8 animate__animated animate__fadeInRight rounded-[2rem] border border-[#24A0B5] bg-[#02191D] text-white text-center  text-4xl">
                <h1 className="font-extrabold mb-2 text-[2rem]">No Ticket Available</h1>
                <p className="text-sm mb-8 ">Click 👇 to go back to the event page</p>
                <button className="w-[60%] transition-all  transition-scale  hover:scale-[1.05] cursor-pointer duration-200 p-2 border border-[#24A0B5] bg-gradient-to-br from-[#041e237b] to-[#249fb57a] text-[#24A0B5] hover:bg-[#24A0B5] hover:text-[#f4f4f4] rounded-md text-sm md:text-base" onClick={() => navigate('/')}>Event</button>
            </div>
        </div>

    )
}

export default NoTicket
