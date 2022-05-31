import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
import { Button, Input } from "../components/common";
import { ContainerPrimary } from "../components/layouts";
import { DataContext } from "../context/Provider";
import useField from "../hooks/useField";
import { validarclienteServices } from "../services/cliente.service";
import styles from "./index.module.scss";

const Home = () => {
  const email = useField("email");
  const password = useField("password");

  const [loader, setLoader] = useState(true);
  const { store, setStore } = useContext(DataContext);
  const router = useRouter();

  useEffect(() => {
    store?.user.length != 0 && router.push("/menu-home");
    setLoader(false);
  }, [loader]);
  const handleClickValidate = (e) => {
    e.preventDefault();
    validarclienteServices(email.value, password.value, setStore, store, setLoader);
  };
  const handleClickProfesional = (e) => {
    e.preventDefault();
    router.push("/profesional")
  };

  return (
    <ContainerPrimary>
      <div className={styles.containerPrimary}>
        <h2 className={styles.titlePrimary}>Bienvenido a MONTALVO</h2>
        <h2 className={styles.titlePrimary}>Esta en modo Cliente</h2>
        <img className={styles.image} src="./login.png" alt="" />
        <p className={styles.description}>¿ no tienes cuenta ?</p>
        <Button onClick={() => router.push("/register")}>Registrar</Button>
      </div>
      <div className={store?.onDark ? styles.containerDark : styles.containerSecundary}>
        <h1 className={styles.titleSecundary}>Ingresa Aqui </h1>
        <div className={styles.containerInputs}>
          <Input {...email} placeholder="Correo Electronico" />
          <Input {...password} placeholder="Contraseña" />
          <div className={styles.containerButton}>
            <Button onClick={handleClickValidate}>Ingresar</Button>
            <Button onClick={handleClickProfesional}>Ir a Modo Profesional</Button>
          </div>
        </div>
      </div>
    </ContainerPrimary>
  );
};

export default Home;
