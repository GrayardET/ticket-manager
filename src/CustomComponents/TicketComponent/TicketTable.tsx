// TicketTable.tsx
import {
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import React, { useEffect, useState } from "react";
import TicketRow from "./TicketRow";

export interface Employee {
  name: string;
  email: string;
  avatar: string;
}

export interface Ticket {
  _id: string;
  ticketNumber: string;
  ticketName: string;
  description?: string;
  subtickets: Ticket[];
  assignedTo: Employee[];
  status: string;
}

function calculateProgress(subtickets: Ticket[]): number {
  if (subtickets === undefined || subtickets?.length === 0) {
    return 100;
  }
  const verifiedsubtickets = subtickets.filter(
    (subtask) => subtask.status === "Verify"
  );
  const progress = (verifiedsubtickets.length / subtickets.length) * 100;
  return progress;
}

const TicketTable: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        // API call to fetch tickets
        const response = await axios.get("http://localhost:3000/api/tickets");
        // console.log(response.data);
        setTickets(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch tickets");
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  if (loading) {
    return <p>Loading tickets...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="">
      <table className="w-full table-auto">
        <TableHead className="m-0 pt-2 px-0">
          <TableRow className="grid grid-cols-[150px_3fr_2fr_1fr] bg-gray-100">
            <TableHeader className="pl-4">Ticket</TableHeader>
            <TableHeader className="pl-4 min-w-[200px] truncate">
              Item
            </TableHeader>
            <TableHeader className="pl-4 min-w-[180px]">Progress</TableHeader>
            <TableHeader className="pl-4 min-w-[150px]">Assignees</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(tickets) && tickets.length > 0 ? (
            tickets.map((ticket, index) => (
              <TicketRow
                key={index}
                ticketId={ticket._id}
                ticketNumber={ticket.ticketNumber}
                ticketName={ticket.ticketName}
                assignedTo={ticket.assignedTo}
                subtickets={ticket.subtickets}
                status={ticket.status}
              />
            ))
          ) : (
            <TableRow>
              <td colSpan={4} className="pl-4">
                No data available
              </td>
            </TableRow>
          )}
        </TableBody>
      </table>
    </div>
  );
};

export default TicketTable;
