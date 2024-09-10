
import Modal from '@/CustomComponents/Modal';
import TicketTable from '@/CustomComponents/TicketComponent/TicketTable';
export default function Dashboard() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 overflow-auto">
      <div className="w-full max-w-7xl p-8">
        <Modal />
        <TicketTable />
      </div>
    </div>
  );
}
