import React, { useEffect, useState } from "react";
import { IoIosCheckmark, IoIosClose } from "react-icons/io";
import { Employee } from "./TicketComponent/TicketTable";

interface MultiSelectProps {
  employees: Employee[];
  selectedEmployees: Employee[];
  onSelectionChange: (selected: Employee[]) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  employees,
  selectedEmployees,
  onSelectionChange,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectRef = React.useRef<HTMLDivElement | null>(null);
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (employee: Employee) => {
    // Check if the employee is already selected
    const isSelected = selectedEmployees.some(
      (e) => e.email === employee.email
    );
    if (isSelected) {
      // Deselect employee
      const updatedSelection = selectedEmployees.filter(
        (e) => e.email !== employee.email
      );
      onSelectionChange(updatedSelection);
    } else {
      // Select employee
      onSelectionChange([...selectedEmployees, employee]);
    }
  };

  return (
    <div className="relative">
      <div
        className={`flex flex-wrap items-center border border-gray-300 bg-white min-h-[42px] w-[200px] shadow-sm rounded-sm p-2 gap-1 cursor-text ${
          isOpen ? "ring-blue ring-2" : ""
        }`}
        ref={selectRef}
        onClick={toggleDropdown}
      >
        {selectedEmployees.length > 0 ? (
          selectedEmployees.map((employee) => (
            <span
              key={employee.email}
              className="bg-gray-100 p-0.5 px-2 rounded-sm text-sm flex items-center"
            >
              {employee.name}
              <button
                className="ml-1 text-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(employee);
                }}
              >
                <IoIosClose
                  size={18}
                  className="hover:cursor-pointer hover:stroke-[25px]"
                />
              </button>
            </span>
          ))
        ) : (
          <div className="text-gray-400 text-sm">Select Employees</div>
        )}
      </div>

      {/* Dropdown options */}
      {isOpen && (
        <div
          ref={selectRef}
          className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto"
        >
          {employees.map((employee) => {
            const isSelected = selectedEmployees.some(
              (e) => e.email === employee.email
            );
            return (
              <div
                key={employee.email}
                onClick={() => handleSelect(employee)}
                className={`p-2 text-sm text-slate-500 hover:bg-gray-100 flex items-center justify-between cursor-pointer ${
                  isSelected ? "bg-gray-100" : ""
                }`}
              >
                <span>{employee.name}</span>
                {isSelected && (
                  <span className="text-green-600">
                    <IoIosCheckmark size={20} />
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
