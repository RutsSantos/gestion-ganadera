import React, { useEffect, useState } from "react";
import axios from "axios";

// components
import CardTable from "components/Cards/CardTable.js";
import ModalEmployees from "components/Modals/ModalEmployees";

export default function Employees() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [tercero, setTercero] = useState([]);
  const [bancaria, setBancaria] = useState([]);
  const [estado, setEstado] = useState([]);
  const [cargo, setCargo] = useState([]);
  const [show, setShow] = useState(false);
  const [del, setDelete] = useState(false);

  useEffect(() => {
    async function fetchMyAPI() {
      await axios.get('http://localhost:3200/empleados')
        .then((res) => setData(res.data))

      // await axios.get('http://localhost:3200/terceros')
      //   .then((res) => setTercero(res.data)).catch((e) => console.error(e))
      await axios.get('http://localhost:3200/cuenta_bancaria')
        .then((res) => {console.log(res.data);setBancaria(res.data)}).catch((e) => console.error(e))
      await axios.get('http://localhost:3200/estado_empleado')
        .then((res) => setEstado(res.data)).catch((e) => console.error(e))
      await axios.get('http://localhost:3200/cargo_empleado')
        .then((res) => setCargo(res.data)).catch((e) => console.error(e))
    }
    fetchMyAPI()
    setDelete(false)
    setData2([])
  }, [show, del])

  let headers = ["ID", "Nombre", "Cargo", "Estado", "Cuenta Banco"]

  data.map(item => {
    bancaria.map(estado => item["id_cuenta_bancaria"] === estado["id_cuenta_bancaria"] && (item["id_cuenta_bancaria"] = estado["numero"]));
    estado.map(estado => item["id_estado"] === estado["id_estado"] && (item["id_estado"] = estado["descripcion"]));
    cargo.map(estado => item["id_cargo"] === estado["id_cargo"] && (item["id_cargo"] = estado["descripcion"]));
  });

  const handleModalChange = (res) => setShow(res);
  const handleDelete = (res) => setDelete(res);

  const postApi = async (id, body) => {
    if (data2.length > 0) {
      await axios.put(`http://localhost:3200/empleados/${id}`, body).then(() => console.log("Posteado"))
      
    } else {
      await axios.post('http://localhost:3200/empleados', body).then(() => console.log("Posteado"))
    }
  }
  console.log(data)
  const retreiveData = (data) => {
    setShow(true)
    setData2(data)
  }
  return (
    <>
      <div className="text-center flex justify-between">
        <h6 className="text-white text-xl font-bold">Empleados</h6>
        <button
          onClick={() => handleModalChange(true)}
          className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
          type="button"
        >
          Añadir
        </button>
      </div>
      {data.length > 0 && <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          {show && <ModalEmployees cargos={cargo} status={estado} post={postApi} changeModalState={() => handleModalChange()} headers={headers} data={data2} />}
          <CardTable data={data} headers={headers} retreiveFunc={retreiveData} changeModalState={() => handleDelete()} />
        </div>
      </div>}
    </>
  );
}
