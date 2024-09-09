import React from "react";
import { Ticket } from "./TicketComponent/TicketTable";

interface ProgressBarProps {
  parentTicketStatus: string;
  tickets: Ticket[] | undefined;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  tickets,
  parentTicketStatus,
}) => {
  const statusColorMapping: { [key: string]: string } = {
    Pending: "bg-orange-400",
    Complete: "bg-blue-400",
    Issue: "bg-red-400",
    Verify: "bg-lime-500",
  };

  if (tickets === undefined || tickets?.length === 0) {
    return (
      <div
        className={`${statusColorMapping[parentTicketStatus]} rounded-sm h-full`}
        style={{ width: "100%" }}
      ></div>
    );
  }

  const total = tickets.length;
  const pending =
    (tickets.filter((subtask) => subtask.status === "Pending").length / total) *
    100;
  const complete =
    (tickets.filter((subtask) => subtask.status === "Complete").length /
      total) *
    100;
  const issue =
    (tickets.filter((subtask) => subtask.status === "Issue").length / total) *
    100;
  const verified =
    (tickets.filter((subtask) => subtask.status === "Verify").length / total) *
    100;

  return (
    <div className="w-full h-full flex bg-gray-200 rounded-lg overflow-hidden">
      <div
        className="bg-orange-400 h-full transition-all duration-500"
        style={{ width: `${pending}%` }}
      ></div>
      <div
        className="bg-blue-400 h-full transition-all duration-500"
        style={{ width: `${complete}%` }}
      ></div>
      <div
        className="bg-red-400 h-full transition-all duration-500"
        style={{ width: `${issue}%` }}
      ></div>
      <div
        className="bg-lime-500 h-full transition-all duration-500"
        style={{ width: `${verified}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
