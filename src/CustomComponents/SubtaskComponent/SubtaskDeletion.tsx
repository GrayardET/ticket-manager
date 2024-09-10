import { Button } from "@/components/ui/button";
import React from "react";

interface SubtaskDeletionPros {
  ticketId: string;
  handleDelete: (id: string) => void;
}

const SubtaskDeletion: React.FC<SubtaskDeletionPros> = ({
  ticketId,
  handleDelete,
}) => {
  return (
    <div className="w-3/5 rounded-md shadow-sm bg-white h-full">
      <div className="border-b-[1.2px] border-gray-300 p-4 pb-2 font-semi">
        Delete your Task
      </div>

      <div className="p-4 flex gap-6">
        <p className="flex flex-1 text-xs text-neutral-500">
          When you elete your task, you lose comments, documents, and we
          permanently delete your task data
        </p>
        <Button
          className="flex flex-row justify-end text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
          variant="outline"
          onClick={() => handleDelete(ticketId)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default SubtaskDeletion;
