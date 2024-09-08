// TicketTable.tsx
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import TicketRow from "./TicketRow";

interface Ticket {
  ticketNumber: string;
  ticketName: string;
  progress: number;
  assignees: string[];
}

const tickets: Ticket[] = [
  {
    ticketNumber: "#TSK-208",
    ticketName: "Loren Reviews",
    progress: 90,
    assignees: ["User1"],
  },
  {
    ticketNumber: "#TSK-199",
    ticketName: "Loren Follow Ups",
    progress: 80,
    assignees: ["User1"],
  },
  {
    ticketNumber: "#TSK-181",
    ticketName: "Call for money Loren (3 a day)",
    progress: 50,
    assignees: ["User1", "User2"],
  },
];

const TicketTable: React.FC = () => {
  return (
    <div className="">
      <table className="w-full border-collapse table-auto">
        <TableHead className="p-0 m-0">
          <TableRow className="grid grid-cols-[150px_3fr_2fr_1fr] bg-gray-100">
            <TableHeader className="pl-4">Ticket No.</TableHeader>
            <TableHeader className="pl-4 min-w-[200px] truncate">Item</TableHeader>
            <TableHeader className="pl-4">Progress</TableHeader>
            <TableHeader className="pl-4 min-w-[150px]">Assignees</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {tickets.map((ticket, index) => (
            <TicketRow
              key={index}
              ticketNumber={ticket.ticketNumber}
              ticketName={ticket.ticketName}
              progress={ticket.progress}
              assignees={ticket.assignees}
            />
          ))}
        </TableBody>
      </table>
    </div>
  );
};

export default TicketTable;
