import React, { useEffect, useState, useCallback } from 'react';

// components

import CardTable from 'components/Cards/SalesTable.js';

const defaultFormData = {
  fecha: new Date().toISOString().substr(0, 10),
  cantidad: 1,
};

export default function Sales() {
  const [salesData, setSales] = useState({ isLoading: true, rows: [] });
  const [editRow, setEditRow] = useState({ isEditing: false, row: {} });

  const [formData, setFormData] = useState(defaultFormData);

  const handleFormChange = value => setFormData({ ...formData, ...value });

  const handleEditRow = async row => {
    setEditRow({ isEditing: true, row });
    setFormData({ ...row, fecha: new Date(row.fecha).toISOString().substr(0, 10) });
  };

  const getSales = async () => {
    try {
      const response = await fetch('http://localhost:3200/sales/').then(response =>
        response.json()
      );

      setSales({ isLoading: false, rows: response });
      return response;
    } catch (e) {
      console.error(e);
    }
  };

  const deleteSales = async row => {
    try {
      const response = await fetch(`http://localhost:3200/sales/${row.id_produccion}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      getSales();
      return response;
    } catch (e) {
      console.error(e);
    }
  };

  const cancelFormEdit = () => {
    setFormData(defaultFormData);
    setEditRow({ isEditing: false, row: {} });
  };
  const handleFormSubmit = async event => {
    event.preventDefault();

    const endpoint = editRow.isEditing ? `sales/${formData.id_produccion}` : 'sales/';

    await fetch(`http://localhost:3200/${endpoint}`, {
      method: editRow.isEditing ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    getSales();
    cancelFormEdit();
  };

  useEffect(() => {
    getSales();
  }, []);

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTable data={salesData} dropdown={{ editar: handleEditRow, borrar: deleteSales }} />
        </div>
        <div className="w-full mb-12 px-4">
          <form
            onSubmit={handleFormSubmit}
            className={
              'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
              (editRow.isEditing
                ? 'bg-lightBlue-800 text-white border-lightBlue-700'
                : 'bg-blueGray-50 text-blueGray-500 border-blueGray-100')
            }
          >
            <h6 className={'text-sm mt-3 mb-6 font-bold uppercase '}>
              {editRow.isEditing ? `Editar venta: #${formData.id_produccion}` : 'Agregar venta'}
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-xs font-bold mb-2" htmlFor="grid-password">
                    Fecha
                  </label>
                  <input
                    type="date"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={e => handleFormChange({ fecha: e.target.value })}
                    value={formData.fecha}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-xs font-bold mb-2" htmlFor="grid-password">
                    Cantidad
                  </label>
                  <input
                    type="number"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={e => handleFormChange({ cantidad: Number(e.target.value) })}
                    value={formData.cantidad}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  {editRow.isEditing && (
                    <button
                      className="bg-red-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                      onClick={cancelFormEdit}
                      type="button"
                    >
                      Cancelar
                    </button>
                  )}

                  <button
                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
