import {
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import React, { useEffect, useState } from "react";
import MultiSelect from "../MultiSelect"; // Import the MultiSelect component
import TicketRow from "./TicketRow";
import { useModalState } from "@/hooks/Store";
import { Button } from "@/components/ui/button";

export interface Employee {
  _id: string;
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

const TicketTable: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/tickets");
        const ticketData = response.data;
        setTickets(ticketData);
        setFilteredTickets(ticketData);

        // Extract unique employees from tickets
        const allEmployees: Employee[] = ticketData.reduce(
          (acc: Employee[], ticket: Ticket) => {
            ticket.assignedTo.forEach((employee) => {
              if (!acc.find((e) => e.email === employee.email)) {
                acc.push(employee);
              }
            });
            return acc;
          },
          []
        );
        setEmployees(allEmployees);
      } catch (err) {
        console.error("Failed to fetch tickets");
      }
    };
    fetchTickets();
  }, []);

  const toggleModal = useModalState((state)=>state.toggleModal);

  const handleSelectionChange = (selected: Employee[]) => {
    setSelectedEmployees(selected);

    if (selected.length === 0) {
      setFilteredTickets(tickets);
    } else {
      const filtered = tickets.filter((ticket) => {
        // Get a list of emails assigned to the ticket
        const assignedEmails = ticket.assignedTo.map(
          (assigned) => assigned.email
        );

        // Check if any selected employee's email is in the assigned emails
        return selected.some((employee) =>
          assignedEmails.includes(employee.email)
        );
      });
      setFilteredTickets(filtered);
    }
  };

  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <h1 className="pl-4 text-2xl font-bold min-w-40">Task Manager</h1>
        <MultiSelect
          employees={employees}
          selectedEmployees={selectedEmployees}
          onSelectionChange={handleSelectionChange}
        />
         <Button variant="outline" onClick={toggleModal} className="h-[42px] m-0">Create Ticket</Button>
      </div>

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
          {filteredTickets.length > 0 ? (
            filteredTickets.map((ticket, index) => (
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
