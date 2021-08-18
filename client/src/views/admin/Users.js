import React, { useEffect, useState } from "react";
import CardTable from "components/Cards/CardTable";
import axios from "axios";
import UserModal from "components/Modals/UserModal";

export default function Register() {
  const [users, setUsers] = useState([])
  const [usersTypes, setUsersTypes] = useState([])
  const [show, setShow] = useState(false);
  const [del, setDelete] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState([])

  useEffect(() => {
    async function fetchMyAPI() {
      await axios.get('http://localhost:3200/auth/')
        .then((res) => setUsers(res.data))

      await axios.get('http://localhost:3200/auth/types')
        .then((res) => {
          setUsersTypes(res.data)
        })
    }
    fetchMyAPI()
    setDelete(false)
  }, [show, del])

  const postApi = async (id, body) => {
    if (editing) {
      await axios.put(`http://localhost:3200/auth/${id}`, body).then(() => console.log("Posteado"))
    } else {
      await axios.put('http://localhost:3200/auth', body).then(() => console.log("Posteado"))
    }
  }

  const handleModalChange = (res) => setShow(res);
  const handleDelete = (res) => setDelete(res);

  const retreiveData = (data) => {
    setShow(true)
    setEditing(true)
    setCurrentUser(data)
  }

  return (<>
    {users.length > 0 && <div className="flex flex-wrap mt-4">
      <div className="w-full mb-12 px-4"></div>
      <CardTable title="Usuarios" data={users} retreiveFunc={retreiveData} changeModalState={() => handleDelete()} headers={['id', 'Nombre de Usuario']} />
      {show && <UserModal status={usersTypes} post={postApi} changeModalState={() => handleModalChange()} headers={['Nombre Usuario', 'Contraseña', 'Confirmar contraseña', 'Tipo de Usurio']} data={currentUser} />}
    </div>}
    <div className="text-center flex justify-between">
      <h6 className="text-white text-xl font-bold">Usuarios</h6>
      <button
        onClick={() => handleModalChange(true)}
        className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
        type="button"
      >
        Añadir
      </button>
    </div>
  </>)
}