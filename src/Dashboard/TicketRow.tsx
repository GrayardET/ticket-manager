// TicketRow.tsx
import React from 'react';

interface TicketRowProps {
  ticketNumber: string;
  ticketName: string;
  progress: number;
  assignees: string[];
}

const TicketRow: React.FC<TicketRowProps> = ({ ticketNumber, ticketName, progress, assignees }) => {
  return (
    <tr className="grid grid-cols-[150px_3fr_2fr_1fr] border-b text-sm">
      <td className="py-2 px-4 text-gray-500">{ticketNumber}</td>
      <td className="py-2 px-4 min-w-[200px] truncate">{ticketName}</td>
      <td className="py-2 px-4">
        <div className="bg-gray-200 h-2 w-full rounded">
          <div className="bg-green-500 h-full" style={{ width: `${progress}%` }}></div>
        </div>
      </td>
      <td className="py-2 px-4 flex min-w-[150px]">
        {assignees.map((assignee, index) => (
          <div key={index} className="w-8 h-8 bg-gray-400 rounded-full mr-2"></div>
        ))}
      </td>
    </tr>
  );
};

export default TicketRow;
