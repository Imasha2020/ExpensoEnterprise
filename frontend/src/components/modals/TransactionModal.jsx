import Input from "../shared/input";
import Select from "../shared/Select";
import Button from "../shared/Button";

export default function TransactionModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">
          Add Transaction
        </h2>

        <Input placeholder="Title" />
        <Input placeholder="Amount" className="mt-2" />

        <Select className="mt-2">
          <option>Income</option>
          <option>Expense</option>
        </Select>

        <Select className="mt-2">
          <option>Category</option>
        </Select>

        <Input type="date" className="mt-2" />

        <textarea
          className="w-full border rounded-lg px-3 py-2 mt-2"
          placeholder="Notes"
        />

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button>Save</Button>
        </div>
      </div>
    </div>
  );
}
