import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Shadcn Select
import { Textarea } from "@/components/ui/textarea"; // Shadcn Textarea
import { useModalState } from "@/hooks/Store";
import axios from "axios"; // For fetching employees
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { Employee } from "./TicketComponent/TicketTable";

interface ModalProps {
  disabled?: boolean;
}

interface FormData {
  ticketNumber: string;
  ticketName: string;
  description: string;
  assignedTo: string[];
  status: string;
  type: string;
}

const Modal: React.FC<ModalProps> = ({ disabled }) => {
  const isOpen = useModalState((state) => state.isOpen);
  const toggleModal = useModalState((state) => state.toggleModal);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const [employees, setEmployees] = useState<Employee[]>([]); // State for storing employee data

  useEffect(() => {
    // Fetch employees for the "Assigned To" field
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/employees");
        console.log("Employees", response.data);
        setEmployees(response.data);
      } catch (error) {
        console.error("Failed to fetch employees", error);
      }
    };
    fetchEmployees();
  }, []);

  const handleClose = () => {
    if (isOpen) {
      toggleModal();
      return;
    }
  };

  const onSubmit = async (data: FormData) => {
    console.log(data);
    try {
      await axios.post("http://localhost:3000/api/tickets", data);
      toggleModal();
    } catch (error) {
      console.error("Failed to create ticket", error);
    }
  };

  const onSubmitHandler: SubmitHandler<FormData> = (data) => {
    if (disabled) {
      return;
    }

    onSubmit(data); // Submit form data to the parent function
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none
          focus:outline-none bg-neutral-300 bg-opacity-70"
      >
        <div className="relative w-full lg:w-3/6 my-6 mx-auto lg:max-w-2xl h-full lg:h-auto">
          {/* content */}
          <div className="h-full lg:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none">
            {/* Header */}
            <div className="flex items-center justify-between px-10 py-8 rounded-t border-b-[1.5px] border-neutral-100">
              <h3 className="text-xl text font-bold ">Create New Task</h3>
              <button>
                <AiOutlineClose
                  size={18}
                  className="border-0 hover:opacity-70 transition cursor-pointer"
                  onClick={handleClose}
                />
              </button>
            </div>

            {/* Body */}
            <form
              onSubmit={handleSubmit(onSubmitHandler)}
              className="px-10 py-5 flex-auto space-y-4"
            >
              {/* Ticket number field */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Ticket Name
                </label>
                <Input
                  type="text"
                  {...register("ticketNumber", { required: true })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 focus:ring-none rounded-md shadow-sm"
                  placeholder="Enter ticket number"
                />
                {errors.ticketName && (
                  <p className="text-red-500 text-sm">
                    Ticket number is required.
                  </p>
                )}
              </div>
              
              {/* Ticket Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Ticket Name
                </label>
                <Input
                  type="text"
                  {...register("ticketName", { required: true })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 focus:ring-none rounded-md shadow-sm"
                  placeholder="Enter ticket name"
                />
                {errors.ticketName && (
                  <p className="text-red-500 text-sm">
                    Ticket name is required.
                  </p>
                )}
              </div>

              {/* Description Field (Shadcn Textarea) */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <Textarea
                  {...register("description", { required: true })}
                  placeholder="Enter description"
                  className="mt-1"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    Description is required.
                  </p>
                )}
              </div>

              {/* Assigned To Field (Shadcn Select for Employees) */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Assigned To
                </label>
                <Select
                  onValueChange={(value) => setValue("assignedTo", [value])}
                  defaultValue=""
                >
                  <SelectTrigger className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
                    <SelectValue placeholder="Select employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((employee) => (
                      <SelectItem key={employee._id} value={employee._id}>
                        {employee.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.assignedTo && (
                  <p className="text-red-500 text-sm">
                    Assigned to is required.
                  </p>
                )}
              </div>

              {/* Status Field (Shadcn Select) */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Status
                </label>
                <Select
                  onValueChange={(value) => setValue("status", value)}
                  defaultValue="Pending"
                >
                  <SelectTrigger className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Complete">Complete</SelectItem>
                    <SelectItem value="Verify">Verify</SelectItem>
                    <SelectItem value="Issue">Issue</SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && (
                  <p className="text-red-500 text-sm">Status is required.</p>
                )}
              </div>

              {/* Type Field (Shadcn Select for Ticket Type) */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Type
                </label>
                <Select
                  onValueChange={(value) => setValue("type", value)}
                  defaultValue="Task"
                >
                  <SelectTrigger className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Task">Task</SelectItem>
                    <SelectItem value="Bug">Bug</SelectItem>
                    <SelectItem value="Feature">Feature</SelectItem>
                  </SelectContent>
                </Select>
                {errors.type && (
                  <p className="text-red-500 text-sm">Type is required.</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-5">
                <button
                  type="submit"
                  className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
                    disabled
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-blue-600"
                  }`}
                  disabled={disabled}
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
