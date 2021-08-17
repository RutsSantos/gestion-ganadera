import React, { useEffect, useState } from "react";
import axios from "axios";

// components
import CardTable from "components/Cards/CardTable.js";

export default function Inventory() {
  const [data, setData] = useState([]);
  const [estado_animal, setEstado] = useState([]);

  useEffect(() => {
    async function fetchMyAPI() {
      const response = await axios.get('http://localhost:3200/animales')
      setData(response.data)
      const response2 = await axios.get('http://localhost:3200/estado_animal')
      setEstado(response2.data)
    }
    fetchMyAPI()



  }, [])
  data.map(item => {
    estado_animal.map(estado => item["id_estado_animal"] === estado["id_estado_animal"] && (item["id_estado_animal"] = estado["descripcion"]));
    const date = new Date(item["nacimiento"]);
    item["nacimiento"] = date.toLocaleString()
  });
  let headers = data.length > 0 ? Object.keys(data[0]) : [];
  headers[4] = "Estado animal"
  return (
    <>
      {data.length > 0 && <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTable title="Inventario De Animales" data={data} headers={headers} />
        </div>
      </div>}
    </>
  );
}
