import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TicketDetailsPage from "./pages/TicketDetailsPage";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} /> {/* Main Ticket Table */}
        <Route path="/tickets/:ticketId" element={<TicketDetailsPage/>} />{" "}
        {/* Ticket Details Page */}
      </Routes>
    </Router>
  );
}
