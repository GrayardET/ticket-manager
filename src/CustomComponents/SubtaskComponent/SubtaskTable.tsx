import { Table, TableBody } from "@/components/ui/table"; // Shadcn Table
import axios from "axios";
import React, { useState } from "react";
import ProgressBar from "../ProgressBar"; // Custom progress bar
import { Ticket } from "../TicketComponent/TicketTable";
import SubtaskRow from "./SubtaskRow";

interface SubtaskTableProps {
  ticket: Ticket;
  setTicket: React.Dispatch<React.SetStateAction<Ticket | null>>;
}
const SubtaskTable: React.FC<SubtaskTableProps> = ({ ticket, setTicket }) => {
  const [error, setError] = useState<string | null>(null);

  if (error) {
    return <div>{error}</div>;
  }

  // Delete subtickets (subtasks)
  const handleSubticketsDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/tickets/${id}`);
      setTicket((prevTicket) => {
        if (prevTicket) {
          const updatedSubtasks = prevTicket.subtickets.filter(
            (subtask) => subtask._id !== id
          );
          return { ...prevTicket, subtickets: updatedSubtasks };
        }
        return prevTicket;
      });
    } catch (error) {
      setError("Failed to delete subtask: " + error);
    }
  };

  // change subticket status
  const handleStatusChange = async (id: string, status: string) => {
    try {
      await axios.put(`http://localhost:3000/api/tickets/${id}/status`, {
        status,
      });

      setTicket((prevTicket) => {
        if (prevTicket) {
          const updatedSubtasks = prevTicket.subtickets.map((subtask) =>
            subtask._id === id ? { ...subtask, status } : subtask
          );
          return { ...prevTicket, subtickets: updatedSubtasks };
        }
        return prevTicket;
      });
    } catch (error) {
      setError("Failed to update status: " + error);
    }
  };

  console.log("Ticket: ", ticket);

  return (
    <div className="w-1/2 rounded-md shadow-sm bg-white">
      <div className="px-4 py-3 mb-3 border-b-[1.2px] border-gray-300 font-bold">
        Subtasks
      </div>
      <div className="py-2 px-4">
        <div className="h-[6px] mb-2">
          {ticket && (
            <ProgressBar
              parentTicketStatus={ticket.status}
              tickets={ticket.subtickets}
            />
          )}
        </div>

        <Table className="border-collapse w-full">
          <TableBody>
            {ticket?.subtickets.map((subtask) => (
              <SubtaskRow
                key={subtask._id}
                subtask={subtask}
                onDelete={handleSubticketsDelete}
                onStatusChange={handleStatusChange}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SubtaskTable;
