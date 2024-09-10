import { Ticket } from "@/CustomComponents/TicketComponent/TicketTable";
import SubtaskDeletion from "@/CustomComponents/TicketDetailPageComponent/SubtaskDeletion";
import SubtaskTable from "@/CustomComponents/TicketDetailPageComponent/SubtaskTable";
import axios from "axios";

import SubtaskComments from "@/CustomComponents/TicketDetailPageComponent/SubtaskComments";
import SubtaskInfo from "@/CustomComponents/TicketDetailPageComponent/SubtaskInfo";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_TASK_MANAGER_BACKEND_URL;

const TicketDetailsPage: React.FC = () => {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleDelete = async (ticketId: string) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/tickets/${ticketId}`);
      toast.success("Ticket deleted successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Ticket deleted failed!");
      setError("Failed to delete ticket: " + error);
    }
  };

  useEffect(() => {
    const getTicket = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/tickets/${ticketId}`
        );
        setTicket(response.data);
      } catch (err) {
        setError("Failed to fetch ticket: " + error);
      }
    };
    getTicket();
  }, []);

  return (
    <div className="p-4 h-full bg-gray-50 overflow-auto flex flex-col gap-4 w-full">
      {/* <p className="text-gray-600">Details for ticket: {ticketId}</p> */}
      {ticket && (
        <div className="flex flex-row justify-start gap-4">
          <SubtaskInfo ticket={ticket} />
          <SubtaskComments ticket={ticket} />
        </div>
      )}
      {ticketId && (
        <div className="flex felx-row gap-6 w-full">
          {ticket && <SubtaskTable ticket={ticket} setTicket={setTicket} />}
          <SubtaskDeletion ticketId={ticketId} handleDelete={handleDelete} />
        </div>
      )}
    </div>
  );
};

export default TicketDetailsPage;
