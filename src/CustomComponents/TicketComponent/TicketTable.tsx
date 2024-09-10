import { Comment } from "@/CustomComponents/TicketDetailPageComponent/CommentCard";
import { Button } from "@/components/ui/button";
import {
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useModalState } from "@/hooks/store";
import axios from "axios";
import React, { useEffect, useState } from "react";
import MultiSelect from "../MultiSelect"; // Import the MultiSelect component
import TicketRow from "./TicketRow";
const BACKEND_URL = import.meta.env.VITE_TASK_MANAGER_BACKEND_URL;
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
  author: Employee;
  updatedAt: string;
  comments: Comment[];
  type: string;
}

const TicketTable: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/tickets`);
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

  const toggleModal = useModalState((state) => state.toggleModal);

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
        <div className="flex gap-4">
        <MultiSelect
          employees={employees}
          selectedEmployees={selectedEmployees}
          onSelectionChange={handleSelectionChange}
        />
        <Button
          variant="outline"
          onClick={toggleModal}
          className="h-[42px] m-0"
        >
          Create Ticket
        </Button>
        </div>
        
      </div>

      <table className="w-full table-auto">
        <TableHead className="m-0 pt-2 px-0">
          <TableRow className="grid grid-cols-[150px_3fr_2fr_1fr]">
            <TableHeader className="pl-4">Ticket</TableHeader>
            <TableHeader className="pl-4 min-w-[200px] truncate x">
              Ticket Name
            </TableHeader>
            <TableHeader className="pl-4 min-w-[200px]">Progress</TableHeader>
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
