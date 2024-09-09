import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Shadcn Select component
import { TableCell, TableRow } from "@/components/ui/table"; // Shadcn TableRow and TableCell
import React from "react";
import { IoTrashOutline } from "react-icons/io5";
import { Ticket } from "../TicketComponent/TicketTable";

interface SubtaskRowProps {
  subtask: Ticket;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: string) => void;
}

const SubtaskRow: React.FC<SubtaskRowProps> = ({
  subtask,
  onDelete,
  onStatusChange,
}) => {
  return (
    <TableRow className="hover:bg-gray-200 rounded-lg">
      <TableCell className="max-w-[250px] min-w-0 text-ellipsis overflow-hidden whitespace-normal">
        {subtask.ticketName}
      </TableCell>
      <TableCell className="max-w-[180px] min-w-[120px]">
        <Select
          value={subtask.status}
          onValueChange={(value) => onStatusChange(subtask._id, value)}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Complete">Complete</SelectItem>
              <SelectItem value="Verify">Verify</SelectItem>
              <SelectItem value="Issue">Issue</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className="w-8 pr-0 item-end">
        <button onClick={() => onDelete(subtask._id)}>
          <IoTrashOutline className="w-5 h-5 text-red-500 hover:cursor-pointer" />
        </button>
      </TableCell>
    </TableRow>
  );
};

export default SubtaskRow;
