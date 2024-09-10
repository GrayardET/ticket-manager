import React from "react";
import { Employee } from "./TicketComponent/TicketTable";

interface ProfileCardProps {
  employee: Employee;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ employee }) => {
  return (
    <div className="w-full rounded-sm flex items-center space-x-3 hover:bg-neutral-100">
      <img
        src={employee.avatar}
        alt={employee.name}
        className="h-10 w-10 rounded-full border-2 border-white"
        style={{ objectFit: "cover" }}
      />
      <div>
        <h4 className="font-medium">{employee.name}</h4>
        <p className="text-sm text-gray-500">{employee.email}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
