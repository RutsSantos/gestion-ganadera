import React, { useEffect, useState } from "react";
import axios from "axios";

// components
import CardTable from "components/Cards/CardTable.js";
import Modal from "components/Modals/Modal";

export default function Inventory() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [estado_animal, setEstado] = useState([]);
  const [show, setShow] = useState(false);
  const [del, setDelete] = useState(false);

  useEffect(() => {
    async function fetchMyAPI() {
      await axios.get('http://localhost:3200/animales')
        .then((res) => { console.log(res.data); setData(res.data) })

      const response2 = await axios.get('http://localhost:3200/estado_animal')
      setEstado(response2.data)
    }
    fetchMyAPI()
  }, [show, del])

  data.map(item => {
    estado_animal.map(estado => item["id_estado_animal"] === estado["id_estado_animal"] && (item["id_estado_animal"] = estado["descripcion"]));
    const date = new Date(item["nacimiento"]);
    item["nacimiento"] = date.toLocaleString()
  });
  let headers = data.length > 0 ? Object.keys(data[0]) : [];
  headers[4] = "Estado animal";

  const handleModalChange = (res) => setShow(res);
  const handleDelete = (res) => setDelete(res);

  const postApi = async (id, body) => {
    if(data2){
      await axios.put(`http://localhost:3200/animales/${id}`, body).then(() => console.log("Posteado"))
    }else{
      await axios.post('http://localhost:3200/animales', body).then(() => console.log("Posteado"))
    } 
  }

  const retreiveData = (data) =>{
    setShow(true)
    setData2(data)
  }
  return (
    <>
      <div className="text-center flex justify-between">
        <h6 className="text-white text-xl font-bold">Inventario De Animales</h6>
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
          {show && <Modal status={estado_animal} post={postApi} changeModalState={() => handleModalChange()} headers={headers} data={data2} />}
          <CardTable data={data} headers={headers} retreiveFunc={retreiveData} changeModalState={() => handleDelete()} />
        </div>
      </div>}
    </>
  );
}
