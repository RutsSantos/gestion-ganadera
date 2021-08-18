import React, { useState } from "react";

import { TEMP_SUPLIERS, mockSuplierData } from "./utils";

// components

import CardTable from "components/Cards/CardTable.js";
import CrudModal from "components/Modals/CrudModal.js";

export default function Supliers() {
  const [show, setShow] = useState(false);
  const [tempId, setTempId] = useState(TEMP_SUPLIERS.length);
  const [data, setData] = useState(TEMP_SUPLIERS);
  const [tempData, setTempData] = useState({});

  // Handlers
  const handleCancel = () => {
    setShow(false);
  };
  const handleSave = (newData) => {
    setData((prev) => [...prev, { ...newData, id_suplidor: tempId }]);
    setTempId((prev) => prev + 1);
    // Push to server
    //
    setShow(false);
  };
  const handleDelete = () => {
    // TODO
  };
  const retreiveData = () => {};

  const headers = Object.keys(data[0]);
  const modalHeaders = headers.filter(header => header !== 'id_suplidor');

  return (
    <>
      <div className="text-center flex justify-between">
        <h6 className="text-white text-xl font-bold">Suplidores</h6>
        <button
          onClick={() => setShow(true)}
          className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
          type="button"
        >
          Añadir
        </button>
      </div>
      {data.length > 0 && (
        <div className="flex flex-wrap mt-4">
          <div className="w-full mb-12 px-4">
            {show && (
              <CrudModal
                data={tempData}
                headers={modalHeaders}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            )}
            <CardTable
              data={data}
              headers={headers}
              retreiveFunc={retreiveData}
              changeModalState={() => handleDelete()}
            />
          </div>
        </div>
      )}
    </>
  );
}
