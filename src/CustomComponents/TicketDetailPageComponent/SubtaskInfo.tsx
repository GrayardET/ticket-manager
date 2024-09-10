import { Badge } from "@/components/ui/badge";
import React from "react";
import ProfileCard from "../ProfileCard";
import { Ticket } from "../TicketComponent/TicketTable";
import { format } from "date-fns";

interface SubtaskInfoProps {
  ticket: Ticket;
}

const SubtaskInfo: React.FC<SubtaskInfoProps> = ({ ticket }) => {
  console.log("Ticket: ", ticket);
  return (
    <div className="w-2/5 p-6 min-w-[300px] shadow-md rounded-md bg-white">
      {/* Ticket Header */}
      <div className="pb-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-xl font-semibold">{ticket.ticketName}</h2>
        <span className="text-xs text-gray-400 pr-4">
        {format(new Date(ticket.updatedAt), "yyyy-MM-dd HH:mm")}
        </span>
      </div>

      {/* Ticket Body */}
      <div className="py-4 space-y-4">
        {/* About Section */}
        <div>
          <h3 className="font-semibold text-gray-700">About</h3>
          <p className="text-gray-600 text-sm">{ticket.description}</p>
        </div>

        {/* Type Section */}
        <div>
          <h3 className="font-semibold text-gray-700">Type</h3>
          <Badge>{ticket.type}</Badge>
        </div>

        {/* Author Section */}
        <div>
          <h3 className="font-semibold text-gray-700">Author</h3>
          <ProfileCard employee={ticket.author} />
        </div>

        {/* Assigned To Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Assignees</h3>
          <div className="space-y-3">
            {ticket.assignedTo.map((assignee) => (
              <div
                key={assignee._id}
                className="flex items-center justify-between"
              >
                <ProfileCard employee={assignee} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubtaskInfo;
