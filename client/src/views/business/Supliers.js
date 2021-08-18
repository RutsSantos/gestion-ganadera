import React, { useState } from "react";

import { TEMP_SUPLIERS, mockSuplierData } from "./utils";

// components

import CardTable from "components/Cards/CardTable.js";


export default function Supliers() {
  const [tempId, setTempId] = useState(TEMP_SUPLIERS.length);
  const [data, setData] = useState(TEMP_SUPLIERS);

  // Handlers
  const handleModalChange = () => {};
  const handleAdd = () => {
    setData(prev => [...prev, mockSuplierData(tempId)]);
    setTempId((prev) => prev + 1);
  };
  const handleDelete = () => {
    // TODO
  };
  const retreiveData = () => {};

  const headers = Object.keys(data[0]);

  return (
    <>
      <div className="text-center flex justify-between">
        <h6 className="text-white text-xl font-bold">Suplidores</h6>
        <button
          onClick={handleAdd}
          className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
          type="button"
        >
          Añadir
        </button>
      </div>
      {data.length > 0 && (
        <div className="flex flex-wrap mt-4">
          <div className="w-full mb-12 px-4">
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
