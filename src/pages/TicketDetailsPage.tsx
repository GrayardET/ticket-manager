import SubtaskTable from "@/CustomComponents/SubtaskComponent/SubtaskTable";
import React from "react";
import { useParams } from "react-router-dom";

const TicketDetailsPage: React.FC = () => {
  const { ticketId } = useParams();

  return (
    <div className="p-4 h-full bg-gray-100">
      <p className="text-gray-600">Details for ticket: {ticketId}</p>
      {ticketId && <SubtaskTable ticketId={ticketId!} />}
    </div>
  );
};

export default TicketDetailsPage;
