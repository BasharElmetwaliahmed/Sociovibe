import { deleteAccountAction } from "@/app/_lib/action";
import { TrashIcon } from "@heroicons/react/24/solid";
import { signOut } from "next-auth/react";
import { useState } from "react";
import ButtonIcon from "../ButtonIcon";
import ConfirmDelete from "../ConfirmAlert";
import Modal from "../Modal";

function DeleteAccount() {
  const [loading, setLoading] = useState(false);
  const deleteAccountHandler = async () => {
    setLoading(true);
    try {
      await deleteAccountAction();
      await signOut({
        redirectTo: "/login",
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal>
      <Modal.Open name="deleteAccount">
        <ButtonIcon type={"danger"}>
          <TrashIcon className="size-4" />
          Delete Account
        </ButtonIcon>
      </Modal.Open>
      <Modal.Window openName="deleteAccount">
        <ConfirmDelete
          resourceName="Account"
          disabled={loading}
          onClick={deleteAccountHandler}
        />
      </Modal.Window>
    </Modal>
  );
}

export default DeleteAccount;
