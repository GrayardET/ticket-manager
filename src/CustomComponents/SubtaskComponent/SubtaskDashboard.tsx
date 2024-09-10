import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Ticket } from "../TicketComponent/TicketTable";
import SubtaskDeletion from "./SubtaskDeletion";
import SubtaskTable from "./SubtaskTable";

interface SubtaskDashboardProps {
  ticketId: string;
}

const SubtaskDashboard: React.FC<SubtaskDashboardProps> = ({ ticketId }) => {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleDelete = async (ticketId: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/tickets/${ticketId}`);
      navigate("/");
    } catch (error) {
      setError("Failed to delete ticket: " + error);
    }
  };

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
    <div className="flex felx-row gap-6">
      {ticket && <SubtaskTable ticket={ticket} setTicket={setTicket} />}
      <SubtaskDeletion ticketId={ticketId} handleDelete={handleDelete} />
    </div>
  );
};

export default SubtaskDashboard;
