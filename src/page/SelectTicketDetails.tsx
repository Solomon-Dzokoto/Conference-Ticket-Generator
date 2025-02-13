import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const data = [
    { id: 1, type: "Free", name: 'Regular Access', available: "20/52" },
    { id: 2, type: "$ 150", name: 'VIP Access', available: "20/52" },
    { id: 3, type: "$ 150", name: 'VVIP Access', available: "20/52" },
];
const SelectTicketDetails = () => {

    const [select, setSelected] = useState<number | null>(null);
    const [numberOfTickets, setNumberOfTickets] = useState<number | null>(1);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setNumberOfTickets(parseInt(e.target.value));
    };

    const onSelect = (id: number) => {
        setSelected(id);
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!numberOfTickets || !select) {
            setError("Please select a ticket type and number of tickets");
            return;
        }

        // Store the selection in local storage before navigation
        const ticketData = { numberOfTickets, select };
        localStorage.setItem('ticketSelection', JSON.stringify(ticketData));

        // Navigate to attendee details page
        navigate('/attendee-ticket');
    };

    const cancelChoices = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation()
        setSelected(null);
        setNumberOfTickets(1);   
        const choice = localStorage.getItem('ticketSelection');
        if (choice) {
            localStorage.removeItem('ticketSelection');
        }
        console.log("selections removed")
        return null
        }

        return (
        <form onSubmit={onSubmit} className="rounded-2xl p-4 md:p-8 min-h-[38rem] grid gap-4 md:gap-8 border-[#0E464F] w-[90%] md:w-[48rem] bg-[#041E23] mx-auto border">
            <div className="flex justify-between items-center">
                <h2 className="text-lg md:text-xl">Ticket Selection</h2>
                <p className="text-sm md:text-base">Step 1/3</p>
            </div>
            <span className="w-full h-1 relative after:bottom-0 after:left-0 after:absolute after:top-0 after:right-[75%]  after:bg-[#24A0B5] after:content-[''] bg-[#2C545B]"></span>
            <div className="border-[#0E464F] grid gap-4 rounded-2xl p-2 md:p-4 border">
                <small className="text-red-600 mx-auto w-fit">{error}</small>
                <article className="bg-gradient-to-br from-[#0e464f98] to-[#041E23] py-4 md:py-8 text-[#f4f4f4] text-center rounded-2xl border border-[#0E464F]">
                    <h1 className="text-[1.8rem] md:text-[2.2rem] text-white font-semibold">Techember Fest '25</h1>
                    <p className="text-sm  text-center md:text-base">Join us for an unforgettable experience at</p>
                    <p className="text-sm md:text-base">[Event Name]! Secure your spot now.</p>
                    <p className="mt-4 text-sm md:text-base">📍 [Event Location] || March 15, 2025 | 7:00 PM</p>
                </article>
                <p className="text-sm md:text-base">Select Ticket Type:</p>
                <div className="flex flex-col md:flex-row gap-4">
                    {data.map(item => (
                        <article
                            key={item.id}
                            onClick={() => onSelect(item.id)}
                            className={`p-4 ${item.id === select ? "bg-[#12464E]" : "bg-[#0e464f98]"} relative cursor-pointer hover:bg-[#2C545B] w-full text-[#f4f4f4] border border-[#0E464F] rounded-2xl`}
                        >
                            <label htmlFor={`ticket-${item.id}`} className="cursor-pointer">
                                <h2 className="text-white font-semibold text-base md:text-[1.2rem] mb-2">{item.type}</h2>
                                <p className="uppercase text-sm md:text-base">{item.name}</p>
                                <small>{item.available}</small>
                            </label>
                            <input
                                id={`ticket-${item.id}`}
                                value={item.id}
                                className="absolute inset-0 hidden"
                                type="radio"
                                name="select"
                                checked={item.id === select}
                                onChange={() => onSelect(item.id)}
                            />
                        </article>
                    ))}
                </div>
                <p className="text-sm md:text-base">Number of Tickets</p>
                <select
                    onChange={onChange}
                    className="w-full rounded-xl p-2 focus:outline-0 border border-[#0E464F] text-sm md:text-base"
                    value={numberOfTickets || 1}
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
                <div className="flex flex-col md:flex-row gap-4">
                    <button 
                        onClick={cancelChoices} 
                        className="w-full transition-colors cursor-pointer p-2 border border-[#24A0B5] bg-[#041E23] text-[#24A0B5] hover:bg-[#24A0B5] hover:text-[#f4f4f4] px-4 rounded-md text-sm md:text-base"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        className="w-full border p-2 bg-[#24A0B5] border-[#24A0B5] cursor-pointer text-[#f4f4f4] hover:bg-[#041E23] hover:text-[#24A0B5] px-4 rounded-md text-sm md:text-base"
                    >
                        Next
                    </button>
                </div>
            </div>
        </form>
    );
};

export default SelectTicketDetails;