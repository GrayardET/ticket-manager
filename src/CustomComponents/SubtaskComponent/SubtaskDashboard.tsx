import axios from "axios";
import React, { useEffect, useState } from "react";
import { Ticket } from "../TicketComponent/TicketTable";
import SubtaskTable from "./SubtaskTable";

interface SubtaskDashboardProps {
  ticketId: string;
}

const SubtaskDashboard: React.FC<SubtaskDashboardProps> = ({ ticketId }) => {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const getTicket = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/tickets/${ticketId}`
        );
        console.log(response.data);
        setTicket(response.data);
      } catch (err) {
        setError("Failed to fetch ticket: " + error);
      }
    };
    getTicket();
  }, []);

  return (
    <div>
      {ticket && <SubtaskTable ticket={ticket} setTicket={setTicket} />}
    </div>
  );
};

export default SubtaskDashboard;
