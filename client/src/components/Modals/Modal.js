import React, { useState } from 'react';
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

export default function Modal({ status=[], post, changeModalState, headers, data = [] }) {
  const {id_animal = "",nombre = "", nacimiento = "", id_genotipo = "", id_estado_animal = ""} = data;
  const [name, setName] = useState(nombre);
  const [birth, setBirth] = useState(nacimiento);
  const [genotipo, setGenotipo] = useState(id_genotipo);
  const [estado, setEstado] = useState(id_estado_animal);
  let body = {
    "nombre": name,
    "nacimiento": birth,
    "id_genotipo": genotipo,
    "id_estado_animal": estado
  };
  const stateOptions = [];
  status.map(item => stateOptions.push({ key: item.id_estado_animal, value: item.descripcion, text: item.descripcion }))
  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative w-auto my-6 mx-auto max-w-3xl" style={{ marginLeft: "10%" }}>
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-10/12 bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">
                Añadir
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => changeModalState(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto" style={{ margin: "10px", padding: "20px" }}>
              <form>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Información
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        {headers[1]}
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        {headers[2]}
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={birth}
                        onChange={(e) => setBirth(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        {headers[3]}
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={genotipo}
                        onChange={(e) => setGenotipo(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        {headers[4]}
                      </label>
                      {/* <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue="lucky.jesse"
                      /> */}
                      <Dropdown placeholder='Seleccionar' selection options={stateOptions} onChange={(e, data) => {
                        const { value } = data;
                        const { key } = data.options.find(o => o.value === value);
                        setEstado(key)
                      }} />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b" style={{ padding: "15px" }}>
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => changeModalState(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={async () => {
                  let date = new Date(birth);
                  date = date.toISOString();
                  body["nacimiento"] = date;
                  body["id_genotipo"] = parseInt(genotipo);
                  console.log(body)
                  await post(id_animal, body)
                  changeModalState(false)
                }}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}