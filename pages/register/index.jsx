import { useState } from "react";
import { Button, ContainerPrimary, Input } from "../../components/common";
import styles from "./register.module.scss";
import { useRouter } from "next/router";
import { postClienteServices } from "../../services/cliente";
import { app } from "../../services/firebase";
import Swal from "sweetalert2";

const Register = () => {
  const [dni, setDni] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [celular, setCelular] = useState("");
  const [archivo, setArchivo] = useState({});
  const router = useRouter();
  const clearInputs = () => {
    setNombre("");
    setApellido("");
    setDni("");
    setCelular("");
    setCorreo("");
    setPassword("");
  };
  const handleGuardarCliente = async () => {
    const path = app.storage().ref().child(archivo.name);
    await path.put(archivo);
   
    postClienteServices(
      dni,
      nombre,
      apellido,
      correo,
      password,
      celular,
      "https://firebasestorage.googleapis.com/v0/b/crud-image-1acb8.appspot.com/o/" +
        archivo.name +
        "?alt=media&token=449b3048-6b97-42b5-8436-9f926747cc05"
    );
    

    clearInputs();
  };

  return (
    <ContainerPrimary>
       <div className={styles.celeste}>
        <h1 className={styles.titleBlue}>Bienvenido a Montalvo </h1>
        <img className={styles.image} src="./login.png" alt="" />
        <p className={styles.description}>
        ¿ Ya tienes una cuenta ?
        </p>
        <Button onClick={() => router.push("/")}>Ir al login</Button>
      </div>
      <div className={styles.container}>
        <h1 className={styles.title}>Registrate aqui</h1>
        <div className={styles.containerInputs}>
          <Input
            placeholder="DNI"
            type="text"
            onChange={(e) => setDni(e.target.value.slice(0, 8))}
            value={dni}
          />
          <Input
            placeholder="Nombre"
            type="text"
            onChange={(e) => setNombre(e.target.value)}
            value={nombre}
          />
          <Input
            placeholder="Apellido"
            type="text"
            onChange={(e) => setApellido(e.target.value)}
            value={apellido}
          />
          <Input
            placeholder="Celular"
            type="text"
            onChange={(e) => setCelular(e.target.value.slice(0, 9))}
            value={celular}
          />
          <Input
            placeholder="Correo Electronico"
            type="text"
            onChange={(e) => setCorreo(e.target.value)}
            value={correo}
          />
          <Input
            placeholder="Contraseña"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className={styles.containerFile}>
            <p className={styles.titleFile}>Agregar foto</p>
            <input
              type="file"
              onChange={(e) => {
                setArchivo(e.target.files[0]);
              }}
              className={styles.file}
            />
          </div>

          <div className={styles.containerButton}>
            <Button onClick={handleGuardarCliente}>Crear</Button>
          </div>
        </div>
      </div>
    </ContainerPrimary>
  );
};

export default Register;
