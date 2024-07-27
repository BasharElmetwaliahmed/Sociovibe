import { TrashIcon } from "@heroicons/react/24/solid";
import ButtonIcon from "./ButtonIcon";

function ConfirmDelete({ resourceName, onCloseModal, onClick, disabled }) {
  return (
    <div className="w-160 flex flex-col px-4 py-8 gap-3">
      <h3 className="text-2xl font-bold">Delete {resourceName}</h3>
      <p className="text-gray-500 mb-3 ">
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>
      <div className="flex justify-end gap-6">
        <button onClick={onCloseModal}>Cancel</button>
        <ButtonIcon type="danger" onClick={onClick} disabled={disabled}>
          <TrashIcon className="size-4" />
          Delete
        </ButtonIcon>
      </div>
    </div>
  );
}

export default ConfirmDelete;
