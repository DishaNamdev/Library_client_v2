import React from "react";
import Modal from "@components/Modal";

function Loader() {
  return (
    <Modal>
      <div className="h-full w-full bg-transparent flex items-center justify-center">
        <div className="bg-white rounded-md p-5">
          <div className="loader"></div>
        </div>
      </div>
    </Modal>
  );
}

export default Loader;
