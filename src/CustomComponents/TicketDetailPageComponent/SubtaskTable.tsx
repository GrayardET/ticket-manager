import { Table, TableBody } from "@/components/ui/table"; // Shadcn Table
import axios from "axios";
import React, { useState } from "react";
import ProgressBar from "../ProgressBar"; // Custom progress bar
import { Ticket } from "../TicketComponent/TicketTable";
import SubtaskRow from "./SubtaskRow";
const BACKEND_URL = import.meta.env.VITE_TASK_MANAGER_BACKEND_URL;

interface SubtaskTableProps {
  ticket: Ticket;
  setTicket: React.Dispatch<React.SetStateAction<Ticket | null>>;
}
const SubtaskTable: React.FC<SubtaskTableProps> = ({ ticket, setTicket }) => {
  const [error, setError] = useState<string | null>(null);

  if (error) {
    return <div>{error}</div>;
  }

  const handleSubticketsDelete = async (id: string) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/tickets/${id}`);
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
      await axios.put(`${BACKEND_URL}/api/tickets/${id}/status`, {
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
  if (
    ticket.subtickets === null ||
    ticket.subtickets === undefined ||
    ticket.subtickets.length === 0
  ) {
    return (
      <div className="w-2/5 min-w-[250px] rounded-md bg-neutral-200 flex justify-center items-center font-semibold">
        No Subtask Found
      </div>
    );
  }

  return (
    <div className="w-2/5 rounded-md shadow-md bg-white">
      <div className="p-4 px-6">
        <div className="pt-1 py-3 mb-3 border-b-[1.2px] border-gray-200 font-bold text-l">
          Subtasks
        </div>
        <div className="py-2">
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
    </div>
  );
};

export default SubtaskTable;
