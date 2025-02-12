import SelectTicketDetails from "./page/SelectTicketDetails"
import AttendeeDetails from "./page/AttendeeDetails"
import BookTicket from "./page/BookTicket"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"


const App = () => {
  return (
    <div className="text-white bg-[#041E23] min-h-screen ">
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<SelectTicketDetails />} />
            <Route path="/attendee-ticket" element={<AttendeeDetails />} />
            <Route path="/book-ticket" element={<BookTicket />} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
