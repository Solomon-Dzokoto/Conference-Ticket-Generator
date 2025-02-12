


const BookTicket = () => {


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-[#082032] text-white p-6 rounded-2xl shadow-lg border border-gray-700 max-w-md w-full">

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
                        src="https://via.placeholder.com/150"
                        alt="Attendee"
                        className="w-24 h-24 rounded-lg border-4 border-cyan-500"
                    />
                </div>

                <div className="bg-gray-800 p-4 rounded-lg text-sm">
                    <div className="grid grid-cols-2 gap-2 border-b border-gray-700 pb-2">
                        <p className="text-gray-400">Enter your name</p>
                        <p className="font-semibold">Avi Chukwu</p>
                        <p className="text-gray-400">Enter your email *</p>
                        <p className="font-semibold">User@email.com</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 border-b border-gray-700 py-2">
                        <p className="text-gray-400">Ticket Type:</p>
                        <p className="font-semibold">VIP</p>
                        <p className="text-gray-400">Ticket for:</p>
                        <p className="font-semibold">1</p>
                    </div>

                    <div className="mt-2">
                        <p className="text-gray-400">Special request?</p>
                        <p className="font-semibold text-gray-300">
                            Nil? Or the user's sad story they write in there gets this whole
                            space, Max of three rows
                        </p>
                    </div>
                </div>

                <div className="mt-4 flex justify-center">
                    <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=123456789"
                        alt="Barcode"
                        className="w-48 h-12"
                    />
                </div>
            </div>
        </div>
    );
}

export default BookTicket