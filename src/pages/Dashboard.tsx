
import TicketTable from '@/CustomComponents/TicketComponent/TicketTable';
export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-7xl p-8">
        <h1 className="text-2xl font-bold mb-6">Task Manager</h1>
        <TicketTable />
      </div>
    </div>
  );
}
