import React, { useState } from "react";
import { createPopper } from "@popperjs/core";
import axios from 'axios';
import { useLocation } from 'react-router-dom'

const NotificationDropdown = ({ data, func, changeModalState }) => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "left-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const location = useLocation();
  let route, id;

  switch (location.pathname) {
    case "/business/employees":
      route = "empleados";
      id = data.id_empleado;
      break;
    case "/business/supliers":
      route = "suplidores";
      id = data.id_suplidor;
      break;
    case "/admin/users":
      route = "auth"
      id = data.id_usuario
    default:
      route = "animales";
      id = data.id_animal;
  }

  const deleteEl = async () => await axios.delete(`http://localhost:3200/${route}/${id}`);

  return (
    <>
      <a
        className="text-blueGray-500 py-1 px-3"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <i className="fas fa-ellipsis-v"></i>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={() => func(data)}
        >
          Editar
        </a>
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={async () => {
            await deleteEl();
            changeModalState(true);
          }}
        >
          Eliminar
        </a>
      </div>
    </>
  );
};

export default NotificationDropdown;
