// TicketRow.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../ProgressBar";
import { Employee, Ticket } from "./TicketTable";

interface TicketRowProps {
  ticketId: string;
  ticketNumber: string;
  ticketName: string;
  assignedTo: Employee[];
  subtickets: Ticket[];
  status: string;
}

const TicketRow: React.FC<TicketRowProps> = ({
  ticketId,
  ticketNumber,
  ticketName,
  assignedTo,
  subtickets,
  status,
}) => {
  const navigate = useNavigate(); // Hook for navigation

  const handleClick = () => {
    // Navigate to the ticket details page using the ticket number
    navigate(`/tickets/${ticketId}`);
  };

  return (
    <tr
      className="grid grid-cols-[150px_3fr_2fr_1fr] border-b text-sm hover:bg-gray-200 active:bg-gray-300 cursor-pointer"
      onClick={handleClick}
    >
      <td className="py-2 px-4 text-gray-500 flex items-center">
        {ticketNumber}
      </td>
      <td className="py-2 px-4 min-w-[200px] truncate flex items-center">
        {ticketName}
      </td>
      <td className="pr-12 pl-4 flex items-center min-w-[200px]">
        <div className="bg-gray-200 h-2 w-full mr-">
          <ProgressBar parentTicketStatus={status} tickets={subtickets} />
        </div>
      </td>
      <td className="py-2 px-5 flex min-w-[150px]">
        {assignedTo &&
          assignedTo.map((assignee, index) => (
            <img
              key={index}
              src={assignee.avatar}
              alt={assignee.name}
              className="h-9 w-9 rounded-full border-2 border-white -ml-2"
              style={{ objectFit: "cover" }}
            />
          ))}
      </td>
    </tr>
  );
};

export default TicketRow;
