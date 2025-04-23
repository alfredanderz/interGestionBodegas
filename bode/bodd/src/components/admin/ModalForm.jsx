import React from "react";
export default function ModalForm() {
  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg py-4"></h3>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <button className="btn custom-bg"></button>
          </form>
          <label className="input">Path</label>
        </div>
      </dialog>
    </>
  );
}
