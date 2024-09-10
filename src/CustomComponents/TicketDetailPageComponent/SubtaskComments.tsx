import { format } from "date-fns";
import ProfileCard from "../ProfileCard";
import { Ticket } from "../TicketComponent/TicketTable";

interface SubtaskCommentsProps {
  ticket: Ticket;
}

const SubtaskComments: React.FC<SubtaskCommentsProps> = ({ ticket }) => {
  return (
    <div className="w-3/5 p-6 min-w-[300px] shadow-md rounded-md bg-white">
      <div className="pb-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Comments</h2>
      </div>

      <div className="py-4 space-y-4">
        {ticket.comments.map((comment, index) => {
          return (
            <div className="flex flex-col border-b-[1.2px]">
              <div className="flex flex-row items-start pb-3">
                <ProfileCard key={index} employee={comment.employee} />
                <div className="text-xs text-gray-400 min-w-[135px] ">
                  {format(new Date(ticket.updatedAt), "yyyy-MM-dd HH:mm")}
                </div>
              </div>
              <div className="text-md text-gray-700 text-sm px-1 pb-4 truncate">
                {comment.comment}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubtaskComments;
