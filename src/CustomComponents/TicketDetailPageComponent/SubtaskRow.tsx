import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; //
import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import toast from "react-hot-toast";
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
  const colorMapping: { [key: string]: string } = {
    Pending: "bg-orange-100",
    Complete: "bg-blue-100",
    Issue: "bg-red-100",
    Verify: "bg-lime-100",
  };
  return (
    <TableRow className="hover:bg-gray-200 rounded-lg">
      <TableCell className="max-w-[250px] min-w-[150px] text-ellipsis overflow-hidden whitespace-normal">
        {subtask.ticketName}
      </TableCell>
      <TableCell className="max-w-[140px] min-w-[110px]">
        <Select
          value={subtask.status}
          onValueChange={(value) => onStatusChange(subtask._id, value)}
        >
          {/* Actual button being displayed */}
          <SelectTrigger
            className={`w-[120px] ${colorMapping[subtask.status]}`}
          >
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Complete" className="">
                Complete
              </SelectItem>
              <SelectItem value="Verify">Verify</SelectItem>
              <SelectItem value="Issue">Issue</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className="max-w-8 pr-0 item-end">
        <button
          onClick={() => {
            onDelete(subtask._id);
            toast.success("Subtask deleted successfully!");
          }}
        >
          <IoTrashOutline className="w-5 h-5 text-red-500 hover:cursor-pointer" />
        </button>
      </TableCell>
    </TableRow>
  );
};

export default SubtaskRow;
