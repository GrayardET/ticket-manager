import TicketTable from "./Dashboard/TicketTable";

export default function App() {
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-7xl p-8">
          <h1 className="text-2xl font-bold mb-6">Task Manager</h1>
          <TicketTable />
        </div>
      </div>
    </div>
  );
}
