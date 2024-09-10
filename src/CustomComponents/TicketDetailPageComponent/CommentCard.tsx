import ProfileCard from "../ProfileCard";
import { Employee } from "../TicketComponent/TicketTable";


export interface Comment {
  employee: Employee;
  comment: string;
  date: string;
}

interface CommentCardProps {
  comment: Comment;
}


const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  return (
    <div>
      <ProfileCard employee={comment.employee} />
    </div>
  );
};

export default CommentCard;
