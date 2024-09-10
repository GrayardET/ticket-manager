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
    <div className="w-full min-w-[400px] rounded-md shadow-md bg-white h-full">
      <div className="py-4 px-6">
        <div className="pt-1 py-3 mb-3 border-b-[1.2px] border-gray-200 font-bold">
          Delete your Task
        </div>

        <div className="pt-1 flex gap-6 min-w-[240px] w-full">
          <p className="flex flex-1 text-sm text-neutral-500 min-w-[230px]">
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
    </div>
  );
};

export default SubtaskDeletion;
