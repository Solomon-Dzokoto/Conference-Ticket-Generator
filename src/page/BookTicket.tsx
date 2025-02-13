import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const BookTicket = () => {
    const getDetails = () => {

        const ticketSelection = localStorage.getItem("ticketSelection");
        const personInfo = localStorage.getItem("personInfo");
        if (ticketSelection && personInfo) {
            const ticketData = JSON.parse(ticketSelection)
            const personInfoData = JSON.parse(personInfo)
            console.log(ticketData)
            console.log(personInfoData)
            return [ticketData, personInfoData]
        } else {
            console.log("No user details")
        }
        return null
    }
    useEffect(() => {
        getDetails()
    }, [])

    return (
        <div className=" w-[50vw] relative h-[80vh]  ">
            <div className="bg-[url('assets/TICKET.png')] absolute bg-no-repeat h-full inset-0  bg-cover p-8 w-full "> </div>
            <div className="bg-[#072C31] text-white p-6 rounded-2xl shadow-lg border border-[#24A0B5] max-w-md w-full ">
                <h2 className="text-2xl font-bold text-center mb-2 tracking-wide">
                    Techember Fest '25
                </h2>
                <div className="text-center text-sm mb-4">
                    <p className="flex items-center justify-center gap-2">
                        📍 04 Rumens Road, Ikoyi, Lagos
                    </p>
                    <p className="flex items-center justify-center gap-2">
                        📅 March 15, 2025 | 🕖 7:00 PM
                    </p>
                </div>

                <div className="flex justify-center mb-4">
                    <img
                        src="assets/TICKET.png"
                        alt="Attendee"
                        className="w-24 h-24 rounded-lg border-2 border-cyan-500"
                    />
                </div>

                <div className="bg-[#062b33]  rounded-lg text-sm">
                    <div className="grid grid-cols-2 divide-x divide-gray-700  gap-2 border-b border-gray-700 ">
                        <div className="p-2 ">
                            <p className="text-gray-400">Enter your name</p>
                            <p className="font-semibold mt-1">Avi Chukwu</p>
                        </div>
                        <div className="p-2 ">
                            <p className="text-gray-400">Enter your email *</p>
                            <p className="font-semibold mt-1">User@email.com</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 divide-x divide-gray-700  gap-2 border-b border-gray-700 ">
                        <div className="p-2 ">
                            <p className="text-gray-400">Ticket Type:</p>
                            <p className=" mt-1">VIP</p>
                        </div>
                        <div className="p-2 ">
                            <p className="text-gray-400">Ticket for:</p>
                            <p className=" mt-1">1</p>
                        </div>
                    </div>

                    <div className="my-2">
                        <p className="text-gray-400 mb-2">Special request?</p>
                        <p className=" text-gray-300">
                            Nil? Or the user's sad story they write in there gets this whole
                            space, Max of three rows
                        </p>
                    </div>
                </div>


            </div>

        </div>

    );
}

export default BookTicket