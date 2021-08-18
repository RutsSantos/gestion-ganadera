export const TEMP_SUPLIERS = [
  {
    id_suplidor: 0,
    nombre: "suplid_suplidoror 0",
    direccion: "Av. Juan Pablo Duarte",
    rnc: "1234567",
    telefono: "8091234343",
    correo: "test@gmail.com",
  },
  {
    id_suplidor: 1,
    nombre: "suplid_suplidoror 1",
    direccion: "Av. Juan Pablo Duarte",
    rnc: "1234567",
    telefono: "8091234343",
    correo: "test@gmail.com",
  },
  {
    id_suplidor: 2,
    nombre: "suplid_suplidoror 2",
    direccion: "Av. Juan Pablo Duarte",
    rnc: "1234567",
    telefono: "8091234343",
    correo: "test@gmail.com",
  },
];

export function mockSuplierData(id_suplidor) {
  return {
    id_suplidor,
    nombre: `suplid_suplidoror ${id_suplidor}`,
    direccion: "Av. Juan Pablo Duarte",
    rnc: "1234567",
    telefono: "8091234343",
    correo: "test@gmail.com",
  };
}
