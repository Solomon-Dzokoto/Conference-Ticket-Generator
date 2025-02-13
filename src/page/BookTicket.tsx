import { data } from "./SelectTicketDetails";
import { getDetails } from "../context/getDataStored";

const BookTicket = () => {

    const details = getDetails()

    const access = data.map(item => {
        if (details) {
            if (item.id === details[0].select) {
                return item.name
            }
        }
        return null
    })

    const numberOfTickets = details ? details[0].numberOfTickets : 1;

    const { name, email, imageUrl, specialRequest } = details ? details[1] : null;




    return (
        <div className="w-[80vw] grid gap-4 mx-auto">
            <div className="flex justify-between items-center">
                <h2>Ready</h2>
                <p>Step 3/3</p>
            </div>
            <span className="w-full h-1 relative after:bottom-0 after:left-0 after:absolute after:top-0 after:right-[25%]  after:bg-[#24A0B5] after:content-[''] bg-[#2C545B]"></span>
            <h1 className="text-[2rem] font-semibold text-center text-white ">Your Ticket is Booked!</h1>
            <p className="text-center tracking-tighter-2 ">Check your email for a copy or you can <b>download</b> </p>
         
            <div className=" w-[35vw] mx-auto relative px-6 h-[94vh] grid z-10 place-content-center gap-4  ">
                <img src="/assets/TICKET.png" className=" absolute h-full inset-0 -z-10   w-full object-fit  "></img>
                <div className="bg-[#072C31] text-white p-6 rounded-2xl shadow-lg border border-[#24A0B5]  w-full ">
                    <h2 className="text-xl font-bold text-center mb-2 tracking-wide">
                        Techember Fest '25
                    </h2>
                    <div className="text-center text-sm mb-4">
                        <p className="flex items-center text-[.7rem] justify-center gap-2">
                            📍 04 Rumens Road, Ikoyi, Lagos
                        </p>
                        <p className="flex items-center text-[.7rem] justify-center gap-2">
                            📅 March 15, 2025 | 🕖 7:00 PM
                        </p>
                    </div>

                    <div className="flex justify-center mb-4">
                        <img
                            src={imageUrl}
                            alt="Attendee"
                            className="w-24 h-24 rounded-lg border-2 border-cyan-500"
                        />
                    </div>

                    <div className="bg-[#062b33] rounded-lg text-sm">
                        <div className="grid grid-cols-2 divide-x divide-gray-700 gap-2 border-b border-gray-700">
                            <div className="p-2">
                                <p className="text-gray-400 text-[.7rem]">Enter your name</p>
                                <p className="break-words font-semibold mt-1 max-h-16 overflow-y-auto">{name}</p>
                            </div>
                            <div className="p-2">
                                <p className="text-gray-400 text-[.7rem]">Enter your email *</p>
                                <p className="break-words font-semibold mt-1 max-h-16 overflow-y-auto">{email}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 divide-x divide-gray-700  gap-2 border-b border-gray-700 ">
                            <div className="p-2 ">
                                <p className="text-gray-400 text-[.7rem]">Ticket Type:</p>
                                <p className=" mt-1">{access}</p>
                            </div>
                            <div className="p-2 ">
                                <p className="text-gray-400 text-[.7rem]">Ticket for:</p>
                                <p className=" mt-1">{numberOfTickets}</p>
                            </div>
                        </div>

                        <div className="my-2">
                            <p className="text-gray-400 mb-2">Special request?</p>
                            <p className=" text-gray-300">
                                {specialRequest}
                            </p>
                        </div>
                    </div>


                </div>
                <div className="">
                    <img src="/assets/Bar Code.png" alt="barcode" className="w-full relative top-6 p-4 " />
                </div>

            </div>

            <div className="flex mt-4 relative z-10 gap-4">
                <button  className="w-full transition-colors cursor-pointer p-4 border border-[#24A0B5] bg-[#041E23] text-[#24A0B5] hover:bg-[#24A0B5] hover:text-[#f4f4f4] px-4 rounded-md">Book Another Ticket</button>
                <button type="submit" className="border p-4 w-full bg-[#24A0B5] border-[#24A0B5] cursor-pointer text-[#f4f4f4] hover:bg-[#041E23] hover:text-[#24A0B5] px-4 rounded-md">Download Ticket</button>
            </div>
        </div>
    );
}

export default BookTicket