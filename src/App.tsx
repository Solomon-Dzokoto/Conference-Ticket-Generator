import SelectTicketDetails from "./page/SelectTicketDetails"
import AttendeeDetails from "./page/AttendeeDetails"
import BookTicket from "./page/BookTicket"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"


const App = () => {
  return (
    <div className="text-white relative py-8 bg-[#02191D] min-h-full ">
      <Router>
        <Routes>
          <Route  path="/" element={<Layout />}>
            <Route index element={<SelectTicketDetails />} />
            <Route path="/attendee-ticket" element={<AttendeeDetails />} />
            <Route path="/book-ticket" element={<BookTicket />} />
          </Route>
        </Routes>
      </Router>
      <div className="absolute bottom-0 z-8 left-0 w-full "><img className=" left-0 w-full h-full bg-black opacity-50" src="/assets/Screen Shot 2025-02-13 at 12.45.01 PM.png" alt="overlay" /></div>
    </div>
  )
}

export default App
